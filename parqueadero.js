/*----------------------------------------------------------------------------------
LLAMADO DE REGISTRESE
-----------------------------------------------------------------------------------------*/
var regis = document.querySelector("#registro")
regis.addEventListener("click", registre_su_carro)


async function registre_su_carro() {
    const creador = document.querySelector(".container")
    creador.innerHTML = ""
    const contenido = document.createElement("section")
    contenido.className = "datos"
    contenido.innerHTML =  `<h1>vamos</h1>`
    creador.appendChild(contenido)
}
//----------------------------------------------------------------------------------------------------
/*----------------------------------------------------------------------------------
LLAMADO DE Tarifas
-----------------------------------------------------------------------------------------*/
var tarifa = document.querySelector("#tarifa")
tarifa.addEventListener("click", tarifas_vehiculos)


async function tarifas_vehiculos() {
    const creador = document.querySelector(".container")
    creador.innerHTML = ""
    const contenido = document.createElement("section")
    contenido.className = "datos"
    contenido.innerHTML =  `<div class="precios">
        <div class = "separador">
        
    </div>  `
    creador.appendChild(contenido)
}
//----------------------------------------------------------------------------------------------------
/*----------------------------------------------------------------------------------
LLAMADO DE Zona de pago
-----------------------------------------------------------------------------------------*/
var zona = document.querySelector("#zona_pago")
zona.addEventListener("click", zona_de_pago)


async function zona_de_pago() {
    const creador = document.querySelector(".container")
    creador.innerHTML = ""
    const contenido = document.createElement("section")
    contenido.className = "datos"
    contenido.innerHTML =  `<h1>terminamos</h1>`
    creador.appendChild(contenido)
}
//----------------------------------------------------------------------------------------------------
/*----------------------------------------------------------------------------------
LLAMADO DE administrador
-----------------------------------------------------------------------------------------*/
var administrador = document.querySelector("#admin")
administrador.addEventListener("click", jefe)


async function jefe() {
    const creador = document.querySelector("body")
    creador.innerHTML =  `
     
    <video src="./imagenes/fondo.mp4" autoplay loop class="fondo"></video>
    <div id="salido">
        <button id="salir">salir</button>
    </div
<section>
    <div class="registro">
        <input type="email" placeholder="juanito@gmail.com">
        <input type="password" placeholder="Ingrese su contraseña">    
        <button>Iniciar sesion</button> 
    </div>    
</section>
<style>
body{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    }
<style>
`
}