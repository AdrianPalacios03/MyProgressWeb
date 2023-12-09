import { useEffect, useState } from 'react'
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
import { options } from './TimeChart';
import { Feelings } from './Feelings';
import { Feeling } from '../interfaces/Feeling.interface';

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
  

export const AllDaysChart = () => {
    const [labels, setlabels] = useState<any[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const [feelingsData, setFeelingsData] = useState<Feeling[]>([]);
    const [isLoading, setIsLoading] = useState(true)
  
    const getProgress = async() => {
      let tempValues: any = [];
      let tempLabels: any = [];
      let tempFeelings: Feeling[] = []
      let askingDate = new Date('2023-4-12');
      let needBreak = false;
      let contador = 0;
      let parsedDate = '';
      while (true) {
        await getDayInfo(askingDate).then((res: any) => {
          if (!res) {
            needBreak = true;
            return
          };
          parsedDate = askingDate.getDate() + ' ' + askingDate.toLocaleString('default', { month: 'short', year: '2-digit' } )
          tempLabels.push(parsedDate);
          for (const [_, value] of Object.entries(res)) {
            try{
              if (value === true) {
                contador++;
              } else {
                if (typeof value === 'string' && value.length >= 1) {
                    tempFeelings.push({
                        date: parsedDate,
                        text: value
                    })
                }
              }
            }catch(e){
              console.log(`Pasé por acá, ${value}`)
            }
          }
          tempValues.push(contador);
          contador = 0;
          
          askingDate.setDate(askingDate.getDate() + 1);
        })
        if (needBreak) break
      }
      setlabels(tempLabels)
      setTableData(tempValues)
      setFeelingsData(tempFeelings)
      setIsLoading(false)
    }
  
    useEffect(() => {
      getProgress()
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
      <div>

          {
            isLoading && <h1>Cargando...</h1>
          }
          <div className='half-table-header'>
            <div className="table-indicator"/>
            <h2 className='time-title'>Actividades realizadas</h2>
          </div>
          <Line data={data} options={options} />
          <br/>
          <h1>Notas</h1>
          <Feelings feelings={feelingsData}/>
      </div>
    )
}
