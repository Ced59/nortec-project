import React from 'react';
import ImgWithStyleComponent from "./ImgWithStyleComponent";

const LogoCompanyComponent = ({style}) => {
    return (
        <ImgWithStyleComponent src="../img/logo-company/logo-nortec.png"
                               alt="Logo Nortec"
                               className="text-left img-fluid"
                               style={style}
        />
    );
};

export default LogoCompanyComponent;