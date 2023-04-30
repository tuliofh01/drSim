import style from './CardPaciente.module.css'
import { Link } from 'react-router-dom';

function CardHorario(props){
  
  return (
    <div className={style.card}>
      <h2 className={style.cardTitle}>
        <Link
          style={{color: '#fff', colorVisited: '#fff'}}
          to={{pathname: `/perfilPaciente/${props.paciente.ID}`}}
          state={{patientData: props.paciente}}
        >
          {props.paciente.NOME}
        </Link>
      </h2>
      <p className={style.cardText}>Telefone: {props.paciente.TELEFONE}</p>
      <p className={style.cardText}>Endereço: {props.paciente.ENDERECO}</p>
    </div>
  );
}

export default CardHorario;