import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button variation="primary" size="medium">Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       <Button
//         variation="primary"
//         size="medium"
//         onClick={() => setShowModal(!showModal)}
//       >
//         Add new cabins
//       </Button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <CreateCabinForm onClose={() => setShowModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

export default AddCabin;
