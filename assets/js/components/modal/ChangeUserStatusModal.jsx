import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../forms/Button";

const ChangeUserStatusModal = ({
  showModal,
  handleCloseModal,
  userToModifyActive,
  handleActiveUser,
}) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal}
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Attention!!!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Vous êtes sur le point
        {userToModifyActive.active ? "de désactiver" : "d'activer"}
        l'utilisateur {userToModifyActive.firstName}
        {userToModifyActive.lastName}! <br />
        {userToModifyActive.active ? (
          <>
            Tous les projets auquel il est affecté seront supprimé et vous
            devrez les réattribuer plus tard si vous réactivez le compte.
            <br />
          </>
        ) : (
          <>
            Il vous faudra réassigner manuellement les projets auxquels
            l'utilisateur pourra avoir accès. <br />
          </>
        )}
        Êtes vous sûr de vouloir continuer?
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          text="Fermer"
          className="btn btn-primary"
          onClick={handleCloseModal}
        />
        <Button
          text="Confirmer"
          type="button"
          className="btn btn-danger"
          onClick={handleActiveUser}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeUserStatusModal;
