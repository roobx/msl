import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector
} from 'react-redux';
import { AppDispatch, AppThunk, RootState } from '../utils/types';

// Теперь этот хук «знает» структуру хранилища




export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Хук не даст отправить экшен, который ему не знаком
export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useDispatch: () => AppDispatch = useDispatch;
