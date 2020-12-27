const {expect} = require('chain');
const { constants,expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

const Petugas = artifacts.require('Petugas');

contract('Petugas', function([owner,petugas,other]){
    beforeEach(async function(){
        this.petugas = await Petugas.new({from:owner});
    });

    describe('[1.1] Owner Test Case', function(){
        it('Owner menambahkan Petugas kedalam smart-contract', async function(){
            const receipt = await this.petugas.addNewPetugas(
                petugas,
                {from:owner}
            );
            expectEvent(
                receipt,
                'NewPetugas',
                {_newPetugasAddress:petugas}
            );
        });

        it('Owner menghapus petugas dari smart-contract', async function(){
            const receipt = await this.petugas.removePetugas(
                petugas,
                {from:owner}
            );
            expectEvent(
                receipt,
                'RemovePetugas',
                {_removePetugasAdress:petugas}
            );
        });
    });

    describe('[1.2] Non Owner Test Case', function(){
        it('Non Owner menambahkan petugas kedalam smart-contract', async function(){
            await expectRevert(
                this.petugas.addNewPetugas(
                    petugas,
                    {from:other}
                ),
                'Ownable: caller is not the owner'
            );
        });

        it('Non Owner menghapus petugas dari smart-contract', async function(){
            await expectRevert(
                this.petugas.removePetugas(
                    petugas,
                    {from:other}
                ),
                'Ownable: caller is not the owner'
            );
        });
    });
});

contract('Petugas', function([owner, petugas, member]){
    beforeEach(async function(){
        this.petugas = await Petugas.new({from:owner});
        this.petugas.addNewPetugas(petugas,{from:owner});
    });
    describe('[1.1] Petugas Test Case', function(){
        it('Petugas menambahkan member baru', async function(){
            const receipt = await this.petugas.addNewMember(
                member,
                "yafiabiyyu",
                {from:petugas}
            );
            expectEvent(
                receipt,
                'newMember',
                {
                    _memberAddress:member,
                    _memberName:"yafiabiyyu"
                }
            );
        });

        it('Petugas menghapus member', async function(){
            const receipt = await this.petugas.removeMember(
                member,
                {from:petugas}
            );
            expectEvent(
                receipt,
                'removeMembers',
                {
                    _memberAddress:member
                }
            );
        });
    });
});
