function ContainerHorarios(props){

    const containerStyle = {
        overflowY: 'scroll',
        height: '300px',
        border: '1px solid #ccc', 
        borderRadius: '5px', 
        padding: '5px', 
        width: "300px"
    }

    return(
        <div style={containerStyle} >
            {props.children}
        </div>
    );

}

export default ContainerHorarios;