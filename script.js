const form = document.getElementById("tipForm");
const billTotalInput = document.getElementById("billTotal");
const totalWithTaxInput = document.getElementById("totalWithTax");
const currencySelect = document.getElementById("currencySelect");
const tipSlider = document.getElementById("tipSlider");
const tipPercentageInput = document.getElementById("tipPercentage");
const tipAmountInput = document.getElementById("tipAmount");
const totalWithTipAndTaxInput = document.getElementById("totalWithTipAndTax");
const errorMessage = document.getElementById("errorMessage");

const currencyRates = {
  USD: 1,
  EUR: 0.95,
  INR: 85
};

const currencySymbols = {
  USD: "$",
  EUR: "€",
  INR: "₹"
};

function resetOutputs() {
  totalWithTaxInput.value = "";
  tipAmountInput.value = "";
  totalWithTipAndTaxInput.value = "";
}

function updateCalculator() {
  const billValue = billTotalInput.value.trim();
  const tipPercent = Number(tipSlider.value);
  const selectedCurrency = currencySelect.value;
  const rate = currencyRates[selectedCurrency];
  const symbol = currencySymbols[selectedCurrency];

  tipPercentageInput.value = tipPercent + "%";

  if (billValue === "") {
    errorMessage.textContent = "";
    resetOutputs();
    return;
  }

  const billTotal = Number(billValue);

  if (isNaN(billTotal) || billTotal < 0) {
    errorMessage.textContent = "Please enter a valid non-negative number.";
    resetOutputs();
    return;
  }

  errorMessage.textContent = "";

  if (billTotal === 0) {
    totalWithTaxInput.value = symbol + "0.00";
    tipAmountInput.value = symbol + "0.00";
    totalWithTipAndTaxInput.value = symbol + "0.00";
    return;
  }

  const taxAmount = billTotal * 0.11;
  const totalWithTaxUSD = billTotal + taxAmount;
  const tipAmountUSD = billTotal * (tipPercent / 100);
  const totalWithTipAndTaxUSD = billTotal + taxAmount + tipAmountUSD;

  const convertedTaxTotal = totalWithTaxUSD * rate;
  const convertedTipAmount = tipAmountUSD * rate;
  const convertedTotal = totalWithTipAndTaxUSD * rate;

  totalWithTaxInput.value = symbol + convertedTaxTotal.toFixed(2);
  tipAmountInput.value = symbol + convertedTipAmount.toFixed(2);
  totalWithTipAndTaxInput.value = symbol + convertedTotal.toFixed(2);
}

form.addEventListener("input", updateCalculator);
form.addEventListener("change", updateCalculator);

updateCalculator();