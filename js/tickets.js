document.addEventListener('DOMContentLoaded', () => {
  const ERROR_ID = [
    "error-name-required",
    "error-surname-required",
    "error-age-required",
    "error-id-required",
    "error-name-invalid",
    "error-surname-invalid",
    "error-age-invalid",
    "error-id-duplicate",
    "error-id-invalid",
  ];

  const STORAGE_KEY = 'ws_tickets_v1';
  let tickets = [];

  // Load tickets from localStorage
  function loadTickets() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) tickets = parsed;
      }
    } catch (e) {
      console.error('Failed to load tickets from localStorage', e);
    }
  }

  // Save tickets to localStorage
  function saveTickets() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    } catch (e) {
      console.error('Failed to save tickets to localStorage', e);
    }
  }

  // Validate ticket inputs
  function validateTicket(name, surname, age, id, skipDuplicate = false) {
    const errors = [];

    if (!name) errors.push("error-name-required");
    if (!surname) errors.push("error-surname-required");
    if (!age) errors.push("error-age-required");
    if (!id) errors.push("error-id-required");

    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (name && !nameRegex.test(name)) errors.push("error-name-invalid");
    if (surname && !nameRegex.test(surname)) errors.push("error-surname-invalid");

    const ageNum = parseInt(age);
    if (age && (isNaN(ageNum) || ageNum <= 0)) errors.push("error-age-invalid");

    if (id && !/^\d+$/.test(id)) errors.push("error-id-invalid");
    if (!skipDuplicate && id && tickets.some(ticket => ticket.id === id)) errors.push("error-id-duplicate");

    return errors;
  }

  // Reset form and hide errors
  function cleanForm() {
    const form = document.getElementById("purchase-form");
    if (!form) return;
    form.reset();
    ERROR_ID.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });
  }

  // Handle ticket creation
  function purchase(event) {
    event.preventDefault();

    // Hide all errors
    ERROR_ID.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });

    const successEl = document.getElementById("success-message");
    if (successEl) successEl.style.display = "none";

    const form = event.target;
    const name = form["user-name"].value.trim();
    const surname = form["user-surname"].value.trim();
    const age = form["user-age"].value.trim();
    const id = form["user-id"].value.trim();

    const errors = validateTicket(name, surname, age, id);

    if (errors.length > 0) {
      errors.forEach(errId => {
        const el = document.getElementById(errId);
        if (el) el.style.display = "block";
      });
    } else {
      tickets.push({ name, surname, age: parseInt(age), id });
      saveTickets();

      if (successEl) successEl.style.display = "block";

      cleanForm();
    }
  }

  // Initialize tickets in create.html
  loadTickets();
  const purchaseForm = document.getElementById("purchase-form");
  if (purchaseForm) {
    const urlParams = new URLSearchParams(window.location.search);
    purchaseForm.addEventListener("submit", purchase);
  }
});
