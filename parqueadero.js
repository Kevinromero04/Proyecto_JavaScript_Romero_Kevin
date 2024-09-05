
/*----------------------------------------------------------------------------------
LLAMADO DE REGISTRESE
-----------------------------------------------------------------------------------------*/
var regis = document.querySelector("#registro")
regis.addEventListener("click", registre_su_vehivulo)


async function registre_su_vehivulo() {
  const creador = document.querySelector(".container")
  creador.innerHTML = ""
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
                    <button onclick="toggleDropdown()" class="dropbtn" id="boton_mostrar">Mostrar Formulario</button>
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
                <div class="separador_form" id="modelo_html">
                  <h4 id="margen_hours">Hora</h4>
                  <button class="hora">presiona aqui para saber la hora</button>
                  <div class="colocar_hora">

                  </div>
                </div>
                <div class="separador_form">
                  <h4>Espacio (hay 20 espacios)</h4>
                  <input type="text" class="boton_regis" id="registra_espacio" placeholder="A-1, A-20">
                </div>
                <button id="cargar_vehiculo">Registrar</button>
              </div>
            </div>

    `
  creador.appendChild(contenido);

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

// Guardar Datos del Vehículo
function guardarDatosVehiculo(tipoVehiculo) {
  const placa = document.querySelector("#registra_placa")?.value;
  const modelo = document.querySelector("#registra_modelo")?.value;
  const espacio = document.querySelector("#registra_espacio")?.value.toUpperCase();
  const hora = new Date().toLocaleTimeString();

  // Validación de datos
  if (!placa || !modelo || !espacio || !tipoVehiculo) {
    alert("Todos los campos, incluido el tipo de vehículo, son obligatorios.");
    return;
  }

  // Validar que el espacio esté dentro de A1 a A50
  if (!/^(A-(?:[1-9]|[1-4][0-9]|50))$/.test(espacio)) {
    alert("El espacio debe estar entre A-1 y A-50.");
    return;
  }

  // Obtener los datos actuales del localStorage o crear una nueva estructura
  let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || {};

  // Verificar si la placa ya está registrada en algún espacio
  for (let key in vehiculos) {
    if (vehiculos[key].placa === placa) {
      alert(`La placa ${placa} ya está registrada en otro espacio. Elija otra placa.`);
      return;
    }
  }

  // Verificar si el espacio ya está ocupado
  if (vehiculos[espacio]) {
    alert(`El espacio ${espacio} ya está ocupado. Elija otro.`);
    return;
  }

  // Guardar los datos del vehículo en el espacio
  vehiculos[espacio] = {
    placa,
    modelo,
    tipo: tipoVehiculo,
    hora,
    pagado: false,  // Añadir estado de pago
    tiempoRegistro: new Date().getTime()  // Guardar tiempo de registro
  };

  // Actualizar localStorage
  localStorage.setItem("vehiculos", JSON.stringify(vehiculos));

  alert("Vehículo registrado con éxito.");
  mostrarInformacionRegistrada(espacio);
}

// Mostrar Información Registrada
function mostrarInformacionRegistrada(espacio) {
  let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || {};
  const contenedor = document.querySelector(".recien_regis");

  // Limpiar el contenido actual
  contenedor.innerHTML = "";

  // Mostrar solo la información del vehículo en el espacio dado
  if (vehiculos[espacio]) {
    const { placa, modelo, tipo, hora, pagado } = vehiculos[espacio];
    contenedor.innerHTML = `
          <div>
              <h4>Espacio: ${espacio}</h4>
              <p>Placa: ${placa}</p>
              <p>Modelo: ${modelo}</p>
              <p>Tipo: ${tipo}</p>
              <p>Hora de registro: ${hora}</p>
              <p>Estado de pago: ${pagado ? 'Pagado' : 'No pagado'}</p>
              <hr>
              ${!pagado ? '<button id="pagar_btn">Pagar</button>' : ''}
          </div>
      `;

    // Añadir listener para el botón de pago si existe
    if (!pagado) {
      document.querySelector("#pagar_btn").addEventListener("click", () => pagar(espacio));
    }
  }
}

// Mostrar Todos los Vehículos No Pagados
function mostrarVehiculosNoPagados() {
  let vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || {};
  const contenedor = document.querySelector(".recien_regis");

  // Limpiar el contenido actual
  contenedor.innerHTML = "";

  // Mostrar solo los vehículos no pagados
  let hayVehiculosNoPagados = false;
  for (let espacio in vehiculos) {
    if (!vehiculos[espacio].pagado) {
      hayVehiculosNoPagados = true;
      const { placa, modelo, tipo, hora } = vehiculos[espacio];
      contenedor.innerHTML += `
            <div>
                <h4>Espacio: ${espacio}</h4>
                <p>Placa: ${placa}</p>
                <p>Modelo: ${modelo}</p>
                <p>Tipo: ${tipo}</p>
                <p>Hora de registro: ${hora}</p>
                <p>Estado de pago: No pagado</p>
                <button class="pagar_btn" data-espacio="${espacio}">Pagar</button>
                <hr>
            </div>
        `;
    }
  }

  if (!hayVehiculosNoPagados) {
    contenedor.innerHTML = "<p>No hay vehículos no pagados.</p>";
  }

  // Añadir listener para todos los botones de pago
  document.querySelectorAll(".pagar_btn").forEach(button => {
    button.addEventListener("click", () => pagar(button.dataset.espacio));
  });
}

// Función de Pago
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
  const tiempoTranscurrido = (tiempoActual - tiempoRegistro) / 1000;  // Tiempo en segundos
  let costo;

  // Calcular el costo basado en el tipo de vehículo
  switch (vehiculo.tipo) {
    case "carro":
      costo = 0.5 * tiempoTranscurrido;
      break;
    case "moto":
      costo = 0.25 * tiempoTranscurrido;
      break;
    case "mula":
      costo = 10 * tiempoTranscurrido;
      break;
    default:
      costo = 0;
      break;
  }

  // Mostrar el costo
  alert(`El costo total es: ${costo.toFixed(2)} pesos`);

  // Actualizar el estado de pago
  vehiculo.pagado = true;
  localStorage.setItem("vehiculos", JSON.stringify(vehiculos));

  // Mover el vehículo al almacenamiento de pagados
  let vehiculosPagados = JSON.parse(localStorage.getItem("vehiculos_pagados")) || {};
  vehiculosPagados[espacio] = vehiculo;
  localStorage.setItem("vehiculos_pagados", JSON.stringify(vehiculosPagados));

  // Eliminar el vehículo del almacenamiento de no pagados
  delete vehiculos[espacio];
  localStorage.setItem("vehiculos", JSON.stringify(vehiculos));

  // Actualizar la información mostrada
  mostrarVehiculosNoPagados();
}

// Llamar a mostrarVehiculosNoPagados al cargar la página
document.addEventListener("DOMContentLoaded", mostrarVehiculosNoPagados);




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
</style>

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
  contenido.innerHTML = `<h1>terminamos</h1>
  <style>
  .recien_regis{
  display: none
  }
</style>`
  creador.appendChild(contenido)
}
//----------------------------------------------------------------------------------------------------


function actualizarHoraActual() {

  const ahora = new Date();
  const horas = ahora.getHours().toString().padStart(2, '0');
  const minutos = ahora.getMinutes().toString().padStart(2, '0');
  const mostrar_hora = `${horas}:${minutos}`;
  let hora = document.querySelector(".colocar_hora")

  hora.innerHTML = ""
  hora.innerHTML = ` <p>${mostrar_hora}</p>
  

  `

  console.log(mostrar_hora)

}





