//synchronous programming (lineas consecutivas) ej. Solidity
//Javascript can be asynchronous (cosas corriendo a la vez)
const ethers = require("ethers");
const fs = require("fs-extra");
async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "bb000d6c2f5dcc592d20a44e95c97e8dd86010605e49eb3fe80e4935cfe61d61",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  console.log("Deploying, please wait...");

  const contract = await contractFactory.deploy(); //Await: Stop here, wait for contract to deploy
  await contract.deployTransaction.wait(1);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(currentFavoriteNumber);
}
//http://127.0.0.1:7545
main()
  .then(() => ProcessingInstruction.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
