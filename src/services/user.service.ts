import { User } from "../models/User";

export const userService = {
    login,
    logout
};

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

function login(username: string, password: string): Promise<User> {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`http://localhost:5002/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            //var user = JSON.parse(window.localStorage.getItem('user') || '{}') as User
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            window.localStorage.setItem('user', JSON.stringify(user));
            return user as User;
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