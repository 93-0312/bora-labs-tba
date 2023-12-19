import axios from 'axios';
import { UAParser } from 'ua-parser-js';
import { useAccountStore } from '@/stores/account.module.ts';
import { useAssetStore } from '@/stores/asset.module';
import MetamaskService from '@/services/metamask.service';

export const setupAccount = () => {
  const accountStore = useAccountStore();
  const assetStore = useAssetStore();

  const { setWalletAddress, setIsSigned } = accountStore;
  const { resetAsset } = assetStore;

  const getBgas = async (cntWallet: string) => {
    try {
      const boralabsApi = import.meta.env.VITE_BORALABS_API_URL;
      await axios.get(`${boralabsApi}/bgas/${cntWallet}`);
    } catch {
      return;
    }
  };

  const connectWallet = async () => {
    try {
      const wallet = new MetamaskService();
      await wallet.init();

      const deviceParser = new UAParser(navigator.userAgent);
      const deviceType = deviceParser.getDevice().type;
      const deviceName = deviceParser.getOS().name;

      const isMo = deviceType === 'mobile';

      if (isMo) {
        const link = (link: string) => {
          if (deviceName?.includes('android')) {
            return `intent://${link}/#Intent;scheme=dapp;package=io.metamask;end`;
          } else {
            return `https://metamask.app.link/dapp/${link}`;
          }
        };
        return window.open(
          link(`${window.location.hostname}${window.location.pathname}?connect=metamask`),
          '_self'
        );
      } else {
        if (!wallet.hasWallet()) {
          window.open('https://metamask.io/download/', '_blank');
          return;
        }
        await wallet.switchNetworkChain(Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID));
        const cntWallet = await wallet.getAddress();
        setWalletAddress(cntWallet);

        await getBgas(cntWallet);
        setIsSigned(true);
      }
    } catch (err) {
      console.error({ err });
    }
  };

  const disconnectWallet = () => {
    if (confirm('Disconnect Wallet?')) {
      resetAsset();
      setWalletAddress('');
      setIsSigned(false);
    }
  };

  return {
    connectWallet,
    disconnectWallet
  };
};
