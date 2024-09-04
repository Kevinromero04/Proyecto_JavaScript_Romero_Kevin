
/*----------------------------------------------------------------------------------
LLAMADO DE REGISTRESE
-----------------------------------------------------------------------------------------*/
var regis = document.querySelector("#registro")
regis.addEventListener("click", registre_su_carro)


async function registre_su_carro() {
    const creador = document.querySelector(".container")
    creador.innerHTML = ""
    const contenido = document.createElement("section")
    contenido.className = "registro"
    contenido.innerHTML = `
    <div class="cuadro2">
    </div>
    `
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
    contenido.className = "cuotas2"
    contenido.innerHTML = `
    <div class="cuadro">
    <div class="cuadrito">
        <img src="https://es.nissanusa.com/content/dam/Nissan/us/experience_nissan/newsevents/skyline-to-gt-r/2024-nissan-gtr-special-edition.png.ximg.l_8_m.smart.png" alt="">
        <div class="separador">
          <p>Carros</p>
          <p>Tarifa: 2000 por hora</p>  
        </div>
    </div>
    <div class="cuadrito">
        <img id="moto" src="https://images.ctfassets.net/x7j9qwvpvr5s/8nQX26ft2Sk1Jzk3xQI93/d4b3009d2899e57000d1189e9b8c29a7/Model-Menu-MY22-MTS-V4-S-Wh.png" alt="">
        <div class="separador">
          <p>Motos</p>
          <p>Tarifa: 1000 por hora</p>  
        </div>
    </div>
    <div class="cuadrito">
        <img id="bici" src="https://ebike.es/wp-content/uploads/2021/01/76502540.jpg" alt="">
        <div class="separador">
          <p>Bicilietas</p>
          <p>Tarifa: 500 por hora</p>  
        </div>
    </div>
    <div class="cuadrito">
      <img id="mulas" src="https://comercializadorainnovalux.com/wp-content/uploads/2021/09/T_800_Camarote.png" alt="">
      <div class="separador">
        <p>Mulas</p>
        <p>Tarifa: 4000 por hora</p>  
      </div>
  </div>
</div>


    `
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
    contenido.innerHTML = `<h1>terminamos</h1>`
    creador.appendChild(contenido)
}
//----------------------------------------------------------------------------------------------------
