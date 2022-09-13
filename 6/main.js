const saldoInicial = 0;

const janeiro = new Month("Janeiro", saldoInicial);
janeiro.addTransaction(new Transaction("Salary", "income", 3000));
janeiro.addTransaction(new Transaction("Rent", "expense", 1000)); 
janeiro.addTransaction(new Transaction("Energy Bill", "expense", 200)); 
janeiro.addTransaction(new Transaction("Water Bill", "expense", 100)); 
janeiro.addTransaction(new Transaction("Internet", "expense", 100)); 
janeiro.addTransaction(new Transaction("Transport", "expense", 300)); 
janeiro.addTransaction(new Transaction("Hobby", "expense", 300)); 
janeiro.addTransaction(new Transaction("Food", "expense", 500));
janeiro.addTransaction(new Transaction("Condo", "expense", 300));
janeiro.addTransaction(new Transaction("Farmacy", "expense", 100));
janeiro.calcularSaldo();
console.log(janeiro);

const fevereiro = new Month("Fevereiro", janeiro.totalizador.saldo);
fevereiro.addTransaction(new Transaction("Salary", "income", 3000));
fevereiro.addTransaction(new Transaction("Rent", "expense", 1200));
fevereiro.addTransaction(new Transaction("Energy Bill", "expense", 250)); 
fevereiro.addTransaction(new Transaction("Water Bill", "expense", 100)); 
fevereiro.addTransaction(new Transaction("Internet", "expense", 100));
fevereiro.addTransaction(new Transaction("Transport", "expense", 500));
fevereiro.addTransaction(new Transaction("Food", "expense", 1000));
fevereiro.addTransaction(new Transaction("Condo", "expense", 400));   
fevereiro.calcularSaldo();
console.log(fevereiro);

const marco = new Month("March", fevereiro.totalizador.saldo)
marco.addTransaction(new Transaction("Salary", "income", 4000)); 
marco.addTransaction(new Transaction("Rent", "expense", 1200)); 
marco.addTransaction(new Transaction("Energy Bill", "expense", 200)); 
marco.addTransaction(new Transaction("Water Bill", "expense", 100)); 
marco.addTransaction(new Transaction("Internet", "expense", 200)); 
marco.addTransaction(new Transaction("Transport", "expense", 500)); 
marco.addTransaction(new Transaction("Hobby", "expense", 800)); 
marco.addTransaction(new Transaction("Food", "expense", 1000));
marco.addTransaction(new Transaction("Condo", "expense", 400));
marco.calcularSaldo();
console.log(marco);

janeiro.addTransaction(new Transaction("School", "expense", 500));
janeiro.calcularSaldo();