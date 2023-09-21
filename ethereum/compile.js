const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// delete entire 'build' folder
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

// read 'Campaign.sol' from 'contracts' folder
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf-8");

// compile both contracts with solidity compiler
const output = solc.compile(source, 1).contracts;

// write output to 'build' directory
fs.ensureDirSync(buildPath);
for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
