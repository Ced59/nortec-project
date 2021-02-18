import React from "react";

const DivRowTitle = ({ title, children }) => {
  return (
    <div className="row no-space">
      <h6 className="offset-sm-1 col-4">{title}</h6>
      {children}
    </div>
  );
};

export default DivRowTitle;
