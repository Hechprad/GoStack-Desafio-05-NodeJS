import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (value === 0) {
      throw Error('The transaction must have a value');
    }

    if (value < 0 && type === 'income') {
      throw Error('The income value must be greater then zero');
    }

    if (value < 0 && type === 'outcome') {
      throw Error('The outcome value must be greater then zero');
    }

    if (
      typeof title === 'string' &&
      typeof value === 'number' &&
      (type === 'income' || type === 'outcome')
    ) {
      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      });
      return transaction;
    }
    throw Error('Internal error');
  }
}

export default CreateTransactionService;
