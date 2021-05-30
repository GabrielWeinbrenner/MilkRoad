import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Milk from "../components/Milk";
import milk from "../components/Milk.svg";
function ProductView(props) {
    let history = useHistory();

    function redirect(name) {
        history.push(`/product/${name}`);
    }
    return (
        <Grid
            style={{
                borderColor: "black",
                borderRadius: "1em",
                borderWidth: "1px",
                borderStyle: "solid",
                padding: 10,
                width: 300,
                height: 250,
                margin: 10,
                cursor: "pointer",
            }}
            onClick={() => {
                redirect(props.name);
            }}
            container
            direction="row"
            justify="space-between"
        >
            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <Typography variant="h4">{props.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            {props.description}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">${props.price}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">
                            {props.sellerAddress}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                {/* <img src={milk} width={100} /> */}
                <div style={{ width: 150 }}>
                    <Milk color={props.color} />
                </div>
            </Grid>
        </Grid>
    );
}

export default ProductView;
