import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

const portalEl = document.getElementById("overlays");

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const Modal = (props) => {
  return (
    <>
      {createPortal(<Backdrop onClose={props.onClose} />, portalEl)}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalEl)}
    </>
  );
};

export default Modal;
