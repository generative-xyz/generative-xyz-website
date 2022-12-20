import { WalletManager } from '@services/wallet';

abstract class ContractOperation<P, R> {
  walletManager: WalletManager;
  params: P;

  constructor(_walletManager: WalletManager, _params: P) {
    this.walletManager = _walletManager;
    this.params = _params;
  }

  abstract prepare(): Promise<void>;

  abstract call(): Promise<R>;

  abstract success(): string;

  abstract error(): string;
}

export default ContractOperation;
