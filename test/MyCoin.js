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

const { expect, assert } = require("chai");

const { ethers, upgrades } = require("hardhat");


describe("MyCoin", async function () {

  before(async function () {
    this.MyCoin = await ethers.getContractFactory("MyCoin");
    this.signers = await ethers.getSigners()
    this.defaultAdmin = this.signers[0]
    this.pauser = this.signers[1]
    this.minter = this.signers[2]
    this.upgrader = this.signers[3]
    this.user1 = this.signers[4]
  })
  beforeEach(async function () {
  });

  it("Should  smart contract deploy properly", async function () {
    this.coin = await upgrades.deployProxy(this.MyCoin, [this.defaultAdmin.address, this.pauser.address, this.minter.address, this.upgrader.address], { kind: 'uups' });
    expect(this.coin).to.not.equal(undefined);
    expect(this.coin.address).to.not.equal(null);
  }),


    it("Correct name,owner,paused,totalSupply is reported", async function () {

      expect(await this.coin.name()).to.equal("MyCoin")
      expect(await this.coin.symbol()).to.equal("MC")
      assert(await this.coin.totalSupply() == 0)
      assert(await this.coin.balanceOf(this.defaultAdmin.address) == 0);
      expect(await this.coin.paused()).to.equal(false)
      expect(await this.coin.decimals()).to.equal(18);
      expect(await this.coin.totalSupply()).to.equal(0);
      expect(await this.coin.hasRole(await this.coin.DEFAULT_ADMIN_ROLE(), this.defaultAdmin.address)).to.be.true;
      expect(await this.coin.hasRole(await this.coin.PAUSER_ROLE(), this.pauser.address)).to.be.true;
      expect(await this.coin.hasRole(await this.coin.MINTER_ROLE(), this.minter.address)).to.be.true;
      expect(await this.coin.hasRole(await this.coin.UPGRADER_ROLE(), this.upgrader.address)).to.be.true;
    })

  it('should allow minting by MINTER_ROLE', async function () {
    await expect(this.coin.connect(this.minter).mint(this.user1.address, 1000))
      .to.emit(this.coin, 'Transfer')
      .withArgs('0x0000000000000000000000000000000000000000', this.user1.address, 1000);
    expect(await this.coin.balanceOf(this.user1.address)).to.equal(1000);
  });


  it('should allow pausing and unpausing by PAUSER_ROLE', async function () {
    await expect(this.coin.connect(this.pauser).pause()).to.emit(this.coin, 'Paused');
    expect(await this.coin.paused()).to.be.true;
    await expect(this.coin.connect(this.pauser).unpause()).to.emit(this.coin, 'Unpaused');
    expect(await this.coin.paused()).to.be.false;
  });


})