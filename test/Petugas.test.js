const {expect} = require('chain');
const { constants,expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

const Petugas = artifacts.require('Petugas');

contract('Petugas', function([owner,other]) {
    const role = '0x8443cd350038578072dc156fd27150aa8473e315e8408940d1432e801c990d27'

    beforeEach(async function() {
        this.petugas = await Petugas.new({from:owner});
    });

    it('menambahkan petugas', async function() {
        const receipt = await this.petugas.AddPetugas(
            "0x644bD3d6d69bB567a269c6dFfFCD9b5706bC6e55",
            {from:owner}
        );
        expectEvent(receipt,'RoleGranted',{
            role:role,
            account:other,
            sender:owner
        });
    });

    it('non admin menambahkan petugas', async function(){
        await expectRevert(
            this.petugas.AddPetugas(
                "0x644bD3d6d69bB567a269c6dFfFCD9b5706bC6e55",
                {from:other}
            ),
            "Hanya Admin"
        )
    });

    it('menghapus petugas', async function(){
        const receipt = await this.petugas.RemovePetugas(
            "0x644bD3d6d69bB567a269c6dFfFCD9b5706bC6e55",
            {from:owner}
        );
        // expectEvent(receipt,'RoleRevoked',{
        //     role:role,
        //     account:other,
        //     sender:owner
        // });
    });
});
