import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import api from '../../services/api'
import ClienteTable from  './ClienteTable'
import ClienteForm from './ClienteForm'

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
      <ClienteForm
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        cliente={cliente}
        refreshClienteTable={() => loadData()} />
      <CRow>
      <CCol xs="12">
          <CCard>
            <CCardHeader>Clientes cadastrados</CCardHeader>
            <CCardBody>
            <ClienteTable
              handler={(cliente) => {
                        setCollapsed(true);
                        setCliente(cliente);
                      }}
              loadData={clienteList}
              loadStatus={loadStatus} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default BasicForms
