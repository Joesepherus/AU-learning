const { randomBytes } = require("crypto");
const { keccak256 } = require("js-sha3");

const accounts = [
  {
    publicKey:
      "03afabae4cd5b31971224c4cc20c89568aee061bd586f3e33571d1f991ba1242b9",
    address: "0x01e9ecef933ac16bf3dd25fabfdadf09c3b4ac72",
    balance: 66,
  },
  {
    publicKey:
      "03292d39df34a48ed175bd9afab4f39a083196c1ece78bc980021db3aaf10315cd",
    address: "0x91f395c9e45643f1fec641e786c4f2cd070fe636",
    balance: 89,
  },
  {
    publicKey:
      "021b7e497528fcde821b7525af4599e3fd9f92d2458c93aa18de5f651628bb3505",
    address: "0x359ff508675ea309b186857ca4030f80465842c4",
    balance: 75,
  },
  {
    publicKey:
      "036e2d056471e79eec0b21a3727961183fac951b9955e03e68fbf9a16041c956d1",
    address: "0x88a8342cf24545a992696004792a000d471aafa7",
    balance: 70,
  },
  {
    publicKey:
      "02cfefc5508e5d324cef76b9a3a4fb7a8078ee9c935e17506888677c608a9e2e95",
    address: "0x1a3c4cbf3d158a9fa78f0d65f3b7a0848e70d27d",
    balance: 85,
  },
];

// privateKey only for filling out the form in FE, 
// otherwise BE or FE doesnt know about it
// so that it's secure
// once again this doesnt have to be here, just easier 
// to copy paste the private keys from here
// users would just have their private keys stored somehwere safe
// not on the server ofcourse   
const accountsWithPrivateKey = [
  {
    privateKey:
      "25b3977c1eae91d96dd45e3dc239ae3157e13c70c20ec229dd3ee4e4d86ab1a0",
    publicKey:
      "03afabae4cd5b31971224c4cc20c89568aee061bd586f3e33571d1f991ba1242b9",
    address: "0x01e9ecef933ac16bf3dd25fabfdadf09c3b4ac72",
    balance: 66,
  },
  {
    privateKey:
      "9756e9f4e911c96c9784d419f08376d3fc1c6a8ce9a76ecbd57147483fc616c4",
    publicKey:
      "03292d39df34a48ed175bd9afab4f39a083196c1ece78bc980021db3aaf10315cd",
    address: "0x91f395c9e45643f1fec641e786c4f2cd070fe636",
    balance: 89,
  },
  {
    privateKey:
      "347393cfc66ec3006220a1ae986f3982541dc20449c149b48ff9aaa09f01eeea",
    publicKey:
      "021b7e497528fcde821b7525af4599e3fd9f92d2458c93aa18de5f651628bb3505",
    address: "0x359ff508675ea309b186857ca4030f80465842c4",
    balance: 75,
  },
  {
    privateKey:
      "c4da89d199fc237188a955c26d9342510096e8962f8cf33abf7a78c5e02e88b9",
    publicKey:
      "036e2d056471e79eec0b21a3727961183fac951b9955e03e68fbf9a16041c956d1",
    address: "0x88a8342cf24545a992696004792a000d471aafa7",
    balance: 70,
  },
  {
    privateKey:
      "82b98d1269c24cf21a617465c2f719720f813d1c8ad9c24d214ced31992d1630",
    publicKey:
      "02cfefc5508e5d324cef76b9a3a4fb7a8078ee9c935e17506888677c608a9e2e95",
    address: "0x1a3c4cbf3d158a9fa78f0d65f3b7a0848e70d27d",
    balance: 85,
  },
];

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAccounts() {
  const accounts = [];
  for (let i = 0; i < 5; i++) {
    const privateKey = randomBytes(32);
    const key = ec.keyFromPrivate(privateKey);
    const publicKey = key.getPublic(true, "hex");
    const address = "0x" + keccak256(publicKey).slice(-40);
    accounts.push({
      privateKey: privateKey.toString("hex"),
      publicKey: publicKey,
      address: address,
      balance: generateRandomNumber(50, 100),
    });
  }
  return accounts;
}

module.exports = {
  accounts,
  generateAccounts,
};
