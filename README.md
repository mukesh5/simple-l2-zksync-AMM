# A Simple L2 Zksync AMM

This is a simple AMM which stores two tokens and it's balance in the smart contract and exposes the functions to withdraw, swap.
This doesn't have any fee or incentive mechanism.

## Frameworks
 - Solidity (v0.8.0)
 - Hardhat (for compiling, deploying and testing)
 - Node (v16.0.0)

## Steps to run the project

#### 1. Clone the project and install the dependencies (make sure you have latest node and hardhat installed)
````
yarn install 
````

#### 2. Add your private key in deploy.ts file and your ETH network URL in hardhat.config.ts
````
const wallet = new Wallet("<YOUR_PRIVATE_KEY>"); //deploy.ts
````
````
zkSyncDeploy: {
    zkSyncNetwork: "https://zksync2-testnet.zksync.dev",
    ethNetwork: "", // Can also be the RPC URL of the network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
  }
````


#### 3. Compile the contracts (to see if they are successfully compiled check if "artifacts-zk" and "cache-zk" folders are created in your repo
````
yarn hardhat compile
````
