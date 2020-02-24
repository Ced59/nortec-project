import React from 'react';
import ImgComponent from "./ImgComponent";

const LogoCompanyComponent = ({style}) => {
    return (
        <ImgComponent src="../img/logo-company/logo-nortec.png"
                      alt="Logo Nortec"
                      className="text-left img-fluid"
                      style={style}
        />
    );
};

export default LogoCompanyComponent;