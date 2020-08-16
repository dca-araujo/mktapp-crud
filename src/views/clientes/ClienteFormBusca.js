import React from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CFormGroup,
  CInput,
  CTextarea,
  CLabel,
  CSelect,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import * as moment from 'moment';
import Loader from "../widgets/loader";
import { Formik, Form } from 'formik';

const ClienteForm = ({collapsed, setCollapsed, refreshClienteBusca}) => {
  const [ClienteDOM, setClienteDOM] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const onChange = (atributo, valor) => {
    setClienteDOM({
      ...ClienteDOM,
      [atributo]: valor
    });
  };

  const handleSubmit = async(event) => {
    try {
      setCollapsed(!collapsed)
      setLoading(true);
      refreshClienteBusca(event);
    } catch(e) {
      console.log('Algo de errado deu certo', e);
    }
    setLoading(false);
  }

  return(
    <CRow>    
      <CCol xs="12">
      <CCard>
        <Loader loading={loading}/>
        <CCardHeader>
          Clientes
          <small> Busca</small>
            <div className="card-header-actions">
              <CButton
                color="link"
                className="card-header-action btn-minimize"
                onClick={() => setCollapsed(!collapsed)}
              >
                <CIcon name={ collapsed ? "cil-minus" : "cil-plus"} />
              </CButton>
              <CButton
                color="link"
                className="card-header-action btn-refresh"
                onClick={() => setClienteDOM({})}
              >
                <CIcon name="cil-reload" />
              </CButton>
            </div>
        </CCardHeader>
        <Formik
          initialValues={ClienteDOM}
          enableReinitialize={true}
          onSubmit={values => {
            setTimeout(() => {
              //console.log(JSON.stringify(values, null, 2));
              handleSubmit(ClienteDOM);
            }, 500);
          }} >
        {({ errors, touched }) => (
        <Form className="form-horizontal">
        <CCollapse show={collapsed} timeout={1000}>
          <CCardBody>
            <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CInput size="sm" className="input-sm" name="nome" placeholder="Nome" value={ClienteDOM.nome || ''} onChange={e=>{onChange("nome", e.target.value)}} />
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CInput size="sm" className="input-sm" name="identidade" placeholder="Doc. de Identificação" value={ClienteDOM.identidade || ''} onChange={e=>{onChange("identidade", e.target.value)}} />
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CInput size="sm" className="input-sm" type="date" name="nascimento" placeholder="date" value={moment(ClienteDOM.nascimento).utc().format('YYYY-MM-DD') || ''} onChange={e=>{onChange("nascimento", e.target.value)}} />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CInput size="sm" className="input-sm" name="email" placeholder="E-mail" value={ClienteDOM.email || ''} onChange={e=>{onChange("email", e.target.value)}} />
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CInput size="sm" className="input-sm" name="telefone" placeholder="Telefone" value={ClienteDOM.telefone || ''} onChange={e=>{onChange("telefone", e.target.value)}} />
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CSelect size="sm" className="input-sm" custom name="sexo" onChange={e=>{onChange("sexo", e.target.value)}} value={ClienteDOM.sexo || ''}>
                  <option value="">- Selecione uma opção</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </CSelect>
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="8">
              <CFormGroup>
                <CInput size="sm" className="input-sm" name="endereco" placeholder="Endereço" value={ClienteDOM.endereco || ''} onChange={e=>{onChange("endereco", e.target.value)}} />
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CInput size="sm" className="input-sm" name="cidade" placeholder="Cidade" value={ClienteDOM.cidade || ''} onChange={e=>{onChange("cidade", e.target.value)}} />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <CTextarea 
                  size="sm" className="input-sm"
                  name="historico" 
                  rows="2"
                  placeholder="Histórico" 
                  value={ClienteDOM.historico || ''}
                  onChange={e=>{onChange("historico", e.target.value)}}
                />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel col="sm" htmlFor="tarja">Remédios Tarja</CLabel>
                <CSelect size="sm" className="input-sm" custom name="tarja" onChange={e=>{onChange("tarja", e.target.value)}} value={ClienteDOM.tarja || ''}>
                  <option value="">- Selecione uma opção</option>
                  <option value="1">Sim</option>
                  <option value="0">Não</option>
                </CSelect>
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CLabel col="sm" htmlFor="filhos">Filhos</CLabel>
                <CSelect size="sm" className="input-sm" custom name="filhos" onChange={e=>{onChange("filhos", e.target.value)}} value={ClienteDOM.filhos || ''}>
                  <option value="">- Selecione uma opção</option>
                  <option value="1">Sim</option>
                  <option value="0">Não</option>
                </CSelect>
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CLabel col="sm" htmlFor="state">Estado</CLabel>
                <CSelect size="sm" className="input-sm" custom name="state" onChange={e=>{onChange("state", e.target.value)}} value={ClienteDOM.state || ''}>
                  <option value="">- Selecione uma opção</option>
                  <option value="1">Ativo</option>
                  <option value="0">Inativo</option>
                </CSelect>
              </CFormGroup>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter className="text-right">
          <CButton onClick={() => setClienteDOM({})} className="mr-3" color="secondary">Limpar</CButton>
          <CButton type="submit" color="primary">Enviar</CButton>
        </CCardFooter>
        </CCollapse>
        </Form>
        )}
        </Formik>
      </CCard>      
    </CCol>
  </CRow>    
  )
}

export default ClienteForm