import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import useForm from '../../../hooks/useForm';
import styles from './Login.module.scss';

import { Button, TextField, InputAdornment } from '@material-ui/core';
import VpnKey from '@material-ui/icons/VpnKey';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { login } from '../../../actions';
import { AuthState } from '../../../types/states/AuthState';
import { User } from '../../../actions/actionCreators/user.action.creators';

export const Login: React.FC<{}> = () => {

    const { handleChange, handleSubmit, values, errors } = useForm(submit);
    const dispatch = useDispatch();
    var user = useSelector<AuthState, User>(s => s.user);

    function submit() {
        console.log("submitted successfully");
    }

    return (
        <div>
            {/* <form method="post" onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    onChange={handleChange}
                />
                <Button variant="contained" color="primary">
                    Primary
            </Button>
                <label>Username</label>
                <input type="text" placeholder="Enter Username" name="username" value={values.username} onChange={handleChange} />
                {errors.username}
                <label>Password</label>
                <input type="password" placeholder="Enter Password" name="password" value={values.password} onChange={handleChange} />
                {errors.password}
                <button type="submit">Login</button>
            </form> */}

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
                            type="submit"
                            onClick={() => login()}
                        >
                            SIGN IN
                        </Button>
                    </div>
                </form>
            </div>
        </div >
    );
}

export default Login;