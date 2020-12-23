const {expect} = require('chain');
const { constants,expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

const Petugas = artifacts.require('Petugas');

contract('Petugas', function([owner,petugas,other,pengguna]){
    const DEFAULT_USER_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
    const DEFAULT_PETUGAS_ROLE = '0x83741c3c887d330a865d1fce1157e1846b02421c0bc7c37f35286c5a35562936'

    beforeEach(async function(){
        this.petugas = await Petugas.new({from:owner});
    });

    it('Owner menjadikan petugas sebagai admin pengguna', async function(){
        this.petugas.setPetugasForRole(
            DEFAULT_USER_ROLE,
            DEFAULT_PETUGAS_ROLE,
            {from:owner}
        );
    });

    it('Non Owner menjadikan petugas sebagai admin pengguna', async function(){
        await expectRevert(
            this.petugas.setPetugasForRole(
                DEFAULT_USER_ROLE,
                DEFAULT_PETUGAS_ROLE,
                {from:other}
            ),
            "Ownable: caller is not the owner"
        );
    })
    // it('non-owner menamahkan admin',async function() {
    //     await expectRevert(
    //         this.petugas.AddPetugas(petugas,{from:other}),
    //         "Ownable: caller is not the owner"
    //     );
    // });
});
