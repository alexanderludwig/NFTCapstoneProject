pragma solidity 0.8.13;

import './ERC721Mintable.sol';
import './Verifier.sol';


contract SolnSquareVerifier is CustomERC721Token{

    Verifier verifier;

    struct Solution {
                        uint256 index;
                        address addressSolution;
                        }
    
    Solution[] solutions;

    mapping(uint256 => Solution) uniqueSolutions;


    event SolutionAdded(uint256 index, address addressSolution);


    constructor() {
        verifier = new Verifier();
    }




    function addSolution(uint256 index, address addressSolution) external {
        Solution memory solution = Solution(index, addressSolution);
        solutions.push(solution);
        uniqueSolutions[index] = solution;

        emit SolutionAdded(index, addressSolution);
    }

    function getSolutions() public view returns(Solution[] memory){
        return solutions;
    }

    function mintNFT(
                        uint256 tokenIndex,
                        Verifier.Proof memory proof, 
                        uint256[2] memory input
                    )
                    public
    {
        require(uniqueSolutions[tokenIndex].addressSolution == address(0), "Solution has been used before");
        bool verificationResult = verifier.verifyTx(proof, input);
        require(verificationResult, "Tx could not be verified.");

        this.addSolution(tokenIndex, msg.sender);
        _mint(msg.sender, tokenIndex);
    }
}
    












  


























