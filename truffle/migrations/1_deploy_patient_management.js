const PatientManagement = artifacts.require("PatientManagement");

module.exports = function (deployer) {
  adminAddress = '0xB10aF3D02eB04bc7A1B611Dc4F98fa311d99A2dd'

  deployer.deploy(PatientManagement, adminAddress);
};
