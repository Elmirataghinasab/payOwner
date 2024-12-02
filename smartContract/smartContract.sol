// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;



contract GetBalance{

    error GetBalance_transferToOwnerFailed();
    error GetBalance_SendMore();

    address immutable Owner;

    constructor(address _owner){
        Owner=_owner;
    }

    function payOwner() public payable{

        if(msg.value == 0){
            revert GetBalance_SendMore();
        }

        (bool sucess,)= Owner.call{value: address(this).balance}("");

        if (!sucess){
            revert GetBalance_transferToOwnerFailed();
        }

    }


}