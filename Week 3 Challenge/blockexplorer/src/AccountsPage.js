import { useEffect, useState } from "react";
import React from "react";
import { alchemy } from "./App";
import { ethers } from 'ethers';
console.log('ethers: ', ethers.formatEther);

const AccountPage = () => {
  const [address, setAddress] = useState();
  const [balance, setBalance] = useState();

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function getBalance() {
    if (address) {
      const _balance = await alchemy.core.getBalance(address)
      console.log('_balance: ', _balance);
      setBalance(_balance);
    }
  }

  return (
    <div>
      <div>
        <h2>Get Balance</h2>
        <input
          placeholder="Type an address, for example: 0x2"
          value={address}
          onChange={setValue(setAddress)}
        ></input>
        <button onClick={() => getBalance()}>submit</button>
      </div>
      {balance ? <div>{ethers.formatEther(balance?._hex)} ETH</div> : null}
    </div>
  );
};

export default AccountPage;
