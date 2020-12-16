-// SPDX-License-Identifier: UNL
pragma solidity >=0.6.0 <=0.7.5;

// import openzeppelin-contract module
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Petugas is AccessControl,Ownable {

    bytes32 public constant DEFAULT_PENGGUNA_ROLE = keccak256(
        "DEFAULT_PENGGUNA_ROLE"
    );

    constructor() public {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    modifier onlyAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender),"Hanya Admin");
        _;
    }

    function AddPetugas(address _addressPetugas) public onlyOwner {
        grantRole(DEFAULT_ADMIN_ROLE,_addressPetugas);
    }

    function RemovePetugas(address _addressPetugas) public onlyOwner {
        revokeRole(DEFAULT_ADMIN_ROLE, _addressPetugas);
    }

    function AddPengguna(address _addressPengguna) public onlyAdmin {
        grantRole(DEFAULT_PENGGUNA_ROLE,_addressPengguna);
    }

    function RemovePengguna(address _addressPengguna) public onlyAdmin {
        revokeRole(DEFAULT_PENGGUNA_ROLE, _addressPengguna);
    }
}
