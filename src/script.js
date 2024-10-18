const form = document.getElementById('registration-form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');
const birthDay = document.getElementById('birth-day');
const submitButton = document.getElementById('form-button');

function validateName(name) {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/;
  return regex.test(name);
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}

function validateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age >= 18;
}

function setValidity(input, isValid, errorMessage = '') {
  const errorElement = document.getElementById(`${input.id}-error`);
  if (isValid) {
    input.classList.add('valid');
    input.classList.remove('invalid');
    errorElement.textContent = '';
  } else {
    input.classList.add('invalid');
    input.classList.remove('valid');
    errorElement.textContent = errorMessage;
  }
}

function toggleSubmitButton() {
  const isFormValid =
    validateName(firstName.value) &&
    validateName(lastName.value) &&
    validateEmail(email.value) &&
    validatePassword(password.value) &&
    password.value === passwordConfirm.value &&
    validateAge(birthDay.value);

  submitButton.disabled = !isFormValid;
}

firstName.addEventListener('input', () => {
  const isValid = validateName(firstName.value);
  setValidity(firstName, isValid, 'Имя должно содержать только буквы и быть от 2 до 30 символов.');
  toggleSubmitButton();
});

lastName.addEventListener('input', () => {
  const isValid = validateName(lastName.value);
  setValidity(lastName, isValid, 'Фамилия должна содержать только буквы и быть от 2 до 30 символов.');
  toggleSubmitButton();
});

email.addEventListener('input', () => {
  const isValid = validateEmail(email.value);
  setValidity(email, isValid, 'Введите корректный email.');
  toggleSubmitButton();
});

password.addEventListener('input', () => {
  const isValid = validatePassword(password.value);
  setValidity(password, isValid, 'Пароль должен содержать минимум 8 символов, включая цифру, заглавную и строчную буквы, а также символ.');
  toggleSubmitButton();
});

passwordConfirm.addEventListener('input', () => {
  const isValid = passwordConfirm.value === password.value;
  setValidity(passwordConfirm, isValid, 'Пароли не совпадают.');
  toggleSubmitButton();
});

birthDay.addEventListener('input', () => {
  const isValid = validateAge(birthDay.value);
  setValidity(birthDay, isValid, 'Возраст должен быть не менее 18 лет.');
  toggleSubmitButton();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Форма успешно отправлена!');
});
