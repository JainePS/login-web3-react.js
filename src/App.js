import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Web3 from 'web3';

function App() {
const [isConnected, setIsConnected] = useState(false);
  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
      return provider;
    }
    if (window.web3) {
      provider = window.web3.currentProvider;
      return provider;
    }
    console.log('Non ethereum brownser detected, please install Metamask');
    return provider;
  }

  const onConnect = async() => {
    try {
      const currentProvider = detectCurrentProvider();
      if(currentProvider){
        await currentProvider.request({method: 'eth_requestAccounts'});
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        //If there is more than one account on the wallet, then it should bring the first one
        const account = userAccount[0];
      let ethBalance = await web3.eth.getBalance();
      setIsConnected(true);
      }
    } catch (err) {
      console.log(err);      
    }
  }
const disconnect = () => {
  setIsConnected(false);
}
  return (
    <div className='app'>
      <div className='app-header'></div>
      <h1>React dApp authentication</h1>
      <div className='app-wrapper'>
{!isConnected && (
  <button className='login-button' onClick={onConnect}>Login</button>
)}
      </div>
    </div>
  );
}

export default App;
