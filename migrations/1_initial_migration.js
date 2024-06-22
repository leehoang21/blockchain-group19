const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  const gasLimit = 10000000;
  deployer.deploy(Migrations, { gas: gasLimit });
};
