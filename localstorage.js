document.addEventListener("DOMContentLoaded", function () {
  // Function to save form data to localStorage
  function saveFormData(form) {
    const formData = {};
    const formId =
      form.id || "form_" + Array.from(document.forms).indexOf(form);

    Array.from(form.elements).forEach((element) => {
      if (element.name) {
        if (element.type === "checkbox") {
          // Handle checkboxes with multiple values as an array
          if (!formData[element.name]) {
            formData[element.name] = [];
          }
          if (element.checked) {
            formData[element.name].push(element.value);
          }
        } else if (element.type === "radio") {
          if (element.checked) {
            formData[element.name] = element.value;
          }
        } else {
          formData[element.name] = element.value;
        }
      }
    });

    localStorage.setItem(formId, JSON.stringify(formData));
  }

  // Function to populate form with saved data from localStorage
  function populateFormData(form) {
    const formId =
      form.id || "form_" + Array.from(document.forms).indexOf(form);
    const savedData = JSON.parse(localStorage.getItem(formId));

    if (savedData) {
      Array.from(form.elements).forEach((element) => {
        if (element.name && savedData[element.name] !== undefined) {
          if (element.type === "checkbox") {
            element.checked = savedData[element.name].includes(element.value);
          } else if (element.type === "radio") {
            element.checked = element.value === savedData[element.name];
          } else {
            element.value = savedData[element.name];
          }
        }
      });
    }
  }

  // Attach event listeners to all forms
  Array.from(document.forms).forEach((form) => {
    // Populate form with data if it exists in localStorage
    populateFormData(form);

    // Listen for input changes and save data to localStorage
    form.addEventListener("input", () => saveFormData(form));
    form.addEventListener("change", () => saveFormData(form)); // Necessary for radio and checkbox inputs
  });
});
