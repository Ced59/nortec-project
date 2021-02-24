import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import UsersAPI from "../../services/UsersAPI";
import Button from "../forms/Button";

const ChangeUserStatusModal = ({ user, fetchUser }) => {
  const [showStatusModal, setShowStatusModal] = useState(false);

  const handleSubmitStatus = async () => {
    const userStatus = { active: !user.active };
    try {
      await UsersAPI.update(user.id, userStatus);
      toast.success("Le rôle de l'utilisateur a bien été modifié !");
      fetchUser();
      setShowStatusModal(false);
    } catch ({ response }) {
      toast.error(
        "Une erreur est survenue pendant la modification du status de l'utilisateur !"
      );
    }
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showStatusModal}
        onHide={() => setShowStatusModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Attention!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Vous êtes sur le point
          {user.active ? "de désactiver" : "d'activer"}
          l'utilisateur {user.firstName}
          {user.lastName}! <br />
          {user.active ? (
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
            onClick={() => setShowStatusModal(false)}
          />
          <Button
            text="Confirmer"
            type="button"
            className="btn btn-danger"
            onClick={handleSubmitStatus}
          />
        </Modal.Footer>
      </Modal>
      <Button
        text={user.active ? "Désactiver" : "Activer"}
        type="button"
        onClick={() => setShowStatusModal(true)}
        className="btn btn-danger col-3"
      />
    </>
  );
};

export default ChangeUserStatusModal;
