class Transaction {
  constructor(inputUTXOs, outputUTXOs) {
      this.inputUTXOs = inputUTXOs
      this.outputUTXOs = outputUTXOs
      this.fee = 0
  }
  execute() {
      for(let i = 0; i < this.inputUTXOs.length; i++) {
          if(this.inputUTXOs[i].spent) {
              throw Error()
          }
      }

  }
}

module.exports = Transaction;