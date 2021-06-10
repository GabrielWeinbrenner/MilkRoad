import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Eth } from "../App.js";
import ProductView from "../components/ProductView.js";
import Milk from "../components/Milk.js";
function Profile(props) {
    const ethVals = React.useContext(Eth);
    const [milks, setMilks] = useState([]);
    useEffect(async () => {
        console.log(ethVals);
        try {
            setMilks(ethVals.allMilks);
        } catch (e) {
            console.log(e);
        }
        console.log(milks);
    }, [ethVals.allMilks]);
    return (
        <Grid container direction="row" justify="space-between">
            <Grid item md={3}>
                <Grid container direction="column">
                    <Grid item>
                        <Typography variant="h2">JAJA</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={9}>
                <Grid container direction="column">
                    <Grid item>
                        <Typography variant="h2">ITEMS</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" spacing={12}>
                            {milks.map((v, i) => {
                                return (
                                    <Grid
                                        item
                                        xs={3}
                                        md={3}
                                        spacing={3}
                                        key={i}
                                    >
                                        <div style={{ width: 100 }}>
                                            <Milk color={v.color} />
                                        </div>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Profile;
