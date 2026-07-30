// JS
// Get form and form fields
const form = document.getElementById("profile-form");
const fullNameInputField = document.getElementById("full-name");
const genderCheckBox = document.getElementById("gender");
const interestCheckBox = document.getElementById("interests");
const courseSelectionBox = document.getElementById("course");
const emailInputField = document.getElementById("email");
const messageInput = document.getElementById("message");

// Get toast elements
const toastFullName = document.getElementById("toast-full-name");
const toastEmail = document.getElementById("toast-email");
const toastCourse = document.getElementById("toast-course");
const toastGender = document.getElementById("toast-gender");
const toastInterests = document.getElementById("toast-interests");
const toastMessage = document.getElementById("toast-message");
const toastLiveExample = document.getElementById("liveToast");

// form eventlistener
form.addEventListener("submit", function (event) {
  event.preventDefault();
  handleSubmission();
});

// form validation
function validateFormField() {
  // full name validation
  if (fullNameInputField.value == "") {
    alert("Please Input your Full Name");
    return false;
  }

  // gender radiobox validation
  const gender = genderCheckBox.querySelector('input[name="gender"]:checked');
  if (!gender) {
    alert("Gender must not be empty");
    return false;
  }

  // interest checkbox validation
  const interest = interestCheckBox.querySelectorAll(
    'input[type="checkbox"]:checked',
  );
  if (interest.length === 0) {
    alert("You must select at least 1 Interest");
    return false;
  }

  // message input validation
  if (messageInput.value == "") {
    alert("Message Field must not be empty");
    return false;
  }
  return true;
}

// handle form submission
function handleSubmission() {
  if (validateFormField()) {
    // display the form data in an toast box

    toastFullName.textContent = fullNameInputField.value;
    toastEmail.textContent = emailInputField.value;
    toastCourse.textContent = courseSelectionBox.value;
    toastGender.textContent = genderCheckBox.querySelector(
      'input[name="gender"]:checked',
    ).value;
    toastInterests.textContent = Array.from(
      interestCheckBox.querySelectorAll('input[type="checkbox"]:checked'),
    )
      .map((checkbox) => checkbox.parentElement.textContent.trim())
      .join(", ");
    toastMessage.textContent = messageInput.value;
  }

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
}
