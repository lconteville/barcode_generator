const form = document.getElementById("form");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const letras = document.getElementById("inputLetras").value.toUpperCase();
  const cancerCID = document.getElementById("cancertype").value;
  const center = document.getElementById("center").value;

  if (letras.length > 6 || !cancerCID || !center) {
    resultado.textContent = "Preencha a sigla (máx 6 letras) e selecione um tipo de câncer.";
    return;
  }

  // Regra para gerar o código
  const codigo = `${letras}-${cancerCID}-${center}`;

  resultado.textContent = "Código gerado: " + codigo;
});
