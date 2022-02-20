// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract NFTEE is ERC721URIStorage {
    uint256 private _standardTokenId = 54;
    uint256 private _pinkTokenId = 4;
    uint256 private _foundersTokenId = 0;

    constructor() ERC721("NFTEE", "NFTEE") {}

    function mintStandard()
        public
        payable
        returns (uint256)
    {
        _mint(msg.sender, _standardTokenId);
        _setTokenURI(_standardTokenId,"https://gateway.pinata.cloud/ipfs/QmPbiMN6qY3HeXJJzsQfGyVmKgAtBmU8QBN1fAmhfHpLhw");
        _standardTokenId++;
        return _standardTokenId;
    }

    function mintPinkEdition()
        public
        payable
        returns (uint256)
    {
        require(_pinkTokenId <= 53, "Sold out");
        require(msg.value == 1000000000000000000, "Not enough ether.");
        string memory baseUrl = "https://gateway.pinata.cloud/ipfs/QmP2fmWpBgKL9JdHmpyL9Zaj3NdWqxgusHs5nWLohvR1U7/P";
        _mint(msg.sender, _pinkTokenId);
        _setTokenURI(_pinkTokenId,string(abi.encodePacked(baseUrl, Strings.toString(_pinkTokenId - 3), ".json")));
        _pinkTokenId++;
        return _pinkTokenId;
    }

    function mintFoundersEdition()
        public
        payable
        returns (uint256)
    {
        require(_foundersTokenId <= 3, "Sold out");
        require(msg.value == 5000000000000000000, "Not enough ether.");
        string memory baseUrl = "https://gateway.pinata.cloud/ipfs/QmZNCAS5tDnMtSB3VLwSn2jCFLmpWYQ9j2g8ZZuvHM8dw3/F";
        _mint(msg.sender, _foundersTokenId);
        _setTokenURI(_foundersTokenId,string(abi.encodePacked(baseUrl, Strings.toString(_foundersTokenId), ".json")));
        _foundersTokenId++;
        return _foundersTokenId;
    }
}