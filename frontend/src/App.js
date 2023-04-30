import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login';
import CriarPaciente from "./pages/CriarPaciente";
import Root from './pages/Root';
import Agenda from './pages/Agenda';
import PerfilPaciente from './pages/PerfilPaciente';
import BuscarPaciente from './pages/BuscarPaciente';
import CriarConsulta from './pages/CriarConsulta';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/criarPaciente", element: <CriarPaciente /> },
      { path: "/agenda", element: <Agenda /> },
      { path: "/buscarPaciente", element: <BuscarPaciente /> },
      { path: "/perfilPaciente/:type", element: <PerfilPaciente /> },
      { path: "/criarConsulta", element: <CriarConsulta/>}
    ],
  },
  { path: "/login", element: <Login /> },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
