import React from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import api from '../../services/api';
import ClienteTable from  './ClienteTable';
import ClienteForm from './ClienteForm';

const BasicForms = () => {
  const [collapsed, setCollapsed] = React.useState(false)
  const [cliente, setCliente] = React.useState({})
  const [clienteList, setClienteList] = React.useState([])
  const [loadStatus, setloadStatus] = React.useState(true)

  React.useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    try{
      setloadStatus(true)
      const response = await api.get('cliente')
      setClienteList(response.data)
    }catch(e) {
      console.log(e);
    }
        
    setloadStatus(false)
  }

  return (
    <>
      <CRow>
      <CCol xs="12">
          <CCard>
          <CCardHeader>
            Clientes
            <small> Cadastrados</small>
              <div className="card-header-actions">
                <CButton
                  color="link"
                  className="card-header-action btn-minimize"
                  onClick={() => { setCollapsed(!collapsed); setCliente({}); }}
                >
                  <CIcon name={ collapsed ? "cil-minus" : "cil-plus"} /> <small className="text-muted">Novo registro</small>
                </CButton>
              </div>
          </CCardHeader>
            <CCardBody>
            <ClienteTable
              handler={(cliente) => {
                        setCollapsed(true);
                        setCliente(cliente);
                      }}
              loadData={clienteList}
              loadStatus={loadStatus}
              refreshClienteTable={() => loadData()} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ClienteForm
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        cliente={cliente}
        refreshClienteTable={() => loadData()} />
    </>
  )
}

export default BasicForms
