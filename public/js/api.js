// public/js/api.js
class ApiService {
  static async request(endpoint, method = 'GET', data = null) {
    const url = `http://tu-api.com${endpoint}`;
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en la solicitud');
    }

    return response.json();
  }

  // Métodos específicos
  static getMedicos() {
    return this.request('/medicos');
  }

  static getPacientes() {
    return this.request('/pacientes');
  }

  static async login(credentials) {
    const response = await fetch('http://tu-api.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en el login');
    }

    return response.json();
  }
}