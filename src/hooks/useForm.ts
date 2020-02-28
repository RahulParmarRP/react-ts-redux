import { useState } from 'react'

type LoginProps = {
    username: string
    password: string
    message?: string
}

type ErrorMessages = {
    username: string | null
    password: string | null
}

type callbackFunctionType = () => void
type validateFunctionType = (values: LoginProps) => ErrorMessages

const useForm = (callback: callbackFunctionType, validate?: validateFunctionType) => {

    const [values, setValues] = useState<LoginProps>({ username: "", password: "" })
    const [errors, setErrors] = useState<ErrorMessages>({ username: null, password: null })

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {

        const { name, value }: any = event.target
        const newState = { [name]: value } as Pick<LoginProps, keyof LoginProps>;
        setValues(newState);
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

export const validate = (values: LoginProps): ErrorMessages => {

    const errors = <ErrorMessages>{}
    if (!values.username) {
        errors.username = "Username required!";
    }
    if (!values.password) {
        errors.password = "Password required!";
    }

    return errors;
}

export default useForm;