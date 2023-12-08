
import Modal from 'react-modal';
import RequestCallback from "./RequestCallback";

function CallbackModel({ show, onHide }) {
  return (
    <Modal
      isOpen={show}
      onRequestClose={onHide}
      style={{
        overlay: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
        },
        content: {
          backgroundColor: "transparent",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          inset: 'auto'
        }
      }}
      ariaHideApp={false}
      contentLabel="Example Modal"
    >
      <RequestCallback />
    </Modal>
  );
}

export default CallbackModel;