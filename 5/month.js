class Month {

    constructor(name, initialBalance) {
        if (name === "") throw new Error("Invalid Month: Name is required")
        this.name = name;
        this.initialBalance = initialBalance;
        this.totalizadorDoMes = {saldo: 0, initialBalance, juros: 0, rendimentos: 0, receitas:0, despesas: 0, distribuicaoDeDespesas: [] }
        this.transactions = [];
    }

    addTransaction (transaction){
        this.transactions.push(transaction);
    }

    calcularJuros(valor) {
    const juros = arredondar(valor * 0.1)
    return juros
    }

    calcularRendimentos(valor) {
        const rendimentos = arredondar(valor * 0.005)
        return rendimentos
    }

    distributeExpense() {
        const distribuicaoDeDespesas = []
        for (const transaction of this.transactions) {
            if(transaction.type === "expense") {
                const percentual = arredondar((transaction.value/this.totalizadorDoMes.despesas)*100)
                distribuicaoDeDespesas.push({category: transaction.category, percentual: percentual})
            }        
        }
        this.totalizadorDoMes.distribuicaoDeDespesas =  distribuicaoDeDespesas
    }

    apurarJuros () {
        if (this.totalizadorDoMes.saldo < 0) {
            this.totalizadorDoMes.juros = this.calcularJuros( this.totalizadorDoMes.saldo);
            this.totalizadorDoMes.saldo = arredondar(this.totalizadorDoMes.saldo + this.totalizadorDoMes.juros)
        } 
    }

    apurarRendimentos () {
        if (this.totalizadorDoMes.saldo > 0) {
            this.totalizadorDoMes.rendimentos = this.calcularRendimentos( this.totalizadorDoMes.saldo);
            this.totalizadorDoMes.saldo = arredondar(this.totalizadorDoMes.saldo + this.totalizadorDoMes.rendimentos);
        }
    }

    calcularSaldo() {
        this.totalizadorDoMes.saldo = this.initialBalance ;
        this.gitapurarIncome();

        for(const transaction of this.transactions){
            if(transaction.type === "expense") {
                this.totalizadorDoMes.saldo -= transaction.value
                this.totalizadorDoMes.despesas += transaction.value
            }
        }
        
        this.distributeExpense();
        this.apurarJuros();
        this.apurarRendimentos();
        
    }

    apurarIncome () {
        for(const transaction of this.transactions){
            if(transaction.type === "income"){
                this.totalizadorDoMes.saldo += transaction.value
                this.totalizadorDoMes.receitas += transaction.value
            } 
            
        }
    }

} 