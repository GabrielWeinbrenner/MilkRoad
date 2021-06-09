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
function ProductView({ product, color }) {
    let history = useHistory();
    function redirect(name) {
        history.push(`/${name}`);
    }
    if (true) {
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
                                        {product.name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">
                                        {product.description}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        ${product.price}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        {product.sellerAddress}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                         
                        <Grid item>
                            {/* <img src={milk} width={100} /> */}
                            <div style={{ width: 100 }}>
                                <Milk color={product.color} />
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        onClick={() => {
                            redirect("product" + product.name);
                        }}
                    >
                        Learn More
                    </Button>
                    <Button
                        size="small"
                        onClick={() => {
                            redirect(`splice/${product.name}`);
                        }}
                    >
                        Splice
                    </Button>
                </CardActions>
            </Card>
        );
    } else {
        return <div></div>;
    }
}

export default ProductView;
