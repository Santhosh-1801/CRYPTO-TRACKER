
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Homepage from './Pages/Home';
import Coin from './Pages/Coins';
import { makeStyles } from '@material-ui/core/styles'; 

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'black',  
    color:"white",
    minHeight:"100vh",
    // Set the background color to black
  },
}));

function App() { 


  const classes=useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Header/>  
        <Routes>
        <Route path='/' element={<Homepage/>}/> 
        <Route path='/coins/:id' element={<Coin/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
