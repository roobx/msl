export interface IIngredient {
  calories: number,
  carbohydrates: number,
  fat: number,
  image: string,
  image_large: string,
  image_mobile: string,
  name: string,
  price: number,
  proteins: number,
  type: string,
  __v: number,
  _id: string
};

export interface IIngredientItem extends IIngredient {
  dragId: string;

}

export interface IConstructorItem {
  item: IIngredientItem;
  handleClose: (id: string) => void;
  handleDrag: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}

export interface IIngridientItem {
  ingridient: IIngredient;
  onClick: (i: any) => void;
  count: number;
}

export interface IModalOverlayProps {
  children?: JSX.Element;
  opened: Boolean;
  onClose: () => void;
}

export interface IModalProps extends IModalOverlayProps {
  title?: string;
}

export interface ILocation {
  from?: Location;
  background?: Location;
  pathname?: string;
}