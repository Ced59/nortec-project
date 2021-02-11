import React, { useState } from "react";
import { toast } from "react-toastify";
import AuthAPI from "../services/AuthAPI";
import UsersAPI from "../services/UsersAPI";
import Button from "../components/forms/Button";
import Field from "../components/forms/Field";

const ProfilPage = ({ match }) => {
  const id = match.params.id;
  const [firstNameUser] = useState(AuthAPI.getUserFirstname());
  const [lastNameUser] = useState(AuthAPI.getUserLastName());
  const [mailUser] = useState(AuthAPI.getUsername());
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({
    password: "",
    passwordConfirm: "",
  });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (user.password === user.passwordConfirm) {
      try {
        await UsersAPI.update(id, user);
        toast.success("Les informations ont bien étés mises à jour");
        setEdit(false);
      } catch ({ response }) {
        toast.error(
          "Une erreur est sruvenue lors de la mises à jour des informations"
        );
        console.log(response);
      }
    } else {
      toast.error("Les mots de passe sont différents");
    }
  };

  return (
    <main className="container">
      <h3>Information du Profil :</h3>
          <div className="row">
            <div className="ml-4 mt-4">Prénom : {firstNameUser} </div>
          </div>
          <div className="row">
            <div className="ml-4 mt-4">Nom : {lastNameUser}</div>
          </div>
          <div className="row">
            <div className="ml-4 mt-4 mb-4">Mail : {mailUser} </div>
          </div>
        {edit && (
        <>
        <h3>Modification du mot de passe</h3>
          <div className="ml-4">
            <div className="row mt-1 mb-1">
              <Field
                onChange={handleChange}
                name="password"
                value={user.password}
                label="Nouveau mot de passe"
                type="password"
              />
            </div>
            <div className="row mb-1">
              <Field
                onChange={handleChange}
                name="passwordConfirm"
                value={user.passwordConfirm}
                label="Confirmer le mot de passe"
                type="password"
              />
            </div>
          </div>
        </>
      )}
      <div className="row d-flex justify-content-between">
        <Button
          text={edit ? "Annuler" : "Modifier le mot de passe"}
          className={"btn btn-" + (edit ? "danger" : "primary")}
          type="button"
          onClick={() => setEdit(!edit)}
        />
        {edit && (
          <Button
            text="Enregistrer"
            className="btn btn-success"
            type="button"
            onClick={handleSubmit}
          />
        )}
      </div>
    </main>
  );
};

export default ProfilPage;
