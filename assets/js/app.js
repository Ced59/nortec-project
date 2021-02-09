import React, {useState} from 'react';
import ReactDOM from "react-dom";
import {HashRouter, Route, Switch, withRouter} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./contexts/AuthContext";
import AuthAPI from "./services/AuthAPI"
import {toast, ToastContainer} from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import NavbarTop from "./components/navbars/NavbarTop";
import LoginPage from "./pages/LoginPage";
import ListProjectsPage from "./pages/ListProjectsPage";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/app.css';
import DetailProjectPage from "./pages/DetailProjectPage";
import ReportEffectifsPage from "./pages/ReportEffectifsPage";
import ReportPropreteAccesPage from "./pages/ReportPropreteAccesPage";
import ReportSecuritePage from "./pages/ReportSecuritePage";
import ReportPropretePartiesCommunesPage from "./pages/ReportPropretePartiesCommunesPage";
import ReportEcheancesPage from "./pages/ReportEcheancesPage";
import ListReportsByProject from "./pages/ListReportsByProject";
import ReportValidatePage from "./pages/ReportValidatePage";
import ProfilPage from "./pages/ProfilPage";
import AdminProjectsPage from "./pages/AdminProjectsPage";
import AdminPage from "./pages/AdminPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminUserPage from './pages/AdminUserPage';
import AdminProjectPage from './pages/AdminProjectPage';
import 'fontsource-roboto';
import AdminCompaniesPage from './pages/AdminCompaniesPage';
import AdminCompanyPage from './pages/AdminCompanyPage';
import ShowReport from './pages/ShowReport';
import ResetPasswordPage from './pages/ResetPasswordPage';
import NewPasswordPage from './pages/NewPasswordPage';
import NotFoundPage from './pages/NotFoundPage';


AuthAPI.setup();


const App = () => {

    const NavbarTopWithRouter = withRouter(NavbarTop);

    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

    return (

        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>


                <HashRouter>

                        {isAuthenticated && <NavbarTopWithRouter/>}


                    <Switch>
                        {!isAuthenticated && <Route exact path="/reinitialisation/:id" component={NewPasswordPage}/>}
                        {!isAuthenticated && <Route exact path="/reinitialisation" component={ResetPasswordPage}/>}
                        {!isAuthenticated && <Route exact path="/" component={LoginPage}/>}
                        <PrivateRoute exact path="/profil/:id" component={ProfilPage}/>
                        <PrivateRoute exact path="/project/:id/:idReport/effectifs" component={ReportEffectifsPage}/>
                        <PrivateRoute exact path="/project/:id/:idReport/propreteacces" component={ReportPropreteAccesPage}/>
                        <PrivateRoute exact path="/project/:id/:idReport/securite" component={ReportSecuritePage}/>
                        <PrivateRoute exact path="/project/:id/:idReport/propretepartiescommunes"
                                      component={ReportPropretePartiesCommunesPage}/>
                        <PrivateRoute exact path="/project/:id/:idReport/echeances" component={ReportEcheancesPage}/>
                        <PrivateRoute exact path="/project/:id/:idReport/validate" component={ReportValidatePage}/>

                        <PrivateRoute exact path="/project/:id/listReports" component={ListReportsByProject}/>
                        <PrivateRoute exact path="/project/:id" component={DetailProjectPage}/>

                        <PrivateRoute exact path="/admin/userslist" component={AdminUsersPage}/>
                        <PrivateRoute exact path="/admin/user/:id" component={AdminUserPage}/>
                        <PrivateRoute exact path="/admin/project/:id" component={AdminProjectPage}/>
                        <PrivateRoute exact path="/admin/project" component={AdminProjectsPage}/>
                        <PrivateRoute exact path="/admin/company/:id" component={AdminCompanyPage}/>
                        <PrivateRoute exact path="/admin/company" component={AdminCompaniesPage}/>
                        <PrivateRoute exact path="/admin/:id" component={AdminPage}/>
                        <PrivateRoute exact path="/showReport/:id" component={ShowReport}/>
                        <PrivateRoute exact path={["/projects","/"]} component={ListProjectsPage}/>
                        <Route component={NotFoundPage}/>

                    </Switch>

                </HashRouter>

                < ToastContainer
                    position={toast.POSITION.BOTTOM_LEFT}
                />

        </AuthContext.Provider>

    );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement);







