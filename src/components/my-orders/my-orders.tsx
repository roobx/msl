import { FC, useEffect } from 'react';
import Order from '../order/order';
import { useSelector, useDispatch } from '../../services/hooks';
import {
  WS_CONNECTION_CLOSED,
  WS_MY_ORDERS_CONNECTION_START
} from '../../services/constants/socket';
import { ISocketDataOrder } from '../../utils/types';
import ordersStyles from './orders.module.css';

const MyOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      { type: WS_MY_ORDERS_CONNECTION_START }
    );
    return () => {
      dispatch(
        { type: WS_CONNECTION_CLOSED }
      );
    };
  }, [dispatch]);

  const { orders } = useSelector((state) => state.feed);

  return (
    <div className={`mr-2 ${ordersStyles.items}`}>
      {orders?.map((order: ISocketDataOrder) => (<Order key={order._id} {...order} />))}
    </div>
  );
}


export default MyOrders;