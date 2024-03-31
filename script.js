// Declare function to generate a random character from a string
function randomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

// Add an event listener to the generate button
document.querySelector("#generate").addEventListener("click", function (event) {
  event.preventDefault();
  // Declare variables to store the values of the input fields
  const passwordText = document.querySelector("#password");
  const lengthInput = document.querySelector("#length");
  const uppercaseInput = document.querySelector("#uppercase");
  const lowercaseInput = document.querySelector("#lowercase");
  const numbersInput = document.querySelector("#numbers");
  const specialInput = document.querySelector("#symbols");
  //   Declare variables to store the values for password criteria
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+";
  // Declare a variable to store the password
  let finalPassword;
  // Declare a variable to store the count of the number of inputs that are checked
  let checkedCount = 0;

  // Check if no criteria is selected
  if (
    !uppercaseInput.checked &&
    !lowercaseInput.checked &&
    !numbersInput.checked &&
    !specialInput.checked
  ) {
    passwordText.value = "Please select at least one option";
    return;
  }
  if (lengthInput.value < 8 || lengthInput.value > 128) {
    passwordText.value = "Password length must be between 8 and 128 characters";
    return;
  }

  // Declare a variable to store the length of the password, string of possible characters, and a temporary password
  const length = lengthInput.value;
  let possibleChars = "";
  let tempPassword = "";

  // Declare a function to build the password
  function buildPassword(character) {
    possibleChars += character;
    checkedCount++;
    tempPassword += randomChar(character);
  }

  // Check if the criteria is selected and build the password and call function for each one that is checked
  if (uppercaseInput.checked) {
    buildPassword(uppercase);
  }
  if (lowercaseInput.checked) {
    buildPassword(lowercase);
  }

  if (numbersInput.checked) {
    buildPassword(numbers);
  }
  if (specialInput.checked) {
    buildPassword(special);
  }
  for (let i = 0; i < length - checkedCount; i++) {
    tempPassword += randomChar(possibleChars);
  }

  //   Shuffle the password and set the value of the password text area
  finalPassword = tempPassword
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  // Set the value of the password text area
  passwordText.value = finalPassword;
});
