import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BuscarPaciente.module.css"
import axios from 'axios';
import ContainerPacientes from "../components/ContainerPacientes";

function BuscarPaciente(){

  const nomePaciente = useRef()
  const navigate = useNavigate()
  const [pacientes, setPacientes] = useState([])
  
  function formHandler(event){
    event.preventDefault();
    
    axios.post("/buscarPaciente", {
      token: localStorage.getItem('token'),
      nome: nomePaciente.current.value
    }).then((response) => {
      for(let paciente of response.data[0]){
        setPacientes([...pacientes, paciente])
      }
    }).catch((error) => {
      if (error.response.status === 404) {
        alert("Paciente não encontrado.");
      }
      else if (error.response.status === 401){
        navigate('/login');
      }
    });

  }

  return (
    <div className={styles.container}>
      
      <div>
        <form className={styles.form} onSubmit={formHandler}>
          <input
            ref={nomePaciente}
            className={styles.input}
            placeholder="Buscar paciente"
            type="text"
          />
          <button className={styles.button} type="submit">
            Buscar
          </button>
        </form>
      </div>

      <div className={styles.patientsBox}>
        <ContainerPacientes>{pacientes.map((paciente) => {
          console.log(paciente)
        })}</ContainerPacientes>
      </div>


    </div>
  );

}

export default BuscarPaciente;