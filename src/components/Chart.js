import React, { useState, useEffect } from 'react'
import {Doughnut} from 'react-chartjs-2'

export default function Chart({data}) {
   
    const [chartData, setChartData] = useState({
        label: 'My First dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
    })

//    useEffect((data)=>{
//         setChartData({
//             label: `${data.countrydata[0].info.title}`,
//         })
//    },[])


    return (
        <div>
            <Doughnut data={chartData} />
            {console.log('data' + data)}
        </div>
    )
}
