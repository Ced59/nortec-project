import React, { useEffect, useState } from "react";
import UsersAPI from "../services/UsersAPI";
import SearchInput from "../components/forms/SearchInput";
import UsersChoiceTable from "../components/UsersChoiceTable";
import pagination_configs, {
  ADMIN_PROJECT_PAGE_PAGINATION_ITEMS_PER_PAGE,
} from "../components/configs/pagination_configs";
import Pagination from "@material-ui/lab/Pagination";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import useIsMountedRef from "./UseIsMountedRef";

const UsersInProjectSection = ({ id, edit }) => {
  const isMountedReF = useIsMountedRef();
  const [users, setUsers] = useState([]);
  const [currentPageAddUser, setCurrentPageAddUser] = useState(1);
  const [currentPageRemUser, setCurrentPageRemUser] = useState(1);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const fetchUsers = async () => {
    try {
      const data = await UsersAPI.findAll();
      isMountedReF.current && setUsers(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    // mounted = true;
    fetchUsers();
    // return () => (mounted = false);
  }, []);

  // ------------------------------------------------------------ Mise en place de la pagination ------------------------------------------

  const handleChangePageAddUser = (event, page) => {
    setCurrentPageAddUser(page);
  };

  const handleChangePageRemUser = (event, page) => {
    setCurrentPageRemUser(page);
  };

  const filteredUsers = users.filter(
    (p) =>
      p.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      p.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
      p.email.includes(searchValue.toLowerCase())
  );

  const usersInProject = filteredUsers.filter(
    (user) => user.project.indexOf("/api/projects/" + id) !== -1
  );
  const paginationConfigRemUser = pagination_configs.determinePaginationConfig(
    usersInProject,
    ADMIN_PROJECT_PAGE_PAGINATION_ITEMS_PER_PAGE,
    currentPageRemUser
  );

  const usersNotInProject = filteredUsers.filter(
    (User) => User.project.indexOf("/api/projects/" + id) === -1
  );
  const paginationConfigAddUser = pagination_configs.determinePaginationConfig(
    usersNotInProject,
    ADMIN_PROJECT_PAGE_PAGINATION_ITEMS_PER_PAGE,
    currentPageAddUser
  );

  // -----------------------------------------------------------------------GESTION SUBMIT----------------------------------------------

  const handleSubmitUser = async (e, user) => {
    const btn = e.currentTarget;
    btn.disabled = true;
    const updatedProjects = [...user.project];

    // BTN RETIRER
    if (btn.classList.contains("btn-danger")) {
      const index = updatedProjects.findIndex(
        (project) => project === "/api/projects/" + id
      );
      updatedProjects.splice(index, 1);

      // BTN AJOUTER
    } else if (btn.classList.contains("btn-primary")) {
      updatedProjects.push("/api/projects/" + id);
    }

    const userProjects = { project: updatedProjects };
    try {
      await UsersAPI.update(user.id, userProjects);
      toast.success("Utilisateurs du project mis à jour");
      fetchUsers();
    } catch (e) {
      btn.disabled = false;
      toast.error("Une erreur est survenue, reessayez plus tard");
      console.log(e);
      console.log(e.response);
    }
  };

  //   ------------------------------------------------------------------TEMPLATE----------------------------------------------------------
  return (
    <>
      <fieldset className="border-fieldset col-xl-5 col-12">
        <legend>Choix des utilisateurs</legend>
        {edit ? (
          <div>
            <button
              type="button"
              onClick={() => setShowUsersModal(true)}
              className="btn btn-primary btn-sm mb-4"
            >
              Ajouter des utilisateurs
            </button>
            <SearchInput
              formClassName="form-inline"
              InputClassName="form-control ml-auto"
              placeholder="Rechercher un utilisateur"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
            <UsersChoiceTable
              pagination={paginationConfigRemUser.paginatedItems}
              role="Administrateur"
              btnText="Retirer"
              btnColorClass="danger"
              handleUser={handleSubmitUser}
            />
            <UsersChoiceTable
              pagination={paginationConfigRemUser.paginatedItems}
              role="Utilisateur"
              btnText="Retirer"
              btnColorClass="danger"
              handleUser={handleSubmitUser}
            />
            <div className="mt-2 d-flex justify-content-center">
              <Pagination
                count={paginationConfigRemUser.pagesCount}
                color="primary"
                page={currentPageRemUser}
                onChange={handleChangePageRemUser}
              />
            </div>
          </div>
        ) : (
          <div>
            Veuillez créer votre projet avant de faire la modification des
            utilisateurs
          </div>
        )}
      </fieldset>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showUsersModal}
        onHide={() => setShowUsersModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Liste des utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SearchInput
            formClassName="form-inline"
            InputClassName="form-control ml-auto"
            placeholder="Rechercher un utilisateur"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <UsersChoiceTable
            pagination={paginationConfigAddUser.paginatedItems}
            role="Administrateur"
            btnText="Ajouter"
            btnColorClass="primary"
            handleUser={handleSubmitUser}
          />
          <UsersChoiceTable
            pagination={paginationConfigAddUser.paginatedItems}
            role="Utilisateur"
            btnText="Ajouter"
            btnColorClass="primary"
            handleUser={handleSubmitUser}
          />
          <div className="mt-2 d-flex justify-content-center">
            <Pagination
              count={paginationConfigAddUser.pagesCount}
              color="primary"
              page={currentPageAddUser}
              onChange={handleChangePageAddUser}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UsersInProjectSection;
