document.addEventListener('DOMContentLoaded', function() {
    const signupBtn = document.getElementById('signup-btn');
    const signinBtn = document.getElementById('signin-btn');
    const reviewBtn = document.getElementById('review-btn');
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');
    const reviewForm = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');

    signupBtn.addEventListener('click', function() {
        signupBtn.classList.add('active');
        signinBtn.classList.remove('active');
        reviewBtn.classList.remove('active');
        signupForm.classList.remove('hidden');
        signinForm.classList.add('hidden');
        reviewForm.classList.add('hidden');
    });

    signinBtn.addEventListener('click', function() {
        signinBtn.classList.add('active');
        signupBtn.classList.remove('active');
        reviewBtn.classList.remove('active');
        signinForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        reviewForm.classList.add('hidden');
    });

    reviewBtn.addEventListener('click', function() {
        reviewBtn.classList.add('active');
        signupBtn.classList.remove('active');
        signinBtn.classList.remove('active');
        reviewForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        signinForm.classList.add('hidden');
    });

    // Handle form submission for signup
    const signupFormElement = document.getElementById('signupForm');
    signupFormElement.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(signupFormElement); // Get form data
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');

        // Validate password and confirm password
        if (password !== confirmPassword) {
            alert('Passwords do not match. Please re-enter.');
            console.log('Passwords do not match:', password, confirmPassword);
            return;
        }

        // If passwords match, proceed with fetch request
        fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Signup failed');
            }
        })
        .then(data => {
            console.log('Signup response:', data);
            // Display success message or redirect
            alert('Signup successful!');
            window.location.href = 'index.html'; // Redirect to signin page
        })
        .catch(error => {
            console.error('Error:', error);
            
        });
    });

    // Handle Signin Form Submission
    document.getElementById('signinForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        fetch('/api/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        })
        .then(response => response.text())
        .then(data => {
            console.log('Received signin data:', data); // Log the response data
            // Handle success or redirect
            alert('Sign-in successful!, ');
            window.location.href = 'https://ignatus2767.github.io/krydmal/';
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors if any
        });
    });

    // Handle Review Form Submission
    document.getElementById('reviewForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        fetch('/api/reviews/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            event.target.reset();
            fetchReviews();
        });
    });

    // Function to fetch reviews from the server
    const fetchReviews = () => {
        fetch('/api/reviews/all')
        .then(response => response.json())
        .then(data => {
            reviewsList.innerHTML = '';
            data.forEach(review => {
                const li = document.createElement('li');
                li.textContent = `${review.username} (${new Date(review.date).toLocaleString()}): ${review.comment} - Rating: ${review.rating}`;
                reviewsList.appendChild(li);
            });
        });
    };

    // Initial fetch of reviews when the page loads
    fetchReviews();
});


