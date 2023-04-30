import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from './Home.module.css'

function Home(){
    
    const navigate = useNavigate();
    const [nomeMedico, setNomeMedico] = useState('');
    const data = new Date().toLocaleString()

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }

        axios
          .post("/buscarMedico", {
            token: localStorage.getItem('token'),
          })
          .then((response) => {
            setNomeMedico(response.data);
          }).catch((error) => {
            if(error.response.status === 401){
              navigate("/login");
            }
          });
    },[])
    
    return (
      <div className={styles.container}>
        <h2 className={styles.h2}>Bem vindo(a), {nomeMedico}!</h2>
        <h3 className={styles.h3}>{data}</h3>
      </div>
    );
}

export default Home;