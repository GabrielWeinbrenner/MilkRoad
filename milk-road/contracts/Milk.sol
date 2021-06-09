pragma solidity ^0.5.0;
import "./ERC721Full.sol";

contract Milk is ERC721Full{
    struct MilkProp  {
        string name;
        string description;
        string color;
        uint price;
    }
    MilkProp[] public milks;
    mapping(string => bool) _milkExists;
    //    await inst.mint("pur", "pur", "#ff00ff",10)
    constructor() ERC721Full("Milk","MILK") public {
                    
    }
    function mint(string memory _name, string memory _description, string memory _color, uint _price) public {
        uint _id = milks.push(MilkProp(_name,_description,_color,_price));
        _mint(msg.sender, _id);
        _milkExists[_name] = true;
    }
}
