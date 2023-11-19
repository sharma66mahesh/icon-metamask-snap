import type {
  BlockInfo,
  MetamaskIconRpcRequest,
  SignPayloadJSONRequest,
  SignPayloadRawRequest,
  SnapConfig,
  Transaction,
  TxPayload
} from 'metamask-icon-types';
import type { MetamaskIconSnap } from './snap';

async function sendSnapMethod(
  request: MetamaskIconRpcRequest,
  snapId: string
): Promise<unknown> {
  console.info('sendSnapMethod', request, snapId);
  return await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      request,
      snapId
    }
  });
}

async function sign(
  this: MetamaskIconSnap,
  method: 'signPayloadJSON' | 'signPayloadRaw',
  payload: object
): Promise<{ signature: string }> {
  return (await sendSnapMethod(
    {
      method,
      params: {
        payload
      }
    } as SignPayloadJSONRequest | SignPayloadRawRequest,
    this.snapId
  )) as { signature: string };
}

export async function signPayloadJSON(
  this: MetamaskIconSnap,
  payload: object
): Promise<string> {
  return (await sign.bind(this)('signPayloadJSON', payload)).signature;
}

export async function signPayloadRaw(
  this: MetamaskIconSnap,
  payload: object
): Promise<string> {
  return (await sign.bind(this)('signPayloadRaw', payload)).signature;
}

export async function getBalance(this: MetamaskIconSnap): Promise<string> {
  return (await sendSnapMethod({ method: 'getBalance' }, this.snapId)) as string;
}

export async function getAddress(this: MetamaskIconSnap): Promise<string> {
  return (await sendSnapMethod({ method: 'getAddress' }, this.snapId)) as string;
}

export async function getPublicKey(this: MetamaskIconSnap): Promise<string> {
  return (await sendSnapMethod({ method: 'getPublicKey' }, this.snapId)) as string;
}

export async function exportSeed(this: MetamaskIconSnap): Promise<string> {
  return (await sendSnapMethod({ method: 'exportSeed' }, this.snapId)) as string;
}

export async function setConfiguration(
  this: MetamaskIconSnap,
  config: SnapConfig
): Promise<void> {
  await sendSnapMethod({ method: 'configure', params: { configuration: config } }, this.snapId);
}

export async function getLatestBlock(this: MetamaskIconSnap): Promise<BlockInfo> {
  try {
    return (await sendSnapMethod(
      { method: 'getBlock', params: { blockTag: 'latest' } },
      this.snapId
    )) as BlockInfo;
  } catch (e) {
    console.log('Unable to fetch latest block', e);
    return { hash: '', number: '' };
  }
}

export async function getAllTransactions(this: MetamaskIconSnap): Promise<Transaction[]> {
  return (await sendSnapMethod({ method: 'getAllTransactions' }, this.snapId)) as Transaction[];
}

export async function sendSignedData(
  this: MetamaskIconSnap,
  signature: string,
  txPayload: TxPayload
): Promise<Transaction> {
  const response = await sendSnapMethod(
    {
      method: 'send',
      params: {
        signature,
        txPayload
      }
    },
    this.snapId
  );
  return response as Transaction;
}

export async function generateTransactionPayload(
  this: MetamaskIconSnap,
  amount: string | number,
  to: string
): Promise<TxPayload> {
  return (await sendSnapMethod(
    { method: 'generateTransactionPayload', params: { amount, to } },
    this.snapId
  )) as TxPayload;
}
