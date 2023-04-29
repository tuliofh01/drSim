const connection = require('./connection')

async function autenticarLogin(user, password){
    const usersArray = await connection.query(`SELECT * FROM USUARIOS WHERE USERNAME = '${user}' 
    AND PASSWORD = '${password}'`);

    if (usersArray[0].length > 0) {
      return true;
    } else {
      return false;
    }
}

async function buscarPaciente(medico, nome){
    const patientsArray =
      await connection.query(`SELECT * FROM PACIENTES WHERE USER_MEDICO = '${medico}' 
    AND NOME = '${nome}'`);

    if (patientsArray[0].length > 0) {
      return patientsArray;
    } else {
      return false;
    }
}

async function buscarMedico(medico){
  const nomeMedico = await connection.query(`SELECT NOME FROM USUARIOS WHERE USERNAME = '${medico}'`);
  return nomeMedico[0][0]["NOME"];
}

function criarPaciente(nome, endereco, telefone, medico) {
  connection.query(
    `INSERT INTO PACIENTES (USER_MEDICO, NOME, ENDERECO, TELEFONE) VALUES("${medico}", "${nome}", "${endereco}", "${telefone}")`
  );
}

async function buscarConsultas(data, medico){
    const consultasArray = await connection.query(
      `SELECT * FROM CONSULTAS WHERE USER_MEDICO = '${medico}' AND DATA LIKE '${data}%'`
    );

    if (consultasArray[0].length > 0) {
      return consultasArray[0];
    } else {
      return false;
    }
}

function criarConsulta(medico, nomePaciente, data){
    connection.query(
      `INSERT INTO CONSULTAS (USER_MEDICO, NOME_PACIENTE, DATA) VALUES("${medico}", "${nomePaciente}", "${data}")`
    );
}

function atualizarPaciente(idPaciente, remedios, anotacoes){
    connection.query(
      `UPDATE PACIENTES SET REMEDIOS = "${remedios}", ANOTACOES = "${anotacoes}" WHERE ID = "${idPaciente}"`
    )
}

module.exports = {
    autenticarLogin: autenticarLogin,
    buscarPaciente: buscarPaciente,
    buscarConsultas: buscarConsultas,
    criarPaciente: criarPaciente,
    criarConsulta: criarConsulta,
    atualizarPaciente: atualizarPaciente,
    buscarMedico: buscarMedico
}