import { BrowserProvider, Contract } from 'ethers';
import ToDo from './contracts/ToDo.json';

const getBlockchain = () =>
    new Promise((resolve, reject) => {
        window.addEventListener('load', async () => {
            if (window.ethereum) {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const signerAddress = signer.address;
                const todo = new Contract(
                    ToDo.networks[window.ethereum.networkVersion].address,
                    ToDo.abi,
                    signer
                );
                resolve({ signerAddress, todo });
            }
            resolve({ signerAddress: undefined, todo: undefined });
        });
    });

export default getBlockchain;
