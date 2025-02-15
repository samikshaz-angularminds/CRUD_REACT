import './App.css';
import {Routes,Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';

function App() {
  return(
    <div>
    <Routes>
      <Route path='/register' element={<Register/>} />
      <Route path='/' element={<Login/>} />
      <Route path='/employee-list' element={<EmployeeList/>} />
      <Route path='/add-employee' element={<AddEmployee/>} />
      </Routes>
    </div>
  );
}

export default App;
