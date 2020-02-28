import React from 'react'
import useForm from '../../../hooks/useForm';

export const Login: React.FC<{}> = () => {

    const { handleChange, handleSubmit, values } = useForm(submit);

    function submit() {
        console.log("submitted successfully");
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" placeholder="Enter Username" name="username" value={values.username} onChange={handleChange} required />
            <label>Password</label>
            <input type="password" placeholder="Enter Password" name="password" value={values.password} onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;