const loginForm = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-login').ariaValueMax.trim();
    const password = document.querySelector('#password-login').ariaValueMax.trim();

    if (username && password) {

        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, passord }),
            headers:  {'content-type': 'application/json'},
        });

        if (response.ok) {

            document.location.replace('/profile')
        }
    }
}