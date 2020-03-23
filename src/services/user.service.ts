import { User } from "../models/User";

export const userService = {
    login,
    logout
};

function login(username: string, password: string): Promise<User | never> {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "password": "Password1!", "username": "rahulparmar.n@gmail.com" });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return fetch(`/api/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // var user = JSON.parse(text)
            //var user = JSON.parse(window.localStorage.getItem('user') || '{}') as User
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            window.localStorage.setItem('user', JSON.stringify(user));
            return user as User;
        })
        .catch(error => {
            return Promise.reject(error);
        });
}


function logout(): void {
    // remove user from local storage to log user out
    window.localStorage.removeItem('user');
}

// function register(user) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
// }


function handleResponse(response: Response) {
    debugger
    return response.text()
        .then(text => {

            const data = text && JSON.parse(text);

            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    logout();
                    //location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
}
