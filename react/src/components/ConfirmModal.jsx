import React from "react";

export default function ConfirmModal({ onConfirm, onCancel, message }) {
  return (
    <div>
      <h3>Törlés megerősítés</h3>
      <p>{message}</p>
      <button onClick={onConfirm}>Törlés</button>
      <button onClick={onCancel}>Mégse</button>
    </div>
  );
}
