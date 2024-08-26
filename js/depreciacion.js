class Depreciaciones {
  constructor(descripcion, costo, valorResidual, vida, tipoActivo) {
    this.descripcion = descripcion;
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
      case "Patentes y Marcas":
        years = 5;
        break;
      case "Software":
        years = 4;
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
    if (!this.descripcion || this.descripcion.trim() === "") {
      validador("El valor de descripción no puede estar vacío");
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

let almacenDepre = [];

//Muestra mensaje de validación
function validador(texto) {
  const mensajeAdvertencia = document.getElementById("mensajeAdvertencia");
  if (texto !== "si") {
    mensajeAdvertencia.textContent = texto;
    mensajeAdvertencia.style.display = "block";
  } else {
    mensajeAdvertencia.style.display = "none";
  }
}

//Muestreo

function calcularDepreciacion() {
  const descripcion = document.getElementById("descripcion").value;
  const tipoActivo = document.getElementById("tipoDeActivo").value;
  const costo = parseFloat(document.getElementById("costo").value);
  const valorResidual =
    parseFloat(document.getElementById("valorResidual").value) || 0;
  const vidaUtil = parseInt(document.getElementById("vidaUtil").value);

  const dep = new Depreciaciones(
    descripcion,
    costo,
    valorResidual,
    vidaUtil,
    tipoActivo
  );

  const tablaDepreciacion = document
    .getElementById("tablaDepreciacion")
    .getElementsByTagName("tbody")[0];
  tablaDepreciacion.innerHTML = "";

  const datos = dep.calcularDepreciacion();

  if (datos !== null && datos !== undefined && datos !== NaN) {
    almacenDepre.push(dep);
  }

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

  document.getElementById("depreciationForm").reset();
}

function validarEntero(event) {
  const key = event.key;
  if (
    !/^\d*$/.test(key) &&
    !["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"].includes(key)
  ) {
    event.preventDefault();
  }
}

document.getElementById("vidaUtil").addEventListener("keypress", validarEntero);

document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("modalTabla");
  var btn = document.getElementById("mostrarTablaLink");
  var span = document.getElementsByClassName("closes")[0];
  var tipoActivoSelect = document.getElementById("tipoDeActivo2");

  btn.onclick = function () {
    llenadorContenidoTabla(tipoActivoSelect.value);
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

  tipoActivoSelect.addEventListener("change", function () {
    llenadorContenidoTabla(this.value);
  });

  llenadorContenidoTabla(tipoActivoSelect.value);

  function llenadorContenidoTabla(tipoActivoFilter) {
    var tablaModal = document
      .getElementById("tablaDepreciacionModal")
      .getElementsByTagName("tbody")[0];

    tablaModal.innerHTML = "";

    let total = 0;

    const filteredData =
      tipoActivoFilter === "Seleccionar"
        ? almacenDepre
        : almacenDepre.filter((item) => item.tipoActivo === tipoActivoFilter);

    if (filteredData.length > 0) {
      filteredData.forEach((suma) => {
        let depreciacion = new Depreciaciones(
          suma.descripcion,
          suma.costo,
          suma.valorResidual,
          suma.vida,
          suma.tipoActivo
        );
        total += depreciacion.calculoAnualDepreciacion();
      });

      var totalizador = document.getElementById("inforTotal");
      totalizador.innerHTML = "$" + total.toFixed(2);
      total = 0;

      filteredData.forEach((fila) => {
        let indice = almacenDepre.findIndex(
          (item) =>
            item.descripcion === fila.descripcion &&
            item.costo === fila.costo &&
            item.vida === fila.vida
        );

        let depreciacion = new Depreciaciones(
          fila.descripcion,
          fila.costo,
          fila.valorResidual,
          fila.vida,
          fila.tipoActivo
        );

        const newRow = tablaModal.insertRow();
        newRow.insertCell(0).textContent = fila.descripcion;
        newRow.insertCell(1).textContent = fila.tipoActivo;
        newRow.insertCell(2).textContent =
          "$" + depreciacion.calculoAnualDepreciacion().toFixed(2);

        const link = document.createElement("a");

        link.href = "#";
        link.textContent = "Mostrar detalle tabla";
        link.classList.add("mostrar-tabla");
        link.classList.add("tablita");
        link.setAttribute("data-index", indice);
        link.onclick = function () {
          mostrarDetalle(indice);
        };

        const cell = newRow.insertCell(3);

        cell.appendChild(link);
      });
    } else {
      var totalizador = document.getElementById("inforTotal");
      totalizador.innerHTML = "";
    }
  }
});

function mostrarDetalle(indice) {
  var porcen = document.getElementById("porcentaje");
  var modal = document.getElementById("modalTabla2");
  var span = document.getElementsByClassName("close")[0];
  const tablaInformacion = document
    .getElementById("tablaInformacion2")
    .getElementsByTagName("tbody")[0];

  tablaInformacion.innerHTML = "";
  const depreciacion = almacenDepre[indice];

  const tablaDepreciacion = document
    .getElementById("tablaDepreciacion")
    .getElementsByTagName("tbody")[0];

  tablaDepreciacion.innerHTML = "";

  const info = new Depreciaciones(
    depreciacion.descripcion,
    depreciacion.costo,
    depreciacion.valorResidual,
    depreciacion.vida,
    depreciacion.tipoActivo
  );

  const datos = info.calcularDepreciacion();

  datos.forEach((fila) => {
    const newRow = tablaDepreciacion.insertRow();
    newRow.insertCell(0).textContent = fila.year;
    newRow.insertCell(1).textContent = fila.depreciacion;
    newRow.insertCell(2).textContent = fila.depreAcumulada;
    newRow.insertCell(3).textContent = fila.valLibros;
  });

  let anual, mensual, diario;

  anual = info.calculoAnualDepreciacion();
  mensual = anual / 12;
  diario = anual / 365;

  const newRow2 = tablaInformacion.insertRow();

  newRow2.insertCell(0).textContent = "$" + anual.toFixed(2);
  newRow2.insertCell(1).textContent = "$" + mensual.toFixed(2);
  newRow2.insertCell(2).textContent = "$" + diario.toFixed(2);

  let porcentaje = (anual / (info.costo - info.valorResidual)) * 100;
  porcen.innerHTML = porcentaje.toFixed(2) + "%";
  modal.style.display = "block";

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
