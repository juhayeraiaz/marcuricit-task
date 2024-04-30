import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import RootLayout from './Components/Utils/RootLayout';
import Dashboard from './Components/Dashboard/Dashboard';
import RequireAuth from './Components/Utils/RequireAuth';
import Login from './Components/Login/Login';
import Signup from './Components/Login/Signup';
import CreateForm from './Components/Dashboard/CreateForm';
import Analytics from './Components/Dashboard/Analytics';
import UpdateForm from './Components/Dashboard/UpdateForm';
import Advanced from './Components/Dashboard/Advanced';
import NotFound from './Components/Shared/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route path='/login' element={<Login></Login>} />
        <Route path='/signup' element={<Signup></Signup>} />
        <Route path='/' element={<RequireAuth><Dashboard /></RequireAuth>}>
          <Route index element={<RequireAuth><Analytics /></RequireAuth>} />
          <Route path='create-form' element={<CreateForm />} />
          <Route path='update-form' element={<UpdateForm />} />
          <Route path='table' element={<Advanced />} />
          <Route path='*' element={<NotFound />}></Route>
        </Route>
      </Route>
    )
  )
  return <RouterProvider router={router} />;
};

export default App;
