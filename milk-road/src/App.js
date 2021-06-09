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
    async function loadBlockchainData() {
        const web3 = window.web3;
        // Load account
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const networkData = Milk.networks[networkId];
        console.log(networkData);
        if (networkData) {
            const abi = Milk.abi;
            const address = networkData.address;
            const contract = new web3.eth.Contract(abi, address);
            console.log(abi);
            console.log(address);
            console.log(contract);
            //      this.setState({ contract });
            //     const totalSupply = await contract.methods.totalSupply().call();
            //       this.setState({ totalSupply });
            // Load Colors
            //    for (var i = 1; i <= totalSupply; i++) {
            //       const color = await contract.methods.colors(i - 1).call();
            //      this.setState({
            //         colors: [...this.state.colors, color],
            //    });
            // }
        } else {
            window.alert("Smart contract not deployed to detected network.");
        }
    }

    useEffect(async () => {
        await loadWeb3();
        await loadBlockchainData();
        console.log(account);
    }, []);

    return (
        // <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Header id={account} />
            <Switch>
                <Route exact path="/" render={() => <Landing />} />
                <Route path="/product/:name" component={Product} />
                <Route
                    exact
                    path="/productform/"
                    render={() => <ProductForm />}
                />
                <Route path="/splice/:name" component={Splice} />
            </Switch>
        </BrowserRouter>
        // </ThemeProvider>
    );
}

export default App;
