const API_MEDICOS = "http://localhost:3000/api/v1/medicos";
const API_ESPECIALIDADES = "http://localhost:3000/api/v1/especialidades";

let especialidades = [];
let modalMedico;

document.addEventListener("DOMContentLoaded", () => {
  modalMedico = new bootstrap.Modal(document.getElementById("modalMedico"));
  //checkAuth();
  cargarEspecialidades();
  cargarMedicos();
});

async function cargarEspecialidades() {
  const res = await fetch(API_ESPECIALIDADES);
  const json = await res.json();
  especialidades = json.data;

  const select = document.getElementById("idEspecialidad");
  select.innerHTML = `<option value="">Seleccione</option>`;

  especialidades.forEach(e => {
    const option = document.createElement("option");
    option.value = e.idEspecialidad;
    option.textContent = e.nombreEspecialidad;
    select.appendChild(option);
  });
}

async function cargarMedicos() {
  const res = await fetch(API_MEDICOS);
  const json = await res.json();
  const medicos = json.data;

  const tabla = document.getElementById("tablaMedicos");
  tabla.innerHTML = "";

  medicos.forEach(m => {
   const fila = `
  <tr>
    <td>${m.nombres} ${m.apellidoPaterno} ${m.apellidoMaterno}</td>
    <td>${m.tipoDocumento || "---"}</td>
    <td>${m.numeroDocumento}</td>
    <td>${m.telefono || "---"}</td>
    <td>${m.direccion || "---"}</td>
    <td>${m.especialidad?.nombreEspecialidad || "---"}</td>
    <td>
      <button class="btn btn-sm btn-warning" onclick='editarMedico(${JSON.stringify(m)})'>Editar</button>
      <button class="btn btn-sm btn-danger" onclick="eliminarMedico(${m.idMedico})">Eliminar</button>
    </td>
  </tr>
`;
    tabla.innerHTML += fila;
  });
}

function mostrarFormularioMedico() {
  document.getElementById("idMedico").value = "";
  [
    "nombreMedico",
    "apellidoPaternoMedico",
    "apellidoMaternoMedico",
    "tipoDocumentoMedico",
    "numeroDocumentoMedico",
    "direccionMedico",
    "telefonoMedico",
    "idEspecialidad"
  ].forEach(id => document.getElementById(id).value = "");

  modalMedico.show();
}

function cerrarFormularioMedico() {
  modalMedico.hide();
}

function editarMedico(m) {
  document.getElementById("idMedico").value = m.idMedico;
  document.getElementById("nombreMedico").value = m.nombres;
  document.getElementById("apellidoPaternoMedico").value = m.apellidoPaterno;
  document.getElementById("apellidoMaternoMedico").value = m.apellidoMaterno;
  document.getElementById("tipoDocumentoMedico").value = m.tipoDocumento || "";
  document.getElementById("numeroDocumentoMedico").value = m.numeroDocumento;
  document.getElementById("direccionMedico").value = m.direccion || "";
  document.getElementById("telefonoMedico").value = m.telefono || "";
  document.getElementById("idEspecialidad").value = m.especialidad?.idEspecialidad || "";

  modalMedico.show();
}

async function guardarMedico() {
  const id = document.getElementById("idMedico").value;

  const medico = {
    nombres: document.getElementById("nombreMedico").value,
    apellidoPaterno: document.getElementById("apellidoPaternoMedico").value,
    apellidoMaterno: document.getElementById("apellidoMaternoMedico").value,
    tipoDocumento: document.getElementById("tipoDocumentoMedico").value,
    numeroDocumento: document.getElementById("numeroDocumentoMedico").value,
    direccion: document.getElementById("direccionMedico").value,
    telefono: document.getElementById("telefonoMedico").value,
    especialidad: {
      idEspecialidad: document.getElementById("idEspecialidad").value
    }
  };

  const metodo = id ? "PUT" : "POST";
  const url = id ? `${API_MEDICOS}/${id}` : API_MEDICOS;

  try {
    await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(medico)
    });

    cerrarFormularioMedico();
    cargarMedicos();
  } catch (error) {
    console.error("Error al guardar médico:", error);
  }
}

async function eliminarMedico(id) {
  if (confirm("¿Seguro de eliminar este médico?")) {
    await fetch(`${API_MEDICOS}/${id}`, { method: "DELETE" });
    cargarMedicos();
  }
}
