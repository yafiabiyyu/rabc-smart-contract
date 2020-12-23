//SPDX-License-Identifier: UNL
pragma solidity >=0.6.0 <=0.7.5;

// import openzeppelin-contract module
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Petugas is AccessControl,Ownable {

    bytes32 public constant DEFAULT_PETUGAS_ROLE = keccak256(
        "DEFAULT_PETUGAS_ROLE"
    );

    bytes32 public constant DEFAULT_USER_ROLE = keccak256(
        "DEFAULT_USER_ROLE"
    );

    // event list
    event NewPetugas(address _rootAddress, address _newPetugasAddress);

    mapping(address => bool) public blackListAdmin;

    constructor() public {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function addNewPetugas(
        bytes32 _petugasRole,
        address _petugasAddress
    ) public onlyOwner {
        grantRole(_petugasRole, _petugasAddress);
        emit NewPetugas(msg.sender, _petugasAddress);
    }

    function setPetugasForRole(
        bytes32 _role, bytes32 _petugasRole
    ) public onlyOwner {
        _setRoleAdmin(_role, _petugasRole);
    }
}
