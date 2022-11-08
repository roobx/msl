import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IngredientDetailsStyles from './ingredient-details.module.css';
import { useLocation } from "react-router";
import {
  SHOW_INGRIDIENT_DETAILS,
} from '../../services/actions/current-ingridient';


function IngredientDetails() {
  const dispatch = useDispatch();
  const currentIngridientDetailsStore = useSelector(state => state.currentIngridientDetails.currentIngridientDetails);
  const location = useLocation();
  const { ingridients } = useSelector(state => state.ingridients);


  const currentIngridientDetails = useMemo(
    () => ingridients.find(i => i._id === location.pathname.replace('/ingredients/', '')),
    [ingridients, location]);

  useEffect(() => {
    if (location.state && !currentIngridientDetailsStore?._id && currentIngridientDetails?._id) {
      dispatch({
        type: SHOW_INGRIDIENT_DETAILS,
        currentIngridient: currentIngridientDetails
      });
    }
  }, [location, currentIngridientDetailsStore, currentIngridientDetails]);




  return (
    <>
      <img src={currentIngridientDetails?.image} alt={currentIngridientDetails?.name} />
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