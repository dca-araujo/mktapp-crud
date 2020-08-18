import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="/" rel="noopener noreferrer">CoreUI</a>
        <span className="ml-1">&copy; 2020 Todos os direitos reservados.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
