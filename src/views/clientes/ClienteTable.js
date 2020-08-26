import React, { Component } from 'react';
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
} from '@coreui/react';
import * as moment from 'moment';
import api from '../../services/api';

const getBadge = (status, field) => {
  if(field === 'color'){
    switch (status) {
      case '1': return 'success';
      case '0': return 'danger';
      default: return 'primary';
    }
  } else {
    switch (status) {
      case '1': return 'Ativo';
      case '0': return 'Inativo';
      default: return 'Indefinido';
    }
  }
}

const fields = [{key:'nome', label:'Nome'},
                {key:'email', label:'E-mail'},
                {key:'telefone', label:'Telefone'},
                {key:'cidade', label:'Cidade'},
                {key:'createdAt', label:'Registrado', _style: { width: '1%'}},
                {key:'state', label:'Estado', _style: { width: '80px'}, sorter: false, filter: false},
                {key:'show_edit', label: '', _style: { width: '1%'}, sorter: false, filter: false},
                {key:'show_delete', label: '', _style: { width: '1%'}, sorter: false, filter: false}]

class Clientes extends Component {
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
    await api.delete(`cliente/${e.target.dataset.id}`);    
    this.setState({modal: !this.state.modal});
    this.props.refreshClienteTable();
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
        sorter={true}
        fields={fields}
        columnFilter={true}
        itemsPerPage={10}
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

export default Clientes