import { TextField, Typography, Grid, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ChromePicker } from "react-color";
function ProductForm(props) {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        sellerAddress: "",
        color: "",
    });
    let history = useHistory();

    function changeProduct(event, diff) {
        if (diff == "color") {
            product[diff] = event.hex;
        } else {
            product[diff] = event.target.value;
        }
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
        <>
            <Grid item>
                <Typography align="center" variant="h2">
                    Post a product!
                </Typography>
            </Grid>
            <form onSubmit={submit}>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="space-between"
                >
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
                    <Grid item style={{ margin: 10 }}>
                        <ChromePicker
                            color={product.color}
                            onChangeComplete={(e) => changeProduct(e, "color")}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default ProductForm;
