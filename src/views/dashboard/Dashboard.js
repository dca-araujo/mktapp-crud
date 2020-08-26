/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy } from 'react';
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react';
import api from '../../services/api';
import Chart from '../charts/ChartCliente';

const WidgetsBrand = lazy(() => import('./WidgetsBrand.js'))
const Dashboard = () => {
  const [clientData, setClientData] = React.useState([]);
  const [widgetData, setWidgetData] = React.useState([]);
  const [chartData, setChartData] = React.useState({});

  React.useEffect(() => {
    loadData();
  }, []);  

  const loadData = async () => {
    try{
      const response = await api.post('cliente/busca');
      setClientData(response.data.cliente);
      setWidgetData(response.data.widgets[0]);
      newDatasets(response.data.chart);
    }catch(e) {
      console.log(e);
    }
  }

  const newDatasets = data => {
    const dataYear = [];
    const dataMale = [];
    const dataFemale = [];
    const dataAll = [];

    for (let i = 0; i < data.length; i++) {
      dataYear.push(data[i]['_id'].ano);
    }

    dataYear.sort();
    let unique = [...new Set(dataYear)];

    let male = data.filter(obj => obj._id.sexo === 'Masculino');
    let female = data.filter(obj => obj._id.sexo === 'Feminino');

    for (let i = 0; i < unique.length; i++) {
      let counter = 0;
      let sandbox = male.filter(obj => obj._id.ano === unique[i]).map(obj => obj.count);      
      dataMale.push(sandbox[0] || 0);
      counter += sandbox[0] || 0;

      sandbox = female.filter(obj => obj._id.ano === unique[i]).map(obj => obj.count);      
      dataFemale.push(sandbox[0] || 0);
      counter += sandbox[0] || 0;

      dataAll.push(counter);
    }

    setChartData({male: dataMale, female: dataFemale, combined: dataAll, label: unique, max:Math.max( ...dataAll )});
  }

  const nanResponse = data => {
    if(isNaN(data)) {
      return 0;
    } else {
      return data;
    }
  }

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Visão geral</h4>
              <div className="small text-muted">Clientes cadastrados</div>
            </CCol>
          </CRow>
          {chartData.max > 0 &&
          <Chart style={{height: '300px', marginTop: '40px'}} data={chartData} />
          }
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Homens</div>
              <strong>{nanResponse(widgetData.masculino)} clientes ({Math.ceil((100 * nanResponse(widgetData.masculino))/clientData.length)}%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={(100 * widgetData.masculino)/clientData.length}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Mulheres</div>
              <strong>{nanResponse(clientData.length) - nanResponse(widgetData.masculino)} clientes ({Math.ceil((100 * (nanResponse(clientData.length) - nanResponse(widgetData.masculino)))/clientData.length)}%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={(100 * (nanResponse(clientData.length) - nanResponse(widgetData.masculino)))/clientData.length}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Filhos</div>
              <strong>{nanResponse(widgetData.filhos)} clientes ({Math.ceil((100 * nanResponse(widgetData.filhos))/clientData.length)}%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="warning"
                value={(100 * widgetData.filhos)/clientData.length}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Remédios com tarja</div>
              <strong>{nanResponse(widgetData.tarja)} clientes ({Math.ceil((100 * nanResponse(widgetData.tarja))/clientData.length)}%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="danger"
                value={(100 * widgetData.tarja)/clientData.length}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Ativos</div>
              <strong>{nanResponse(widgetData.state)} clientes ({Math.ceil((100 * nanResponse(widgetData.state))/clientData.length)}%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                value={(100 * widgetData.state)/clientData.length}
              />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>

      <WidgetsBrand withCharts/>
    </>
  )
}

export default Dashboard
