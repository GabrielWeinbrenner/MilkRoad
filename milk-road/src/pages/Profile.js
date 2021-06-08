import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
function Profile(props) {
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        fetch("http://localhost:3001/profile/" + props.name).then((d) =>
            d.json().then((profileData) => {
                setProfile(profileData);
            })
        );
    }, []);
    return (
        <Grid container direction="row">
            <Grid item>
                <Grid container direction="column">
                    <Grid item>
                        <Typography variant="h2">{profile.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            {profile.amount}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            {profile.splices}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column">
                    {profile.list.map((v, i) => {
                        <Grid item>
                            <ProductView product={v} key={i} />
                        </Grid>;
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Profile;
