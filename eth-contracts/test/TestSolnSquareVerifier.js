var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

var Proof = require('../../zokrates/code/square/proof.json');


contract('SolnSquareVerifier', accounts => {

        beforeEach(async () => {
            this.contract = await SolnSquareVerifier.new();
        });

        it('a new solution can be added for the contract', async () => {
            await this.contract.addSolution(0, accounts[0]);
            let solutions = await this.contract.getSolutions();
            assert.equal(solutions.length, 1);
        })

        it('an ERC721 token can be minted', async () => {
            await this.contract.mintNFT(12, Proof.proof, Proof.inputs);

            assert(1 == await this.contract.totalSupply())
        })
    })

