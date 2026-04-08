import React from "react";
import "../../Styles/Utils/ConfirmWindow.css";

function ConfirmWindow({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-window-container">
      <div className="confirm-window">
        <p>{message}</p>
        <div className="confirm-window-buttons">
          <button className="confirm-cancel-button" onClick={onCancel}>
            Cancelar
          </button>
          <button className="confirm-delete-button" onClick={onConfirm}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmWindow;
