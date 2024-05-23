require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("@nomicfoundation/hardhat-verify");
const dotenv = require("dotenv");
dotenv.config();
//require("@nomiclabs/hardhat-etherscan");
/** @type import('hardhat/config').HardhatUserConfig */
const privateKey = process.env.PRIVATE_KEY;

const API = process.env.API_KEY;
const secretKey = process.env.API_SECRET;

console.log("***********", privateKey, API, secretKey);
module.exports = {
  defaultNetwork: "hardhat",
  networks: {

    mainnet: {
      url: `https://mainnet.infura.io/v3/`,
      accounts: [privateKey],
      gasPrice: 120 * 1000000000,
      chainId: 1,
    },
    hardhat: {
      chainId: 1337
    },

    amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      accounts: [privateKey],
      chainId: 80002,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 50000000000,
      gasMultiplier: 2,
    },

    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/y_vR9ex-TTb6dbe6OmehNcuTgKG6YlE7",
      accounts: [privateKey],
      chainId: 11155111,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 50000000000,
      gasMultiplier: 2,
    },


    matic: {
      url: 'https://polygon-mainnet.blastapi.io/cdb33f76-2321-47a1-bc91-8d86d1d2a838',
      accounts: [privateKey],
      gasPrice: 200000000000,
      chainId: 137,
      // live: true,
      // saveDeployments: true,
      // tags: ["staging"],
      // gasPrice: 700000000000,
      // gasMultiplier: 5,
      //  timeout: 3600,
    },


  },
  defender: {
    apiKey: "3fPAhpwYpQiW2TK484bmr4BmVtzJ1Xo8",
    apiSecret: "2T58368vsotoFYjYpre7iywjai9xYeshNyMKvWdDenR5veT4F1mdsvX4GuTF8q8x",
    networks: "sepolia"
  },


  etherscan: {
    apiKey: '4SDIHKFUBXWZND44YEIPCWQBCXKF7E4NIA'
    //VE8GYGJKHIFH77QZJEJWRVQ1QD3A9FGZ7Q },
    //QZQRX7X34QQQ1M3XTE8FI79MIA98W4VN4Y
  },
  sourcify: {
    enabled: true
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
