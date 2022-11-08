import checkImg from '../../images/graphics.svg'
import { useSelector } from 'react-redux';

function OrderDetails() {
  const { orderNumber } = useSelector(state => state.order);
  return (

    <>
      <p className="mt-20 text text_type_digits-large">{orderNumber}</p>
      <p className="mt-4 text text text_type_main-medium">идентификатор заказа</p>
      <img className="mt-15 mb-15" src={checkImg} alt='детатли заказа' />
      <p className="mt-4 text text_type_main-default">Ваш заказ начали готовит</p>
      <p className="mt-4 mb-20 text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </>


  );
}

export default OrderDetails;