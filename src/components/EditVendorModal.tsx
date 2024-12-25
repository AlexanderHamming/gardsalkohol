import { Modal, Button } from "react-bootstrap";
import VendorForm from "./VendorForm";
import { VendorFormValues } from "@/types/vendors";

interface EditVendorModalProps {
  show: boolean;
  onHide: () => void;
  vendorData: VendorFormValues;
  onSubmit: (data: VendorFormValues) => void;
}

const EditVendorModal: React.FC<EditVendorModalProps> = ({
  show,
  onHide,
  vendorData,
  onSubmit,
}) => {

  const handleFormSubmit = (updatedData: VendorFormValues) => {
    onSubmit(updatedData);
    onHide()
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Redigera Profil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <VendorForm
          initialValues={vendorData}
          onSubmit={handleFormSubmit}
          title="Redigera dina uppgifter"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Stäng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditVendorModal;
