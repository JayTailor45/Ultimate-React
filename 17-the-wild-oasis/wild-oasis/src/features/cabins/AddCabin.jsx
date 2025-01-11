import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        variation="primary"
        size="medium"
        onClick={() => setShowModal(!showModal)}
      >
        Add new cabins
      </Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateCabinForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
