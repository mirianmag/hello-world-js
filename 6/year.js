class Year{
    constructor () {
        this.months = [];
    }

    addMonth (month) {
        this.months.push(month);
    }

    calculateBalance () {
        let initialBalance = 0;
        for(const month of this.months) {
           month.initialBalance = initialBalance;
           month.calcularSaldo();
           initialBalance = month.totalizador.saldo
        }
    }
}