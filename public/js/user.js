const newUserHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();

    if (username && password && email) {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ username, password, email }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            $('.signup-error').css('opacity', '80%')
            $('#username-signup').css('border', '2px solid rgba(165, 42, 42, 0.541)')
            $('#email-signup').css('border', '2px solid rgba(165, 42, 42, 0.541)')
            $('#password-signup').css('border', '2px solid rgba(165, 42, 42, 0.541)')
        }
    }
};

if (document.querySelector('#sign-up-button')) {
    document
      .querySelector('#sign-up-button')
      .addEventListener('click', newUserHandler);
}

const loginUserHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    if (password && email) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ password, email }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            $('.login-error').css('opacity', '80%')
            $('#email-login').css('border', '2px solid rgba(165, 42, 42, 0.541)')
            $('#password-login').css('border', '2px solid rgba(165, 42, 42, 0.541)')
        }
    }
};

if (document.querySelector('#login-button')) {
    document
      .querySelector('#login-button')
      .addEventListener('click', loginUserHandler);
}

const logoutUserHandler = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

if (document.querySelector('#logout-button')) {
    document
      .querySelector('#logout-button')
      .addEventListener('click', logoutUserHandler);
}