import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import Loader from "../../widgets/loader";
import CFormAlert from "../../widgets/alerts"
import api from '../../../services/api'
import { login, isAuthenticated } from "../../../services/auth";

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [alert, setAlert] = React.useState({show: false, estado: '', mensagem: ''})
  const [user, setUser] = React.useState({ username:'', password:'' });
  const onChange = (atributo, valor) => {
    setUser({
      ...user,
      [atributo]: valor
    });
  };

  const handleSubmit = async() => {
    if (!user.username || !user.password) {
      setAlert({show: true, estado: 'warning', mensagem: 'Informe um login e senha para prosseguir!'});
    } else {
      try {
        setLoading(true);
        const response = await api.post('auth', user);
        response.data.error === true ? setAlert({show: true, estado: 'warning', mensagem: response.data.msg}) : login(response.data.token);
      } catch(e) {
        setAlert({show: true, estado: 'warning', mensagem: 'Houve um problema com o login, verifique suas credenciais.'});
        console.error(e);
      }      
    }

    isAuthenticated() ? setRedirect(true) : setLoading(false);
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      {redirect ? <Redirect to='/dashboard' /> : ''}
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <Loader loading={loading}/>
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Entre na sua conta</p>
                    <CFormAlert custom={alert} />
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" onChange={e=>{onChange("username", e.target.value)}} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={e=>{onChange("password", e.target.value)}} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={() => handleSubmit()}>Enviar</CButton>
                      </CCol>                      
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-dark py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Cadastre-se</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="light" className="mt-3" active tabIndex={-1}>Novo cadastro</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
