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
  CInput,
  CLabel,
  CSelect,
  CRow
} from '@coreui/react'

const BasicForms = () => {

  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>
              Promoções
              <small> Gerenciamento</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="title">Titulo</CLabel>
                    <CInput id="title" placeholder="Nome do cupom" required />
                  </CFormGroup>
                </CCol>
                <CCol xs="8">
                  <CFormGroup>
                    <CLabel htmlFor="desc">Descrição</CLabel>
                    <CInput id="desc" placeholder="Descrição" required />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="discount">Desconto</CLabel>
                    <CInput id="discount" placeholder="Valor" required />
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="status">Estado</CLabel>
                    <CSelect custom name="status" id="status">
                      <option value="1">Ativo</option>
                      <option value="0">Inativo</option>
                      <option value="2">Pendente</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>  
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="date-input">Validade</CLabel>
                    <CInput type="date" id="date-input" name="date-input" placeholder="date" />
                  </CFormGroup>
                </CCol>
              </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter className="text-right">
              <CButton type="submit" size="sm" color="primary">Enviar</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default BasicForms
