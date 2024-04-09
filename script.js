// Encapsulating the entire script to avoid polluting the global scope
(function () {
  // Define character criteria for password generation
  const criteria = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    special: "!@#$%^&*()_+",
  };

  /**
   * Generates a random password based on selected criteria and length.
   * @param {number} length - Desired length of the password.
   * @param {Object} options - Object indicating which criteria to include.
   * @returns {string} The generated password.
   */
  function generatePassword(length, options) {
    let charPool = ""; // To accumulate characters from selected criteria
    let password = ""; // Initialize password string

    // Iterate over options to build the character pool and initial password
    Object.keys(options).forEach((option) => {
      if (options[option]) {
        charPool += criteria[option]; // Add to pool
        password += randomChar(criteria[option]); // Ensure each selected criteria is represented
      }
    });

    // Fill the remainder of the password with random characters from the pool
    for (let i = password.length; i < length; i++) {
      password += randomChar(charPool);
    }

    return shuffleString(password); // Shuffle to ensure randomness
  }

  /**
   * Picks a random character from a given string.
   * @param {string} str - String to pick a character from.
   * @returns {string} A single random character.
   */
  function randomChar(str) {
    return str[Math.floor(Math.random() * str.length)];
  }

  /**
   * Shuffles a string in a random manner.
   * @param {string} str - String to shuffle.
   * @returns {string} The shuffled string.
   */
  function shuffleString(str) {
    return str
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }

  //   Add event listener to text area to reset the password when clicked
  document.querySelector("#password").addEventListener("click", function () {
    window.location.reload();
  });

  //   Add event listener to copy button to copy the password to clipboard
  document.querySelector("#clipboard").addEventListener("click", function () {
    const passwordText = document.querySelector("#password");
    passwordText.select();
    document.execCommand("copy");
    passwordText.value =
      "Password copied to clipboard. Click to generate again.";
  });

  // Add event listener to the generate button
  document
    .querySelector("#generate")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form submission

      const lengthInput = parseInt(document.querySelector("#length").value, 10); // Get password length from input
      // Gather checkbox states in an options object
      const options = {
        uppercase: document.querySelector("#uppercase").checked,
        lowercase: document.querySelector("#lowercase").checked,
        numbers: document.querySelector("#numbers").checked,
        special: document.querySelector("#symbols").checked,
      };

      // Select the password text area to display the result
      const passwordText = document.querySelector("#password");

      // Check if no criteria is selected
      if (Object.values(options).every((option) => !option)) {
        passwordText.value = "Please select at least one option";
        return;
      }
      // Validate password length
      if (lengthInput < 8 || lengthInput > 128) {
        passwordText.value =
          "Password length must be between 8 and 128 characters";
        return;
      }

      // Generate the password and display it
      passwordText.value = generatePassword(lengthInput, options);
    });
})();
