document.addEventListener('DOMContentLoaded', (event) => {
  // Show the content for Button 1 by default and set it as active
  showDiv('content1', 'button1');
});

function showDiv(divId, buttonId) {
  // Hide all hidden content divs
  const hiddenDivs = document.querySelectorAll('.hidden-content');
  hiddenDivs.forEach(div => div.style.display = 'none');

  // Show the selected div
  const selectedDiv = document.getElementById(divId);
  selectedDiv.style.display = 'block';

  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.discription');
  buttons.forEach(button => button.classList.remove('active'));

  // Add active class to the selected button
  const selectedButton = document.getElementById(buttonId);
  selectedButton.classList.add('active');
}
