import { useState, useCallback, useEffect, FC } from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { shallowEqual } from "react-redux";
import { useSelector, useDispatch } from "../../services/hooks";
import {
  SET_BUN_ID,
  ADD_SELECTED_CONSTRUCTOR_INGRIDIENTS,
  DRAG_SELECTED_CONSTRUCTOR_INGRIDIENTS,
} from "../../services/constants/constructor";
import { deleteSelectedIngridient } from "../../services/actions/constructor";
import { getOrderNumber } from "../../services/actions/order";
import { useHistory } from "react-router-dom";
import { useDrop } from "react-dnd";
import ConstructorItem from "./constructorItem";
import { v4 as uuidv4 } from "uuid";
import { IIngredient, IIngredientItem } from "../../utils/types";
import { Button } from '../ui-yandex/ui-yandex';

type CloseCallback = (id: string) => void;
type DragCallback = (dragIndex: number, hoverIndex: number) => void;
type OnButtonClickCallback = () => void;

const BurgerConstructor: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedBun, setSelectedBun] = useState<IIngredient | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const {
    ingridients,
    selectedConstructorIngridients,
    orderNumberRequest,
    selectedItems,
    bun,
    currentUser,
  } = useSelector(
    (state) => ({
      ingridients: state.ingridients.ingridients,
      selectedConstructorIngridients:
        state.constructorItem.selectedConstructorIngridients,
      orderNumberRequest: state.order.orderNumberRequest,
      selectedItems: state.constructorItem.selectedItems,
      bun: state.ingridients.ingridients.find(
        (i: IIngredient) => i._id === state.constructorItem.bunId
      ),
      currentUser: state.currentUser.currentUser,
    }),
    shallowEqual
  );

  const [, dropTarget] = useDrop({
    accept: "ingridient",
    drop({ _id, type }: IIngredient) {
      if (type === "bun") {
        dispatch({
          type: SET_BUN_ID,
          id: _id,
        });
      } else {
        dispatch({
          type: ADD_SELECTED_CONSTRUCTOR_INGRIDIENTS,
          _id: _id,
          item: {
            ...ingridients.find((i: IIngredient) => i._id === _id)!,
            dragId: uuidv4(),
          },
        });
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  useEffect(() => {
    bun && setSelectedBun(bun);
    const bunPrice = (bun?.price ?? 0) * 2;
    setTotalPrice(
      selectedItems.reduce((acc: number, iter: IIngredient) => {
        return acc + iter?.price;
      }, 0) + bunPrice
    );
  }, [selectedItems, bun]);

  const onButtonClick = useCallback<OnButtonClickCallback>(() => {
    if (!bun) {
      return;
    }

    if (currentUser.email)
      dispatch(getOrderNumber([...selectedConstructorIngridients, bun._id]));
    else history.push("/login");
  }, [selectedConstructorIngridients, bun, currentUser]);

  const handleClose = useCallback<CloseCallback>(
    (id) => {
      dispatch(deleteSelectedIngridient(id, selectedItems));
    },
    [selectedItems]
  );

  const handleDrag = useCallback<DragCallback>(
    (dragIndex, hoverIndex) => {
      const dragCard = selectedItems[dragIndex];
      const newCards = [...selectedItems];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      dispatch({
        type: DRAG_SELECTED_CONSTRUCTOR_INGRIDIENTS,
        newIngridientsId: newCards.map((i) => i._id),
        newSelectedItems: newCards,
      });
    },
    [selectedItems, selectedConstructorIngridients, dispatch]
  );

  return (
    <>
      {selectedConstructorIngridients.length === 0 && !selectedBun && (
        <p className="text text_type_main-medium mb-6">
          Перетащите ингридиенты
        </p>
      )}
      {selectedBun && (
        <div key={`${selectedBun._id}top`} className="ml-6">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${selectedBun.name} (верх)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        </div>
      )}
      <div ref={dropTarget} className={burgerConstructorStyles.items}>
        {selectedItems.map((item: IIngredientItem, index: number) => {
          return (
            <ConstructorItem
              key={item?.dragId}
              item={item}
              handleClose={handleClose}
              index={index}
              handleDrag={handleDrag}
            />
          );
        })}
      </div>
      {selectedBun && (
        <div key={`${selectedBun._id}bottom`} className="ml-6">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${selectedBun.name} (низ)`}
            price={selectedBun.price}
            thumbnail={selectedBun.image}
          />
        </div>
      )}
      <div className={burgerConstructorStyles.button_container}>
        <div className={burgerConstructorStyles.price}>
          <p className="mt-1 mb-1 mr-2 text text_type_main-large">
            {totalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={onButtonClick}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
      </div>
    </>
  );
};

export default BurgerConstructor;
