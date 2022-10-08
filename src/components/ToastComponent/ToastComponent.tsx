import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

type Props = {
  variant: string;
  message: string;
  show: boolean;
  setShow: Function;
  headerMessage: string;
};

const ToastComponent = (props: Props): JSX.Element => {
  const { variant, message, show, setShow, headerMessage } = props;

  return (
    <ToastContainer position="top-end">
      <Toast
        className="d-inline-block m-1"
        bg={variant.toLowerCase()}
        animation={true}
        show={show}
        autohide={true}
        onClose={() => setShow(false)}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{headerMessage}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastComponent;
