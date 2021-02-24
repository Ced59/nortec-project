import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import UsersAPI from "../../services/UsersAPI";
import Button from "../forms/Button";

const ChangeUserRoleModal = ({ user, fetchUser }) => {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [role, setRole] = useState("ROLE_USER");

  const handleSubmitRole = async () => {
    const userRole = { roles: [role] };
    try {
      await UsersAPI.update(user.id, userRole);
      toast.success("Le rôle de l'utilisateur a bien été modifié !");
      fetchUser();
      setShowRoleModal(false);
    } catch ({ response }) {
      toast.error(
        "Une erreur est survenue pendant la modification du rôle de l'utilisateur !"
      );
    }
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showRoleModal}
        onHide={() => setShowRoleModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Attention !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Vous êtes sur le point de changer le rôle de l'utilisateur
          {user.firstName} {user.lastName}! <br />
          Êtes vous sûr de vouloir continuer? <br />
          <br />
          Nouveau rôle :
          <select onChange={(e) => setRole(e.currentTarget.value)}>
            <option value="ROLE_USER">Utilisateur</option>
            <option value="ROLE_ADMIN">Administrateur</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-primary"
            text="Fermer"
            type="button"
            onClick={() => setShowRoleModal(false)}
          />
          <Button
            type="button"
            className="btn btn-danger"
            text="Confirmer"
            onClick={handleSubmitRole}
          />
        </Modal.Footer>
      </Modal>
      <Button
        type="button"
        text="Changer"
        onClick={() => setShowRoleModal(true)}
        className="btn btn-danger col-3"
      />
    </>
  );
};

export default ChangeUserRoleModal;
