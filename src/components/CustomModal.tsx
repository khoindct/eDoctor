import { Modal } from "@material-ui/core";
import { useState } from "react";
import CustomModalBody from "./CustomModalBody";
import "./CustomModal.scss";

const CustomModal: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(true);
  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className="custom-modal"
    >
      <CustomModalBody setModalOpen={setModalOpen} />
    </Modal>
  );
};

export default CustomModal;
