import { Form } from "react-bootstrap";

function FormElement(props) {
  const { label, value, type, name, placeholder, onChange, errorMessage } =
    props;
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        value={value}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        isInvalid={errorMessage ? true : false}
      />
      <Form.Control.Feedback type="invalid">
        {errorMessage ? errorMessage : ""}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export default FormElement;
