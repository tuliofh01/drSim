import styles from './Agenda.module.css'

import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

import axios from 'axios';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CardHorario from '../components/CardHorario'
import ContainerHorarios from '../components/ContainerHorarios'

function Agenda(){

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const [consultas, setConsultas] = useState([]);

  function calendarHandler(date){
    const dateString = new Date(date).toISOString().split("T")[0]

    axios.post("/buscarConsultas", {
      token: localStorage.getItem('token'),
      data: dateString
    }).then((response) => (
      setConsultas(response.data)
    )).catch((error) => {
      if (error.response.status === 401) {
        navigate("/login");
      }
      else if(error.response.status === 404){
        setConsultas([]);
      }
    })
    
    console.log(consultas)
  }

  return (
    <div className={styles.container}>
      <div className={styles.calendarContainer}>
        <h3>Calendário:</h3>
        <Calendar
          locale={navigator.language}
          className="calendar"
          onClickDay={calendarHandler}
        />
      </div>

      <div className={styles.containerHorarios}>
        <h3>Resultados:</h3>
        <ContainerHorarios>
          {consultas.map((consulta) => (
            <CardHorario
              paciente={consulta.NOME_PACIENTE}
              hora={consulta.DATA.split("T")[1].slice(0, 5)}
            />
          ))}
        </ContainerHorarios>
      </div>
    </div>
  );

}

export default Agenda;