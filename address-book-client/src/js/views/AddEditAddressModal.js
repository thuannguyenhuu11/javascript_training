import Event from "../events/event";
import { MESSAGE, REGEX } from "../constants/message";

class AddEditAddressModal {
  constructor() {
    this.openEvent = new Event();
    this.closeEvent = new Event();
    this.formEvent = new Event();

    this.modalEl = document.querySelector(".modal");
    this.overlayEl = document.querySelector(".overlay");
    this.addBtnEl = document.querySelector(".features__add");
    this.cancelBtnEl = document.querySelector(".modal__buttons__cancel");

    // Attach event to the New-button using the handleOpenAddModal method
    this.addBtnEl.addEventListener("click", this.handleOpenAddModal.bind(this));

    // Attach event to the Cancel-button using the handleCloseAddModal method
    this.cancelBtnEl.addEventListener("click", this.handleCloseAddModal.bind(this));

    this.nameInput = this.modalEl.name;
    this.nameError = this.nameInput.nextElementSibling;
    this.relationInput = this.modalEl.relation;
    this.relationError = this.relationInput.nextElementSibling;
    this.phoneInput = this.modalEl.phone;
    this.phoneError = this.phoneInput.nextElementSibling;
    this.emailInput = this.modalEl.email;
    this.emailError = this.emailInput.nextElementSibling;
    this.avatarInput = this.modalEl.avatar;
    this.avatarError = this.avatarInput.nextElementSibling;

    this.modalEl.addEventListener("submit", this.handleSubmit.bind(this));
  }

  // Handle open ADD-modal
  handleOpenAddModal() {
    this.modalEl.classList.add("modal--active");
    this.overlayEl.classList.add("overlay--active");
    this.openEvent.trigger();
  }

  // Handle close ADD-modal
  handleCloseAddModal() {
    this.modalEl.classList.remove("modal--active");
    this.overlayEl.classList.remove("overlay--active");

    // Clear any previous error messages and styles
    this.resetModal();
    this.modalEl.reset();

    this.closeEvent.trigger();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.validateForm();
    this.formEvent.trigger();
  }

  //----- VALIDATE FORM -----//

  validateForm() {
    // Get values from the input fields
    const modalEl = document.querySelector(".modal");
    const nameInput = modalEl.name;
    const nameError = nameInput.nextElementSibling;
    const relationInput = modalEl.relation;
    const relationError = relationInput.nextElementSibling;
    const phoneInput = modalEl.phone;
    const phoneError = phoneInput.nextElementSibling;
    const emailInput = modalEl.email;
    const emailError = emailInput.nextElementSibling;
    const avatarInput = modalEl.avatar;
    const avatarError = avatarInput.nextElementSibling;

    let isValid = true;

    this.resetModal();

    // Object to store field validation data
    const fields = [
      { name: "name", regex: REGEX.NAME, errorElement: nameError, requiredMessage: MESSAGE.NAME_REQUIRED, invalidMessage: MESSAGE.INVALID_NAME },
      { name: "relation", regex: REGEX.NAME, errorElement: relationError, requiredMessage: MESSAGE.RELATION_REQUIRED, invalidMessage: MESSAGE.INVALID_RELATION },
      { name: "phone", regex: REGEX.PHONE, errorElement: phoneError, requiredMessage: MESSAGE.PHONE_REQUIRED, invalidMessage: MESSAGE.INVALID_PHONE },
      { name: "email", regex: REGEX.EMAIL, errorElement: emailError, requiredMessage: MESSAGE.EMAIL_REQUIRED, invalidMessage: MESSAGE.INVALID_EMAIL },
      { name: "avatar", regex: REGEX.AVATAR, errorElement: avatarError, requiredMessage: MESSAGE.AVATAR_REQUIRED, invalidMessage: MESSAGE.INVALID_AVATAR },
    ];

    // Loop through each field to perform validation
    for (const field of fields) {
      const inputEl = modalEl[field.name];
      const errorEl = field.errorElement;
      const value = inputEl.value;

      const isValidField = field.regex.test(value);

      // Validate field and show error message if needed
      if (value.trim() === "") {
        this.showErrorMessage(inputEl, errorEl, field.requiredMessage);
        isValid = false;
      } else if (!isValidField) {
        this.showErrorMessage(inputEl, errorEl, field.invalidMessage);
        isValid = false;
      } else {
        this.clearErrorMessage(inputEl, errorEl);
      }
    }

    return isValid;
  }
  // Method to show error message and apply warning styling
  showErrorMessage(inputElement, errorElement, errorMessage) {
    inputElement.classList.add("input--warning");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("warning-text--active");
  }

  // Method to clear error message and remove warning styling
  clearErrorMessage(inputElement, errorElement) {
    inputElement.classList.remove("input--warning");
    errorElement.textContent = "";
    errorElement.classList.remove("warning-text--active");
  }

  // Clear any previous error messages and styles
  resetModal() {
    this.modalEl.name.classList.remove("input--warning");
    this.nameError.textContent = "";
    this.modalEl.phone.classList.remove("input--warning");
    this.phoneError.textContent = "";
    this.modalEl.email.classList.remove("input--warning");
    this.emailError.textContent = "";
    this.modalEl.avatar.classList.remove("input--warning");
    this.avatarError.textContent = "";
    this.modalEl.relation.classList.remove("input--warning");
    this.relationError.textContent = "";
  }

  //Handle render logic
  render() {}
}

export default AddEditAddressModal;
