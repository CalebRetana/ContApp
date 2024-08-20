function verificarMovimiento() {
  const partidaCuenta = document.getElementById("partidaCuenta").value;
  const partidaMovimiento = document.getElementById("partidaMovimiento").value;

  const contrapartidaCuenta = document.getElementById(
    "contrapartidaCuenta"
  ).value;
  const contrapartidaMovimiento = document.getElementById(
    "contrapartidaMovimiento"
  ).value;

  let partidaCorrecta = false;
  let contrapartidaCorrecta = false;

  if (
    (partidaCuenta === "pasivo" && partidaMovimiento === "disminuye") ||
    (partidaCuenta === "activo" && partidaMovimiento === "aumenta") ||
    (partidaCuenta === "neto" && partidaMovimiento === "disminuye") ||
    (partidaCuenta === "ingreso" && partidaMovimiento === "disminuye") ||
    (partidaCuenta === "costo" && partidaMovimiento === "aumenta") ||
    (partidaCuenta === "gasto" && partidaMovimiento === "aumenta")
  ) {
    partidaCorrecta = true;
  }

  if (
    (contrapartidaCuenta === "pasivo" &&
      contrapartidaMovimiento === "aumenta") ||
    (contrapartidaCuenta === "activo" &&
      contrapartidaMovimiento === "disminuye") ||
    (contrapartidaCuenta === "neto" && contrapartidaMovimiento === "aumenta") ||
    (partidaCuenta === "ingreso" && partidaMovimiento === "disminuye") ||
    (partidaCuenta === "costo" && partidaMovimiento === "aumenta") ||
    (partidaCuenta === "gasto" && partidaMovimiento === "aumenta")
  ) {
    contrapartidaCorrecta = true;
  }

  const partidaStatus = document.getElementById("partidaStatus");
  const contrapartidaStatus = document.getElementById("contrapartidaStatus");

  if (partidaCorrecta) {
    partidaStatus.textContent = "✔ Movimiento Correcto";
    partidaStatus.style.backgroundColor = "#388E3C";
  } else {
    partidaStatus.textContent = "✖ Movimiento Incorrecto";
    partidaStatus.style.backgroundColor = "#D32F2F";
  }

  if (contrapartidaCorrecta) {
    contrapartidaStatus.textContent = "✔ Movimiento Correcto";
    contrapartidaStatus.style.backgroundColor = "#388E3C";
  } else {
    contrapartidaStatus.textContent = "✖ Movimiento Incorrecto";
    contrapartidaStatus.style.backgroundColor = "#D32F2F";
  }
}

function inicializar() {
  document.getElementById("partidaCuenta").value = "";
  document.getElementById("partidaMovimiento").value = "";

  document.getElementById("contrapartidaCuenta").value = "";
  document.getElementById("contrapartidaMovimiento").value = "";

  document.getElementById("partidaStatus").textContent = "";
  document.getElementById("contrapartidaStatus").textContent = "";
}
