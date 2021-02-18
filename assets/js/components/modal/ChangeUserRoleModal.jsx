import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../forms/Button";

const ChangeUserRoleModal = ({
  showModalRole,
  handleCloseModalRole,
  handleChangeRole,
  userToModifyRole,
  handleChangeRoleSelect,
}) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModalRole}
      onHide={handleCloseModalRole}
    >
      <Modal.Header closeButton>
        <Modal.Title>Attention !</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleChangeRole}>
        <Modal.Body>
          Vous êtes sur le point de changer le rôle de l'utilisateur{" "}
          {userToModifyRole.firstName} {userToModifyRole.lastName}! <br />
          Êtes vous sûr de vouloir continuer? <br />
          <br />
          Nouveau rôle :
          <select name="role" id="role" onChange={handleChangeRoleSelect}>
            <option value="ROLE_USER">Utilisateur</option>
            <option value="ROLE_ADMIN">Administrateur</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-primary"
            text="Fermer"
            type="button"
            onClick={handleCloseModalRole}
          />
          <Button className="btn btn-danger" text="Confirmer" />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ChangeUserRoleModal;
