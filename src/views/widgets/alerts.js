import React from 'react'
import { CAlert } from '@coreui/react'

const Alerts = ({custom}) => {
  return (  
    custom.show ? <CAlert color={custom.estado} closeButton>{custom.mensagem}</CAlert> : ''
  )
}

export default Alerts
