import ReactDOM from 'react-dom';

import ModalOverlay from './Modal/MSearchModal';

const MSearchModal = () => {
  return <>{ReactDOM.createPortal(<ModalOverlay />, document.getElementById('overlay-root') as HTMLInputElement)}</>;
};

export default MSearchModal;
