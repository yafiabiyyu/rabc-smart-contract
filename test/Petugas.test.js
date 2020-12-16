const {expect} = require('chain');
const { constants,expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

const Petugas = artifacts.require('Petugas');

contract('Petugas', function([owner,petugas,other,pengguna]){
    const role = '0x0000000000000000000000000000000000000000000000000000000000000000';
    const rolepengguna = '0x83741c3c887d330a865d1fce1157e1846b02421c0bc7c37f35286c5a35562936'

    beforeEach(async function(){
        this.petugas = await Petugas.new({from:owner});
    });

    it('owner menambahkan admin', async function(){
        this.petugas.AddPetugas(
            petugas,
            {from:owner}
        );
    });

    it('non-owner menamahkan admin',async function() {
        await expectRevert(
            this.petugas.AddPetugas(petugas,{from:other}),
            "Ownable: caller is not the owner"
        );
    });
});
