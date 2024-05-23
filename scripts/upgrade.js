// Copyright 2024 SLS\krishna.rajput
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const { ethers, upgrades } = require("hardhat");
async function main() {
    const newImplName = "MyCoinV2"
    const newImpl = await ethers.getContractFactory(newImplName);
    const coin = await upgrades.upgradeProxy('implentation_address', newImpl);

    console.log('coin upgraded to : ', await coin.getAddress());
}
main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
})