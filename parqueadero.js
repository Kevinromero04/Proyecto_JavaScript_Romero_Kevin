
/*----------------------------------------------------------------------------------
LLAMADO DE REGISTRESE
-----------------------------------------------------------------------------------------*/
var regis = document.querySelector("#registro")
regis.addEventListener("click", registre_su_vehivulo)


async function registre_su_vehivulo() {
  const creador = document.querySelector(".container")
  
  creador.innerHTML = `
    <button id="pago">mostrar vehiculos no pagos</button>
`

  const contenido = document.createElement("section")
  contenido.className = "registro"
  contenido.innerHTML = `
                <div class="cuadro2">
                <form  action="on"></form>
                <div class="separador_form">
                  <h4>Placa</h4>
                  <input type="text" class="boton_regis" id="registra_placa"  placeholder="Ejemplo: ABC-123">
                </div>
                <div class="separador_form">
                  <h4>Tipo</h4>
                  <div class="dropdown">
                    <button onclick="toggleDropdown()" class="dropbtn" id="boton_mostrar">Mostrar vehiculos</button>
                    <div id="myDropdown" class="dropdown-content">
                        <form id="cuadro_form">
                            <button id="op_carros" class="tamaño_boton">Carros</button>
                            <button id="op_motos" class="tamaño_boton">Motos</button>
                            <button id="op_mulas" class="tamaño_boton">Mulas</button>
                        </form>
                    </div>
                </div>
                </div>
                <div class="separador_form" id="modelo_html">
                  <h4>Modelo</h4>
                  <input type="text" class="boton_regis" id="registra_modelo" placeholder="Ejemplo: Chevrolet">
                </div>

                <div class="separador_form">
                  <h4>Espacio (hay 20 espacios)</h4>
                  <input type="text" class="boton_regis" id="registra_espacio" placeholder="A-1, A-50">
                </div>
                <button id="cargar_vehiculo">Registrar</button>
              </div>
            </div>
            <style>
              .registro{
                background: rgba(157, 157, 157, 0.975);
              }

              .no_pago{
                display: block;
              }
              .container{
                background: rgba(157, 157, 157, 0.975);
              }

            </style>
    `
    

  creador.appendChild(contenido);
  var activado = document.querySelector("#pago");

  activado.addEventListener("click", function (event) {
    event.preventDefault();
    mostrarVehiculosNoPagados();
  });

  let tipoVehiculo = null;

  var op_car = document.querySelector("#op_carros");
  op_car.addEventListener("click", function (event) {
    event.preventDefault();
    tipoVehiculo = "Carro";
  });

  var op_motor = document.querySelector("#op_motos");
  op_motor.addEventListener("click", function (event) {
    event.preventDefault();
    tipoVehiculo = "Moto";
  });

  var op_mula = document.querySelector("#op_mulas");
  op_mula.addEventListener("click", function (event) {
    event.preventDefault();
    tipoVehiculo = "Mula";
  });


  var registrarBtn = document.querySelector("#cargar_vehiculo");
  registrarBtn.addEventListener("click", function (event) {
    event.preventDefault();
    guardarDatosVehiculo(tipoVehiculo);

  });
}

function guardarDatosVehiculo(tipoVehiculo) {
  const placa = document.querySelector("#registra_placa")?.value;
  const modelo = document.querySelector("#registra_modelo")?.value;
  const espacio = document.querySelector("#registra_espacio")?.value.toUpperCase();
  const hora = new Date().toLocaleTimeString();
  console.log(placa)
  if (!placa || !modelo || !espacio || !tipoVehiculo) {
    alert("Todos los campos, incluido el tipo de vehículo, son obligatorios.");
    return;
  }

  if (!/^(A-(?:[1-9]|[1-4][0-9]|50))$/.test(espacio)) {
    alert("El espacio debe estar entre A-1 y A-50.");
    return;
  }
  if (!/^[A-Za-z]{3}-\d{3}$/.test(placa)) {
    alert("La placa debe tener el formato ABC-123 (tres letras seguidas - de tres números).");
    return;
}



  let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || {};

  for (let key in vehiculos) {
    if (vehiculos[key].placa === placa) {
      alert(`La placa ${placa} ya está registrada en otro espacio. Elija otra placa.`);
      return;
    }
  }


  if (vehiculos[espacio]) {
    alert(`El espacio ${espacio} ya está ocupado. Elija otro.`);
    return;
  }


  vehiculos[espacio] = {
    placa,
    modelo,
    tipo: tipoVehiculo,
    hora,
    pagado: false, 
    tiempoRegistro: new Date().getTime() 
  };

  localStorage.setItem("vehiculos", JSON.stringify(vehiculos));

  alert("Vehículo registrado con éxito.");
}



function mostrarVehiculosNoPagados() {
  let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || {};
  const contenedor = document.querySelector(".recien_regis");
  contenedor.innerHTML = "";

  let hayVehiculosNoPagados = false;


  for (let espacio in vehiculos) {
    if (vehiculos[espacio].pagado === false) {
      hayVehiculosNoPagados = true; 
      const { placa, modelo, tipo, hora } = vehiculos[espacio];
      contenedor.innerHTML += `
        <div class="no_han_pagado">
          <h4>Espacio: ${espacio}</h4>
          <p>Placa: ${placa}</p>
          <p>Modelo: ${modelo}</p>
          <p>Tipo: ${tipo}</p>
          <p>Hora de registro: ${hora}</p>
          <p>Estado de pago: No pagado</p>
          <button class="pagar_btn" data-espacio="${espacio}">Pagar</button>

        </div>

      <style>
      .no_pago{
        display: block;

        height: 100vh;

        background: rgba(157, 157, 157, 0.975);
      }
      .container{
          width: 100%; /* Toma el 100% del ancho del viewport */
          height: 100%;
          background: rgba(157, 157, 157, 0.975);

        }
      </style>
      `;
    }
  }
  if (hayVehiculosNoPagados === false) {
    return alert("ya todos han pagado");
  }

  document.querySelectorAll(".pagar_btn").forEach(button => {
    button.addEventListener("click", () => pagar(button.dataset.espacio));
  });
}

function pagar(espacio) {
  let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || {};
  const vehiculo = vehiculos[espacio];

  if (!vehiculo) {
    alert("No se encontró información para el espacio especificado.");
    return;
  }

  if (vehiculo.pagado) {
    alert("El vehículo ya ha sido pagado.");
    return;
  }

  const tiempoActual = new Date().getTime();
  const tiempoRegistro = vehiculo.tiempoRegistro;
  const tiempoTranscurrido = (tiempoActual - tiempoRegistro) / 1000; 
  let costo;
console.log("ya", tiempoRegistro)
console.log("casi",tiempoTranscurrido)
console.log("ya", tiempoActual)
console.log(vehiculo.tipo)
      switch (vehiculo.tipo) {
        case "Carro":
          costo = 0.5 * tiempoTranscurrido;
          console.log("Carro detectado");
          break;
        case "Moto":
          costo = 0.25 * tiempoTranscurrido; 
          console.log("Moto detectada");
          break;
        case "Mula":
          costo = 10 * tiempoTranscurrido; 
          console.log("Mula detectada");
          break;
        default:
          costo = 0;
          console.log("Tipo de vehículo no reconocido");
          break;
      }  alert(`El costo total es: ${costo} pesos`);

  vehiculo.pagado = true;
  localStorage.setItem("vehiculos", JSON.stringify(vehiculos));

  let vehiculosPagados = JSON.parse(localStorage.getItem("vehiculos_pagados")) || {};
  vehiculosPagados[espacio] = vehiculo;
  localStorage.setItem("vehiculos_pagados", JSON.stringify(vehiculosPagados));

  delete vehiculos[espacio];
  localStorage.setItem("vehiculos", JSON.stringify(vehiculos));


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
  const borrador = document.querySelector(".no_pago")
  borrador.innerHTML = ""
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
      <img id="mulas" src="https://comercializadorainnovalux.com/wp-content/uploads/2021/09/T_800_Camarote.png" alt="">
      <div class="separador">
        <p>Mulas</p>
        <p>Tarifa: 4000 por hora</p>  
      </div>
  </div>
</div>

<style>
  .recien_regis{
  display: none
  }
  .no_pago{
  display: none;
}
  .no_pago button{
  display: none;
}
</>

    `
  creador.appendChild(contenido)
}
//----------------------------------------------------------------------------------------------------
/*----------------------------------------------------------------------------------
LLAMADO DE Zona de pago
-----------------------------------------------------------------------------------------*/
var administra = document.querySelector("#admin")
administra.addEventListener("click", historial_pagos)


async function historial_pagos() {
  let vehiculos = JSON.parse(localStorage.getItem("vehiculos_pagados")) || {};
  const creador = document.querySelector(".container")
  creador.innerHTML = ""
  const borrador = document.querySelector(".no_pago")
  borrador.innerHTML = ""   
  const contenido = document.createElement("section")
  contenido.className = "finanza_fondo"
  for (let espacio in vehiculos) {
    if (vehiculos[espacio].pagado === true) {
      const { placa, modelo, tipo, hora } = vehiculos[espacio];
      contenido.innerHTML += `
        <div class="financias">
          <h4>Espacio: ${espacio}</h4>
          <p>Placa: ${placa}</p>
          <p>Modelo: ${modelo}</p>
          <p>Tipo: ${tipo}</p>
          <p>Hora de registro: ${hora}</p>
          <p>Estado de pago: pago</p>

        </div>
      <style>
      .container{
          width: 100%; /* Toma el 100% del ancho del viewport */
          height: 100%;
            background: rgba(157, 157, 157, 0.975);

        }
        .no_pago{
          display: none

        }
      </style>
      `;
    }
  }

  creador.appendChild(contenido)
}
//----------------------------------------------------------------------------------------------------







