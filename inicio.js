const correo = "juankis@gmail.com"
const contraseña = "naruto123"
/***********************************************************
 * La entrada al parqueadero
 *********************************************************************/
const entrar = document.querySelector("#entrar_parqueo")
entrar.addEventListener("click",bienvenido)
function bienvenido(){
 const correo_juan = document.querySelector(".correo_")
 const contra_juan = document.querySelector(".contraseña")
 if(correo_juan.value === correo && contra_juan.value === contraseña){
   console.log("hay vamos")
   console.log(correo_juan.value)
   const generar =  document.querySelector(".anuncio")
   generar.innerHTML = `
   <div class="aceptar">
        <div class="fondo">
            <h1>Bienvenido Juan Mariño</h1>
            <a href="menu.html"><button id="salir">Entrar</button></a>
        </div>

    </div>
    <style>
    .aceptar{
        position:absolute;
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content:center;
        align-items: center;
        color: black;
    }
    .contenedor{
        display: none;
    }
    .fondo{
        border-radius: 10px;
        border: black solid 2px;    
        height: 30vh;
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content:center;
        align-items: center;
        background: white;
    }
    </style>
   `
   
 }else{
   alert("Datos invalidos")
 }
}