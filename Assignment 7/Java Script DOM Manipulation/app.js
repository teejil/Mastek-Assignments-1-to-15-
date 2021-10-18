// Fetching elements from DOM
const form = document.getElementById('form');
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Event Listener
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkInputField(userName, 6, 12);
  checkInputField(password, 6, 12);
  checkEmailFormat(email);
  checkBothPasswords(password,password2);
});

// Funtions for event listener ------------------------->

// Error message with red border
function showError(input, message) {
  const parent = input.parentElement;
  parent.className = 'form-group  error';
  const showMessage = parent.querySelector('small');
  showMessage.textContent = message;
  showMessage.style.visibility = 'visible';
}

// Success message with green border
function showSuccess(input) {
  const parent = input.parentElement;
  parent.className = 'form-group success';
  const showMessage = parent.querySelector('small');
  showMessage.style.visibility = 'hidden';
}


// Function to Capitalise error message
function inputField(input) {
  return input.toUpperCase().charAt(0) + input.slice(1);
}


// Check input field
function checkInputField(input, min, max) {
  if (input.value === '') {
    showError(input, `${inputField(input.id)} is required`);
  } else {
    if (input.value.length < min) {
      showError(input, `${inputField(input.id)} must contain atleast 6 characters`);
    } else if (input.value.length > max) {
      showError(input, `${inputField(input.id)} must be less than 12 characters`);
    } else {
      showSuccess(input);
    }
  }
}


// Check email format
function checkEmailFormat(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (input.value === '') {
    showError(input, `${inputField(input.id)} is required`);
  } else {
    if (re.test(input.value) === false) {
      showError(input, `${inputField(input.id)} is Invalid`);
    } else if (re.test(input.value) === true) {
      showSuccess(input);
    }
  }
}


// Check if passwords are matching
function checkBothPasswords(password1, password2) {
  if(password1.value === '') {
    showError(password1, `Password is required` );
  } else {
    if(password1.value !== password2.value) {
      showError(password2, `Passwords are not matching`)
    }else if(password1.value === password2.value) {
      showSuccess(password2);
    }
  }
}
