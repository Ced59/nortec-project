import React, { useEffect, useState } from "react";
import "../../../css/navbarLeft.css";
import { NavLink } from "react-router-dom";
import fakeData from "../fakeDataForDev/fakeData";
import ProjectsAPI from "../../services/ProjectsAPI";

// TODO changer la class selected en fonction du clic

const NavbarLeft = ({ match, selected }) => {
  const id = match.params;

  return (
    <div className="vertical-nav" id="sidebar">
      <ul className="nav flex-column mb-0">
        <li className="nav-item mb-3">
          <NavLink
            to={"/project/" + id.id + "/listReports"}
            className={"nav-link font-italic"}
          >
            &larr; Retour à la liste des rapports
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={"/project/" + id.id + "/" + id.idReport + "/effectifs"}
            className={
              "nav-link font-italic" + (selected === "effectifs" && " selected")
            }
          >
            Effectifs
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={"/project/" + id.id + "/" + id.idReport + "/securite"}
            className={
              "nav-link font-italic" + (selected === "securite" && " selected")
            }
          >
            Sécurité
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={"/project/" + id.id + "/" + id.idReport + "/propreteacces"}
            className={
              "nav-link font-italic" + (selected === "proprete" && " selected")
            }
          >
            Propreté des Accès
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={
              "/project/" +
              id.id +
              "/" +
              id.idReport +
              "/propretepartiescommunes"
            }
            className={
              "nav-link font-italic" +
              (selected === "propetepartiecommune" && " selected")
            }
          >
            Propreté des parties communes
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={"/project/" + id.id + "/" + id.idReport + "/echeances"}
            className={
              "nav-link font-italic" + (selected === "echeances" && " selected")
            }
          >
            Echéances
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to={"/project/" + id.id + "/" + id.idReport + "/validate"}
            className={
              "nav-link font-italic" + (selected === "validate" && " selected")
            }
          >
            Validation et Envoi
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavbarLeft;
