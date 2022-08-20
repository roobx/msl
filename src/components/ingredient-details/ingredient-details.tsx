import IngredientDetailsStyles from './ingredient-details.module.css';
import { ingredientType } from '../../utils/types';

interface IngredientDetailsProps {
  selectedIngridient: ingredientType;
}


function IngredientDetails({ selectedIngridient }: IngredientDetailsProps) {


  return (

    <>
      <img src={selectedIngridient.image} />
      <p className='mt-4 text text_type_main-medium'>{selectedIngridient.name}</p>
      <div className={IngredientDetailsStyles.container}>
        <p className={`text text_type_main-default text_color_inactive mr-5 ${IngredientDetailsStyles.text}`}>Калории,ккал<br />{selectedIngridient.calories}</p>
        <p className={`text text_type_main-default text_color_inactive mr-5 ${IngredientDetailsStyles.text}`}>Белки,г<br />{selectedIngridient.proteins}</p>
        <p className={`text text_type_main-default text_color_inactive mr-5 ${IngredientDetailsStyles.text}`}>Жиры,г<br />{selectedIngridient.fat}</p>
        <p className={`text text_type_main-default text_color_inactive ${IngredientDetailsStyles.text}`}>Углеводы,г<br />{selectedIngridient.carbohydrates}</p>
      </div>
    </>

  );
}

export default IngredientDetails;