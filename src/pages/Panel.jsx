import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import './css/Panel.css';
import Pacientes from './panel/pacientes/Pacientes';
import AddPaciente from './panel/pacientes/AddPaciente';
import EditPaciente from './panel/pacientes/EditPaciente';
import Usuarios from './panel/clinica/Usuarios';
import AddUsuario from './panel/clinica/AddUsuario';
import EditUsuario from './panel/clinica/EditUsuario';
import Servicios from './panel/clinica/Servicios';
import AddServicio from './panel/clinica/AddServicio';
import EditServicio from './panel/clinica/EditServicio';
import Medicamentos from './panel/clinica/Medicamentos';
import AddMedicamento from './panel/clinica/AddMedicamento';
import EditMedicamento from './panel/clinica/EditMedicamento';
import RegistroConsulta from './panel/registroconsulta/RegistroConsulta';
import AddRegistroConsulta from './panel/registroconsulta/AddRegistroConsulta';
import Atencion from './panel/atencion/Atencion';
import AddAtencion from './panel/atencion/AddAtencion';
import Historias from './panel/historias/Historias';
import ViewHistorias from './panel/historias/ViewHistoria';
import EditHistoria from './panel/historias/EditHistoria';
import { Layout, Menu } from 'antd';
import {  TeamOutlined, LogoutOutlined, MedicineBoxOutlined, SettingOutlined, SnippetsOutlined } from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Panel extends React.Component {
    cerrarSesion() {
        localStorage.removeItem("id")
        alert("Se cerro su sesión")
        window.location.href = "/";
    }

    render() {
        if (localStorage.getItem("id") === "20211997") {
            return (
                <BrowserRouter>
                    <Layout>
                        <Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={broken => { console.log(broken); }} onCollapse={(collapsed, type) => { console.log(collapsed, type); }}>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                                <Menu.Item key="2" href="/panel/pacientes" icon={<TeamOutlined />}>
                                    <Link to="/panel/pacientes">
                                        Pacientes
                                    </Link>
                                </Menu.Item>
                                <SubMenu key="3" icon={<SettingOutlined />} title="Clínica">
                                    <Menu.Item key="5">
                                        <Link to="/panel/clinica/servicios">Servicios</Link>
                                    </Menu.Item>
                                    <Menu.Item key="6">
                                        <Link to="/panel/clinica/personal">Personal</Link>
                                    </Menu.Item>
                                    <Menu.Item key="7">
                                        <Link to="/panel/clinica/medicamentos">Medicamentos</Link>
                                    </Menu.Item>
                                </SubMenu>
                                <Menu.Item key="8" icon={<MedicineBoxOutlined />}>
                                    <Link to="/panel/registro-consulta">
                                        Registro de consulta
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="9" icon={<MedicineBoxOutlined />}>
                                    <Link to="/panel/atencion">
                                        Atención de pacientes
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="10" icon={<SnippetsOutlined />}>
                                    <Link to="/panel/historias">
                                        Historias
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="11" onClick={this.cerrarSesion} icon={<LogoutOutlined />}>
                                    Salir
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                            <Content style={{ margin: '24px 16px 0' }}>
                                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                    <div className="container-fluid overflow-y">
                                        <Switch>
                                            <Route exact path="/panel/pacientes" component={Pacientes} />
                                            <Route exact path="/panel/pacientes/add" component={AddPaciente} />
                                            <Route exact path="/panel/pacientes/edit/:id" component={EditPaciente} />
                                            <Route exact path="/panel/clinica/personal" component={Usuarios} />
                                            <Route exact path="/panel/clinica/personal/add" component={AddUsuario} />
                                            <Route exact path="/panel/clinica/personal/edit/:id" component={EditUsuario} />
                                            <Route exact path="/panel/clinica/servicios" component={Servicios} />
                                            <Route exact path="/panel/clinica/servicios/add" component={AddServicio} />
                                            <Route exact path="/panel/clinica/servicios/edit/:id" component={EditServicio} />
                                            <Route exact path="/panel/clinica/medicamentos" component={Medicamentos} />
                                            <Route exact path="/panel/clinica/medicamentos/add" component={AddMedicamento} />
                                            <Route exact path="/panel/clinica/medicamentos/edit/:id" component={EditMedicamento} />
                                            <Route exact path="/panel/registro-consulta/" component={RegistroConsulta} />
                                            <Route exact path="/panel/registro-consulta/add" component={AddRegistroConsulta} />
                                            <Route exact path="/panel/atencion/" component={Atencion} />
                                            <Route exact path="/panel/atencion/add/:id" component={AddAtencion} />
                                            <Route exact path="/panel/historias" component={Historias} />
                                            <Route exact path="/panel/historias/:id" component={ViewHistorias} />
                                            <Route exact path="/panel/historias/edit/:id" component={EditHistoria} />
                                        </Switch>
                                    </div>
                                </div>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>Neuro Medicall ©2021 Desarrollado por Oscar Pereda</Footer>
                        </Layout>
                    </Layout>
                </BrowserRouter>
            );
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>Usted no está autorizado a ingresar. Por favor inicie sesión.</h2>
                            <br />
                            <Link to="/" className="btn btn-primary">Iniciar sesión</Link>
                        </div>
                    </div>
                </div>
            )
        }

    }
};

export default Panel;