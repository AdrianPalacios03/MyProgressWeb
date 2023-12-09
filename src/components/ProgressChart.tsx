import{ useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { MotivationalPhrase } from './MotivationalPhrase';
import { getDayInfo } from '../database/getDayInfo';
import capitalize from '../helpers/capitalize';
import { IonIcon } from '@ionic/react';
import { reloadOutline } from 'ionicons/icons';
import { SaveButton } from './SaveButton';
import { useNavigate } from 'react-router-dom';
import { bookOutline  } from 'ionicons/icons'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export const options = {
  responsive: true,
  plugins: {
    filler: {
      propagate: true
    },
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: 'transparent',
      },
      ticks: {
        color: 'aliceblue',
        font: {
          size: 14,
          family: 'system-ui',
        }
      }
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.2)',
      },
      ticks: {
        color: 'aliceblue',
        font: {
          size: 14,
          family: 'system-ui',
        }
      }
    },
  },
  gridLines: {
    display: false ,
    color: "red"
  },
}

export const ProgressChart = () => {

  const navigate = useNavigate();

  const [labels, setlabels] = useState<any[]>([])
  const [tableData, setTableData] = useState<any[]>([])

  const getLastDaysData = async (fechas: any[]) => {
    let values: any = [];
    for (let i = 0; i < fechas.length; i++) {
      await getDayInfo(fechas[i]).then((res) => {
        let contador = 0;
        if (!res) return values.push(contador); 
        for (const [_, value] of Object.entries(res)) {
          try{
            if (value === true) {
              contador++;
            }
          }catch(e){
            console.log(e)
          }
          
        }
        values.push(contador);
      })
    }
    setTableData(values);
  }

  useEffect(() => {
    let fechas: any = [];
    let hoy = new Date();
    let semanaPasada = new Date();
    semanaPasada.setDate(semanaPasada.getDate() - 7);
    for (let fecha = hoy; fecha >= semanaPasada; fecha.setDate(fecha.getDate() - 1)) {
      fechas.push(new Date(fecha));
    }
    let tempLabels: any = [];
    fechas.forEach((fecha: any) => {
      tempLabels.push(capitalize(fecha.toLocaleDateString('es-ES', { weekday: 'long' })));
    });
    setlabels(tempLabels.reverse());
    getLastDaysData(fechas.reverse());
  }, [])

  const data = {
    labels,
    datasets: [
      {
        label: 'Actividades completadas',
        data: tableData,
        borderColor: '#BBBDF6',
        backgroundColor: '#9893DAbb',
        fill: true,
      },
    ],
  };

  return (
    <div className='weekly-chart'>
        <div className='table-header'>
          <div className='half-table-header'>
            <div className="table-indicator"/>
            <h2>Actividades Realizadas a lo Largo de la Semana</h2>
          </div>
          <IonIcon icon={reloadOutline} className='reload-icon' onClick={() => {location.reload()}}/>
        </div>
        <Line data={data} options={options} />
        <div className='all-days-button-container'>
          <SaveButton title='Ver todo' onClick={() => {navigate('progress')}} isSaving={false}/>
          <SaveButton title='Ver notas' onClick={() => {navigate('notes')}} isSaving={false} ic={bookOutline}/>
        </div>
        <MotivationalPhrase/>
    </div>
  )
}
