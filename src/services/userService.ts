import LocalStorage from "../helpers/LocalStorage";

export const userService = {
    login,
    logout
};

function login(username: string, password: string): Promise<string> {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`http://localhost:5002/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            let localStorage = new LocalStorage();
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.set('user', JSON.stringify(user));

            return user;
        });
}

function handleResponse(response: Response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
