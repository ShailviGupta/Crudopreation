import './App.css';
import Create from './components/create';
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import Update from './components/update';
function App() {
  return (
    <Router>
    <div className="main">
      <Routes>
        <Route path='/create' exact element={<Create/>}/>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/update/:id' exact element={<Update/>}/>


      </Routes>

    </div>
    </Router>
  );
}

export default App;
