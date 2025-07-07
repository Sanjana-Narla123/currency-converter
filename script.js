const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultDiv = document.getElementById("result");

// Populate currency dropdowns with some common options
const currencyList = ["USD", "EUR", "INR", "JPY", "GBP", "CAD", "AUD"];

currencyList.forEach((currency) => {
  const option1 = document.createElement("option");
  option1.value = currency;
  option1.textContent = currency;
  fromCurrency.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = currency;
  option2.textContent = currency;
  toCurrency.appendChild(option2);
});

// Set defaults
fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convert() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (amount === "") {
    resultDiv.textContent = "Please enter an amount.";
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
    const data = await response.json();

    if (data.success) {
      resultDiv.textContent = `${amount} ${from} = ${data.result.toFixed(2)} ${to}`;
    } else {
      resultDiv.textContent = "Conversion failed.";
    }
  } catch (error) {
    resultDiv.textContent = "Error fetching exchange rate.";
  }
}
