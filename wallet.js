// NovaPay Wallet Engine V1

const Wallet = {

    getBalance() {

        return Number(localStorage.getItem("novapayBalance")) || 0;

    },

    setBalance(amount) {

        localStorage.setItem("novapayBalance", amount);

    },
deposit(amount, description = "Wallet Funding") {

    const current = this.getBalance();

    const total = current + Number(amount);

    this.setBalance(total);

    this.addTransaction(
        "Credit",
        amount,
        description
    );

    return total;

},
    

    withdraw(amount, description = "Wallet Debit") {

    const current = this.getBalance();

    if (current < Number(amount)) {

        return false;

    }

    const total = current - Number(amount);

    this.setBalance(total);

    this.addTransaction(
        "Debit",
        amount,
        description
    );

    return total;

}

}; 
// Transaction History Engine

Wallet.addTransaction = function(type, amount, description) {

    const transactions =
        JSON.parse(localStorage.getItem("novapayTransactions")) || [];

    transactions.unshift({

        id: Date.now(),

        type: type,

        amount: Number(amount),

        description: description,

        date: new Date().toLocaleString()

    });

    localStorage.setItem(
        "novapayTransactions",
        JSON.stringify(transactions)
    );

};

Wallet.getTransactions = function() {

    return JSON.parse(
        localStorage.getItem("novapayTransactions")
    ) || [];

};