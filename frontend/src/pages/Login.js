import styles from './Login.module.css'
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

function Login(){
    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    function formHandler(event) {
      event.preventDefault();

      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      axios
        .post("/login", {
          username: email,
          password: password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data);
          navigate("/");
        })
        .catch((error) => {
          alert("Usuário ou senha inválidos!");
        });
    }

  
  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.h1}>DoutorSim</h1>
      <form className={styles.formularioLogin} onSubmit={formHandler}>
        <input
          className={styles.input}
          ref={emailRef}
          type="text"
          placeholder="Usuário"
          id="input-usuario"
        />
        <input
          className={styles.input}
          ref={passwordRef}
          type="password"
          placeholder="Senha"
          id="input-senha"
        />
        <button className={styles.button} type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;