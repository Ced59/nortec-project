import React from 'react';
import ImgWithStyleComponent from "./ImgWithStyleComponent";

const LogoCompanyComponent = ({style}) => {
    return (
        <ImgWithStyleComponent src="../img/logo-company/logo-company.png"
                               alt="Logo Deadlines"
                               className="text-left img-fluid"
                               style={style}
        />
    );
};

export default LogoCompanyComponent;
