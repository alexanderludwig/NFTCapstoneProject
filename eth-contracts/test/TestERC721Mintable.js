var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('Test', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            await this.contract.mint(account_two, 0, {from: account_one});
            await this.contract.mint(account_two, 1, {from: account_one});
            await this.contract.mint(account_two, 2, {from: account_one});

        })

        it('should return total supply', async function () { 
            let result = await this.contract.totalSupply();
            assert(result == 3);
            
        })

        it('should get token balance', async function () { 
            let tokens1 = await this.contract.balanceOf(account_one);
            let tokens2 = await this.contract.balanceOf(account_two);
            
            assert(tokens1 == 0 && tokens2 == 3);
        })

        it('should return token uri', async function () { 
            let uri = await this.contract.tokenURI(1);
            assert(uri == "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1");
        })

        it('should transfer token from one owner to another', async function () { 
            //await this.contract.setApprovalForAll(account_one, true, {from:account_two})
            await this.contract.transferFrom(account_two, account_one, 1, {from:account_two});
            let newOwner = await this.contract.ownerOf(1);
            assert(newOwner == account_one);
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
            let reverted = false;
            try {
                await this.contract.mint(account_two, 0, {from: account_two});
             }
             catch (e) {
                console.log(e);
                reverted = true;
            }
            assert(reverted);
             
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.owner()
            assert(owner == account_one);
        })

    });
})