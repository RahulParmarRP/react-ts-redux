import { useState } from 'react'
import { LoginState } from '../types/states/LoginState'

type ErrorMessages = {
    username: string | null
    password: string | null
}

type callbackFunctionType = () => void
//type validateFunctionType = (values: LoginState) => ErrorMessages

const useForm = (callback: callbackFunctionType) => {

    const [values, setValues] = useState<LoginState>({ username: "", password: "" })
    const [errors, setErrors] = useState<ErrorMessages>({ username: null, password: null })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        debugger
        const { name, value }: any = event.target
        const newState = { [name]: value } as Pick<LoginState, keyof LoginState>;
        //setValues(newState);
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        debugger
        event.preventDefault();
        console.log(values);
        if (validate) {
            //handling errors
            setErrors(validate(values));
        }
        callback();
    }

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    }
}

export const validate = (values: LoginState): ErrorMessages => {
    debugger
    const errors = <ErrorMessages>{}
    if (values.username == "") {
        errors.username = "Username required!";
    }
    if (values.password == "") {
        errors.password = "Password required!";
    }

    return errors;
}

export default useForm;