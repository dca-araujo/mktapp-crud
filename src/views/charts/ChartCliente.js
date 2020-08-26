import React from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils/src'

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandWarning = getStyle('dark') || '#636f83'

const Chart = ({style, data}) => {
  const defaultDatasets = obj => {
    return [
      {
        label: 'Total',
        backgroundColor: hexToRgba(brandWarning, 10),
        borderColor: brandWarning,
        pointHoverBackgroundColor: brandWarning,
        borderWidth: 3,
        borderDash: [8, 5],
        data: obj.combined,
      },
      {
        label: 'Homens',
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: obj.male
      },
      {
        label: 'Mulheres',
        backgroundColor: 'transparent',
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: obj.female
      }
    ]
  }

  const defaultOptions =  obj => {
    return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(obj.max / 5),
              max: obj.max
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    }

  // render
  return (
    <CChartLine
      style={style}
      datasets={defaultDatasets(data)}
      options={defaultOptions(data)}
      labels={data.label}
    />
  )
}


export default Chart
