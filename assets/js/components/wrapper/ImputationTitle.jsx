import React from "react";

const ImputationTitle = ({title,children}) => {
  return (
    <div className="row ml-2 mt-4 d-flex justify-content-between mb-3">
      <h2 className="mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default ImputationTitle
