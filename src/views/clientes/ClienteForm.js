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
  CInvalidFeedback,
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
import CFormAlert from "../widgets/alerts";
import schema from './schema';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';


const ClienteForm = ({collapsed, setCollapsed, cliente, refreshClienteTable}) => {
  const [ClienteDOM, setClienteDOM] = React.useState(cliente);
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState({show: false, estado: '', mensagem: ''});
  const onChange = (atributo, valor) => {
    setClienteDOM({
      ...ClienteDOM,
      [atributo]: valor
    });
  };

  React.useEffect(() => {
    setClienteDOM(cliente);
  }, [cliente]);

  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido')
      .required('Campo obrigatório'),
    nome: Yup.string()
      .min(3, 'Informe no mínimo 3 caracteres')
      .required('Campo obrigatório'),
    identidade: Yup.string()
      .min(3, 'Informe no mínimo 3 caracteres')
      .max(20, 'Valor muito extenso, confira se os dados estão corretos')
      .required('Campo obrigatório'),
    nascimento: Yup.string().test(
      "DOB",
      "É necessário ter no mínimo 18 anos",
      value => {
        return moment().diff(moment(value),'years') >= 18;
      }),
    sexo: Yup.string().required('Campo obrigatório'),
    tarja: Yup.string().required('Campo obrigatório'),
    filhos: Yup.string().required('Campo obrigatório'),
    state: Yup.string().required('Campo obrigatório')
  });

  const handleSubmit = async(event) => {
    try {
      setCollapsed(!collapsed);
      setLoading(true);
      event._id ? await api.put(`cliente/${event._id}`, event) : await api.post('cliente', event);
      setAlert({show: true, estado: 'success', mensagem: 'Operação realizada com sucesso'});   
      refreshClienteTable();
    } catch(e) {
      setAlert({show: true, estado: 'warning', mensagem: 'Algo de errado deu certo'});
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
        <Formik
          initialValues={ (Object.entries(ClienteDOM).length>0) ? ClienteDOM : schema }
          validationSchema={SignUpSchema}
          enableReinitialize={true}
          onSubmit={values => {
            setTimeout(() => {
              console.log(JSON.stringify(values, null, 2));
              handleSubmit(ClienteDOM);
            }, 500);
          }} >
        {({ errors, touched }) => (
        <Form className="form-horizontal">
        <CCollapse show={collapsed} timeout={1000}>
          <CCardBody>      
            <p>Dados pessoais</p>
            <hr></hr>
            <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="nome">Nome</CLabel>
                <CInput invalid={ errors.nome ? true : false } valid={ (!errors.nome && ClienteDOM.nome) ? true : false } name="nome" placeholder="Nome" value={ClienteDOM.nome || ''} onChange={e=>{onChange("nome", e.target.value)}} />
                { errors.nome && touched.nome ? <CInvalidFeedback>{errors.nome}</CInvalidFeedback> : null }
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="identidade">Doc. de Identificação</CLabel>
                <CInput invalid={ errors.identidade ? true : false } valid={ (!errors.identidade && ClienteDOM.identidade) ? true : false }  name="identidade" placeholder="Doc. de Identificação" value={ClienteDOM.identidade || ''} onChange={e=>{onChange("identidade", e.target.value)}} />
                { errors.identidade && touched.identidade ? <CInvalidFeedback>{errors.identidade}</CInvalidFeedback> : null }
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="nascimento">Aniversário</CLabel>
                <CInput invalid={ errors.nascimento ? true : false } valid={ (!errors.nascimento && ClienteDOM.nascimento) ? true : false } type="date" name="nascimento" placeholder="date" value={moment(ClienteDOM.nascimento).utc().format('YYYY-MM-DD') || ''} onChange={e=>{onChange("nascimento", e.target.value)}} />
                { errors.nascimento && touched.nascimento ? <CInvalidFeedback>{errors.nascimento}</CInvalidFeedback> : null }
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="email">E-mail</CLabel>
                <CInput invalid={ errors.email ? true : false } valid={ (!errors.email && ClienteDOM.email) ? true : false } name="email" placeholder="E-mail" value={ClienteDOM.email || ''} onChange={e=>{onChange("email", e.target.value)}} />
                { errors.email && touched.email ? <CInvalidFeedback>{errors.email}</CInvalidFeedback> : null }
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="telefone">Telefone</CLabel>
                <CInput name="telefone" placeholder="Telefone" value={ClienteDOM.telefone || ''} onChange={e=>{onChange("telefone", e.target.value)}} />
                { errors.telefone && touched.telefone ? <CInvalidFeedback>{errors.telefone}</CInvalidFeedback> : null }
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="sexo">Sexo</CLabel>
                <CSelect invalid={ errors.sexo ? true : false } valid={ (!errors.sexo && ClienteDOM.sexo) ? true : false }  custom name="sexo" onChange={e=>{onChange("sexo", e.target.value)}} value={ClienteDOM.sexo || ''}>
                  <option value="">- Selecione uma opção</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </CSelect>
                { errors.sexo && touched.sexo ? <CInvalidFeedback>{errors.sexo}</CInvalidFeedback> : null }
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="8">
              <CFormGroup>
                <CLabel htmlFor="endereco">Endereço</CLabel>
                <CInput name="endereco" placeholder="Endereço" value={ClienteDOM.endereco || ''} onChange={e=>{onChange("endereco", e.target.value)}} />
                { errors.endereco && touched.endereco ? <CInvalidFeedback>{errors.endereco}</CInvalidFeedback> : null }
              </CFormGroup>
            </CCol>
            <CCol xs="4">
              <CFormGroup>
                <CLabel htmlFor="cidade">Cidade</CLabel>
                <CInput name="cidade" placeholder="Cidade" value={ClienteDOM.cidade || ''} onChange={e=>{onChange("cidade", e.target.value)}} />
                { errors.cidade && touched.cidade ? <CInvalidFeedback>{errors.cidade}</CInvalidFeedback> : null }
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
                  rows="3"
                  placeholder="Histórico" 
                  value={ClienteDOM.historico || ''}
                  onChange={e=>{onChange("historico", e.target.value)}}
                />
                { errors.historico && touched.historico ? <CInvalidFeedback>{errors.historico}</CInvalidFeedback> : null }
              </CFormGroup>
            </CCol>
            <CCol xs="3">
              <CFormGroup>
                <CLabel htmlFor="tarja">Remédios Tarja</CLabel>
                <CSelect invalid={ errors.tarja ? true : false } valid={ (!errors.tarja && ClienteDOM.tarja) ? true : false } custom name="tarja" onChange={e=>{onChange("tarja", e.target.value)}} value={ClienteDOM.tarja || ''}>
                  <option value="">- Selecione uma opção</option>
                  <option value="1">Sim</option>
                  <option value="0">Não</option>
                </CSelect>
                { errors.tarja && touched.tarja ? <CInvalidFeedback>{errors.tarja}</CInvalidFeedback> : null }
              </CFormGroup>
            </CCol>
            <CCol xs="3">
              <CFormGroup>
                <CLabel htmlFor="filhos">Filhos</CLabel>
                <CSelect invalid={ errors.filhos ? true : false } valid={ (!errors.filhos && ClienteDOM.filhos) ? true : false } custom name="filhos" onChange={e=>{onChange("filhos", e.target.value)}} value={ClienteDOM.filhos || ''}>
                  <option value="">- Selecione uma opção</option>
                  <option value="1">Sim</option>
                  <option value="0">Não</option>
                </CSelect>
                { errors.filhos && touched.filhos ? <CInvalidFeedback>{errors.filhos}</CInvalidFeedback> : null }
              </CFormGroup>
            </CCol>
          </CRow>
          <p>Gerenciamento</p>
          <hr></hr>
          <CRow>
            <CCol xs="3">
              <CFormGroup>
                <CLabel htmlFor="state">Estado</CLabel>
                <CSelect invalid={ errors.state ? true : false } valid={ (!errors.state && ClienteDOM.state) ? true : false } custom name="state" onChange={e=>{onChange("state", e.target.value)}} value={ClienteDOM.state || ''}>
                  <option value="">- Selecione uma opção</option>
                  <option value="1">Ativo</option>
                  <option value="0">Inativo</option>
                </CSelect>
                { errors.state && touched.state ? <CInvalidFeedback>{errors.state}</CInvalidFeedback> : null }
              </CFormGroup>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter className="text-right">
          <CButton onClick={() => setClienteDOM({})} className="mr-3" color="secondary">Limpar</CButton>
          <CButton type="submit" color="primary">Enviar</CButton>
          {/* onClick={() => handleSubmit(ClienteDOM)} */}
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