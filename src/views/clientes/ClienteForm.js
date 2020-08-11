import React from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CForm,
  CFormGroup,
  CInput,
  CTextarea,
  CLabel,
  CSelect,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import api from '../../services/api'
import * as moment from 'moment';
import Loader from "../widgets/loader";
import CFormAlert from "../widgets/alerts"


const ClienteForm = ({collapsed, setCollapsed, cliente, refreshClienteTable}) => {
  const [ClienteDOM, setClienteDOM] = React.useState(cliente)
  const [loading, setLoading] = React.useState(false)
  const [alert, setAlert] = React.useState({show: false, estado: '', mensagem: ''})
  const onChange = (atributo, valor) => {
    setClienteDOM({
      ...ClienteDOM,
      [atributo]: valor
    });
  };

  React.useEffect(() => {
    setClienteDOM(cliente);
  }, [cliente]);

  const handleSubmit = async(event) => {
    try {
      setCollapsed(!collapsed)
      setLoading(true);
      event._id ? await api.put(`cliente/${event._id}`, event) : await api.post('cliente', event);
      setAlert({show: true, estado: 'success', mensagem: 'Operação realizada com sucesso'})      
      refreshClienteTable()
    } catch(e) {
      setAlert({show: true, estado: 'warning', mensagem: 'Algo de errado deu certo'})
      console.log('Algo de errado deu certo', e);
    }

    setLoading(false);
  }

  return(
    <CRow>
    <CCol xs="12">
      <CFormAlert custom={alert} />
      <CCard>
        <Loader loading={loading}/>
        <CCardHeader>
          Clientes
          <small> Gerenciamento</small>
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
        <CCollapse show={collapsed} timeout={1000}>
          <CCardBody>
          <CForm className="form-horizontal">      
            <p>Dados pessoais</p>
            <hr></hr>
            <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="nome">Nome</CLabel>
                <CInput id="nome" placeholder="Nome" required value={ClienteDOM.nome || ''} onChange={e=>{onChange("nome", e.target.value)}} />
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="doc">Doc. de Identificação</CLabel>
                <CInput id="doc" placeholder="Doc. de Identificação" required value={ClienteDOM.identidade || ''} onChange={e=>{onChange("identidade", e.target.value)}} />
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="date-input">Aniversário</CLabel>
                <CInput type="date" id="date-input" name="date-input" placeholder="date" value={moment(ClienteDOM.nascimento).utc().format('YYYY-MM-DD') || ''} onChange={e=>{onChange("nascimento", e.target.value)}} />
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="email">E-mail</CLabel>
                <CInput id="email" name="email" placeholder="E-mail" required value={ClienteDOM.email || ''} onChange={e=>{onChange("email", e.target.value)}} />
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="telefone">Telefone</CLabel>
                <CInput id="telefone" name="telefone" placeholder="Telefone" value={ClienteDOM.telefone || ''} onChange={e=>{onChange("telefone", e.target.value)}} />
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="sexo">Sexo</CLabel>
                <CSelect custom name="sexo" id="sexo" onChange={e=>{onChange("sexo", e.target.value)}} value={ClienteDOM.sexo || ''}>
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
                <CLabel htmlFor="endereco">Endereço</CLabel>
                <CInput id="endereco" name="endereco" placeholder="Endereço" value={ClienteDOM.endereco || ''} onChange={e=>{onChange("endereco", e.target.value)}} />
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="cidade">Cidade</CLabel>
                <CInput id="cidade" name="cidade" placeholder="Cidade" value={ClienteDOM.cidade || ''} onChange={e=>{onChange("cidade", e.target.value)}} />
              </CFormGroup>
            </CCol>
          </CRow>
          <p>Dados adicionais</p>
          <hr></hr>
          <CRow>
            <CCol xs="6">
              <CFormGroup>
                <CLabel htmlFor="historico">Histórico</CLabel>
                <CTextarea 
                  name="historico" 
                  id="historico" 
                  rows="3"
                  placeholder="Histórico" 
                  value={ClienteDOM.historico || ''}
                  onChange={e=>{onChange("historico", e.target.value)}}
                />
              </CFormGroup>
            </CCol>
            <CCol xs="3">
              <CFormGroup>
                <CLabel htmlFor="tarja">Remédios Tarja</CLabel>
                <CSelect custom name="tarja" id="tarja" onChange={e=>{onChange("tarja", e.target.value)}} value={ClienteDOM.tarja || ''}>
                  <option value="">- Selecione uma opção</option>
                  <option value="1">Sim</option>
                  <option value="0">Não</option>
                </CSelect>
              </CFormGroup>
            </CCol>
            <CCol xs="3">
              <CFormGroup>
                <CLabel htmlFor="filhos">Filhos</CLabel>
                <CSelect custom name="filhos" id="filhos" onChange={e=>{onChange("filhos", e.target.value)}} value={ClienteDOM.filhos || ''}>
                  <option value="">- Selecione uma opção</option>
                  <option value="1">Sim</option>
                  <option value="0">Não</option>
                </CSelect>
              </CFormGroup>
            </CCol>
          </CRow>
          <p>Gerenciamento</p>
          <hr></hr>
          <CRow>
            <CCol xs="3">
              <CFormGroup>
                <CLabel htmlFor="state">Estado</CLabel>
                <CSelect custom name="state" id="state" onChange={e=>{onChange("state", e.target.value)}} value={ClienteDOM.state || ''}>
                  <option value="">- Selecione uma opção</option>
                  <option value="1">Ativo</option>
                  <option value="0">Inativo</option>
                </CSelect>
              </CFormGroup>
            </CCol>
          </CRow>
          </CForm>
        </CCardBody>
        <CCardFooter className="text-right">
          <CButton onClick={() => setClienteDOM({})} className="mr-3" color="secondary">Limpar</CButton>
          <CButton onClick={() => handleSubmit(ClienteDOM)} color="primary">Enviar</CButton>
        </CCardFooter>
        </CCollapse>
      </CCard>      
    </CCol>
  </CRow>    
  )
}

export default ClienteForm