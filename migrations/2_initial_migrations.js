const Petugas = artifacts.require("Petugas");

module.exports = function (deployer) {
    deployer.deploy(Petugas);
}
