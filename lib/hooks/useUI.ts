import useStore from '../store';

export const useUI = () => {
  const setModalView = useStore((state) => state.setModalView);
  const toggleViewingModal = useStore((state) => state.toggleViewingModal);
  const toggleViewingSidebar = useStore((state) => state.toggleViewingSidebar);
  const viewingModal = useStore((state) => state.viewingModal);
  const viewingSidebar = useStore((state) => state.viewingSidebar);
  const modalView = useStore((state) => state.modalView);

  return {
    setModalView,
    toggleViewingModal,
    toggleViewingSidebar,
    modalView,
    viewingModal,
    viewingSidebar,
  };
};
