import React, { useState, useEffect } from 'react'
import {Doughnut} from 'react-chartjs-2'
import Spinner from './Spinner'


export default function Chart({data,loading}) {
    


    const [chartData, setChartData] = useState({})
    
      
         
      useEffect(()=>{
        if (data){

          setChartData({
            labels: [
              'Total Cases',
              'Total Recovered',
              'Deaths Today',
              'Total Deaths'
            ],
            datasets: [
          {
            data: [`${data.countrydata[0].total_active_cases}` , `${data.countrydata[0].total_recovered} ` , `${data.countrydata[0].total_new_deaths_today}`, `${data.countrydata[0].total_deaths}`],
            backgroundColor: [
              '#FFA500',
              '#008000',
              '#FF0000',
              '#8B0000'
              ],
              hoverBackgroundColor: [
                '#FFA500',
                '#008000',
                '#FF0000',
                '#8B0000'
              ]
            
          }
        ]
          })
        }
      },[data])
    


    // return loading? (
    //   <h1>Loading</h1>
    // ):

    return loading? (
      <Spinner />
    ):
    (
        <div>
            <Doughnut data={chartData} />
            {console.log('This is data ' + data)}
        </div>
    )
}
