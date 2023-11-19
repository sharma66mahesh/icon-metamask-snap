import type {
  BlockInfo,
  SnapConfig,
  SnapRpcMethodRequest,
  Transaction,
  TxPayload
} from 'metamask-icon-types';

export interface MetamaskSnapApi {
  getAddress(): Promise<string>;

  getPublicKey(): Promise<string>;

  getBalance(): Promise<string>;

  exportSeed(): Promise<string>;

  getLatestBlock(): Promise<BlockInfo>;

  setConfiguration(configuration: SnapConfig): Promise<void>;

  getAllTransactions(): Promise<Transaction[]>;

  signPayloadJSON(payload: object): Promise<string>;

  signPayloadRaw(payload: object): Promise<string>;

  send(signature: string, txPayload: TxPayload): Promise<Transaction>;

  generateTransactionPayload(amount: string | number, to: string): Promise<TxPayload>;
}

// export interface InjectedMetamaskExtension extends InjectedExtension {
  export interface InjectedMetamaskExtension {
  getMetamaskSnapApi: () => Promise<MetamaskSnapApi>;
}

declare global {
  interface Window {
    ethereum: {
      isMetaMask: boolean;

      send: (
        request: SnapRpcMethodRequest | { method: string; params?: never[] }
      ) => Promise<unknown>;
      on: (eventName: unknown, callback: unknown) => unknown;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request: <T>(
        request: SnapRpcMethodRequest | { method: string; params?: any }
      ) => Promise<T>;
    };
  }
}

