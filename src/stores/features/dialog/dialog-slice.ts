// stores/features/DialogState.ts
import { createSlice } from '@reduxjs/toolkit';

interface DialogState {
  isOpen: boolean;
}

const initialState: DialogState = {
  isOpen: false,
};

export const DialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    onOpen(state) {
      state.isOpen = true;
    },
    onClose(state) {
      state.isOpen = false;
    },
  },
});

export const { onOpen, onClose } = DialogSlice.actions;
export default DialogSlice.reducer;
