import { Modal } from "@material-ui/core";
import { useState } from "react";
import CustomModalBody from "./CustomModalBody";
import "./CustomModal.scss";

interface ICustomModal {
  type: "success" | "error";
  message: string;
}

const CustomModal: React.FC<ICustomModal> = ({ type, message }) => {
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
      <CustomModalBody
        setModalOpen={setModalOpen}
        type={type}
        message={message}
      />
    </Modal>
  );
};

export default CustomModal;
