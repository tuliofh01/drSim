import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BuscarPaciente.module.css"
import axios from 'axios';
import ContainerPacientes from "../components/ContainerPacientes";
import CardPaciente from '../components/CardPaciente'

function BuscarPaciente(){

  const nomePaciente = useRef()
  const navigate = useNavigate()
  const [pacientes, setPacientes] = useState([])

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  
  function formHandler(event){
    event.preventDefault();
    
    axios.post("/buscarPaciente", {
      token: localStorage.getItem('token'),
      nome: nomePaciente.current.value
    }).then((response) => {
      setPacientes(response.data[0]);
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
        <h3 className={styles.boxSubtitle}>Resultados:</h3>
        <ContainerPacientes>{pacientes.map((paciente) => (
          <CardPaciente 
            paciente={paciente}
          />
        ))}</ContainerPacientes>
      </div>


    </div>
  );

}

export default BuscarPaciente;