class Transaction {

    constructor(category, type, value){
        if (type !== "income" && type !== "expense") {
            throw new Error("Invalid Transaction: Type should be income or expense ")
        }
        if (value <= 0) {
            throw new Error("Invalid Transaction: Value must be greater than zero ")
        }
        if (category === "") {
            throw new Error("Invalid Transaction: Category is required")
        }
        this.category = category;
        this.type = type;
        this.value = value;
    }

    getValueString () {
       return (this.type === "expense") ? this.value * -1 : this.value
    }
}