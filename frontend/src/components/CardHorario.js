import styles from './CardHorario.module.css'

function CardHorario(props){
  return (
    <div className={styles.container}>
      <p className={styles.date}>Horário: {props.hora}</p>
      <p className={styles.patient}>Paciente: {props.paciente}</p>
    </div>
  );
}

export default CardHorario;