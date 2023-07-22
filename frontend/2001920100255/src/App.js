import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import Trains from './Trains.js'
import "@mui/material/styles"
import {Link,
  BrowserRouter as Router,
  Routes,
  Route,useNavigate
} from 'react-router-dom';
import TrainData from './TrainData';
function App() {
  return (
    <div className="App">
 
 
      <Router>
      <Navbar></Navbar>
        <Routes>
          <Route exact path='/' element={< Trains/>}></Route>
          <Route exact path='/:id' element={<TrainData/>}></Route>
        
          
        </Routes>
      </Router>
 
 
 
 
 
 
 {/* <Trains></Trains> */}
    
    
    </div>
  );
}

export default App;
