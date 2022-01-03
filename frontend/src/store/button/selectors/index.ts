import { RootState } from '../../store';

const selectIsDisabled = (store: RootState) => store.button.isDisabled;

export default selectIsDisabled;
