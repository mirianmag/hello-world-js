class Screen {
    constructor () {
        const janeiro = new Month("January",);
        janeiro.addTransaction(new Transaction("Salary", "income", 3000));
        janeiro.addTransaction(new Transaction("Rent", "expense", 1000)); 
        janeiro.addTransaction(new Transaction("Energy Bill", "expense", 200)); 
        janeiro.addTransaction(new Transaction("Water Bill", "expense", 100)); 
        janeiro.addTransaction(new Transaction("Internet", "expense", 100)); 
        const fevereiro = new Month("February");
        fevereiro.addTransaction(new Transaction("Salary", "income", 3000));
        fevereiro.addTransaction(new Transaction("Rent", "expense", 1200));
        fevereiro.addTransaction(new Transaction("Energy Bill", "expense", 250)); 
        fevereiro.addTransaction(new Transaction("Water Bill", "expense", 100)); 
        fevereiro.addTransaction(new Transaction("Internet", "expense", 100));
        const marco = new Month("March");
        marco.addTransaction(new Transaction("Salary", "income", 4000)); 
        marco.addTransaction(new Transaction("Rent", "expense", 1200)); 
        marco.addTransaction(new Transaction("Energy Bill", "expense", 200)); 
        marco.addTransaction(new Transaction("Water Bill", "expense", 100)); 
        marco.addTransaction(new Transaction("Internet", "expense", 200)); 
        const year = new Year();
        year.addMonth(janeiro);
        year.addMonth(fevereiro);
        year.addMonth(marco);
        year.calculateBalance();
        this.year = year;
    }

    formatMoney (value) {
        return new Intl.NumberFormat("en-us", { currency: "USD", style: "currency"}).format(value);
    }

    addTransaction() {
        const month = document.getElementById("month");
        const category = document.getElementById("category");
        const type = document.getElementById("type");
        const amount = document.getElementById("amount");
        this.year.addTransaction(month.value, new Transaction(category.value, type.value, parseFloat(amount.value)));
        this.year.calculateBalance();
        this.render();
        month.value = this.year.months[0].name;
        type.value = "income";
        category.value = "";
        amount.value = "";
    }

    render () {
        document.getElementById("app").remove();
        const app = new Div("app");
        const title = new h4("Personal Money Mangement");
        app.addChildElement(title.element);
        const form = new Div("form-transactions");
        const monthSelect = new Select("month");
        for (const month of this.year.months){
            monthSelect.addOption(month.name);
        }
        const typeSelect = new Select("type");
        typeSelect.addOption("income")
        typeSelect.addOption("expense")
        const categoryInputText = new Input("category", "text", "Category");
        const valueInputNumber = new Input("amount", "number", "Value");
        const addButton = new Button("button", "Add");
        addButton.addListener(() => {
           this.addTransaction(); 
         });
        form.addChildElement(monthSelect.element);
        form.addChildElement(typeSelect.element);
        form.addChildElement(categoryInputText.element);
        form.addChildElement(valueInputNumber.element);
        form.addChildElement(addButton.element);
        app.addChildElement(form.element);
    
        const grafic = new Grafic();
        for (const month of this.year.months) {
            grafic.addColumn(month.totalizador.saldo, month.name);
        }
        app.addChildElement(grafic.element);
    
        for (const month of this.year.months) {
            const monthName = new h4(month.name);
            app.addChildElement(monthName.element);
    
            const tableTransaction = new Table("table-transactions");
            tableTransaction.addRow("th", ["Category", "Value"]);
            for (const transaction of month.transactions) {
                tableTransaction.addRow("td", [transaction.category, formatMoney(transaction.getValueString())]);
            }
            tableTransaction.addRow("th", ["Tax", this.formatMoney(month.totalizador.juros)]);
            tableTransaction.addRow("th", ["Return", this.formatMoney(month.totalizador.rendimentos)]);
            tableTransaction.addRow("th", ["Amount", this.formatMoney(month.totalizador.saldo)]);
    
            app.addChildElement(tableTransaction.element);
        }
       const [body] = document.getElementsByTagName("body");
       body.appendChild(app.element);
    }
}