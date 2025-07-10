// URLs de las APIs
const API_PACIENTES = "http://localhost:3000/api/v1/pacientes";
const API_MEDICOS = "http://localhost:3000/api/v1/medicos";

function cargarMedicosPorEspecialidad() {
  fetch(API_MEDICOS)
    .then(res => res.json())
    .then(data => {
      const medicos = data.data;
      const especialidades = {};
      
      // Contar médicos por especialidad
      medicos.forEach(medico => {
        // Acceder al nombre de la especialidad según la estructura mostrada
        const nombreEspecialidad = medico.especialidad?.nombreEspecialidad || 'Sin especialidad';
        especialidades[nombreEspecialidad] = (especialidades[nombreEspecialidad] || 0) + 1;
      });
      
      // Ordenar por cantidad (mayor a menor)
      const especialidadesOrdenadas = Object.entries(especialidades)
        .sort((a, b) => b[1] - a[1]);
      
      // Mostrar en el contenedor
      const container = document.getElementById('especialidades-container');
      container.innerHTML = '';
      
      especialidadesOrdenadas.forEach(([especialidad, cantidad]) => {
        const item = document.createElement('div');
        item.className = 'especialidad-item';
        item.innerHTML = `
          <span class="especialidad-name">${especialidad}</span>
          <span class="especialidad-count">${cantidad}</span>
        `;
        container.appendChild(item);
      });
    })
    .catch(error => {
      console.error("Error al cargar médicos:", error);
      document.getElementById('especialidades-container').innerHTML = `
        <div class="alert alert-danger">Error al cargar los datos de especialidades</div>
      `;
    });
}

// Cargar todos los datos del dashboard
document.addEventListener('DOMContentLoaded', function() {
  // Cargar datos para las cards y el gráfico
  Promise.all([
    fetch(API_PACIENTES).then(res => res.json()).then(data => data.data.length),
    fetch(API_MEDICOS).then(res => res.json()).then(data => data.data.length),
    // Simular datos de citas y emergencias (en un sistema real serían llamadas a API)
    Promise.resolve(42), // Citas
    Promise.resolve(8)   // Emergencias
  ])
  .then(([totalPacientes, totalMedicos, totalCitas, totalEmergencias]) => {
    // Actualizar cards
    document.getElementById('pacientes-count').textContent = totalPacientes;
    document.getElementById('medicos-count').textContent = totalMedicos;
    document.getElementById('citas-count').textContent = totalCitas;
    document.getElementById('emergencias-count').textContent = totalEmergencias;
    
    // Crear gráfico mejorado
    const ctx = document.getElementById('grafico').getContext('2d');
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Pacientes', 'Médicos'],
        datasets: [{
          label: 'Total registrados',
          data: [totalPacientes, totalMedicos],
          backgroundColor: [
            'rgba(76, 175, 80, 0.7)',  // Verde para pacientes
            'rgba(0, 91, 150, 0.7)'    // Azul para médicos
          ],
          borderColor: [
            'rgba(76, 175, 80, 1)',
            'rgba(0, 91, 150, 1)'
          ],
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.raw}`;
              }
            }
          },
          title: {
            display: true,
            text: 'Comparación de Pacientes y Médicos',
            font: {
              size: 16
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              stepSize: 50
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  })
  .catch(error => {
    console.error("Error al cargar datos:", error);
  });
  
  // Cargar médicos por especialidad
  cargarMedicosPorEspecialidad();
});