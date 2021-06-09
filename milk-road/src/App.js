import React, { useState, useEffect } from "react";
import Header from "./static/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Landing from "./pages/Landing";
import Product from "./pages/Product";
import ProductForm from "./pages/ProductForm";
import Splice from "./pages/Splice";
import Milk from "./build/contracts/Milk.json";

import Web3 from "web3";
// import theme from "./ui/Theme";
import { ThemeProvider } from "@material-ui/core/styles";
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
    const [totalSupply, setTotalSupply] = useState(0);
    const [allMilks, setMilks] = useState([]);
    async function _mint(account, name, desc, color, price) {
        console.log("minting " + account + " " + name);
        await savedContract.methods
            .mint(name, desc, color, price)
            .send({ from: account });
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
            console.log(ts);
            setTotalSupply(ts);

            const c = await contract.methods;
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

    useEffect(async () => {
        await loadWeb3();
        await loadBlockchainData();
    }, []);

    return (
        // <ThemeProvider theme={theme}>
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
                    render={(props) => <Product {...props} contract={savedContract} milk={allMilks} />}
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
            </Switch>
        </BrowserRouter>
        // </ThemeProvider>
    );
}

export default App;
