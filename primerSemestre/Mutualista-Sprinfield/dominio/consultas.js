/* Gestión del objeto Consulta
	array       : consultas[]
	almacenamos : localStorage
	métodos     : ABM           */

var consultas = [];

/* Inicializamos un almacenamiento local */
function consultas_inicializar() {
	if (localStorage.getItem("consultas") === null)
		localStorage.setItem("consultas", "");
	else {
		var datos = localStorage.getItem("consultas");
		if (datos != "")
			consultas = JSON.parse(datos);
	}
}

/* Métodos auxiliares */
function consultas_buscarPos(id) {
	for (var pos = 0; pos < consultas.length; pos++)
		if (id == consultas[pos].Id)
			return pos;
	return -1;
}

function consultas_limpiarCampos() {
	$("#consulta_id").val("");
	$("#consulta_paciente").val([]);
	$("#consulta_medico").val([]);
	$("#consulta_fecha").val("");
	$("#consulta_turno").val("");
	$("#consultas_lista").val([]);
	$("#consulta_id").focus();
}

/* ABM de consultas */
function consultas_alta() {
	var id = $("#consulta_id").val();
	var pos = consultas_buscarPos(id);
	if (pos < 0) {
		var id = $("#consulta_id").val();
		var paciente_pos = $("#consulta_paciente").prop("selectedIndex");
		var paciente_id = pacientes[paciente_pos].Id;
		var medico_pos = $("#consulta_medico").prop("selectedIndex");
		var medico_id = medicos[medico_pos].Id;
		var fecha = $("#consulta_fecha").val();
		var turno = $("#consulta_turno").val();

		var consulta = {
			Id: id,
			IdPaciente: paciente_id,
			IdMedico: medico_id,
			Fecha: fecha,
			Turno: turno
		};
		consultas[consultas.length] = consulta;
		consultas_listar();

		/* Actualizamos almacenamiento local */
		localStorage.setItem("consultas", JSON.stringify(consultas));
	}
	else
		alert("Ya existe una consulta con el id " + id + ".");
}

function consultas_baja() {
	var id = $("#consulta_id").val();
	var pos = consultas_buscarPos(id);
	if (pos < 0)
		alert("No se encuentra una consulta con el id " + id + ".");
	else {
		consultas.splice(pos, 1);
		consultas_limpiarCampos();
		consultas_listar();

		/* Actualizamos almacenamiento local  */
		localStorage.setItem("consultas", JSON.stringify(consultas));
	}
}

function consultas_modificar() {
	var id = $("#consulta_id").val();
	var pos = consultas_buscarPos(id);
	if (pos < 0)
		alert("No se encuentra una consulta con el id " + id + ".");
	else {
		var id = $("#consulta_id").val();
		var paciente_pos = $("#consulta_paciente").prop("selectedIndex");
		var paciente_id = pacientes[paciente_pos].Id;
		var medico_pos = $("#consulta_medico").prop("selectedIndex");
		var medico_id = medicos[medico_pos].Id;
		var fecha = $("#consulta_fecha").val();
		var turno = $("#consulta_turno").val();
		var consulta = {
			Id: id,
			IdPaciente: paciente_id,
			IdMedico: medico_id,
			Fecha: fecha,
			Turno: turno
		};
		consultas[pos] = consulta;
		consultas_listar();

		/* Actualizamos almacenamiento local */
		localStorage.setItem("consultas", JSON.stringify(consultas));
	}
}

function consultas_seleccionar() {
	var pos = $("#consultas_lista").prop("selectedIndex");
	if (pos >= 0) {
		var consulta = consultas[pos];
		$("#consulta_id").val(consulta.Id);
		var paciente_id = consulta.IdPaciente;
		var paciente_pos = pacientes_buscarPos(paciente_id);
		$("#consulta_paciente").prop("selectedIndex", paciente_pos);
		var medico_id = consulta.IdMedico;
		var medico_pos = medicos_buscarPos(medico_id);
		$("#consulta_medico").prop("selectedIndex", medico_pos);
		$("#consulta_fecha").val(consulta.Fecha);
		$("#consulta_turno").val(consulta.Turno);
	}
}

function consultas_listar() {
	var consultas_lista = $("#consultas_lista");
	consultas_lista.empty();

	for (var pos = 0; pos < consultas.length; pos++) {
		var consulta = consultas[pos];
		var id = consulta.Id;
		var paciente_id = consulta.IdPaciente;
		var paciente_pos = pacientes_buscarPos(paciente_id);
		var paciente = pacientes[paciente_pos];
		var paciente_nombre = paciente.Nombre;
		var medico_id = consulta.IdMedico;
		var medico_pos = medicos_buscarPos(medico_id);
		var medico = medicos[medico_pos];
		var medico_nombre = medico.Nombre;
		var fecha = consulta.Fecha;
		var turno = consulta.Turno;
		var texto = id + " " + paciente_nombre + " " + medico_nombre + " " + fecha + " " + turno;
		consultas_lista.append("<option>" + texto + "</option>");
	}
}

/* Listado de relación  */
function medicosConsulta_listar() {
	var consulta_medico = $("#consulta_medico");
	consulta_medico.empty();
	for (var pos = 0; pos < medicos.length; pos++) {
		var medico = medicos[pos];
		var id = medico.Id;
		var nombre = medico.Nombre;
		var especialidad_id = medico.IdEspecialidad;
		var especialidad_pos = especialidades_buscarPos(especialidad_id);
		var especialidad = especialidades[especialidad_pos];
		var especialidad_nombre = especialidad.Nombre;
		var texto = id + " " + nombre + " " + especialidad_nombre;
		consulta_medico.append("<option>" + texto + "</option>");
	}
}