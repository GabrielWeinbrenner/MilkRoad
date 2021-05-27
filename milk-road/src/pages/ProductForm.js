import { TextField, Typography, Grid, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function ProductForm(props) {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        sellerAddress: "",
    });
    let history = useHistory();

    function changeProduct(event, diff) {
        product[diff] = event.target.value;
        setProduct({ ...product });
    }
    function submit(event) {
        fetch(`http://localhost:3001/milk/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(product),
        });
        history.push("/");
        history.go(0);
    }
    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justify="space-between"
        >
            <Grid item>
                <Typography variant="h2">Post a product!</Typography>
            </Grid>
            <form onSubmit={submit}>
                <Grid item style={{ margin: 10 }}>
                    <TextField
                        id="outlined-required"
                        label="name"
                        variant="outlined"
                        value={product.name}
                        onChange={(e) => {
                            changeProduct(e, "name");
                        }}
                    />
                </Grid>
                <Grid item style={{ margin: 10 }}>
                    <TextField
                        id="outlined-required"
                        label="description"
                        variant="outlined"
                        value={product.description}
                        onChange={(e) => changeProduct(e, "description")}
                    />
                </Grid>
                <Grid item style={{ margin: 10 }}>
                    <TextField
                        id="outlined-required"
                        label="price"
                        variant="outlined"
                        value={product.price}
                        onChange={(e) => changeProduct(e, "price")}
                    />
                </Grid>
                <Grid item style={{ margin: 10 }}>
                    <TextField
                        id="outlined-required"
                        label="address"
                        variant="outlined"
                        value={product.sellerAddress}
                        onChange={(e) => changeProduct(e, "sellerAddress")}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Grid>
            </form>
        </Grid>
    );
}

export default ProductForm;
