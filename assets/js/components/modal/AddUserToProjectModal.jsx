import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import UsersAPI from "../../services/UsersAPI";
import Pagination from "@material-ui/lab/Pagination";
import pagination_configs, {
  ADMIN_PROJECT_PAGE_PAGINATION_ITEMS_PER_PAGE,
} from "../configs/pagination_configs";
import Button from "../forms/Button";

const AddUserToProjectModal = ({ id, users, handleSubmit, project, setProject }) => {
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [currentPageAddUser, setCurrentPageAddUser] = useState(1);

  const usersNotInProject = users.filter(
    (User) => User.project.indexOf("/api/projects/" + id) === -1
  );
  const paginationConfigAddUser = pagination_configs.determinePaginationConfig(
    usersNotInProject,
    ADMIN_PROJECT_PAGE_PAGINATION_ITEMS_PER_PAGE,
    currentPageAddUser
  );

  //   --------------------------------------------------FUNCTION-------------------------------------------

  const handleShowUsersModal = () => {
    setShowUsersModal(!showUsersModal);
  };

  const handleChangePageAddUser = (page) => {
    setCurrentPageAddUser(page);
  };

  const handleAddUser = (user) => {
    const updatedUsers = [...project.users];
    updatedUsers.push(user);
    setProject({ ...project, users: updatedUsers });
  };

  return (
    //   -----------------------------------------------TEMPLATE-----------------------------------------------
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showUsersModal}
        onHide={handleShowUsersModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Liste des utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {paginationConfigAddUser.paginatedItems.filter(
              (User) => UsersAPI.determineRole(User) == "Administrateur"
            ).length !== 0 && (
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th colSpan="3" className="text-center border-0">
                      Administrateurs
                    </th>
                  </tr>
                  <tr>
                    <th className="border-0">Prénom</th>
                    <th className="border-0">Nom</th>
                  </tr>
                </thead>
                <tbody>
                  {paginationConfigAddUser.paginatedItems
                    .filter(
                      (User) => UsersAPI.determineRole(User) == "Administrateur"
                    )
                    .map((user) => (
                      <tr key={user.id}>
                        <td className="w-35">{user.firstName}</td>
                        <td className="w-35">{user.lastName}</td>
                        <td className="text-center">
                          <Button
                              type="button"

                            className="btn btn-primary btn-sm"
                            onClick={() => handleAddUser(user)}
                          >
                            Ajouter
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            {paginationConfigAddUser.paginatedItems.filter(
              (User) => UsersAPI.determineRole(User) == "Utilisateur"
            ).length !== 0 && (
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th colSpan="3" className="text-center border-0">
                      Utilisateurs
                    </th>
                  </tr>
                  <tr>
                    <th className="border-0">Prénom</th>
                    <th className="border-0">Nom</th>
                  </tr>
                </thead>
                <tbody>
                  {paginationConfigAddUser.paginatedItems
                    .filter(
                      (User) => UsersAPI.determineRole(User) == "Utilisateur"
                    )
                    .map((user) => (
                      <tr key={user.id}>
                        <td className="w-35">{user.firstName}</td>
                        <td className="w-35">{user.lastName}</td>
                        <td className="text-center">
                          <Button
                              type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => handleAddUser(user)}
                              text="Ajouter"
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            <div className="mt-2 d-flex justify-content-center">
              <Pagination
                count={paginationConfigAddUser.pagesCount}
                color="primary"
                page={currentPageAddUser}
                onChange={handleChangePageAddUser}
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Button
          text="Ajouter des utilisateurs"
        type="button"
        onClick={() => handleShowUsersModal()}
        className="btn btn-primary btn-sm mb-4"
      />
    </>
  );
};

export default AddUserToProjectModal;
