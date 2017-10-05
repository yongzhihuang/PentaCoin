const sha256 = require('js-sha256');
const _ = require('lodash');

class BlockChain {
  constructor() {
    this.chain = [];
    this.currentTransactions = [];

    this.addNewBlock(previousHash=1, proof=100);
  }

  addNewBlock(previousHash=null, proof) {
    const time = new Date();

    const block = {
      index: this.chain.length + 1,
      timestamp: time.getTime(),
      transactions: this.currentTransactions,
      proof,
      previousHash: previousHash ? previousHash : this.hash(this.chain[this.chain.length-1])
    };

    this.currentTransactions = [];

    this.chain.push(block);
    return block;
  }

  addTransaction(sender, recipient, amount) {
    this.currentTransactions.push({
      sender,
      recipient,
      amount
    });
    
    // todo: return index of the last block to append this to
    return this.getLastBlock()
  }

  hash(block) {
    const sortedBlock = _.sortBy(block);
    const blockString = JSON.stringify(block);
    return sha256(blockString);
  }

  getLastBlock() {
    return this.chain[this.chain.length-1];
  }

  validateProofOfWork(lastProof) {
    let proof = 0;
    while (this.validProof(lastProof, proof) === false) {
      proof +=1;
    }

    return proof;
  }


  static validateProof(lastProof, proof) {
    const guess = `${JSON.stringify(_.sortBy(lastProof))}${JSON.stringify(_.sortBy(proof))}`;
    const guessHash = sha256(guess);
    return guessHash[4] === '0000';
  }
}

exports.BlockChain = BlockChain