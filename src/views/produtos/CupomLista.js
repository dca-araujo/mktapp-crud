import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import api from '../../services/api'
import CupomTable from  './CupomTable'
import CupomForm from './CupomForm'

const BasicForms = () => {
  const [collapsed, setCollapsed] = React.useState(false)
  const [cupom, setCupom] = React.useState({})
  const [cupomList, setCupomList] = React.useState([])
  const [loadStatus, setloadStatus] = React.useState(true)

  React.useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    try{
      setloadStatus(true)
      const response = await api.get('cupom')
      setCupomList(response.data)
    }catch(e) {
      console.log(e);
    }
        
    setloadStatus(false)
  }

  return (
    <>
      <CupomForm
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        cupom={cupom}
        refreshCupomTable={() => loadData()} />
      <CRow>
      <CCol xs="12">
          <CCard>
            <CCardHeader>Cupons cadastrados</CCardHeader>
            <CCardBody>
              <CupomTable
                handler={(cupom) => {
                          setCollapsed(true);
                          setCupom(cupom);
                        }}
                loadData={cupomList}
                loadStatus={loadStatus} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default BasicForms
