/* eslint-disable react-refresh/only-export-components */
import { Box, Modal } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";

const ModalContainer = () => {
  const {
    modalStore: { modal, closeModal },
  } = useStore();

  return (
    <Modal open={modal.open} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "75%",
          borderRadius: "0.5rem",
          bgcolor: "white",
          boxShadow: 24,
          padding: "2rem",
        }}
      >
        {modal.body || <div></div>}
      </Box>
    </Modal>
  );
};

export default observer(ModalContainer);
