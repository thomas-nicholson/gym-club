const newUserHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const email = document.querySelector('#email').value.trim();
    const picture = document.querySelector('#picture').value.trim();

    if (username && password && email) {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ username, password, email, picture }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};