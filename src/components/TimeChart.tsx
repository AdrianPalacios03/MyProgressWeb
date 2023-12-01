import { useState } from 'react'
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
import { getDayInfo } from '../database/getDayInfo';

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


export const TimeChart = () => {

  const [labels, setlabels] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProgress = async() => {
    let tempValues: any = [];
    let tempLabels: any = [];
    let prevCounter = 0;
    let askingDate = new Date('2023-4-12');
    let writingProgress = 0;
    let needBreak = false;
    let contador = 0;
    while (true) {
      await getDayInfo(askingDate).then((res) => {
        console.log(res)
        if (!res) {
          needBreak = true;
          return
        };
        tempLabels.push(askingDate.getDate() + ' ' + askingDate.toLocaleString('default', { month: 'short', year: '2-digit' } ));
        for (const [_, value] of Object.entries(res)) {
          try{
            if (value === true) {
              contador++;
            }
          }catch(e){
            console.log(e)
          }
        }
        
        if (contador < prevCounter || contador === 0) {
          writingProgress--;
        }else{
          writingProgress++;
        }
        prevCounter = contador;
        contador = 0;
        tempValues.push(writingProgress);
        askingDate.setDate(askingDate.getDate() + 1);
      })
      if (needBreak) break
    }
    setlabels(tempLabels);
    setTableData(tempValues);
    setIsLoading(false)
  }

  const activateProgress = () => {
    setIsLoading(true)
    getProgress();
  }

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
    <div>
        <div className='half-table-header'>
          <div className="table-indicator"/>
          <h2 className='time-title'>Consistencia a lo Largo del Tiempo</h2>
          <button className='save-button' onClick={activateProgress}>Consultar Datos</button>
        </div>
        <Line data={data} options={options} />
        {
          isLoading ? <Loader/> : <span/>
        }
    </div>
  )
}

const Loader = () => {
  return (
    <p style={{fontSize: '40px', position: 'absolute', width: '100%', textAlign: 'center', transform: 'translateY(-500%)'}}>Cargando...</p>
  )
}
