import { useRef } from 'react'
import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes, { shape } from 'prop-types';
import { ingredientType } from '../../utils/types';

function ConstructorItem({ item, handleClose, index, handleDrag }) {

  const ref = useRef(null);
  const [, drop] = useDrop({

    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },

    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      handleDrag(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  if (item.type !== 'bun') drag(drop(ref));

  const [{ opacity2 }, drag2] = useDrag({
    type: "constructor",
    item: { ...item, index },
    collect: (monitor) => ({
      opacity2: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div className={burgerConstructorStyles.item}
      ref={ref}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleClose(item._id)}
      />
    </div>
  );
}

ConstructorItem.propTypes = {
  item: shape(ingredientType).isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDrag: PropTypes.func.isRequired,
  index: PropTypes.number,
}
export default ConstructorItem;