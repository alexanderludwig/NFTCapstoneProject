
var Verifier = artifacts.require('Verifier');
var Proof = require('../../zokrates/code/square/proof.json');

contract('Verifier', accounts => {

    describe('validate zK-SNARK proof', function () {
        beforeEach(async () => {
            this.contract = await Verifier.new();
        });
        it('show that proof is valid', async () => {
            let verified = await this.contract.verifyTx(Proof.proof, Proof.inputs)
            assert.equal(verified, true);
        })
        it('show that an incorrect proof is invalid', async () => {
            let verified = await this.contract.verifyTx(Proof.proof, [3, 6]);
            assert.equal(verified, false);
        })
    })
})

