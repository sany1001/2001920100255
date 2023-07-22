import React , {useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
function createData(
  name: string,
  train_num: number,
  departure_time: number,
  seats_availability: number,
  price: number,
) {
  return { name, train_num, departure_time, seats_availability, price };
}



export default function Trains() {
  const navigate = useNavigate();
  const [rows,setRows] = useState([
    createData('Chennai Exp', 159, 6.0, 24, 4.0),
    createData('Hyd express', 237, 9.0, 37, 4.3),
    createData('Ranchi Exp', 262, 16.0, 24, 6.0),
    createData('Gandhinagar mail', 305, 3.7, 67, 4.3),
    createData('Bihar Smpk', 356, 16.0, 49, 3.9),
  ]);
  useEffect(() => {
    axios.get("http://localhost:8000/trains").then(res=>{
      console.log(res);
setRows([]);
setRows(res.data.map(m=>createData(m.trainName,m.trainNumber,m.departureTime.Hours+":"+m.departureTime.Minutes+":"+m.departureTime.Seconds,m.seatsAvailable.AC+"/"+m.seatsAvailable.sleeper,m.price.AC+"/"+m.price.sleeper)))});
  
    return () => {
      
    }
  }, [])
  
  return (
    <TableContainer style = {{width:"80vw",margin:"auto"}} component={Paper}>
        <br></br>
        <br></br>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Train Name</TableCell>
            <TableCell align="right">Train Number</TableCell>
            <TableCell align="right">Departure Time(hh:mm:ss)&nbsp;</TableCell>
            <TableCell align="right">Seats Available(AC/SLEEPER) &nbsp;</TableCell>
            <TableCell align="right">Cost(AC/SLEEPER) &nbsp;(₹)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
        //  <Link to = {"/"+row.train_num}> 
            <TableRow style = {{"cursor":"pointer"}}  onClick = {()=>navigate('/'+row.train_num)}
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.train_num}</TableCell>
              <TableCell align="right">{row.departure_time}</TableCell>
              <TableCell align="right">{row.seats_availability}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
            </TableRow>
            // </Link>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}