import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CriarPaciente.module.css'
import axios from 'axios';

function CriarPaciente() {

  const navigate = useNavigate();
  const nome = useRef();
  const telefone = useRef();
  const endereco = useRef();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  
  function formHandler(event) {
    event.preventDefault();

    axios
      .post("/criarPaciente", {
        token: localStorage.getItem("token"),
        nome: nome.current.value,
        endereco: endereco.current.value,
        telefone: telefone.current.value,
      })
      .then(() => alert("Paciente cadastrado com sucesso!"))
      .catch((error) => {
        if (error.response.status === 401) {
          navigate("/login");
        }
      });
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cadastrar Paciente</h2>
      <form onSubmit={formHandler} className={styles.form}>
        <input className={styles.input} ref={nome} type="text" placeholder="Nome"/>
        <input className={styles.input} ref={telefone} type="text" placeholder="Telefone"/>
        <input className={styles.input} ref={endereco} type="text" placeholder="Endereço"/>
        <button className={styles.button} type="submit">Cadastrar </button>
      </form>
    </div>
  );
}

export default CriarPaciente;
