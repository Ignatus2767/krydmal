document.addEventListener('DOMContentLoaded', function() {
  const signupBtn = document.getElementById('signup-btn');
  const signinBtn = document.getElementById('signin-btn');
  const signupForm = document.getElementById('signup-form');
  const signinForm = document.getElementById('signin-form');

  signupBtn.addEventListener('click', function() {
      signupBtn.classList.add('active');
      signinBtn.classList.remove('active');
      signupForm.classList.remove('hidden');
      signinForm.classList.add('hidden');
  });

  signinBtn.addEventListener('click', function() {
      signinBtn.classList.add('active');
      signupBtn.classList.remove('active');
      signinForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
  });
});
