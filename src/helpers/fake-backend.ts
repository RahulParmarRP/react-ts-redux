import { User } from '../models/User'
// array in local storage for registered users
let users: User[] = JSON.parse(window.localStorage.getItem('users') || '{}') || [];

export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (requestInfo: RequestInfo, opts?: RequestInit): Promise<Response> {

        return new Promise((resolve, reject) => {

            // wrap in timeout to simulate server api call
            setTimeout(() => {

                let url = requestInfo.toString();

                if (opts) {
                    // authenticate
                    if (url.endsWith('/users/authenticate') && opts.method === 'POST') {

                        if (typeof opts.body === 'string') {
                            // get parameters from post request
                            var params = JSON.parse(opts.body);
                        }

                        // find if any user matches login credentials
                        // let filteredUsers = users.filter(user => {
                        //     return user.username === params.username && user.password === params.password;
                        // });

                        if (params.username === 'rahul' && params.password === 'rahul') {

                            // if login details are valid return user details and fake jwt token
                            // let user = filteredUsers[0];

                            let responseJson = {
                                id: 1,
                                username: 'rahul.parmar',
                            };

                            let test = JSON.stringify(responseJson);

                            resolve({ ok: true, text: () => Promise.resolve(test) } as Response);

                        } else {

                            // else return error
                            reject('Username or password is incorrect');
                        }

                        return;
                    }
                }
                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 3000);
        });
    }
}