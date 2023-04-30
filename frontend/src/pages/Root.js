import { Outlet } from "react-router-dom";
import MainHeader from '../components/MainHeader'

function Root(){
    return (
      <>
        <MainHeader
          urls={[
            ["Home", ""],
            ["Cadastrar Paciente", "criarPaciente"],
            ["Cadastrar Consulta", "criarConsulta"],
            ["Agenda Médica", "agenda"],
            ["Buscar Paciente", "buscarPaciente"],
          ]}
        />
        <Outlet />
      </>
    );
}

export default Root;