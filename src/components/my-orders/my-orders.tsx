import { FC, useEffect } from 'react';
import Order from '../order/order';
import { useSelector, useDispatch } from '../../services/hooks';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED
} from '../../services/constants/socket';
import { ISocketDataOrder } from '../../utils/types';
import ordersStyles from './orders.module.css';
import { wsUrl } from '../../utils/consts';
import { getCookie } from '../../utils/utils';

const MyOrders: FC = () => {
  const dispatch = useDispatch();
  const accessToken = getCookie("accessToken");
  const token = accessToken?.split('Bearer ')[1];

  useEffect(() => {
    dispatch(
      { type: WS_CONNECTION_START, payload: `${wsUrl}?token=${token}` }
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