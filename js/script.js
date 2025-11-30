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
        "error-id-duplicate"
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
            id: "11223344C",
        }
    ]
   // Attach event listeners to forms
    function listenToEvents() {
        let addStyleForm = document.getElementById("add-style-form");
        let purchaseForm = document.getElementById("purchase-form");
        addStyleForm.addEventListener("submit", addToStyle);
        purchaseForm.addEventListener("submit", purchase);
    }

    // Handle ticket purchase
    function purchase(event) {
        event.preventDefault();

        // Hide all error messages
        ERROR_ID.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = "none";
        });

        // Hide success message
        const successEl = document.getElementById("success-message");
        if (successEl) successEl.style.display = "none";

        // Get form values
        let name = event.target["user-name"].value.trim();
        let surname = event.target["user-surname"].value.trim();
        let age = event.target["user-age"].value.trim();
        let id = event.target["user-id"].value.trim();

        // Array to collect errors
        const errors = [];

        // Validate empty fields
        if (!name) errors.push("error-name-required");
        if (!surname) errors.push("error-surname-required");
        if (!age) errors.push("error-age-required");
        if (!id) errors.push("error-id-required");

        // Validate name and surname contain only letters
        const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
        if (name && !nameRegex.test(name)) errors.push("error-name-invalid");
        if (surname && !nameRegex.test(surname)) errors.push("error-surname-invalid");

        // Validate age is a positive number
        age = parseInt(age);
        if (age && (isNaN(age) || age <= 0)) errors.push("error-age-invalid");

        // Validate ID is numeric
        if (id && !/^\d+$/.test(id)) errors.push("error-id-invalid");

        // Validate unique ID
        if (id && tickets.some(ticket => ticket.id === id)) errors.push("error-id-duplicate");

        // Display all errors at once
        if (errors.length > 0) {
            errors.forEach(errorId => {
                const el = document.getElementById(errorId);
                if (el) el.style.display = "block";
            });
        } else {
            // Create new ticket
            let newPurchase = { name, surname, age, id };
            tickets.push(newPurchase);

            // Show success message
            const successEl = document.getElementById("success-message");
            if (successEl) successEl.style.display = "block";

            // Clean form and update ticket list
            cleanForm();
            showTickets();
        }
    }

    // Reset form and hide all error messages
    function cleanForm() {
        const form = document.getElementById("purchase-form");

        // Clear all inputs
        form.reset();

        // Hide all errors
        ERROR_ID.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = "none";
        });
    }

    // Show purchased tickets
    function showTickets() {
        const ticketsContainer = document.getElementById("tickets-list-container");
        const ul = ticketsContainer.querySelector("ul");

        let html = "";

        for (let i = 0; i < tickets.length; i++) {
            const t = tickets[i];
            html += `<li>${t.name} ${t.surname}, Age: ${t.age}, ID: ${t.id}</li>`;
        }

        ul.innerHTML = html;
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
    showTickets();
    listenToEvents();
});
