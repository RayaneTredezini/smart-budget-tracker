let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart;

function addExpense() {
  const name = document.getElementById("name").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (!name || !amount) {
    alert("Please fill all fields");
    return;
  }

  expenses.push({ name, amount, category });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  render();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  render();
}

function render() {
  const list = document.getElementById("list");
  const totalEl = document.getElementById("total");
  const topCategoryEl = document.getElementById("topCategory");

  list.innerHTML = "";

  let total = 0;
  let categoryTotals = {};

  expenses.forEach((e, index) => {
    total += e.amount;

    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      ${e.name} - £${e.amount} (${e.category})
      <button onclick="deleteExpense(${index})">❌</button>
    `;

    list.appendChild(li);
  });

  totalEl.textContent = "£" + total;

  updateTopCategory(categoryTotals);
  updateChart(categoryTotals);
}

function updateTopCategory(categoryTotals) {
  let top = "-";
  let max = 0;

  for (let cat in categoryTotals) {
    if (categoryTotals[cat] > max) {
      max = categoryTotals[cat];
      top = cat;
    }
  }

  document.getElementById("topCategory").textContent = top;
}

function updateChart(categoryTotals) {
  const ctx = document.getElementById("chart");

  if (!ctx) return;

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals)
      }]
    }
  });
}

// start app safely
window.onload = render;

chart= new  Chart(ctx, {
  type:"doughnut",
  data: {
    labels: Object, keys (categoryTotals),
    datasets: [{
      data: Object.values(categoryTotals),
      backgroundColor: [
        '#22c55e'
        '#3b82f6'
        '#f59e0b'
        '#ef4444'
      ]
    }]
  }
options: {
  plugins: {
    legend: {
      labels:{
        color:"white"
      }
    }
  }
}
});