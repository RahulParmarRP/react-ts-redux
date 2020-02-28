
import React, { useState } from 'react'

type LoginProps = {
    username: string
    password: string
    message?: string
}

export const Login: React.FC<{}> = () => {

    const [values, hellothere] = useState({ username: "", password: "" })

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {

        const { name, value }: any = event.target

        //const { name, value }: { name: "username"|"password"; value: string } = e.currentTarget
        //public onChange(event: { target: { name: keyof IAddPlayerFormState; value: any; }; })

        const newState = { [name]: value } as Pick<LoginProps, keyof LoginProps>;
        hellothere(newState);

        hellothere({
            ...values,
            [name]: value
        })

        //console.log(e.currentTarget.name);
        //console.log(e.currentTarget.value);
        // const { name, value }: { name: keyof IState, value: string } = e.target;

        // console.log(event.target.name);
        // console.log(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        submit();
        console.log(values);
        // const { username, password } = this.state;
        // this.props.login(username, password);
    }

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