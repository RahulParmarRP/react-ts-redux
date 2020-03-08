import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import useForm from '../../../hooks/useForm';
import styles from './Login.module.scss';

import { Button, TextField, InputAdornment } from '@material-ui/core';
import VpnKey from '@material-ui/icons/VpnKey';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { login } from '../../../actions';
import { AuthState } from '../../../types/states/AuthState';
import { User } from '../../../models/User';
import { RootState } from '../../../reducers';
import { ContentBackspace } from 'material-ui/svg-icons';

export const Login: React.FC<{}> = () => {

    const { handleChange, handleSubmit, values, errors } = useForm(submit);

    const dispatch = useDispatch();

    var user = useSelector<RootState, User | null>(s => s.auth.user);

    function submit() {
        console.log(user);
        console.log("submitted successfully");
    }

    return (
        <div>
            <form id={styles.loginForm} method="post" onSubmit={handleSubmit} noValidate autoComplete="off">
                <div className={styles.formControl}>
                    <TextField
                        id="username"
                        data-testid="user-name-input"
                        label="User name"
                        className={styles.loginTextField}
                        type="email"
                        name="username"
                        autoComplete="email"
                        margin="normal"
                        variant="filled"
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccountCircle className={styles.inputIcon} />
                                </InputAdornment>
                            )
                        }}
                    />
                </div>

                <div className={styles.formControl}>
                    <TextField
                        id="password"
                        data-testid="password-input"
                        label="Password"
                        className={styles.loginTextField}
                        type="password"
                        name="password"
                        margin="normal"
                        variant="filled"
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <VpnKey className={styles.inputIcon} />
                                </InputAdornment>
                            )
                        }}
                    />
                </div>

                <div className={styles.formSubmit}>
                    <Button
                        id="login-submit"
                        data-testid="login-submit"
                        variant="contained"
                        color="primary"
                        className={styles.submitButton}
                        onClick={() => dispatch(login("rahul", "rahul"))}
                    >
                        SIGN IN
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Login;