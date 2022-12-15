import { WalletManager } from '@services/wallet';
import { TransactionReceipt } from 'web3-eth';

abstract class ContractOperation<P> {
  walletManager: WalletManager;
  params: P;

  constructor(_walletManager: WalletManager, _params: P) {
    this.walletManager = _walletManager;
    this.params = _params;
  }

  abstract prepare(): Promise<void>;

  abstract call(): Promise<TransactionReceipt>;

  abstract success(): string;

  abstract error(): string;
}

export default ContractOperation;
