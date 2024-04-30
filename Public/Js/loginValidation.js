document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('.input-box');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        let valid = true;
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Email validation
        if (!email) {
            alert('Email is required.');
            valid = false;
        } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            alert('Please enter a valid email address.');
            valid = false;
        }

        // Password validation
        if (!password) {
            alert('Password is required.');
            valid = false;
        }

        if (valid) {
            loginForm.submit(); // Submit the form if all validations are passed
        }
    });
});
