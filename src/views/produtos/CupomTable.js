import React, { Component } from 'react'
import {
  CButton,
  CRow,
  CDataTable,
  CBadge,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from '@coreui/react'
import * as moment from 'moment'
import api from '../../services/api'

const getBadge = (status, field) => {
  if(field === 'color'){
    switch (status) {
      case '1': return 'success'
      case '0': return 'danger'
      case '2': return 'warning'
      default: return 'primary'
    }
  } else {
    switch (status) {
      case '1': return 'Ativo'
      case '0': return 'Inativo'
      case '2': return 'Pendente'
      default: return 'Indefinido'
    }
  }
}

const fields = [  {key:'titulo', label:'Título'},
                  {key:'createdAt', label:'Registrado', _style: { width: '1%'}},
                  {key:'state', label:'Estado', _style: { width: '80px'}},
                  {key: 'show_edit', label: '', _style: { width: '1%'}},
                  {key: 'show_delete', label: '', _style: { width: '1%'}}  ]

class Cupom extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.destroyData = this.destroyData.bind(this);
  }

  state = {
    destroyId: '',
    modal: false,
    refresh: false
  }

  destroyData = async (e) => {
    await api.delete(`cupom/${e.target.dataset.id}`);
    this.loadData();
    
    this.setState({modal: !this.state.modal});
  }

  toggle = () => {
    this.setState({modal: !this.state.modal});
  }

  handleClick = (e) => {
    this.setState({modal: !this.state.modal, destroyId: e.target.dataset.id});
  }

  render() {
    return(
      <CRow>
        <CModal show={this.state.modal} color='danger'>
          <CModalHeader closeButton>
            <CModalTitle>Excluir Registro</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Deseja excluir o seguinte registro? Esta ação é irreversível.
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" onClick={this.destroyData} data-id={this.state.destroyId}>Excluir</CButton>
            <CButton color="secondary" onClick={this.toggle}>Cancelar</CButton>
          </CModalFooter>
        </CModal>
        <CDataTable
        items={this.props.loadData}
        fields={fields}
        itemsPerPage={10}
        clickableRows={true}
        size="sm"
        pagination
        noItemsView={{noItems:'Nenhum registro encontrado '}}
        loading={this.props.loadStatus}
        scopedSlots = {{
          'state':
            (item, index)=>{
              return (
                <td>
                  <CBadge color={getBadge(item.state, 'color')}>{getBadge(item.state, 'text')}</CBadge>
                </td>
              )},
          'show_edit':
            (item, index)=>{
              return (
                <td>
                  <CButton key={index} color="info" size="sm" onClick={() => this.props.handler(item)} data-id={item._id}>Editar</CButton>
                </td>
              )},
          'show_delete':
            (item, index)=>{
              return (
                <td>
                  <CButton key={index} color="danger" size="sm" onClick={this.handleClick} data-id={item._id}>Excluir</CButton>
                </td>
              )},
          'createdAt':
            (item, index)=>{
              return (
                <td>
                  {moment(item.createdAt).format('DD/MM/YYYY')}
                </td>
              )},
        }}
      /></CRow>)
  }
}

export default Cupom
