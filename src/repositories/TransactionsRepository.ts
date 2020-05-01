import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions.reduce((accumulator, transaction) => {
      return (
        accumulator + (transaction.type === 'income' ? transaction.value : 0)
      );
    }, 0);

    const totalOutcome = this.transactions.reduce(
      (accumulator, transaction) => {
        return (
          accumulator + (transaction.type === 'outcome' ? transaction.value : 0)
        );
      },
      0,
    );

    const total = totalIncome - totalOutcome;

    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    if (type === 'outcome' && this.getBalance().total - value < 0) {
      throw Error(`Your balance can't be negative!`);
    }

    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
