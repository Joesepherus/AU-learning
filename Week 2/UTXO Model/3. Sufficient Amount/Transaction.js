class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
        this.fee = 0;
    }
    execute() {
        let totalInputs = 0;
        let totalOutputs = 0;
        for (let i = 0; i < this.inputUTXOs.length; i++) {
            if (this.inputUTXOs[i].spent) {
                throw Error();
            }
            totalInputs += this.inputUTXOs[i].amount;
        }
        for (let i = 0; i < this.outputUTXOs.length; i++) {
            if (this.outputUTXOs[i].spent) {
                throw Error();
            }
            totalOutputs += this.outputUTXOs[i].amount;
        }
        if (totalInputs < totalOutputs) {
            throw Error();
        }
    }
}

module.exports = Transaction;
