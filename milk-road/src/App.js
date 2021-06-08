import React, { useState, useEffect } from "react";
import Header from "./static/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Landing from "./pages/Landing";
import Product from "./pages/Product";
import ProductForm from "./pages/ProductForm";
import Splice from "./pages/Splice";

// import theme from "./ui/Theme";
import { ThemeProvider } from "@material-ui/core/styles";

function App() {
    return (
        // <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Header />
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
