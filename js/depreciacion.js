class Depreciaciones {
  constructor(costo, valorResidual, vida, tipoActivo) {
    this.costo = costo;
    this.valorResidual = valorResidual || 0;
    this.vida = vida;
    this.tipoActivo = tipoActivo;
  }

  valoresRenta(tipActivo) {
    let years = 0;

    switch (tipActivo) {
      case "Edificaciones":
        years = 20;
        break;
      case "Maquinaria":
        years = 5;
        break;
      case "Vehículos":
        years = 4;
        break;
      case "Otros Bienes Muebles":
        years = 2;
        break;
      default:
        break;
    }

    return years;
  }

  calcularDepreciacion() {
    const datosTabla = [];
    let valLibros = this.costo;
    let depreAcumulada = 0;
    let year = this.valoresRenta(this.tipoActivo);
    const depreciacion = (this.costo - this.valorResidual) / this.vida;
    if (
      isNaN(this.costo) ||
      this.costo <= 0 ||
      isNaN(this.vida) ||
      this.vida <= 0 ||
      isNaN(this.valorResidual) ||
      this.valorResidual < 0
    ) {
      validador("Debe llenar correctamente todos los campos necesarios");
      return;
    }
    if (this.valorResidual > this.costo) {
      validador("El valor residual debe ser menor que el costo");
      return;
    }
    if (this.tipoActivo === "Seleccionar") {
      validador("Debe seleccionar un Tipo de activo valido");
      return;
    }
    if (this.vida < year) {
      validador("La vida útil de este tipo de activo debe ser mayor a " + year);
      return;
    }
    validador("si");
    datosTabla.push({
      year: "0",
      depreciacion: "",
      depreAcumulada: "",
      valLibros: "$" + valLibros.toFixed(2),
    });

    for (let i = 0; i < this.vida; i++) {
      valLibros -= depreciacion;
      depreAcumulada += depreciacion;

      datosTabla.push({
        year: (i + 1).toString(),
        depreciacion: "$" + depreciacion.toFixed(2),
        depreAcumulada: "$" + depreAcumulada.toFixed(2),
        valLibros: "$" + valLibros.toFixed(2),
      });
    }
    return datosTabla;
  }

  calculoAnualDepreciacion() {
    let year = this.valoresRenta(this.tipoActivo);
    const depreciacion = (this.costo - this.valorResidual) / this.vida;
    if (this.valorResidual > this.costo) {
      return 0;
    }
    if (this.tipoActivo === "Seleccionar") {
      return 0;
    }
    if (!(this.vida < year)) {
      return depreciacion;
    }
  }
}

function validador(texto) {
  const mensajeAdvertencia = document.getElementById("mensajeAdvertencia");
  if (texto !== "si") {
    mensajeAdvertencia.textContent = texto;
    mensajeAdvertencia.style.display = "block";
  }
  else {
    mensajeAdvertencia.style.display = "none";
  }
}

function calcularDepreciacion() {
  const tipoActivo = document.getElementById("tipoDeActivo").value;
  const costo = parseFloat(document.getElementById("costo").value);
  const valorResidual =
    parseFloat(document.getElementById("valorResidual").value) || 0;
  const vidaUtil = parseInt(document.getElementById("vidaUtil").value);

  const dep = new Depreciaciones(costo, valorResidual, vidaUtil, tipoActivo);

  const tablaDepreciacion = document
    .getElementById("tablaDepreciacion")
    .getElementsByTagName("tbody")[0];
  tablaDepreciacion.innerHTML = "";

  const datos = dep.calcularDepreciacion();
  datos.forEach((fila) => {
    const newRow = tablaDepreciacion.insertRow();
    newRow.insertCell(0).textContent = fila.year;
    newRow.insertCell(1).textContent = fila.depreciacion;
    newRow.insertCell(2).textContent = fila.depreAcumulada;
    newRow.insertCell(3).textContent = fila.valLibros;
  });

  const tablaInformacion = document
    .getElementById("tablaInformacion")
    .getElementsByTagName("tbody")[0];
  tablaInformacion.innerHTML = "";
  let anual, mensual, diario;
  anual = dep.calculoAnualDepreciacion();
  mensual = anual / 12;
  diario = anual / 365;
  const newRow2 = tablaInformacion.insertRow();
  newRow2.insertCell(0).textContent = "$" + anual.toFixed(2);
  newRow2.insertCell(1).textContent = "$" + mensual.toFixed(2);
  newRow2.insertCell(2).textContent = "$" + diario.toFixed(2);

  function validarEntero(event) {
    const key = event.key;
    if (
      !/^\d*$/.test(key) &&
      !["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"].includes(key)
    ) {
      event.preventDefault();
    }
  }
  document
    .getElementById("vidaUtil")
    .addEventListener("keypress", validarEntero);
}

document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("modalTabla");
  var btn = document.getElementById("mostrarTablaLink");
  var span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    duplicarContenidoTabla();
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  function duplicarContenidoTabla() {
    var tablaOriginal = document.getElementById("tablaDepreciacion");
    var tablaModal = document.getElementById("tablaDepreciacionModal");

    tablaModal.querySelector("tbody").innerHTML = "";

    var filas = tablaOriginal.querySelectorAll("tbody tr");
    filas.forEach(function (fila) {
      var nuevaFila = fila.cloneNode(true);
      tablaModal.querySelector("tbody").appendChild(nuevaFila);
    });
  }
});
