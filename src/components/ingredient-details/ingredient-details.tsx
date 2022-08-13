import React from 'react';
import IngredientDetailsStyles from './ingredient-details.module.css';
import Modal from '../modal/modal';

interface dataObjProps {
  _id?: string;
  name: string;
  price: number;
  image: string;
  type: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

interface IngredientDetailsProps {
  opened: Boolean;
  onClose: () => void;
  selectedIngridient: dataObjProps;
}


function IngredientDetails({ opened, onClose, selectedIngridient }: IngredientDetailsProps) {


  return (
    <Modal opened={opened} onClose={onClose} title="Детали ингридиента">
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
    </Modal>
  );
}

export default IngredientDetails;