import { utils, Wallet, Contract, Provider } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the AMM contract`);

  // Initialize the wallet.
  // const balancel1 = await wallet.getBalanceL1();

  // console.log(balancel1);

  const provider = new Provider("https://zksync2-testnet.zksync.dev");

  const wallet = new Wallet("", provider);
  // const withdrawL2 = await wallet.withdraw({
  //   token: utils.ETH_ADDRESS,
  //   amount: ethers.utils.parseEther("0.01"),
  // });
  // await withdrawL2.waitFinalize();
  
  // const balancel2 = await wallet.getBalance();
  // console.log(balancel2);

  // console.log(ethers.utils.formatEther(balancel2))

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("AMM");




  // const contractInterface = new ethers.utils.Interface([
  //   "function getContractBalance() public view returns(uint)",
  //   "function getAllowanceERC20(address erc20TokenSmartContractAddress) public view returns(uint)"]);
  // const smartbank = new Contract('0x53c6A2a24c6Db3d756d2aDBc2111BC883E5b6CAC', contractInterface, provider);


  // Deposit some funds to L2 in order to be able to perform L2 transactions.
  // console.log('Depositing.. ETH in L2 ')
  // const depositAmount = ethers.utils.parseEther("0.01");
  // const depositHandle = await deployer.zkWallet.deposit({
  //  to: deployer.zkWallet.address,
  //  token: utils.ETH_ADDRESS,
  //  amount: depositAmount,
  // });
  // // Wait until the deposit is processed on zkSync
  // await depositHandle.wait();
  // console.log('ETH deposited to L2');

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  console.log('Deploying contract')
  const ammContract = await deployer.deploy(artifact, []);

  // Show the contract info.
  const contractAddress = ammContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);

  // Call the deployed contract and check the pool. It should be empty at the start
  const initialPoolDetails = await ammContract.getPoolDetails();
  console.log(initialPoolDetails);

  
  // Add some tokens to your address
  const addSomeTokens = await ammContract.faucet(50, 50);
  
  // Check your holdings
  const myHoldings = await ammContract.getHoldings();
  console.log(myHoldings);


  // Become a liquidity provider by providing your tokens
  await ammContract.provide(50, 50);


  // check if you have got shares
  const myshareHoldings = await ammContract.getHoldings();
  console.log(myshareHoldings);

  // withdraw some tokens
  const withdrawedTokens = await ammContract.withdraw(20, 20);
  console.log(withdrawedTokens);

}

