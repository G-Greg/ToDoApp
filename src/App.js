import logo from './logo.svg';
import './App.css';
import {Home} from './Home.js';
import {Site} from './Site.js';
import Menu from './Menu.js';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Menu/>

    <div className="container">
      <h1>ToDo Application</h1>
    </div>

      <Routes>
        <Route path='/' element={<Home/>} extact/>
        <Route path='/nothome' element={<Site/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
