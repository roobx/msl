import { FC } from 'react';
import pagesStyles from './pages.module.css';
import Feed from '../components/feed/feed';
import FeedInfo from '../components/feed/feed-info';

const FeedPage: FC = () => {

  return (
    <div className={`mt-10 ${pagesStyles.feed_container}`}>
      <h2 className={`text text_type_main-large ${pagesStyles.feed_title}`}>
        Лента заказов
      </h2>
      <div className={`mt-5 ${pagesStyles.feed}`}>
        <div className={`mr-15 ${pagesStyles.main_container}`}>
          <Feed />
        </div>
        <div className={`${pagesStyles.main_container}`}>
          <FeedInfo />
        </div>
      </div>
    </div >

  );
}

export default FeedPage;