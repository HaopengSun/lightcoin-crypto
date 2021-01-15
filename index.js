class Transaction {
  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  // account passed is a class which has twn properties, name and balance
  // because account is an obejct, the old balance is changed
  commit() {
    if(!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
  }
  isAllowed(){
    return this.account.balance + this.value > 0;
  }
}

class Withdrawal extends Transaction {
  get value(){
    return -this.amount;
  }
}

class Deposit extends Transaction {
  get value(){
    return this.amount;
  }
}

class Account {
  constructor(username) {
    this.username = username;
    this.transaction = [];
  }
  get balance(){
    let balance = 0;
    if (this.transaction.length > 0){
      for (let trans of this.transaction) {
    	  balance += trans.value;
      }
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transaction.push(transaction);
  }
}

const myAccount = new Account('billybob');
console.log('Starting Balance:', myAccount.balance);
const t1 = new Deposit(120.00, myAccount);
t1.commit();
const t2 = new Withdrawal(300.00, myAccount);
t2.commit();
console.log('Ending Balance:', myAccount.balance);
