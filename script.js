const form = document.getElementById("form");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const sigla = document.getElementById("inputLetras").value.toUpperCase();
  const cancerCID = document.getElementById("cancertype").value;
  const centerID = document.getElementById("center").value;
  const doadorID = document.getElementById("doador").value;
  const sampleID = document.getElementById("amostra").value;
  const sampleType = document.getElementById("sampletype").value;
  const sampleStatus = document.getElementById("samplestatus").value;
  const samplePreservation = document.getElementById("samplepreservation").value;
  const analyteType = document.getElementById("analytetype").value;

  // Testa campo por campo e mostra qual falta
  if (!sigla || sigla.length > 6) {
    resultado.textContent = "Preencha a sigla (máx 6 letras).";
    return;
  }
  if (!cancerCID) {
    resultado.textContent = "Selecione um tipo de câncer.";
    return;
  }
  if (!centerID) {
    resultado.textContent = "Selecione o centro.";
    return;
  }
  if (!doadorID) {
    resultado.textContent = "Selecione o doador.";
    return;
  }
  if (!sampleID) {
    resultado.textContent = "Informe o código da amostra.";
    return;
  }
  if (!sampleType) {
    resultado.textContent = "Selecione o tipo de amostra.";
    return;
  }
  if (!sampleStatus) {
    resultado.textContent = "Selecione o status da amostra.";
    return;
  }
  if (!samplePreservation) {
    resultado.textContent = "Selecione a preservação da amostra.";
    return;
  }
  if (!analyteType) {
    resultado.textContent = "Selecione o tipo de analito.";
    return;
  }

  // Regra para gerar o código
  const codigo = `${sigla}-${cancerCID}-${centerID}-${doadorID}-${sampleID}-${sampleType}${sampleStatus}${samplePreservation}${analyteType}`;

  resultado.textContent = "Código gerado: " + codigo;
});
