//SPDX-License-Identifier: UNL
pragma solidity >=0.6.0 <=0.7.5;

// import openzeppelin-contract module
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Petugas is AccessControl,Ownable {

    bytes32 public constant DEFAULT_PETUGAS_ROLE = keccak256(
        "DEFAULT_PETUGAS_ROLE"
    );

    // event list
    event NewPetugas(address _newPetugasAddress);
    event RemovePetugas(address _removePetugasAdress);
    event newMember(address _memberAddress, string _memberName);
    event removeMembers(address _memberAddress);

    struct Member {
        string name;
        bool status;
    }

    mapping(address => bool) internal petugasBlacklistAddress;
    mapping (address => Member) public addressToMember;

    constructor() public {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    modifier onlyPetugas() {
        require(hasRole(DEFAULT_PETUGAS_ROLE, msg.sender),"Terbatas untuk petugas");
        require(petugasBlacklistAddress[msg.sender] == false,"Petugas terdaftar di blacklist");
        _;
    }

    function addNewPetugas(address _petugasAddress) public onlyOwner {
        grantRole(DEFAULT_PETUGAS_ROLE, _petugasAddress);
        emit NewPetugas(_petugasAddress);
    }

    function removePetugas(address _petugasAddress) public onlyOwner {
        revokeRole(DEFAULT_PETUGAS_ROLE, _petugasAddress);
        petugasBlacklistAddress[_petugasAddress] = true;
        emit RemovePetugas(_petugasAddress);
    }

    function addNewMember(
        address _memberAddress,
        string memory _name
    ) public onlyPetugas {
        addressToMember[_memberAddress] = Member(_name,true);
        emit newMember(_memberAddress, _name);
    }

    function removeMember(
        address _memberAddress
    ) public onlyPetugas {
        addressToMember[_memberAddress].status = false;
        emit removeMembers(_memberAddress);
    }
}
