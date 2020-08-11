import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
  CInputFile,
  CLabel,
  CRow
} from '@coreui/react'
import api from '../../services/api'
import Loader from "../widgets/loader";
import CFormAlert from "../widgets/alerts"

const BasicForms = () => {
  const [EmpresaDOM, setEmpresaDOM] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  const [alert, setAlert] = React.useState({show: false, estado: '', mensagem: ''})
  const onChange = (atributo, valor) => {
    setEmpresaDOM({
      ...EmpresaDOM,
      [atributo]: valor
    });
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try{
      setLoading(true)
      const response = await api.get('empresa');
      setEmpresaDOM(response.data[0])
    }catch(e) {
      console.log(e)
    }
    
    setLoading(false)
  }

  const handleSubmit = async(event) => {
    try {
      setLoading(true);
      event._id ? await api.put(`empresa/${event._id}`, event) : await api.post('empresa', event);
      setAlert({show: true, estado: 'success', mensagem: 'Operação realizada com sucesso'})      
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
              Quem somos
              <small> Sobre a empresa</small>
            </CCardHeader>
            <CCardBody>
              <CForm method="post" encType="multipart/form-data" className="form-horizontal">
              <CRow>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="descricao">Sobre a empresa</CLabel>
                  <CTextarea 
                          name="descricao" 
                          id="descricao" 
                          rows="9"
                          placeholder="Digite algo..." 
                          onChange={e=>{onChange("descricao", e.target.value)}} value={EmpresaDOM.descricao || ''}
                      />
                </CFormGroup>             
                <CFormGroup row>
                  <CLabel col md="3" htmlFor="logo">Logo</CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile id="logo" name="logo"/>
                  </CCol>
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="atendimento">Sobre o atendimento</CLabel>
                  <CTextarea 
                          name="atendimento" 
                          id="atendimento" 
                          rows="9"
                          placeholder="Digite algo..." 
                          onChange={e=>{onChange("atendimento", e.target.value)}} value={EmpresaDOM.atendimento || ''}
                      />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="email">E-mail</CLabel>
                  <CInput id="email" placeholder="E-mail" onChange={e=>{onChange("email", e.target.value)}} value={EmpresaDOM.email || ''} />
                </CFormGroup>
                <CFormGroup row className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="telefone">Telefone</CLabel>
                      <CInput id="telefone" placeholder="Telefone" onChange={e=>{onChange("telefone", e.target.value)}} value={EmpresaDOM.telefone || ''} />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="whatsapp">Whatsapp</CLabel>
                      <CInput id="whatsapp" placeholder="Whastapp" onChange={e=>{onChange("whatsapp", e.target.value)}} value={EmpresaDOM.whatsapp || ''} />
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
              </CCol>
              </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter className="text-right" >
              <CButton onClick={() => handleSubmit(EmpresaDOM)} size="sm" color="primary">Enviar</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default BasicForms
