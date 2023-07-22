import axios from 'axios';
import React , {useEffect , useState}from 'react'
import { Routes, Route, useParams } from 'react-router-dom';
const trainImages = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMP4rBMCb72EPF8lUNYJCwMOjWxLnGEfGR4121OcwnLqAk7y_kqZZVvGUKDbDHPLetdCY&usqp=CAU",
"https://media.istockphoto.com/id/1189029599/photo/passenger-train-india.jpg?s=612x612&w=0&k=20&c=gO7cJw0zhVhVrQ4DIG_Tr0llD52_dS-DKsWU43CWiXs=",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQguzSMEstPK1y3_BG8xOEttIqovAkws-LnoYa8ktYAo4rf4WUqqcMnr1Jj3JiBftJRzss&usqp=CAU",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2yjBsHJjozTfVp5IjvgyLGHp5BzCSp9rF7zo3XpaDQh5216WDg3CWG_yqBp0QadtIddQ&usqp=CAU"]
function TrainData() {
  
    let { id } = useParams();
    const [data,setData]  = useState({});
    useEffect(() => {
      
    axios.get("http://localhost:8000/trains/"+id).then(res=>{
      console.log(res);
      setData(res.data);
    })
      return () => {
        
      }
    }, [])
    
  return (
    // <div>{id}</div>
    <div style = {{backgroundColor:"rgba(250,250,250,.8",marginTop:"30px",padding : "30px",paddingInline:"50px",borderRadius:"10px","boxShadow":"2px 2px 2px gray","width":"max-content","margin":"auto","textAlign":"left"}}>
<img src = {trainImages[Math.floor(Math.random()*trainImages.length)]} width = "200" height = "200"></img>
<p>Train Name: {data?.trainName}</p>
<p>Departure Time: {data?.departureTime?.Hours}hrs {data?.departureTime?.Minutes}mins</p>
<p>Price: <br></br>AC:₹{data?.price?.AC} Sleeper:₹{data?.price?.sleeper}</p>
<p>Seats Available:<br></br> AC:{data?.seatsAvailable?.AC}seats Sleeper:{data?.seatsAvailable?.sleeper}seats</p>


        </div>
  )
}

export default TrainData