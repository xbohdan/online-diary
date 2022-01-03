import { RootState } from '../../store';

const selectIsDisabled = (store: RootState): boolean => store.button.isDisabled;

export default selectIsDisabled;
