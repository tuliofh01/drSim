import styles from './ContainerPaciente.module.css'

function ContainerPacientes(props){

    return(
        <div className={styles.container}>{props.children}</div>
    )

}

export default ContainerPacientes;