import { DialogTypes } from '@enums/dialogTypes';
import { DialogOption } from '@interfaces/dialogOption';
import { StateCreator } from 'zustand';

interface State {
  showDialog: boolean;
  dialogOptions: DialogOption;
}

export const initialDialogSlice: State = {
  showDialog: false,
  dialogOptions: {
    type: DialogTypes.SUCCESS,
    message: '',
  },
};

interface Actions {
  setShowDialog: (showDialog: boolean) => void;
  setDialogOptions: (dialogOptions: DialogOption) => void;
}

export interface DialogSlice extends State, Actions {}

export const createDialogSlice: StateCreator<DialogSlice, [], []> = (set) => ({
  ...initialDialogSlice,
  setShowDialog: (showDialog) => set((state) => ({ ...state, showDialog })),
  setDialogOptions: (dialogOptions) =>
    set((state) => ({ ...state, dialogOptions })),
});
