import React, { useState, useEffect } from "react";
import Header from "./static/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Product from "./pages/Product";
import ProductForm from "./pages/ProductForm";
import Splice from "./pages/Splice";
import Profile from "./pages/Profile";

import Milk from "./build/contracts/Milk.json";

import Web3 from "web3";

export const Eth = React.createContext();
async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        window.alert(
            "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
    }
}
function App() {
    const [account, setAccount] = useState(null);
    const [savedContract, setContract] = useState(null);
    const [allMilks, setMilks] = useState([]);

    async function _mint(account, name, desc, color, price, history) {
        console.log("minting " + account + " " + name);

        await savedContract.methods
            .mint(name, desc, color, price)
            .send({ from: account })
            .on("transactionHash", (hash) => {
                history.push("/");
                history.go(0);
            });
    }
    async function loadBlockchainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const networkData = Milk.networks[networkId];
        console.log(networkData);
        if (networkData) {
            const abi = Milk.abi;
            const address = networkData.address;
            const contract = await new web3.eth.Contract(abi, address);
            console.log(contract);
            await setContract(contract);
            const ts = await contract.methods.totalSupply().call();
            for (var i = 1; i <= ts; i++) {
                const milk = await contract.methods.milks(i - 1).call();
                const token = await contract.methods.tokenByIndex(i - 1).call();
                const sellerAddress = await contract.methods
                    .ownerOf(token)
                    .call();
                setMilks((state) => [...state, { ...milk, sellerAddress }]);
            }
        } else {
            window.alert("Smart contract not deployed to detected network.");
        }
    }

    useEffect(() => {
        async function fetch() {
            await loadWeb3();
            await loadBlockchainData();
        }
        fetch();
    }, []);

    return (
        <Eth.Provider
            value={{
                account,
                savedContract,
                allMilks,
            }}
        >
            <BrowserRouter>
                <Header id={account} />
                <Switch>
                    <Route
                        exact
                        path="/"
                        contract={savedContract}
                        render={() => <Landing milk={allMilks} />}
                    />
                    <Route
                        path="/product/:name"
                        contract={savedContract}
                        render={(props) => (
                            <Product
                                {...props}
                                contract={savedContract}
                                milk={allMilks}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/productform/"
                        contract={savedContract}
                        render={() => (
                            <ProductForm account={account} mint={_mint} />
                        )}
                    />
                    <Route path="/splice/:name" component={Splice} />
                    <Route path="/profile/:id" component={Profile} />
                </Switch>
            </BrowserRouter>
        </Eth.Provider>
    );
}

export default App;
