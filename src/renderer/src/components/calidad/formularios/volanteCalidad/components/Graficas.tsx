/* eslint-disable prettier/prettier */
import Chart from 'chart.js/auto';
import { promedioOperarioType } from '../type/type';
import { useContext, useEffect, useRef } from 'react';
import { themeContext } from '@renderer/App';

type propsType = {
    data: promedioOperarioType[]
}
export default function Graficas(props: propsType): JSX.Element {
    const theme = useContext(themeContext);
    const chartRef = useRef<Chart<'bar', unknown> | null>(null);

    useEffect(() => {
        const colorFondo = theme === 'Dark' ? 'rgba(62, 79, 206, 0.6)' : 'rgba(75, 192, 192, 0.2)'
        if (chartRef.current) {
            chartRef.current.data.labels = props.data.map(item => item.operario);
            chartRef.current.data.datasets[0].data = props.data.map(item => item.porcentaje);
            chartRef.current.update();
          } else {
            const canvas = document.getElementById('myChart') as HTMLCanvasElement;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    chartRef.current = new Chart(ctx, {
                        type: 'bar',
                        data: {
                          labels: props.data.map(item => item.operario),
                          datasets: [
                            {
                              label: 'Promedio de defectos por operario',
                              data: props.data.map(item => item.porcentaje),
                              backgroundColor: colorFondo,
                              borderColor: 'rgba(75, 192, 192, 1)',
                              borderWidth: 1,
                            },
                          ],
                        },
                        options: {
                          scales: {
                            y: {
                              beginAtZero: true,
                              min: 0,
                              max: 100,
                              title: {
                                display: true,
                                text: 'Porcentaje de defectos',
                              },
                            },
                            x: {
                              title: {
                                display: true,
                                text: 'Operarios',
                              },
                            },
                          },
                        },
                      });
                }
            }
          }


    }, [props.data])
    return (
        <div className={`bg-white w-full p-2 rounded-lg shadow-lg`}>
            <h2>Gráfico de Porcentaje de Defectos por Operario</h2>
            <canvas id="myChart" width="200" height="100"></canvas>
        </div>
    )
}
