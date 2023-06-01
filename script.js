window.onload = function() {
  var calculateButton = document.getElementById("calculateButton");
  calculateButton.addEventListener("click", calculateSplit);
}

function calculateSplit() {
  var customersInput = document.getElementById("customersInput").value;
  var productsInput = document.getElementById("productsInput").value;

  if (!customersInput || !productsInput) {
    displayError("Por favor, preencha todos os campos.");
    return;
  }

  var customers = parseInput(customersInput);
  var products = parseInput(productsInput);

  if (!customers || !products) {
    displayError("Entrada inválida. Por favor, insira os valores separados por vírgula.");
    return;
  }

  var totalAmount = calculateTotalAmount(products);
  var splitAmount = totalAmount / customers.length;
  var serviceCharge = splitAmount * 0.1;

  var result = customers.map(function(customer) {
    return customer + ": R$ " + (splitAmount + serviceCharge).toFixed(2);
  });

  displayResult(result);
}

function parseInput(input) {
  var items = input.split(",").map(function(item) {
    return item.trim();
  });

  if (items.length === 0 || (items.length === 1 && items[0] === "")) {
    return null;
  }

  return items;
}

function calculateTotalAmount(products) {
  var total = 0;

  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var price = extractPrice(product);
    total += price;
  }

  return total;
}

function extractPrice(product) {
  var start = product.indexOf("(") + 1;
  var end = product.indexOf(")");
  var priceString = product.substring(start, end);
  var price = parseFloat(priceString);
  return price;
}

function displayResult(result) {
  var resultElement = document.getElementById("result");
  resultElement.innerHTML = result.join("<br>");

  clearError();
}

function displayError(message) {
  var errorElement = document.getElementById("error");
  errorElement.innerHTML = message;
}

function clearError() {
  var errorElement = document.getElementById("error");
  errorElement.innerHTML = "";
}
