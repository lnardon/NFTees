import { useState } from "react";
import Modal from "react-modal";

interface PropsInterface {
  renderProps: () => {};
}

const BaseModal: any = ({ renderProps }: PropsInterface) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      {renderProps()}
    </Modal>
  );
};

export default BaseModal;
