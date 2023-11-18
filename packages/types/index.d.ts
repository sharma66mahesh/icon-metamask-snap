export interface GetPublicKeyRequest {
  method: "getPublicKey";
}

export interface GetAddressRequest {
  method: "getAddress";
}

export interface ExportSeedRequest {
  method: "exportSeed";
}

export interface GetTransactionsRequest {
  method: "getAllTransactions";
}

export interface GetBlockRequest {
  method: "getBlock";
  params: {
    blockTag?: BlockId;
  };
}

export interface GetBalanceRequest {
  method: "getBalance";
}

export interface ConfigureSnapRequest {
  method: "configure";
  params: {
    configuration: SnapConfig;
  };
}

export interface AddIconAssetRequest {
  method: "addIconAsset";
}

export interface GetChainHeadRequest {
  method: "getChainHead";
}

export interface SignPayloadJSONRequest {
  method: "signPayloadJSON";
  params: {
    // payload: SignerPayloadJSON;
    payload: object;
  };
}

export interface SignPayloadRawRequest {
  method: "signPayloadRaw";
  params: {
    // payload: SignerPayloadRaw;
    payload: object;
  };
}

export interface GenerateTransactionPayload {
  method: "generateTransactionPayload";
  params: {
    amount: string | number;
    to: string;
  };
}

export interface SendUnitRequest {
  method: "send";
  params: {
    signature: string;
    txPayload: TxPayload;
  };
}

export type MetamaskIconRpcRequest =
  | GetPublicKeyRequest
  | GetAddressRequest
  | ExportSeedRequest
  | GetTransactionsRequest
  | GetBlockRequest
  | GetBalanceRequest
  | ConfigureSnapRequest
  | AddIconAssetRequest
  | GetChainHeadRequest
  | SignPayloadJSONRequest
  | SignPayloadRawRequest
  | SendUnitRequest
  | GenerateTransactionPayload;

type Method = MetamaskIconRpcRequest["method"];

export interface WalletEnableRequest {
  method: "wallet_enable";
  params: object[];
}

export interface GetPluginsRequest {
  method: "wallet_getPlugins";
}

export interface SnapRpcMethodRequest {
  method: string;
  params: [MetamaskIconRpcRequest];
}

export type MetamaskRpcRequest =
  | WalletEnableRequest
  | GetPluginsRequest
  | SnapRpcMethodRequest;

export type BlockId = number | string | "latest";

export interface TxPayload {
  tx: string;
  // payload: SignerPayloadJSON;
  payload: object;
}

export interface BlockInfo {
  hash: string;
  number: string;
}

export interface UnitConfiguration {
  symbol: string;
  decimals: number;
  image?: string;
  customViewUrl?: string;
}

export type SnapNetworks = "mainnet" | "berlin";

export interface SnapConfig {
  networkName: SnapNetworks;
  wsRpcUrl?: string;
  addressPrefix?: number;
  unit?: UnitConfiguration;
}

// Icon types

export type Callback<T> = (arg: T) => void;

export type IconEventArgument = Balance;
export type IconEventCallback = Callback<IconEventArgument>;

export type TxEventArgument = TxStatus;
export type TxEventCallback = Callback<TxEventArgument>;

export type Balance = string;
export type TxStatus = {
  txHash: string;
};

export type Origin = string;
export type HexHash = string;

export interface Transaction {
  hash: string;
  block: string;
  sender: string;
  destination: string;
  amount: string | number;
  fee: string;
}
