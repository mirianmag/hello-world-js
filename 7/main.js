
const janeiro = new Month("January",);
janeiro.addTransaction(new Transaction("Salary", "income", 3000));
janeiro.addTransaction(new Transaction("Rent", "expense", 1000)); 
janeiro.addTransaction(new Transaction("Energy Bill", "expense", 200)); 
janeiro.addTransaction(new Transaction("Water Bill", "expense", 100)); 
// janeiro.addTransaction(new Transaction("Internet", "expense", 100)); 
// janeiro.addTransaction(new Transaction("Transport", "expense", 300)); 
// janeiro.addTransaction(new Transaction("Hobby", "expense", 300)); 
// janeiro.addTransaction(new Transaction("Food", "expense", 500));
// janeiro.addTransaction(new Transaction("Condo", "expense", 300));
// janeiro.addTransaction(new Transaction("Farmacy", "expense", 100));


const fevereiro = new Month("February");
fevereiro.addTransaction(new Transaction("Salary", "income", 3000));
fevereiro.addTransaction(new Transaction("Rent", "expense", 1200));
fevereiro.addTransaction(new Transaction("Energy Bill", "expense", 250)); 
fevereiro.addTransaction(new Transaction("Water Bill", "expense", 100)); 
fevereiro.addTransaction(new Transaction("Internet", "expense", 100));
fevereiro.addTransaction(new Transaction("Transport", "expense", 500));
fevereiro.addTransaction(new Transaction("Food", "expense", 1000));
fevereiro.addTransaction(new Transaction("Condo", "expense", 400));   

const marco = new Month("March");
marco.addTransaction(new Transaction("Salary", "income", 4000)); 
marco.addTransaction(new Transaction("Rent", "expense", 1200)); 
marco.addTransaction(new Transaction("Energy Bill", "expense", 200)); 
marco.addTransaction(new Transaction("Water Bill", "expense", 100)); 
marco.addTransaction(new Transaction("Internet", "expense", 200)); 
marco.addTransaction(new Transaction("Transport", "expense", 500)); 
marco.addTransaction(new Transaction("Hobby", "expense", 800)); 
marco.addTransaction(new Transaction("Food", "expense", 1000));
marco.addTransaction(new Transaction("Condo", "expense", 400));

const year = new Year();
year.addMonth(janeiro);
year.addMonth(fevereiro);
year.addMonth(marco);

year.calculateBalance();

console.log(year.months);

function addElement (parent, elementType, text) {
    const element = document.createElement(elementType);
    if (text !== "" && text !== undefined && text !== null) {
        element.innerText = text;
    }
    parent.appendChild(element);
}

function render () {
    const app = document.getElementById("app");
    if(app.firstChild) {
        app.firstChild.remove();
    }

    const panel = document.createElement("div");
    const colors = ["red", "yellow", "green", "blue"];
    const grafic = document.createElement("div");
    grafic.className = "grafic";
    panel.appendChild(grafic);
    for (const month of year.months) {
        const column = document.createElement("div");
        column.className = "grafic-column";
        const color = document.createElement("div");
        color.style.height = (month.totalizador.saldo*100)/10000;
        color.style.background = colors.pop();
        column.appendChild(color);
        const monthName = document.createElement("div");
        monthName.className = "grafic-column-text";
        monthName.innerText = month.name;
        column.appendChild(color);
        column.appendChild(monthName);
        grafic.appendChild(column);
    }

    for (const month of year.months) {
        addElement(panel, "h4", month.name);
        const tableTransaction = document.createElement("table");
        tableTransaction.className = "table-transactions";
        const lineTitle = document.createElement("tr");
        addElement(lineTitle, "th", "Category");
        addElement(lineTitle, "th", "Value");
        tableTransaction.appendChild(lineTitle);
        for (const transaction of month.transactions) {
            const lineTransaction = document.createElement("tr");
            addElement(lineTransaction, "td", transaction.category);
            addElement(lineTransaction, "td", formatMoney(transaction.value));
            tableTransaction.appendChild(lineTransaction);
        }
        const lineTax = document.createElement("tr");
        addElement(lineTax, "th", "Tax");
        addElement(lineTax, "th", formatMoney(month.totalizador.juros));
        tableTransaction.appendChild(lineTax);
        const lineReturn = document.createElement("tr");
        addElement(lineReturn, "th", "Return");
        addElement(lineReturn, "th", formatMoney(month.totalizador.rendimentos));
        tableTransaction.appendChild(lineReturn);
        const lineAmount = document.createElement("tr");
        addElement(lineAmount, "th", "Amount");
        addElement(lineAmount, "th", formatMoney(month.totalizador.saldo));
        tableTransaction.appendChild(lineAmount);
        panel.appendChild(tableTransaction);
    }
    app.appendChild(panel);
}

render();

function addTransaction() {
    const month = document.getElementById("month");
    const category = document.getElementById("category");
    const type = document.getElementById("type");
    const amount = document.getElementById("amount");
    year.addTransaction(month.value, new Transaction(category.value, type.value, parseFloat(amount.value)));
    year.calculateBalance();
    render();
    month.value = year.months[0].name;
    category.value = "income";
    type.value = "";
    amount.value = "";
}
const button = document.getElementById("button");
button.addEventListener("click", addTransaction);

const monthSelect= document.getElementById("month");
for (const month of year.months) {
    const option = document.createElement("option");
    option.text = month.name;
    monthSelect.add(option);
}

