import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import useForm from '../../hooks/useForm';

import { Link as SignUpLink } from 'react-router-dom';
//import styles from './Login.module.scss';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { rootReducer, RootState } from '../../reducers';
import { User } from '../../models/User';
import { login } from '../../actions';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

// const [values, setValues] = useState({ username: "", password: "" })
// const [errors, setErrors] = useState({ username: null, password: null })

// const handleChange = (event) => {
//     debugger
//     const { name, value } = event.target
//     const newState = { [name]: value };
//     //setValues(newState);
//     // setValues({
//     //     ...values,
//     //     [name]: value
//     // })
// }


// export const validate = (values) => {
//     debugger
//     const errors = {}
//     if (values.username == "") {
//         errors.username = "Username required!";
//     }
//     if (values.password == "") {
//         errors.password = "Password required!";
//     }

//     return errors;
// }


// const handleSubmit = (event) => {
//     debugger
//     event.preventDefault();

//     // login(user.username, user.password)
//     // console.log(values);
//     // validate(values);
// }

export const Login: React.FC<{}> = () => {


    const classes = useStyles();
    const { handleChange, handleSubmit, values, errors } = useForm(submit);

    const dispatch = useDispatch();
    var user = useSelector<RootState, User | null>(s => s.auth.user);

    function submit() {
        console.log(user);
        console.log("submitted successfully");
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate method="post">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="username"
                        autoComplete="email"
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button

                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => dispatch(login("username", "password"))}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                    </Link>
                        </Grid>
                        <Grid item>
                            <SignUpLink to='/signup'>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </SignUpLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {/* <Box mt={8}>
                <Copyright />
            </Box> */}
        </Container >
    );
};

export default Login;