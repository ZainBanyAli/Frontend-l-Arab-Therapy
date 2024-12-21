document.addEventListener("DOMContentLoaded", function () {
  // Modal Elements
  const openModal = document.getElementById("openModal");
  const closeModal = document.getElementById("closeModal");
  const trialModal = document.getElementById("trialModal");
  const trialForm = document.getElementById("trialForm");
  const submitButton = document.getElementById("submitButton");

  // Form Fields
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const companyName = document.getElementById("companyName");
  const companySize = document.getElementById("companySize");

  // Check if all required elements exist
  if (!openModal || !closeModal || !trialModal || !trialForm || !submitButton) {
    console.error("One or more modal elements are missing from the DOM.");
    return;
  }

  if (!firstName || !lastName || !email || !phone || !companyName || !companySize) {
    console.error("One or more form fields are missing from the DOM.");
    return;
  }

  // Utility: Show error message under field
  function showError(field, message) {
    let errorElement = field.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("error-message")) {
      errorElement = document.createElement("div");
      errorElement.className = "error-message";
      field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
    errorElement.style.color = "red";
    errorElement.style.fontSize = "14px";
  }

  // Utility: Clear error message
  function clearError(field) {
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
      errorElement.textContent = "";
    }
  }

  // Prevent numbers in text-only fields
  function preventNumbers(field) {
    field.addEventListener("input", () => {
      if (/[\d]/.test(field.value)) {
        showError(field, "لا يمكن إدخال أرقام في هذا الحقل.");
        field.value = field.value.replace(/[\d]/g, ""); // Remove numbers
      } else {
        clearError(field);
      }
    });
  }

  // Apply validation to specific fields
  preventNumbers(firstName);
  preventNumbers(lastName);
  preventNumbers(companyName);

  // Open Modal
  openModal.addEventListener("click", () => {
    trialModal.style.display = "flex";
  });

  // Close Modal
  closeModal.addEventListener("click", () => {
    trialModal.style.display = "none";
  });

  // Close modal when clicking outside of modal content
  window.addEventListener("click", (e) => {
    if (e.target === trialModal) {
      trialModal.style.display = "none";
    }
  });

  // Validation Functions
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePhone(phone) {
    const regex = /^[0-9]{10}$/; 
    return regex.test(phone);
  }

  function validateFields() {
    // Check if all required fields are filled and valid
    const isValid =
      firstName.value.trim() !== "" &&
      lastName.value.trim() !== "" &&
      validateEmail(email.value) &&
      validatePhone(phone.value) &&
      companyName.value.trim() !== "" &&
      companySize.value !== "";
    return isValid;
  }

  // Enable submit button when all fields are valid
  trialForm.addEventListener("input", () => {
    if (validateFields()) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  });

  // Form Submission
  trialForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      alert("يرجى ملء جميع الحقول بشكل صحيح.");
      return;
    }

    // Collect form data
    const formData = {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      mobile: phone.value,
      organization_name: companyName.value,
      company_size: companySize.value,
    };

    console.log("Submitting Data:", formData);

    // Show submission progress
    submitButton.textContent = "جارٍ الإرسال...";
    submitButton.disabled = true;

    try {
      // API Endpoint
      const apiUrl = "https://stg.arabtherapy.com/api/v1/forms/submit/9";

      // Make the POST request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handle the response
      if (response.ok) {
        const responseData = await response.json();
        console.log("Response from API:", responseData);

        // Show success message
        alertSuccess("تم إرسال طلبك بنجاح!");
        trialModal.style.display = "none";
        trialForm.reset();
        submitButton.disabled = true;
      } else {
        console.error("Failed to submit:", response.status, response.statusText);
        alert("حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("حدث خطأ أثناء الإرسال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.");
    } finally {
      submitButton.textContent = "اطلب حساب تجريبي";
      submitButton.disabled = false;
    }
  });

  // Success Alert Function
  function alertSuccess(message) {
    const successAlert = document.createElement("div");
    successAlert.textContent = message;
    successAlert.style.position = "fixed";
    successAlert.style.bottom = "20px";
    successAlert.style.left = "50%";
    successAlert.style.transform = "translateX(-50%)";
    successAlert.style.padding = "15px 20px";
    successAlert.style.backgroundColor = "#4CAF50";
    successAlert.style.color = "#fff";
    successAlert.style.borderRadius = "5px";
    successAlert.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    successAlert.style.zIndex = "1000";

    document.body.appendChild(successAlert);

    setTimeout(() => {
      successAlert.remove();
    }, 3000);
  }
});
const flagSelect = document.querySelector('.flag-select');
const flagDropdown = document.getElementById('flagDropdown');
const selectedFlag = document.getElementById('selected-flag');

// Toggle dropdown visibility
function toggleDropdown() {
    const isOpen = flagDropdown.style.display === 'block';
    flagDropdown.style.display = isOpen ? 'none' : 'block';
    flagSelect.classList.toggle('open', !isOpen);
}

// Select a flag
function selectFlag(flagUrl) {
    selectedFlag.src = flagUrl;
    flagDropdown.style.display = 'none';
    flagSelect.classList.remove('open');
}

