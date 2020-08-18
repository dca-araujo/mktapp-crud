import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { logout } from '../services/auth';

const TheHeaderDropdown = () => {
  const [redirect, setRedirect] = React.useState(false);

  const handleLogoff = () => {
    logout();
    setRedirect(true);
  }

  return (
    <div>
      {redirect ? <Redirect to='/dashboard' /> : ''}
      <CDropdown
        inNav
        className="c-header-nav-items mx-2"
        direction="down"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="c-avatar">
            <CImg
              src={'avatars/7.jpg'}
              className="c-avatar-img"
              alt="admin@bootstrapmaster.com"
            />
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem
            header
            tag="div"
            color="light"
            className="text-center"
          >
            <strong>Configurações</strong>
          </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-user" className="mfe-2" />Perfil
          </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-settings" className="mfe-2" />Opções
          </CDropdownItem>
          <CDropdownItem divider />
          <CDropdownItem onClick={() => handleLogoff()} >
            <CIcon name="cil-lock-locked" className="mfe-2" /> 
            Sair
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </div>
  )
}

export default TheHeaderDropdown
