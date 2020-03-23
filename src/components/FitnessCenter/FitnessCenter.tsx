import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginLeft: 100,
            height: 400,
            maxWidth: 300,
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
    }),
);

function SessionItem() {
    const classes = useStyles();

    return (<ListItem alignItems="flex-start">
        <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
            primary="Summer BBQ"
            secondary={
                <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        to Scott, Alex, Jennifer
              </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
            }
        />
    </ListItem>)
}

const FitnessSession: React.FC<ListChildComponentProps> = (props: ListChildComponentProps) => {
    const { index, style } = props;
    const { sessions } = props.data;
    const history = useHistory();

    const onClickHandler = () => {
        history.push("/pricing");
    }

    debugger
    return (
        <ListItem button style={style} key={index} onClick={onClickHandler}>

            <ListItemText primary={`Time of Session ${index + 1}`} />
            <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary={sessions ? sessions[index].name : "Test"}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                        >
                            Session Description
                        </Typography>
                        <p>
                            {"tiny tiny description."}
                        </p>
                        <div>
                            <Grid container justify="flex-start">
                                <Grid item>
                                    <Button variant="contained" color="secondary">
                                        WorkoutType1
                                </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        WorkoutType2
                                </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </React.Fragment>
                }
            />
        </ListItem >
    );
}

export default function VirtualizedList() {
    const classes = useStyles();
    //const classes = useStyles();
    const [sessions, setSession] = useState<any>([]);

    useEffect(() => {
        debugger
        axios.get("http://localhost:3000/api/fitnesscenters/5")
            .then(response => {
                debugger
                console.log(sessions);
                setSession(response.data)
                console.log(response);
                console.log(sessions);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className={classes.root}>
            Book Your Session
            <FixedSizeList height={600} width={1200} itemSize={200} itemCount={10} itemData={sessions} >

                {FitnessSession}

            </FixedSizeList>
        </div>
    );
}