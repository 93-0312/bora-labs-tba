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
      const deviceParser = new UAParser(navigator.userAgent);
      const deviceType = deviceParser.getDevice().type;
      const deviceName = deviceParser.getOS().name;

      const isMo = deviceType === 'mobile';

      if (!isMo) {
        const wallet = new MetamaskService();
        await wallet.init();

        if (!wallet.hasWallet()) {
          window.open('https://metamask.io/download/', '_blank');
          return;
        }
      } else if (isMo && !window.ethereum) {
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
      }
      const wallet = new MetamaskService();
      await wallet.init();

      await wallet.switchNetworkChain(Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID));
      const cntWallet = await wallet.getAddress();
      setWalletAddress(cntWallet);

      await getBgas(cntWallet);
      setIsSigned(true);
    } catch (err: any) {
      console.error({ err });
      const message = err.message || '';

      if (message.indexOf('nativeCurrency.symbol') > -1) {
        alert('Please change the symbol of the "Borachain Testnet" from BGAS to BORA.');
        return;
      }
    }
  };

  const disconnectWallet = async () => {
    if (confirm('Disconnect Wallet?')) {
      const wallet = new MetamaskService();
      if (wallet.hasWallet()) {
        const walletAddress = await wallet.getAddress();
        wallet.disconnectWallet(walletAddress);
      }

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
