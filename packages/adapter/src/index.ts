import type { SnapConfig } from "metamask-icon-types";
import { hasMetaMask, isMetamaskSnapsSupported, isIconSnapInstalled } from './utils';
import { MetamaskIconSnap } from './snap';

const defaultSnapOrigin = 'npm:icon-snap';

export type SnapInstallationParamNames = string;

export async function enableIconSnap(
  config: SnapConfig = { networkName: 'berlin' },
  snapOrigin?: string,
  snapInstallationParams: Record<SnapInstallationParamNames, unknown> = {}
): Promise<MetamaskIconSnap> {
  const snapId = snapOrigin ?? defaultSnapOrigin;

  // check all conditions
  if (!hasMetaMask()) {
    throw new Error('Metamask is not installed');
  }
  if (!(await isMetamaskSnapsSupported())) {
    throw new Error("Current Metamask version doesn't support snaps");
  }
  if (!config.networkName) {
    config.networkName = 'berlin';
  }

  const isInstalled = await isIconSnapInstalled(snapId);
  console.info('isInstalled', isInstalled);

  if (!isInstalled) {
    // // enable snap
    await window.ethereum.request({
      method: 'wallet_requestSnaps',
      params: {
        [snapId]: { ...snapInstallationParams }
      }
    });
  }

    // create snap describer
    const snap = new MetamaskIconSnap(snapOrigin || defaultSnapOrigin, config);
    // set initial configuration
  
    try {
      const snapApi = snap.getMetamaskSnapApi();
      console.info('snapApi', snapApi);
      await snapApi.setConfiguration(config);
    } catch (err) {
      console.error('Failed to set configuration', err);
    }
  
    return snap;
}