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

// alert placeholder
const alertPlaceholder = document.getElementById("alertPlaceHolder");

// form eventlistener
form.addEventListener("submit", function (event) {
  event.preventDefault();
  handleSubmission();
});

// form validation
function validateFormField() {
  // full name validation
  if (fullNameInputField.value == "") {
    createAlert("Please Input your Full Name", "danger");
    return false;
  }
  if (fullNameInputField.value.trim().length < 3) {
    createAlert("Full name must not be less than 3 characters", "danger");
    return false;
  }

  // gender radiobox validation
  const gender = genderCheckBox.querySelector('input[name="gender"]:checked');
  if (!gender) {
    createAlert("Gender must not be empty", "danger");
    return false;
  }

  // email validation
  if (emailInputField.value == "") {
    createAlert("Email must not be empty", "warning");
    return false;
  }

  // interest checkbox validation
  const interest = interestCheckBox.querySelectorAll(
    'input[type="checkbox"]:checked',
  );
  if (interest.length === 0) {
    createAlert("You must select at least 1 Interest", "danger");
    return false;
  }

  // message input validation
  if (messageInput.value == "") {
    createAlert("Message Field must not be empty", "danger");
    return false;
  }
  return true;
}

// create alert using bootstrap
function createAlert(message, type = "warning") {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");
  alertPlaceholder.append(wrapper);
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
    const toastBootstrap =
      bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();

    ResetForm();
  }
}

// clear form after submission
function ResetForm() {
  fullNameInputField.value = "";
  emailInputField.value = "";
  courseSelectionBox.value = "";
  genderCheckBox.querySelector('input[name="gender"]:checked').checked = false;
  // Uncheck all checkboxes with a specific class
  interestCheckBox
    .querySelectorAll('input[name="interest"]:checked')
    .forEach((checkbox) => {
      checkbox.checked = false;
    });
  messageInput.value = "";
  alertPlaceholder.innerText = "";
}
