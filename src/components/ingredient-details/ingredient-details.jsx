import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IngredientDetailsStyles from './ingredient-details.module.css';
import { useLocation } from "react-router";
import {
  getIngridients,
} from '../../services/actions/actions';

function IngredientDetails() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngridients())
  }, [dispatch]);

  let currentIngridientDetails = useSelector(state => state.currentIngridientDetails.currentIngridientDetails);
  const location = useLocation();
  const { ingridients } = useSelector(state => state.ingridients);

  if (!location.state) {
    currentIngridientDetails = ingridients.find(i => i._id === location.pathname.replace('/ingredients/', ''))
  }
  return (
    <>
      <img src={currentIngridientDetails?.image} />
      <p className='mt-4 text text_type_main-medium'>{currentIngridientDetails?.name}</p>
      <div className={IngredientDetailsStyles.container}>
        <p className={`text text_type_main-default text_color_inactive mr-5 ${IngredientDetailsStyles.text}`}>
          Калории,ккал
          <br />{currentIngridientDetails?.calories}</p>
        <p className={`text text_type_main-default text_color_inactive mr-5 ${IngredientDetailsStyles.text}`}>
          Белки,г
          <br />{currentIngridientDetails?.proteins}</p>
        <p className={`text text_type_main-default text_color_inactive mr-5 ${IngredientDetailsStyles.text}`}>
          Жиры,г
          <br />{currentIngridientDetails?.fat}</p>
        <p className={`text text_type_main-default text_color_inactive ${IngredientDetailsStyles.text}`}>
          Углеводы,г
          <br />{currentIngridientDetails?.carbohydrates}</p>
      </div>
    </>
  );
}

export default IngredientDetails;