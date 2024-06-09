document.addEventListener("DOMContentLoaded", function() {
  let formLogin = document.getElementById('formlogin');
  if (formLogin) {
      formLogin.addEventListener("submit", function(event) {
          event.preventDefault();
          localStorage.setItem("sesionIniciada", "true");
          localStorage.setItem("nombredeusuario", document.getElementById("guardarusuario").value);
          
          window.location.href = "index.html";
      });
  }

  const sesionIniciada = localStorage.getItem("sesionIniciada");
  const nombreDeUsuario = localStorage.getItem("nombredeusuario");

  if (sesionIniciada === "true" && nombreDeUsuario) {
      document.getElementById("nombreusuario").textContent = `${nombreDeUsuario}`;
  }
});

function redireccionarAlLogin() {
  const sesionIniciada = localStorage.getItem("sesionIniciada");
  if (!sesionIniciada && window.location.pathname !== "/login.html") {
      window.location.href = "login.html";
  }
}

if (window.location.pathname !== "/login.html") {
  redireccionarAlLogin();
}