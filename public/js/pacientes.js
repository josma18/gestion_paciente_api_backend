const API_URL = "http://localhost:3000/api/v1/pacientes";

// Cargar pacientes y mostrarlos en la tabla
async function cargarPacientes() {
  try {
    const res = await fetch(API_URL);
    const respuesta = await res.json();
    const pacientes = respuesta.data; // ✅ Asegúrate de acceder a .data

    const tabla = document.getElementById("tablaPacientes");
    tabla.innerHTML = "";

    pacientes.forEach((p) => {
      const fila = `
        <tr>
          <td>${p.nombres} ${p.apellidoPaterno} ${p.apellidoMaterno}</td>
          <td>${p.tipoDocumento}</td>
          <td>${p.numeroDocumento}</td>
          <td>${p.sexo}</td>
          <td>${p.telefono || ''}</td>
          <td>${p.correo || ''}</td>
          <td>${p.direccion || ''}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick='editarPaciente(${JSON.stringify(p)})'>Editar</button>
            <button class="btn btn-danger btn-sm" onclick="eliminarPaciente(${p.idPaciente})">Eliminar</button>
          </td>
        </tr>
      `;
      tabla.innerHTML += fila;
    });

  } catch (error) {
    console.error("Error al cargar pacientes:", error);
  }
}

// Mostrar formulario vacío
function mostrarFormulario() {
  document.getElementById("idPaciente").value = "";
  ["tipoDocumento", "numeroDocumento", "sexo", "nombres", "apellidoPaterno", "apellidoMaterno", "fechaNacimiento", "telefono", "correo", "direccion"]
    .forEach(id => document.getElementById(id).value = "");
  modal.show();
}

// Cerrar el modal
function cerrarFormulario() {
  modal.hide();
}

// Rellenar el formulario para editar
function editarPaciente(p) {
  document.getElementById("idPaciente").value = p.idPaciente;
  document.getElementById("tipoDocumento").value = p.tipoDocumento || "";
  document.getElementById("numeroDocumento").value = p.numeroDocumento;
  document.getElementById("sexo").value = p.sexo || "M";
  document.getElementById("nombres").value = p.nombres;
  document.getElementById("apellidoPaterno").value = p.apellidoPaterno;
  document.getElementById("apellidoMaterno").value = p.apellidoMaterno;
  document.getElementById("fechaNacimiento").value = p.fechaNacimiento?.split("T")[0];
  document.getElementById("telefono").value = p.telefono || "";
  document.getElementById("correo").value = p.correo || "";
  document.getElementById("direccion").value = p.direccion || "";
  modal.show();
}

// Guardar paciente (nuevo o editado)
async function guardarPaciente() {
  const id = document.getElementById("idPaciente").value;

  const paciente = {
    tipoDocumento: document.getElementById("tipoDocumento").value,
    numeroDocumento: document.getElementById("numeroDocumento").value,
    sexo: document.getElementById("sexo").value,
    nombres: document.getElementById("nombres").value,
    apellidoPaterno: document.getElementById("apellidoPaterno").value,
    apellidoMaterno: document.getElementById("apellidoMaterno").value,
    fechaNacimiento: document.getElementById("fechaNacimiento").value,
    telefono: document.getElementById("telefono").value,
    correo: document.getElementById("correo").value,
    direccion: document.getElementById("direccion").value
  };

  try {
    const metodo = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paciente)
    });

    cerrarFormulario();
    cargarPacientes();
  } catch (error) {
    console.error("Error al guardar paciente:", error);
  }
}

// Eliminar paciente
async function eliminarPaciente(id) {
  if (confirm("¿Seguro de eliminar este paciente?")) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      cargarPacientes();
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
    }
  }
}
