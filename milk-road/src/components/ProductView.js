import React from "react";
import {
    Typography,
    Grid,
    CardContent,
    Card,
    CardActions,
    Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Milk from "../components/Milk";
import milk from "../components/Milk.svg";
function ProductView(props) {
    let history = useHistory();

    function redirect(name) {
        history.push(`/product/${name}`);
    }
    return (
        <Card
            style={{
                padding: 10,
                minWidth: 400,
                minHeight: 200,
            }}
            variant="outlined"
        >
            <CardContent>
                <Grid container direction="row" justify="space-between">
                    <Grid item>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="h4">
                                    {props.name}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    {props.description}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    ${props.price}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                >
                                    {props.sellerAddress}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {/* <img src={milk} width={100} /> */}
                        <div style={{ width: 100 }}>
                            <Milk color={props.color} />
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => {
                        redirect(props.name);
                    }}
                >
                    Learn More
                </Button>
                <Button
                    size="small"
                    onClick={() => {
                        redirect(props.name);
                    }}
                >
                    Splice
                </Button>
            </CardActions>
        </Card>
    );
}

export default ProductView;
