/* Gestión del objeto Médico
	array       : medicos[]
	almacenamos : localStorage
	métodos     : ABM          */

var medicos = [];

/* Inicializamos un almacenamiento local */
function medicos_inicializar() {
	if (localStorage.getItem("medicos") === null)
		localStorage.setItem("medicos", "");
	else {
		var datos = localStorage.getItem("medicos");
		if (datos != "")
			medicos = JSON.parse(datos);
	}
}

/* Métodos auxiliares */
function medicos_buscarPos(id) {
	for (var pos = 0; pos < medicos.length; pos++)
		if (id == medicos[pos].Id)
			return pos;
	return -1;
}

function medicos_limpiarCampos() {
	$("#medico_id").val("");
	$("#medico_nombre").val("");
	$("#medico_especialidad").val([]);
	$("#medicos_lista").val([]);
	$("#medico_id").focus();
}

/*ABM de Médicos*/
function medicos_alta() {
	var id = $("#medico_id").val();
	var pos = medicos_buscarPos(id);
	if (pos < 0) {
		var id = $("#medico_id").val();
		var nombre = $("#medico_nombre").val();
		var especialidad_pos = $("#medico_especialidad").prop("selectedIndex");
		var especialidad_id = especialidades[especialidad_pos].Id;
		var medico = {
			Id: id,
			Nombre: nombre,
			IdEspecialidad: especialidad_id
		};
		medicos[medicos.length] = medico;
		medicos_listar();

		/* actualizamos el almacenamiento local */
		localStorage.setItem("medicos", JSON.stringify(medicos));
	}
	else
		alert("Ya existe un médico con el id " + id + ".");
}

function medicos_baja() {
	var id = $("#medico_id").val();
	var pos = medicos_buscarPos(id);
	if (pos < 0)
		alert("No se encuentra un medico con el id " + id + ".");
	else {
		medicos.splice(pos, 1);
		medicos_limpiarCampos();
		medicos_listar();
		/* actualizamos el almacenamiento local */
		localStorage.setItem("medicos", JSON.stringify(medicos));
	}
}

function medicos_modificar() {
	var id = $("#medico_id").val();
	var pos = medicos_buscarPos(id);
	if (pos < 0)
		alert("No se encuentra un médico con el id " + id + ".");
	else {
		var id = $("#medico_id").val();
		var nombre = $("#medico_nombre").val();
		var especialidad_pos = $("#medico_especialidad").prop("selectedIndex");
		var especialidad_id = especialidades[especialidad_pos].Id;
		var medico = {
			Id: id,
			Nombre: nombre,
			IdEspecialidad: especialidad_id
		};
		medicos[pos] = medico;
		medicos_listar();
		/* actualizamos el almacenamiento local */
		localStorage.setItem("medicos", JSON.stringify(medicos));
	}
}

function medicos_seleccionar() {
	var pos = $("#medicos_lista").prop("selectedIndex");
	if (pos >= 0) {
		var medico = medicos[pos];
		$("#medico_id").val(medico.Id);
		$("#medico_nombre").val(medico.Nombre);
		var idEspecialidad = medico.IdEspecialidad;
		var posEspecialidad = especialidades_buscarPos(idEspecialidad);
		$("#medico_especialidad").prop("selectedIndex", posEspecialidad);
	}
}

function medicos_listar() {
	var medicos_lista = $("#medicos_lista");
	medicos_lista.empty();
	for (var pos = 0; pos < medicos.length; pos++) {
		var medico = medicos[pos];
		var id = medico.Id;
		var nombre = medico.Nombre;
		var especialidad_id = medico.IdEspecialidad;
		var especialidad_pos = especialidades_buscarPos(especialidad_id);
		var especialidad = especialidades[especialidad_pos];
		var especialidad_nombre = especialidad.Nombre;
		var texto = id + " " + nombre + " " + especialidad_nombre;
		medicos_lista.append("<option>" + texto + "</option>");
	}
}