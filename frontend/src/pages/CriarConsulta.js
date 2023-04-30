import styles from './CriarConsulta.module.css'
import axios from "axios";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CriarConsulta(){

  const navigate = useNavigate();
  
  const nomePaciente = useRef();
  const dataConsulta = useRef();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  
  function formHandler(event) {
    event.preventDefault();

    axios
      .post("/criarConsulta", {
        token: localStorage.getItem("token"),
        nomePaciente: nomePaciente.current.value,
        data: dataConsulta.current.value,
      })
      .then(() => alert("Consulta cadastrada com sucesso!"))
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cadastrar Consulta</h2>
      <form onSubmit={formHandler} className={styles.form}>
        <input className={styles.input} ref={nomePaciente} type="text" placeholder="Nome Paciente"/>
        <input className={styles.input} ref={dataConsulta} type="datetime-local"/>
        <button className={styles.button} type="submit">Cadastrar</button>
      </form>
    </div>
  );

}

export default CriarConsulta;