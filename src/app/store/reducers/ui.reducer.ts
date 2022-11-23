import { createReducer, on } from '@ngrx/store';
import { ui } from '../actions/index'

export interface UiState {
  isClosed: boolean;
};

const initialState: UiState = {
  isClosed: false,
};


export const uiReducer = createReducer(
  initialState,
  on(ui.openSeidebar, state => ({ ...state, isClosed: true })),
  on(ui.closeSidebar, state => ({ ...state, isClosed: false })),
);
