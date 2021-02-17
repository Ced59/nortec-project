import React from "react";
import UsersAPI from "../services/UsersAPI";
import Button from "./forms/Button";

const UsersChoiceTable = ({
  pagination,
  role,
  btnText,
  btnColorClass,
  handleUser,
}) => {

  return (
    <>
      {pagination.filter((User) => UsersAPI.determineRole(User) == role)
        .length !== 0 && (
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th colSpan="3" className="text-center border-0">
                {role}s
              </th>
            </tr>
            <tr>
              <th className="border-0">Prénom</th>
              <th className="border-0">Nom</th>
            </tr>
          </thead>
          <tbody>
            {pagination
              .filter((User) => UsersAPI.determineRole(User) == role)
              .map((user) => (
                <tr key={user.id}>
                  <td className="w-35">{user.firstName}</td>
                  <td className="w-35">{user.lastName}</td>
                  <td className="text-center">
                    <Button
                      type="button"
                      text={btnText}
                      className={"btn btn-" +  btnColorClass  + " btn-sm"}
                      onClick={(e) => handleUser(e,user)}
                      test={btnText}
                      // disabled={true}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UsersChoiceTable;
