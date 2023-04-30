# Weekend Project 1 - Group 3.

### Group Members
| Name      | Discord ID |
| --------- | -----------|
| Simeon Udoh | Simeon#8769 |
|Stephen| |
| Antonio | Hydra#6138 |
|Justice||


### Interacting with HelloWorld.sol `setText()` method without being the Owner: 

Current Owner: 
0x462F13C8c00FfbBE25BD89687546Edb4eBB54462

The current address used in  interacting with the contract: 0x91F858aB36531C0Fb4EEC0B2A8BB5D3DfF99F543

When interacting with the contract without being an owner, we get the gas estimation failed error.



However, we can cancel the transaction or force send it using the “Send Transaction” button in the above screenshot. If we do force the transaction and confirm it, The transaction fails. 



####Transaction Details: 
| Param | Data
| ---------------------- | ---------------|
| Current Owner address: | 0x462F13C8c00FfbBE25BD89687546Edb4eBB54462 |
| Transaction Hash  |  0xb4349d7099ecec77ca0a347681d5fdffa1cfe5d54bdec51fb2a1953bc3b21c43 |
| Address Interacting with the contract |  0x91F858aB36531C0Fb4EEC0B2A8BB5D3DfF99F543 |
| Transaction cost | 24451 gas |
| Status | ❌ False Transaction mined but execution failed (failed tx). | 

####Transfering ownership: 
| Param | Data
| ---------------------- | ---------------|
| Old Owner address: | 0x462F13C8c00FfbBE25BD89687546Edb4eBB54462 |
| New Owner address: | 0x91F858aB36531C0Fb4EEC0B2A8BB5D3DfF99F543 |
| Transaction Hash  |  0xf9038d881ca566893772a934bd9d6f2925b47a0e9d7fc6af7ca2a030aa0f2dad |
| Address Interacting with the contract |  0x462F13C8c00FfbBE25BD89687546Edb4eBB54462 |
| Status | Successful ✅ |

### After being transferred the owner permissions and interacting with the HelloWorld.sol `setText()`  method. 


####Transaction Details: 
| Param | Data
| ---------------------- | ---------------|
| Current Owner address: | 0x91F858aB36531C0Fb4EEC0B2A8BB5D3DfF99F543 |
| Transaction Hash  |  0x97ccad4da9c4045f99bbaf5715381cfd00e85c6a8411bdbec461cb4ead887943 |
| Address Interacting with the contract |  0x91F858aB36531C0Fb4EEC0B2A8BB5D3DfF99F543 |
| Status | Successful ✅ | 



