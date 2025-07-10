(function () {
  'use strict';

  const publicPages = ['login.html'];
  const currentPage = window.location.pathname.split('/').pop();

  if (!publicPages.includes(currentPage)) {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      console.error('Acceso no autorizado - Redirigiendo a login');
      window.location.href = 'login.html';
      return;
    }

    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      if (tokenPayload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html?error=token_expired';
      }
    } catch (e) {
      console.error('Error al verificar token:', e);
    }
  }

  window.logout = function () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  };
})();