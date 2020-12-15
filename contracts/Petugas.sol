// SPDX-License-Identifier: UNL
pragma solidity >=0.6.0 <=0.7.5;

// import openzeppelin-contract module
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Petugas is AccessControl {

    bytes32 public constant DEFAULT_PETUGAS_ROLE = keccak256(
        "DEFAULT_PETUGAS_ROLE"
    );
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

    function AddPetugas(address _addressPetugas) public onlyAdmin {
        grantRole(DEFAULT_PETUGAS_ROLE,_addressPetugas);
    }

    function RemovePetugas(address _addressPetugas) public onlyAdmin {
        revokeRole(DEFAULT_PETUGAS_ROLE, _addressPetugas);
    }
}
