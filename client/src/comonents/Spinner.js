import { Spinner, ToastContainer } from "react-bootstrap";

function MenuSpinner() {
  return (
    <ToastContainer className="p-3" position={"middle-center"}>
      <Spinner
        animation="border"
        variant="primary"
        className="justify-content-md-center"
      />
    </ToastContainer>
  );
}
export default MenuSpinner;
