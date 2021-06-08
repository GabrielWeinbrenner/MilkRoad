pragma solidity 0.5.0;
import "./ERC721Full.sol";

contract Milk is ERC721Full{
    string[] public milks;
    mapping(string => bool) _milkExists;


    constructor() ERC721Full("Milk","MILK") public {
                    
    }
    function mint(string memory _milk) public {
        require(!_milkExists[_milk]);
        uint _id = milks.push(_milk);
        _mint(msg.sender, _id);
        _milkExists[_milk] = true;
    }
}
