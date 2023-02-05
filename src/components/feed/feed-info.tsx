import { FC } from 'react';
import feedStyles from './feed.module.css';
import { useSelector, useDispatch } from '../../services/hooks';
import { ISocketDataOrder } from '../../utils/types';
const FeedInfo: FC = () => {
  const { orders, total, totalToday } = useSelector((state) => state.feed);

  return (
    <div className={`${feedStyles.feed_info}`}>
      <div className={`mb-15 ${feedStyles.feed_numbers}`}>
        <div className={`mr-9 ${feedStyles.feed_numbers_item}`}>
          <p className="mb-6 text text_type_main-medium">
            Готовы:
          </p>
          <ul className={`text text_type_digits-default ${feedStyles.feed_numbers_list} ${feedStyles.feed_numbers_in_process}`}>
            {
              orders.filter((order: ISocketDataOrder) => order.status === "done")
                .map((order: ISocketDataOrder) =>
                  (<li className={`${feedStyles.feed_numbers_list_item}`} key={order._id}>{order.number}</li>)
                )
            }
          </ul>
        </div>
        <div className={`${feedStyles.feed_numbers_item}`}>
          <p className="mb-6 text text_type_main-medium">
            В работе:
          </p>
          <ul className={`text text_type_digits-default ${feedStyles.feed_numbers_list}`}>
            {
              orders.filter((order: ISocketDataOrder) => order.status !== "done")
                .map((order: ISocketDataOrder) => (<li className={`${feedStyles.feed_numbers_list_item}`} key={order._id}>{order.number}</li>))
            }
          </ul>
        </div>
      </div>
      <div className="mb-15">
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <div className="text text_type_digits-large">
          {total}
        </div>
      </div>
      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <div className="text text_type_digits-large">
        {totalToday}
      </div>
    </div >
  );
}


export default FeedInfo;