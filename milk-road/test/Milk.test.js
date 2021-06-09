const Milk = artifacts.require("./Milk.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Milk", (accounts) => {
    let contract;
    before(async () => {
        contract = await Milk.deployed();
    });
    describe("deployment", async () => {
        it("deploys successfully", async () => {
            const address = contract.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, "");
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        });

        it("has a name", async () => {
            const name = await contract.name();
            assert.equal(name, "Milk");
        });

        it("has a symbol", async () => {
            const symbol = await contract.symbol();
            assert.equal(symbol, "MILK");
        });
    });
    describe("minting", async () => {
        it("creates a new token", async () => {
            const result = await contract.mint("pur", "purple", "#ff00ff", 10);
            const totalSupply = await contract.totalSupply();
            console.log(result);
            // SUCCESS
            assert.equal(totalSupply, 1);
            const event = result.logs[0].args;
            assert.equal(event.tokenId.toNumber(), 1, "id is correct");
            assert.equal(
                event.from,
                "0x0000000000000000000000000000000000000000",
                "from is correct"
            );
            assert.equal(event.to, accounts[0], "to is correct");
        });
    });
});
