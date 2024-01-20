function inicializar() {
	especialidades_inicializar();
	medicos_inicializar();
	pacientes_inicializar();
	consultas_inicializar();
	inicializar1();
	inicializar2();
}

//
// 1) Dado un paciente, mostrar la fecha y el turno que tiene.
//

function inicializar1() {

	var lista = $("#pacientes");
	//lista.empty();

	for (var pos = 0; pos < pacientes.length; pos++) {
		var paciente = pacientes[pos];
		var id = paciente.Id;
		var nombre = paciente.Nombre;
		texto = id + " " + nombre;
		lista.append("<option>" + texto + "</option>");
	}
}

function ejercicio1() {
	$("#ejercicio1").html(resultado1());
}

function resultado1() {
	var paciente_pos = $("#pacientes").prop("selectedIndex");
	var paciente_id = pacientes[paciente_pos].Id;

	for (var i = 0; i < consultas.length; i++) {
		var consulta = consultas[i];
		if (paciente_id == consulta.IdPaciente)
			return "fecha " + consulta.Fecha + " y turno " + consulta.Turno;
	}
	return "No agendó consulta.";
}

//
// 2) Dado un médico, mostrar todos los pacientes que atiende.
//

function inicializar2() {
	var lista = $("#medicos");
	lista.empty();
	for (var pos = 0; pos < medicos.length; pos++) {
		var medico = medicos[pos];
		var id = medico.Id;
		var nombre = medico.Nombre;
		var especialidad_id = medico.IdEspecialidad;
		var especialidad_pos = especialidades_buscarPos(especialidad_id);
		var especialidad_nombre = especialidades[especialidad_pos].Nombre;
		var texto = id + " " + nombre + " " + especialidad_nombre;
		lista.append("<option>" + texto + "</option>");
	}
}

function ejercicio2() {
	$("#ejercicio2").html(resultado2());
}

function resultado2() {
	var medico_pos = $("#medicos").prop("selectedIndex");
	var medico_id = medicos[medico_pos].Id;
	var html = "";
	for (var pos = 0; pos < consultas.length; pos++) {
		var consulta = consultas[pos];
		if (medico_id == consulta.IdMedico) {
			var paciente_id = consulta.IdPaciente;
			var paciente_pos = pacientes_buscarPos(paciente_id);
			var paciente = pacientes[paciente_pos];
			var paciente_nombre = paciente.Nombre;
			html += paciente_id + " " + paciente_nombre + "<br>";
		}
	}
	if (html == "")
		return "No tiene pacientes.";
	else
		return html;
}

function ejercicio3() {
	$("#ejercicio3").html(resultado3());
}

function resultado3() {
	var turno_pos = $("#turno").prop("selectedIndex");
	var turno = consultas[turno_pos];
	var html = "";
	for (var pos = 0; pos < consultas.length; pos++) {
		var consulta = consultas[pos];
		if (turno.Turno == consulta.Turno) {
			var paciente_id = consulta.IdPaciente;
			var paciente_pos = pacientes_buscarPos(paciente_id);
			var paciente = pacientes[paciente_pos];
			var paciente_nombre = paciente.Nombre;
			html += paciente_id + " " + paciente_nombre + "<br>";
		}
	}
	if (html == "")
		return "No tiene pacientes.";
	else
		return html;
}

function ejercicio4() {
	var numEspecialidades = especialidades.length;

	var consultasxespecialidad = [];
	for (var i = 0; i < numEspecialidades; i++) {
		consultasxespecialidad[i] = 0;
	}

	for (var pos = 0; pos < consultas.length; pos++) {
		var idMedico = consultas[pos].IdMedico;
		var posMedico = medicos_buscarPos(idMedico);

		var medico = medicos[posMedico];
		var idEspecialidad = medico.IdEspecialidad;

		var posEspecialidad = especialidades_buscarPos(idEspecialidad);

		consultasxespecialidad[posEspecialidad]++;
	}

	var posMayor = 0;
	var valorMayor = consultasxespecialidad[0];
	for (var i = 1; i < numEspecialidades; i++)
		if (consultasxespecialidad[i] > valorMayor) {
			posMayor = i;
			valorMayor = consultasxespecialidad[i];
		}

	var especialidad = especialidades[posMayor];
	var nombreEspecialidad = especialidad.Nombre;

	alert("La especialidad con más consultas es " + nombreEspecialidad);
}


