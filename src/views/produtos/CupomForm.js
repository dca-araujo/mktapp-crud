import React from 'react'
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
  CLabel,
  CSelect,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import api from '../../services/api'
import * as moment from 'moment';
import Loader from "../widgets/loader";
import CFormAlert from "../widgets/alerts"


const CupomForm = ({collapsed, setCollapsed, cupom, refreshCupomTable}) => {
  const [CupomDOM, setCupomDOM] = React.useState(cupom)
  const [loading, setLoading] = React.useState(false)
  const [alert, setAlert] = React.useState({show: false, estado: '', mensagem: ''})
  const onChange = (atributo, valor) => {
    setCupomDOM({
      ...CupomDOM,
      [atributo]: valor
    });
  };

  React.useEffect(() => {
    setCupomDOM(cupom);
  }, [cupom]);

  const handleSubmit = async(event) => {
    try {
      setCollapsed(!collapsed)
      setLoading(true);
      event._id ? await api.put(`cupom/${event._id}`, event) : await api.post('cupom', event);
      setAlert({show: true, estado: 'success', mensagem: 'Operação realizada com sucesso'})      
      refreshCupomTable()
    } catch(e) {
      setAlert({show: true, estado: 'warning', mensagem: 'Algo de errado deu certo'})
      console.log('Algo de errado deu certo', e);
    }

    setLoading(false);
  }

  return (
    <>
      <CRow>
        <CCol xs="12">
          <CFormAlert custom={alert} />
          <CCard>
            <Loader loading={loading}/>
            <CCardHeader>
              Cupons
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
                    onClick={() => setCupomDOM({})}
                  >
                    <CIcon name="cil-reload" />
                  </CButton>
                </div>
            </CCardHeader>
            <CCollapse show={collapsed} timeout={1000}>
              <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="titulo">Titulo</CLabel>
                    <CInput id="titulo" placeholder="Nome do cupom" required onChange={e=>{onChange("titulo", e.target.value)}} value={CupomDOM.titulo || ''} />
                  </CFormGroup>
                </CCol>
                <CCol xs="8">
                  <CFormGroup>
                    <CLabel htmlFor="descricao">Descrição</CLabel>
                    <CInput id="descricao" placeholder="Descrição" required onChange={e=>{onChange("descricao", e.target.value)}} value={CupomDOM.descricao || ''} />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="desconto">Desconto</CLabel>
                    <CInput id="desconto" placeholder="Valor" required onChange={e=>{onChange("desconto", e.target.value)}} value={CupomDOM.desconto || ''} />
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="state">Estado</CLabel>
                    <CSelect custom name="state" id="state" onChange={e=>{onChange("state", e.target.value)}} value={CupomDOM.state || ''}>
                      <option value="1">Ativo</option>
                      <option value="0">Inativo</option>
                      <option value="2">Pendente</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>  
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="validade">Validade</CLabel>
                    <CInput type="date" id="validade" name="date-input" placeholder="date" onChange={e=>{onChange("validade", e.target.value)}} value={moment(CupomDOM.validade).utc().format('YYYY-MM-DD') || ''} />
                  </CFormGroup>
                </CCol>
              </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter className="text-right">
              <CButton onClick={() => setCupomDOM({})} className="mr-3" color="secondary">Limpar</CButton>
              <CButton onClick={() => handleSubmit(CupomDOM)} color="primary">Enviar</CButton>
            </CCardFooter>
            </CCollapse>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default CupomForm
