document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");
    const form = document.querySelector('.input-box'); 
    console.log('Form found:', form);
    form.addEventListener('submit', function (event) {
        console.log("Submit event triggered");
        event.preventDefault(); 

        console.log("Form submission intercepted");
        
        let valid = true;
        const firstName = document.getElementById('FirstName').value.trim();
        const lastName = document.getElementById('LastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validate First Name
        if (firstName.length < 2) {
            alert('First name must be at least 2 characters long.');
            valid = false;
        }

        // Validate Last Name
        if (lastName.length < 2) {
            alert('Last name must be at least 2 characters long.');
            valid = false;
        }

        // Validate Email Format
        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            alert('You have entered an invalid email address!');
            valid = false;
        }

        // Validate Password
        if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
            alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one numeric digit.');
            valid = false;
        }

        // Validate Confirm Password
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            valid = false;
        }

        if (valid) {
            form.submit(); // If everything's valid, submit the form
        }
    });
});