/**
 * Prime University Admission Portal - Form Validation JavaScript
 * This script handles the form validation for the registration page
 *
 * Author: [Your Name]
 * Version: 1.0
 * Created: April 2025
 */

document.addEventListener("DOMContentLoaded", function () {
  // Get form elements
  const registrationForm = document.getElementById("registrationForm");
  const successMessage = document.getElementById("registrationSuccess");

  // Email validation regex pattern
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Phone number validation regex pattern (basic international format)
  const phonePattern =
    /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;

  // Terms and conditions agreement
  const termsCheck = document.getElementById("termsCheck");
  const agreeTermsBtn = document.getElementById("agreeTerms");

  // Maximum file sizes
  const MAX_PROFILE_PIC_SIZE = 2 * 1024 * 1024; // 2MB
  const MAX_DOCUMENTS_SIZE = 5 * 1024 * 1024; // 5MB

  // Handle terms and conditions modal agreement
  if (agreeTermsBtn) {
    agreeTermsBtn.addEventListener("click", function () {
      if (termsCheck) {
        termsCheck.checked = true;
        // Remove the invalid class if present
        termsCheck.classList.remove("is-invalid");
      }
    });
  }

  // Form submission handling
  if (registrationForm) {
    registrationForm.addEventListener("submit", function (event) {
      // Prevent default form submission
      event.preventDefault();

      // Reset previous validation states
      resetValidationState();

      // Validate form
      if (validateForm()) {
        // If form is valid, show success message (in a real application, submit data to server)
        submitForm();
      }
    });
  }

  /**
   * Reset validation state of all form elements
   */
  function resetValidationState() {
    // Remove all validation classes
    const formElements = registrationForm.querySelectorAll(
      ".form-control, .form-select, .form-check-input"
    );
    formElements.forEach((element) => {
      element.classList.remove("is-invalid");
      element.classList.remove("is-valid");
    });

    // Reset gender validation message
    const genderFeedback = document.getElementById("genderFeedback");
    if (genderFeedback) {
      genderFeedback.textContent = "";
    }
  }

  /**
   * Validate the entire form
   * @returns {boolean} True if form is valid, false otherwise
   */
  function validateForm() {
    let isValid = true;

    // First Name validation
    const firstName = document.getElementById("firstName");
    if (!firstName.value.trim()) {
      showError(firstName);
      isValid = false;
    } else {
      showSuccess(firstName);
    }

    // Last Name validation
    const lastName = document.getElementById("lastName");
    if (!lastName.value.trim()) {
      showError(lastName);
      isValid = false;
    } else {
      showSuccess(lastName);
    }

    // Date of Birth validation
    const dateOfBirth = document.getElementById("dateOfBirth");
    if (!dateOfBirth.value) {
      showError(dateOfBirth);
      isValid = false;
    } else {
      // Check if user is at least 16 years old
      const dob = new Date(dateOfBirth.value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();

      if (
        age < 16 ||
        (age === 16 && monthDiff < 0) ||
        (age === 16 && monthDiff === 0 && today.getDate() < dob.getDate())
      ) {
        showError(dateOfBirth);
        dateOfBirth.nextElementSibling.textContent =
          "You must be at least 16 years old.";
        isValid = false;
      } else {
        showSuccess(dateOfBirth);
      }
    }

    // Gender validation
    const genderOptions = document.querySelectorAll('input[name="gender"]');
    const genderFeedback = document.getElementById("genderFeedback");
    let genderSelected = false;

    genderOptions.forEach((option) => {
      if (option.checked) {
        genderSelected = true;
      }
    });

    if (!genderSelected) {
      genderOptions.forEach((option) => {
        option.classList.add("is-invalid");
      });
      if (genderFeedback) {
        genderFeedback.textContent = "Please select your gender.";
      }
      isValid = false;
    } else {
      genderOptions.forEach((option) => {
        option.classList.add("is-valid");
      });
    }

    // Email validation
    const email = document.getElementById("email");
    if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
      showError(email);
      isValid = false;
    } else {
      showSuccess(email);
    }

    // Phone validation
    const phone = document.getElementById("phone");
    if (!phone.value.trim() || !phonePattern.test(phone.value.trim())) {
      showError(phone);
      isValid = false;
    } else {
      showSuccess(phone);
    }

    // Address validation
    const address = document.getElementById("address");
    if (!address.value.trim()) {
      showError(address);
      isValid = false;
    } else {
      showSuccess(address);
    }

    // City validation
    const city = document.getElementById("city");
    if (!city.value.trim()) {
      showError(city);
      isValid = false;
    } else {
      showSuccess(city);
    }

    // Postal Code validation
    const postalCode = document.getElementById("postalCode");
    if (!postalCode.value.trim()) {
      showError(postalCode);
      isValid = false;
    } else {
      showSuccess(postalCode);
    }

    // Country validation
    const country = document.getElementById("country");
    if (!country.value) {
      showError(country);
      isValid = false;
    } else {
      showSuccess(country);
    }

    // Profile Picture validation (optional, but check file size/type if provided)
    const profilePic = document.getElementById("profilePic");
    if (profilePic && profilePic.files.length > 0) {
      const file = profilePic.files[0];
      if (!file.type.match(/^image\//)) {
        showError(profilePic);
        profilePic.nextElementSibling.textContent =
          "Please upload a valid image file.";
        isValid = false;
      } else if (file.size > MAX_PROFILE_PIC_SIZE) {
        showError(profilePic);
        profilePic.nextElementSibling.textContent =
          "Profile picture must be less than 2MB.";
        isValid = false;
      } else {
        showSuccess(profilePic);
      }
    }

    // Academic Documents validation (optional, but check file size/type if provided)
    const academicDocs = document.getElementById("academicDocs");
    if (academicDocs && academicDocs.files.length > 0) {
      let totalSize = 0;
      let valid = true;
      for (let i = 0; i < academicDocs.files.length; i++) {
        const file = academicDocs.files[i];
        totalSize += file.size;
        // Accept only PDF or image files
        if (!file.type.match(/^application\/pdf|image\//)) {
          valid = false;
        }
      }
      if (!valid) {
        showError(academicDocs);
        academicDocs.nextElementSibling.textContent =
          "Only PDF or image files are allowed.";
        isValid = false;
      } else if (totalSize > MAX_DOCUMENTS_SIZE) {
        showError(academicDocs);
        academicDocs.nextElementSibling.textContent =
          "Total documents size must be less than 5MB.";
        isValid = false;
      } else {
        showSuccess(academicDocs);
      }
    }

    // Terms and Conditions validation
    if (termsCheck && !termsCheck.checked) {
      termsCheck.classList.add("is-invalid");
      isValid = false;
    } else if (termsCheck) {
      termsCheck.classList.remove("is-invalid");
      termsCheck.classList.add("is-valid");
    }

    return isValid;
  }

  /**
   * Show error state for an input
   * @param {HTMLElement} input
   */
  function showError(input) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }

  /**
   * Show success state for an input
   * @param {HTMLElement} input
   */
  function showSuccess(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }

  /**
   * Simulate form submission and show success message
   */
  function submitForm() {
    if (successMessage) {
      successMessage.style.display = "block";
      successMessage.textContent =
        "Registration successful! Thank you for applying.";
    }
    registrationForm.reset();
    resetValidationState();
    // Optionally, scroll to the success message
    successMessage && successMessage.scrollIntoView({ behavior: "smooth" });
  }
});
