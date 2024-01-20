/* Gestión del objeto Especialidad
	array       : especialidades[]
	almacenamos : localStorage
	métodos     : ABM                */

var especialidades = [];

/* Inicializamos un almacenamiento local */
function especialidades_inicializar() {
	if (localStorage.getItem("especialidades") === null)
		localStorage.setItem("especialidades", "");
	else {
		var datos = localStorage.getItem("especialidades");
		if (datos != "")
			especialidades = JSON.parse(datos);
	}
}

/* Métodos auxiliares */
function especialidades_buscarPos(id) {
	for (var pos = 0; pos < especialidades.length; pos++)
		if (id == especialidades[pos].Id)
			return pos;
	return -1;
}


/* Ordeno burbuja*/
function especialidades_Ordenadas() {
	var especialidadesOrdenadas = especialidades;
	for (var i = 0; i < especialidadesOrdenadas.length; i++)
		for (var j = 0; j < especialidadesOrdenadas.length - 1; j++) {
			if (especialidadesOrdenadas[j].Nombre > especialidadesOrdenadas[j + 1].Nombre) {
				auxEspecialidades = especialidadesOrdenadas[j];
				especialidadesOrdenadas[j] = especialidadesOrdenadas[j + 1];
				especialidadesOrdenadas[j + 1] = auxEspecialidades;
			}
		}
	especialidades_listar();
}

function especialidades_limpiarCampos() {
	$("#especialidad_id").val("");
	$("#especialidad_nombre").val("");
	$("#especialidades_lista").val([]);
	$("#especialidad_id").focus();
}

/* ABM de especialidades */
function especialidades_alta() {
	var id = $("#especialidad_id").val();
	var pos = especialidades_buscarPos(id);
	if (pos < 0) {
		var id = $("#especialidad_id").val();
		var nombre = $("#especialidad_nombre").val();
		var especialidad = {
			Id: id,
			Nombre: nombre
		};
		especialidades[especialidades.length] = especialidad;
		especialidades_listar();

		/* Actualizamos almacenamiento local */
		localStorage.setItem("especialidades", JSON.stringify(especialidades));
	}
	else
		alert("Ya existe una especialidad con el id " + id + ".");
}

function especialidades_baja() {
	var id = $("#especialidad_id").val();
	var pos = especialidades_buscarPos(id);
	if (pos < 0)
		alert("No se encuentra una especialidad con el id " + id + ".");
	else {
		especialidades.splice(pos, 1);
		especialidades_limpiarCampos();
		especialidades_listar();

		/* Actualizamos almacenamiento local */
		localStorage.setItem("especialidades", JSON.stringify(especialidades));
	}
}

function especialidades_modificar() {
	var id = $("#especialidad_id").val();
	var pos = especialidades_buscarPos(id);
	if (pos < 0)
		alert("No se encuentra una especialidad con el id " + id + ".");
	else {
		var id = $("#especialidad_id").val();
		var nombre = $("#especialidad_nombre").val();
		var especialidad = {
			Id: id,
			Nombre: nombre
		};
		especialidades[pos] = especialidad;
		especialidades_listar();

		/* Actualizamos almacenamiento local */
		localStorage.setItem("especialidades", JSON.stringify(especialidades));
	}
}

function especialidades_seleccionar() {
	var pos = $("#especialidades_lista").prop("selectedIndex");
	if (pos >= 0) {
		var especialidad = especialidades[pos];
		$("#especialidad_id").val(especialidad.Id);
		$("#especialidad_nombre").val(especialidad.Nombre);
	}
}

function especialidades_listar() {
	var especialidades_lista = $("#especialidades_lista");
	var medico_especialidad = $("#medico_especialidad");

	especialidades_lista.empty();
	medico_especialidad.empty();

	for (var pos = 0; pos < especialidades.length; pos++) {
		var especialidad = especialidades[pos];
		var id = especialidad.Id;
		var nombre = especialidad.Nombre;
		var texto = id + "  " + nombre;
		var elemento = "<option>" + texto + "</option>";
		especialidades_lista.append(elemento);
		medico_especialidad.append(elemento);
	}
	medicos_listar();
}