document.addEventListener('DOMContentLoaded', () => {
  const IMAGES = document.querySelectorAll('.toggle-info');
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

  // Toggle painting info display when image is clicked
  IMAGES.forEach(image => {
    image.addEventListener('click', () => {
      const item = image.closest('.painting-item');
      if (!item) return;

      const infoContainer = item.querySelector('.painting-info');

      if (infoContainer) {
        if (infoContainer.style.display === 'none' || infoContainer.style.display === '') {
          infoContainer.style.display = 'block';
        } else {
          infoContainer.style.display = 'none';
        }
      }
    });
  });

  let bg = document.getElementById("background-image");
  let text = document.getElementById("hero-title");

  // Parallax effect on scroll
  window.addEventListener('scroll', function () {
    var value = window.scrollY;

    bg.style.top = value * 0.5 + 'px';
    text.style.top = value * 1 + 'px';
  });

  let style = [
    {
      name: "Crayon",
      amount: 5,
    },
    {
      name: "Marker",
      amount: 2,
    },
    {
      name: "Oil",
      amount: 1,
    },
    {
      name: "Realism:",
      amount: 1,
    },
    {
      name: "Digital",
      amount: 1,
    },
    {
      name: "Pencil",
      amount: 1,
    }
  ]

  let tickets = [
    {
      name: "Andrés",
      surname: "Acosta",
      age: 23,
      id: "11223344",
    }
  ]
  // LocalStorage key and helpers
  const STORAGE_KEY = 'ws_tickets_v1';

  function saveTickets() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    } catch (e) {
      console.error('Failed to save tickets to localStorage', e);
    }
  }

  function loadTickets() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          tickets = parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load tickets from localStorage', e);
    }
  }
  // Attach event listeners to forms
  function listenToEvents() {
    let addStyleForm = document.getElementById("add-style-form");
    let purchaseForm = document.getElementById("purchase-form");
    addStyleForm.addEventListener("submit", addToStyle);
    purchaseForm.addEventListener("submit", purchase);

  }

  function validateTicket(name, surname, age, id, isUpdate = false) {
    const errors = [];

    // Check empty fields
    if (!name) errors.push("error-name-required");
    if (!surname) errors.push("error-surname-required");
    if (!age) errors.push("error-age-required");
    if (!id) errors.push("error-id-required");

    // Name and surname letters only
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (name && !nameRegex.test(name)) errors.push("error-name-invalid");
    if (surname && !nameRegex.test(surname)) errors.push("error-surname-invalid");

    // Age positive number
    const ageNum = parseInt(age);
    if (age && (isNaN(ageNum) || ageNum <= 0)) errors.push("error-age-invalid");

    // ID numeric
    if (id && !/^\d+$/.test(id)) errors.push("error-id-invalid");

    // Unique ID, only check if adding a new ticket
    if (!isUpdate && id && tickets.some(ticket => ticket.id === id)) errors.push("error-id-duplicate");

    return errors;
  }

  // Delete a ticket by ID
  function deleteTicket(id) {
    tickets = tickets.filter(ticket => ticket.id !== id);
    saveTickets();
    showTickets(); // Re-render list
  }

  // Update a ticket
  function updateTicket(ticket, newName, newSurname, newAge) {
    const errors = validateTicket(newName, newSurname, newAge, ticket.id, true);

    const panel = document.querySelector(`.ticket-item[data-id='${ticket.id}'] .edit-panel`);
    // Remove previous error if any
    const prevError = panel.querySelector(".edit-error");
    if (prevError) prevError.remove();

    if (errors.length > 0) {
      const errorSpan = document.createElement("span");
      errorSpan.classList.add("edit-error");
      errorSpan.style.color = "red";
      errorSpan.textContent = "Incorrect data";
      panel.appendChild(errorSpan);
    } else {
      // Update ticket values
      ticket.name = newName;
      ticket.surname = newSurname;
      ticket.age = parseInt(newAge);

      // Re-render tickets
      saveTickets();
      showTickets();
    }
  }

  // Show purchased tickets
  function showTickets() {
    const ticketsContainer = document.getElementById("tickets-list-container");
    const ul = ticketsContainer.querySelector("ul");

    ul.innerHTML = ""; // Clear previous tickets

    tickets.forEach(ticket => {
      const li = document.createElement("li");
      li.classList.add("ticket-item");
      li.dataset.id = ticket.id; 

      li.innerHTML = `
            <span>${ticket.name} ${ticket.surname}, Age: ${ticket.age}, ID: ${ticket.id}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            <div class="edit-panel" style="display: none; margin-top: 5px;">
                <input type="text" class="edit-name" value="${ticket.name}" placeholder="Name">
                <input type="text" class="edit-surname" value="${ticket.surname}" placeholder="Surname">
                <input type="number" class="edit-age" value="${ticket.age}" placeholder="Age">
                <button class="update-btn">Update</button>
                <button class="cancel-btn">Cancel</button>
            </div>
        `;

      ul.appendChild(li);

      const editBtn = li.querySelector(".edit-btn");
      const deleteBtn = li.querySelector(".delete-btn");
      const editPanel = li.querySelector(".edit-panel");
      const updateBtn = li.querySelector(".update-btn");
      const cancelBtn = li.querySelector(".cancel-btn");

      // Show edit panel
      editBtn.addEventListener("click", () => {
        editPanel.style.display = "block";
      });

      // Cancel edit
      cancelBtn.addEventListener("click", () => {
        editPanel.style.display = "none";
        const prevError = editPanel.querySelector(".edit-error");
        if (prevError) prevError.remove();
      });

      // Update ticket
      updateBtn.addEventListener("click", () => {
        const newName = li.querySelector(".edit-name").value.trim();
        const newSurname = li.querySelector(".edit-surname").value.trim();
        const newAge = li.querySelector(".edit-age").value.trim();

        updateTicket(ticket, newName, newSurname, newAge);
      });

      // Delete ticket
      deleteBtn.addEventListener("click", () => {
        tickets = tickets.filter(t => t.id !== ticket.id);
        saveTickets();
        showTickets();
      });
    });
  }



  // Add new art style
  function addToStyle(event) {
    event.preventDefault();

    let styleName = event.target["style-name"].value;
    let styleAmount = event.target["style-amount"].value;

    let newStyle = {
      name: styleName,
      amount: styleAmount
    };

    style.push(newStyle);

    showStyle();
  }

  // Display all art styles
  function showStyle() {
    let styleListContainer = document.getElementById("style-list-container");
    let allStyle = styleListContainer.querySelector("ul");;

    let aux = "";

    for (let i = 0; i < style.length; i++) {
      const item = style[i];
      aux = aux + `<li>${item.name}: ${item.amount}</li>`;
    }

    allStyle.innerHTML = aux;
  }

  // Initialize display and attach events
  showStyle();
  // Load saved tickets (if any) then render
  loadTickets();
  showTickets();
  listenToEvents();
});
