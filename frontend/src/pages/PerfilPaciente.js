import styles from './PerfilPaciente.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import axios from 'axios';

function PerfilPaciente(){

    const navigate = useNavigate();
    const paciente = useLocation().state.patientData;

    const remedios = useRef();
    const anotacoes = useRef();

    useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/login");
      }
    }, []);

    function formHandler(event){
      event.preventDefault();
      axios
        .post("/atualizarPaciente", {
          token: localStorage.getItem("token"),
          idPaciente: paciente.ID,
          remedios: remedios.current.value,
          anotacoes: anotacoes.current.value,
        })
        .then((response) => alert("Dados atualizados com sucesso!"))
        .catch((error) => {
          if (error.response.status === 401) {
            navigate("/login");
          }
        });

    }

    return (
    <div className={styles.rectangularComponent}>
      <h2 className={styles.componentTitle}>Dados Paciente</h2>
      <form className={styles.componentForm} onSubmit={formHandler}>
        <label htmlFor="nome" className={styles.formLabel}>Nome:</label>
        <input type="text" id="nome" name="nome" value={paciente.NOME} className={styles.formInput} readOnly/>

        <label htmlFor="telefone" className={styles.formLabel}>Telefone:</label>
        <input type="text" id="telefone" name="telefone" value={paciente.TELEFONE} className={styles.formInput} readOnly/>

        <label htmlFor="endereco" className={styles.formLabel}>Endereço:</label>
        <input type="text" id="endereco" name="endereco" value={paciente.ENDERECO} className={styles.formInput} readOnly/>

        <label htmlFor="remedios" className={styles.formLabel}>Remédios:</label>
        <input ref={remedios} type="text" id="remedios" name="remedios" defaultValue={paciente.REMEDIOS} className={styles.formInput}/>

        <label htmlFor="anotacoes" className={styles.formLabel}>Anotações:</label>
        <textarea ref={anotacoes} id="anotacoes" name="anotacoes" className={styles.formTextarea}>{paciente.ANOTACOES}</textarea>

        <input type="submit" value="Salvar" className={styles.formSubmit}/>
      </form>
    </div>
    );

}

export default PerfilPaciente;