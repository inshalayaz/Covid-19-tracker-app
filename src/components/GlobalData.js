import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format'



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: theme.spacing(16),
    },
  },
}));

const useStylesTypography = makeStyles({
    root: {
      width: '100%',
      maxWidth: 500,
     
    },
  });

export default function GlobalData() {
  const classes = useStyles();
  const classesTypography = useStylesTypography();

    const [globalData,setGlobalData] = useState();
    const [loading,setLoading] = useState(false);

    useEffect(() =>{
        async function fetchGlobalData(){
            setLoading(true)
            const apiResponse = await fetch('https://api.thevirustracker.com/free-api?global=stats')
            const dataFromApi = await apiResponse.json()
            console.log(dataFromApi)
            setGlobalData(dataFromApi)
            setLoading(false)
        }
        
        fetchGlobalData() 
    },[])

    if (loading){
        return <h1>Getting Data</h1>
    }else{

  return (
    <div className={classes.root}>
      <Paper elevation = {3}>
      <div className={classesTypography.root}>
            <Typography variant="h4" gutterBottom style = {{color:'Blue'}}>
            <NumberFormat value={globalData ? globalData.results[0].total_cases : 'Loading'} displayType={'text'} thousandSeparator={true} />
                
            </Typography>
            
            <Typography variant="subtitle2" gutterBottom>
                Global Data of today
            </Typography>
        </div>
      </Paper>
      <Paper elevation = {3}>
      <div className={classesTypography.root}>
            <Typography variant="h4" gutterBottom style = {{color:'Orange'}}>
            <NumberFormat value={globalData ? globalData.results[0].total_active_cases : 'Loading'} displayType={'text'} thousandSeparator={true} />
            </Typography>
            
            <Typography variant="subtitle2" gutterBottom>
                Active
            </Typography>
        </div>
      </Paper>
      <Paper elevation = {3}>
      <div className={classesTypography.root}>
            <Typography variant="h4" gutterBottom style = {{color:'Green'}}>
            <NumberFormat value={globalData ? globalData.results[0].total_recovered : 'Loading'} displayType={'text'} thousandSeparator={true} />
            </Typography>
            
            <Typography variant="subtitle2" gutterBottom >
               Recovered
            </Typography>
        </div>
      </Paper>
      <Paper elevation = {3}>
      <div className={classesTypography.root}>
            <Typography variant="h4" gutterBottom style = {{color:'Red'}}>
            <NumberFormat value={globalData ? globalData.results[0].total_deaths : 'Loading'} displayType={'text'} thousandSeparator={true} />
            </Typography>
            
            <Typography variant="subtitle2" gutterBottom>
                Deaths
            </Typography>
        </div>
      </Paper>
    </div>
  );
    }
}
