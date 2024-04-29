import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import RootLayout from './Components/Utils/RootLayout';
import Dashboard from './Components/Dashboard/Dashboard';
import RequireAuth from './Components/Utils/RequireAuth';
import Login from './Components/Login/Login';
import Signup from './Components/Login/Signup';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route path='/login' element={<Login></Login>} />
      <Route path='/signup' element={<Signup></Signup>} />
      <Route path='/' element={<RequireAuth><Dashboard /></RequireAuth>}>
        <Route></Route>
      </Route>
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
