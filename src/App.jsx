import { useState } from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';

import './App.css';

function App() {
  const [mnemonic, setMnemonic] = useState('');
  const [wallet, setWalletInfo] = useState([]);
  const [balances, setBalances] = useState([]);

  const generateMemo = () => {
    const mnemonic = ethers.Mnemonic.entropyToPhrase(ethers.randomBytes(16));
    setMnemonic(mnemonic);
    setWalletInfo([]);
    setBalances([]);
  };

  const addWallet = async () => {
    const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic, `m/44'/60'/0'/0/${wallet.length}`);
    setWalletInfo([...wallet, hdNode]);

    // Fetch the balance for the newly added wallet
    const balance = await getBalance(hdNode.address);
    setBalances([...balances, balance]);
  };

  // Initialize Web3 instance
  const provider = new Web3('https://eth-mainnet.g.alchemy.com/v2/JdHG7ctUrdzDL5rs9-_tPYAfhS4Ns9JE'); //connection to blockchain using web3

  // Function to get balance
  const getBalance = async (walletAddress) => {
 
      const balanceInWei = await provider.eth.getBalance(walletAddress);
      const balanceInEther = provider.utils.fromWei(balanceInWei, 'ether');
      return balanceInEther;
    
  };

  return (
    <div className='bg-p1 h-screen w-full flex justify-center items-center text-white'>
      <div className='border-2 bg-gray-900 bg-opacity-90 backdrop-blur-sm mb-10 w-fit min-w-[720px] h-fit p-10 py-4 rounded-md border-gray-700 shadow-md shadow-black'>
        <div className='items-center justify-center flex'>
          <h1 className="text-2xl text-purple-500 hover:text-purple-400 font-bold hover:drop-shadow-lg mb-10">Web-Wallet</h1>
        </div>

        <div className="relative mt-2 rounded-md shadow-sm">
          <button className="my-2 text-sm font-bold mx-auto text-white bg-cyan-600 border-0 py-2 px-8 focus:outline-none hover:bg-cyan-700 rounded" onClick={generateMemo}>Generate Mnemonic</button>
          <p className="block w-full min-w-[500px] rounded-md border-0 py-1.5 pl-7 font-bold pr-20 text-sm text-slate-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hover:ring-2 hover:ring-inset hover:ring-cyan-600 sm:text-sm sm:leading-6">{mnemonic}</p>
        </div>

        <div className="relative mt-2 rounded-md shadow-sm">
          <button className="my-2 text-sm font-bold mx-auto text-white bg-pink-600 border-0 py-2 px-8 focus:outline-none hover:bg-pink-700 rounded" onClick={addWallet}>Add Wallet</button>
          {wallet.map((wallet, index) => (
            

            <div key={index} className="block w-full min-w-[500px]  justify-between rounded-md border-0 py-1.5 pl-7 font-bold pr-20 text-sm text-slate-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hover:ring-2 hover:ring-inset hover:ring-cyan-600 sm:text-sm sm:leading-6">
             <p> Wallet {index + 1} :{wallet.address}  </p>
             <p className='text-emerald-500'> Bal:  {balances[index]}0 Eth </p>
             </div>
               
            
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
