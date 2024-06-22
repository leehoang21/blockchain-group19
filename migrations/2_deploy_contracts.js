var ToDo = artifacts.require("./ToDo.sol");

module.exports = function (deployer) {
  const gasLimit = 10000000;
  deployer.deploy(ToDo, { gas: gasLimit });
};
