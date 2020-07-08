import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NumberFormat from 'react-number-format'
import Select from '@material-ui/core/Select';
import Chart from './Chart'
import '../App.css'




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));



export default function CountryData() {
  const classes = useStyles();
  const [data, setData] = useState('') 
  const [countryCode,setCountryCode] = useState('')
  const [loading,setLoading] = useState(true)

  useEffect( (code) => {
    
    async function fetchCountryData(countryCode){
        
        const apiResponse = await fetch(`https://api.thevirustracker.com/free-api?countryTotal=${countryCode}`);
        const apiData = await apiResponse.json()
        console.log(apiData)
        setData(apiData)
        setLoading(false)
    }
    fetchCountryData(countryCode)
 
 
 }, [countryCode])


const handleChange = (e) =>{
  setCountryCode(e.target.value)
 // console.log(countryCode)
}

  return (
    
    <div className={classes.root}>
    <h2>Select Country</h2>
      <Select onChange = {handleChange} className = 'select'>
        <option value='PK' className = 'country'>Pakistan</option>
        <option value='US' className = 'country'>USA</option>
        <option value = 'CA' className = 'country'>Canada</option>
        <option value = 'AU' className = 'country'>Australia</option>
      </Select>
      <h1 style={{color:'black'}}>{data ? data.countrydata[0].info.title : "Select a Country"}</h1>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
          <h2>Total Active Cases</h2>
            <NumberFormat value={data ? data.countrydata[0].total_active_cases : 'wait'} displayType={'text'} thousandSeparator={true} style = {{color:'Orange' , fontSize:'30px'}}  />

          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
              <h2>Total Recovered</h2>
              <NumberFormat value={data ? data.countrydata[0].total_recovered : 'Loading'} displayType={'text'} thousandSeparator={true}  style = {{color:'Green' , fontSize:'30px'}} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
        <Paper className={classes.paper}>
              <h2>Total Deaths Today</h2>
              <NumberFormat value={data ? data.countrydata[0].total_new_deaths_today : 'Loading'} displayType={'text'} thousandSeparator={true}  style = {{color:'red' , fontSize:'30px'}}/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
        <Paper className={classes.paper}>
              <h2>Total Overall Deaths</h2>
              <NumberFormat value={data ? data.countrydata[0].total_deaths : 'Loading'} displayType={'text'} thousandSeparator={true}  style = {{color:'#8B0000' , fontSize:'30px'}} />
          </Paper>
        </Grid>

        <Grid item xs = {12}>
          <Paper className={classes.paper}>
              <Chart data = {data} loading={loading} />
          </Paper>
          </Grid>
      </Grid>
    </div>
  );
}
