import { FC, useEffect } from 'react';
import Order from '../order/order';
import { useSelector, useDispatch } from '../../services/hooks';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED
} from '../../services/constants/socket';
import { ISocketDataOrder } from '../../utils/types';
import feedStyles from './feed.module.css';
import { wsUrl } from '../../utils/consts';

const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      { type: WS_CONNECTION_START, payload: `${wsUrl}/all` }
    );
    return () => {
      dispatch(
        { type: WS_CONNECTION_CLOSED }
      );
    };
  }, [dispatch]);

  const { orders } = useSelector((state) => state.feed);

  return (
    <div className={`mr-2 ${feedStyles.items}`}>
      {orders?.map((order: ISocketDataOrder) => (<Order key={order._id} {...order} />))}
    </div>
  );
}


export default Feed;