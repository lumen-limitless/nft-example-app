'use client';
import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

export type UIViewController = 'none' | 'connect';

interface UISlice {
  viewingModal: boolean;
  viewingSidebar: boolean;
  modalView: UIViewController;
  toggleViewingModal: (isViewing?: boolean) => void;
  toggleViewingSidebar: (isViewing?: boolean) => void;
  setModalView: (view: UIViewController) => void;
}

const initialState: {
  viewingModal: boolean;
  viewingSidebar: boolean;
  modalView: UIViewController;
} = {
  viewingModal: false,
  viewingSidebar: false,
  modalView: 'none',
};

const createUISlice: StateCreator<
  UISlice,
  [['zustand/devtools', unknown]],
  []
> = (set) => ({
  ...initialState,
  toggleViewingSidebar: (isViewing) =>
    set((state) => ({
      viewingSidebar:
        isViewing === undefined ? !state.viewingSidebar : isViewing,
    })),
  toggleViewingModal: (isViewing) =>
    set((state) => ({
      viewingModal: isViewing === undefined ? !state.viewingModal : isViewing,
    })),
  setModalView: (view) =>
    set({
      modalView: view,
      viewingModal: view !== 'none' ? true : false,
    }),
});

interface RootSlice extends UISlice {}

const useStore = create<RootSlice>()(
  devtools((...a) => ({
    ...createUISlice(...a),
  })),
);

export default useStore;
