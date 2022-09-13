class Month {

    constructor(name, initialBalance) {
        if (name === "") throw new Error("Invalid Month: Name is required")
        this.name = name;
        this.initialBalance = initialBalance;
        this.totalizador = {saldo: 0, juros: 0, rendimentos: 0, receitas:0, despesas: 0, distribuicaoDeDespesas: [] }
        this.transactions = [];
    }

    addTransaction (transaction){
        this.transactions.push(transaction);
    }

    calcularSaldo() {
        this.totalizador = {saldo: 0, juros: 0, rendimentos: 0, receitas:0, despesas: 0, distribuicaoDeDespesas: [] }
        this.totalizador.saldo = this.initialBalance ;
        this.apurarIncome();
        this.apurarExpense();
        this.distributeExpense();
        this.apurarJuros();
        this.apurarRendimentos();
    }

    apurarExpense () {
        for(const transaction of this.transactions){
            if(transaction.type === "expense") {
                this.totalizador.saldo -= transaction.value
                this.totalizador.despesas += transaction.value
            }
        }
    }

    apurarIncome () {
        for(const transaction of this.transactions){
            if(transaction.type === "income"){
                this.totalizador.saldo += transaction.value
                this.totalizador.receitas += transaction.value
            } 
            
        }
    }
    
    distributeExpense() {
        const distribuicaoDeDespesas = []
        for (const transaction of this.transactions) {
            if(transaction.type === "expense") {
                const percentual = arredondar((transaction.value/this.totalizador.despesas)*100)
                distribuicaoDeDespesas.push({category: transaction.category, percentual: percentual})
            }        
        }
        this.totalizador.distribuicaoDeDespesas =  distribuicaoDeDespesas
    }

    apurarJuros () {
        if (this.totalizador.saldo < 0) {
            this.totalizador.juros = this.calcularJuros( this.totalizador.saldo);
            this.totalizador.saldo = arredondar(this.totalizador.saldo + this.totalizador.juros)
        } 
    }

    apurarRendimentos () {
        if (this.totalizador.saldo > 0) {
            this.totalizador.rendimentos = this.calcularRendimentos( this.totalizador.saldo);
            this.totalizador.saldo = arredondar(this.totalizador.saldo + this.totalizador.rendimentos);
        }
    }

    
    calcularJuros(valor) {
        const juros = arredondar(valor * 0.1)
        return juros
    }
    
    calcularRendimentos(valor) {
        const rendimentos = arredondar(valor * 0.005)
        return rendimentos
    }

} 