const form = document.getElementById("form");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const sigla = document.getElementById("inputLetras").value.trim().toUpperCase();
  const cancerCID = document.getElementById("cancertype").value;
  const centerID = document.getElementById("center").value;
  const doadores = document.getElementById("doador").value.split("\n").map(v => v.trim()).filter(v => v);
  const amostras = document.getElementById("amostra").value.split("\n").map(v => v.trim()).filter(v => v);
  const sampleType = document.getElementById("sampletype").value;
  const sampleStatus = document.getElementById("samplestatus").value;
  const samplePreservation = document.getElementById("samplepreservation").value;
  const analyteType = document.getElementById("analytetype").value;

  const showError = (msg) => {
    resultado.innerHTML = `<p style="color:red;">${msg}</p>`;
  };

  if (!sigla || sigla.length < 4 || sigla.length > 6) return showError("⚠️ A sigla deve ter entre 4 e 6 letras.");
  if (!cancerCID) return showError("⚠️ Selecione um tipo de câncer.");
  if (!centerID) return showError("⚠️ Selecione o centro participante.");
  if (doadores.length === 0) return showError("⚠️ Informe pelo menos um código de participante.");
  if (amostras.length === 0) return showError("⚠️ Informe pelo menos um código de amostra.");
  if (doadores.length !== amostras.length) return showError("⚠️ Quantidade de participantes ≠ quantidade de amostras!");
  if (!sampleType) return showError("⚠️ Selecione o tipo de amostra.");
  if (!sampleStatus) return showError("⚠️ Selecione o status da amostra.");
  if (!samplePreservation) return showError("⚠️ Selecione a preservação da amostra.");
  if (!analyteType) return showError("⚠️ Selecione o tipo de analito.");

  for (let i = 0; i < doadores.length; i++) {
    if (!/^\d{4}$/.test(doadores[i])) {
      return showError(`⚠️ Código de participante inválido na linha ${i + 1}: "${doadores[i]}" (use 4 dígitos).`);
    }
    if (!/^\d{4}$/.test(amostras[i])) {
      return showError(`⚠️ Código de amostra inválido na linha ${i + 1}: "${amostras[i]}" (use 4 dígitos).`);
    }
  }

  let codigosGerados = [];
  let linhasCSV = ["Sigla,CID,Centro,Participante,Amostra,CodExtra,Barcode"];

  for (let i = 0; i < doadores.length; i++) {
    const doadorID = doadores[i];
    const sampleID = amostras[i];
    const codExtra = `${sampleType}${sampleStatus}${samplePreservation}${analyteType}`;
    const barcode = `${sigla}-${cancerCID}-${centerID}-${doadorID}-${sampleID}-${codExtra}`;
    
    codigosGerados.push(barcode);
    linhasCSV.push(`${sigla},${cancerCID},${centerID},${doadorID},${sampleID},${codExtra},${barcode}`);
  }

  resultado.innerHTML = `
    <h3>✅ Códigos gerados:</h3>
    <pre>${codigosGerados.join("\n")}</pre>
    <button id="downloadCsvBtn" class="btn">📥 Baixar CSV</button>
  `;

  document.getElementById("downloadCsvBtn").addEventListener("click", () => {
    const blob = new Blob([linhasCSV.join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "barcodes.csv";
    link.click();
  });
});
// Bonequinho de ajuda: abrir/fechar popup
document.addEventListener("DOMContentLoaded", function() {
  const widget = document.getElementById("help-widget");
  const popup = document.getElementById("help-popup");

  if (widget && popup) {
    widget.addEventListener("click", () => {
      popup.style.display = popup.style.display === "block" ? "none" : "block";
    });
  }
});
