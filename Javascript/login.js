document.addEventListener("DOMContentLoaded", function() {
  //Si formlogin esta cargado te deja iniciar sesión y guarda el nombre de usuario en el local storage
  let formLogin = document.getElementById('formlogin');
  if (formLogin) {
      formLogin.addEventListener("submit", function(event) {
          event.preventDefault();
          localStorage.setItem("sesionIniciada", "true");
          localStorage.setItem("nombredeusuario", document.getElementById("guardarusuario").value);
          
          window.location.href = "index.html";
      });
  }
//añade el nombre de usuario a la navbar
  const sesionIniciada = localStorage.getItem("sesionIniciada");
  const nombreDeUsuario = localStorage.getItem("nombredeusuario");

  if (sesionIniciada === "true" && nombreDeUsuario) {
      document.getElementById("nombreusuario").textContent = `${nombreDeUsuario}`;
  }
});
//funcion para que si no estas logueado te devuelva a la pagina de logín, y use los if para que no se recargue inifitamente
function redireccionarAlLogin() {
  const sesionIniciada = localStorage.getItem("sesionIniciada");
  if (!sesionIniciada && window.location.pathname !== "login.html") {
      window.location.href = "login.html";
  }
}

if (window.location.pathname !== "login.html") {
  redireccionarAlLogin();
}