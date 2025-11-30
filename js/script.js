document.addEventListener('DOMContentLoaded', () => {
    const IMAGES = document.querySelectorAll('.toggle-info');

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

    function listenToEvents() {
        let addStyleForm = document.getElementById("add-style-form");
        let purchaseForm = document.getElementById("purchase-form");
        addStyleForm.addEventListener("submit", addToStyle);
        purchaseForm.addEventListener("submit", purchase);
    }

    function purchase(event) {
        event.preventDefault();

        document.getElementById("error-name-required").style.display = "none";
        document.getElementById("error-surname-required").style.display = "none";
        document.getElementById("error-age-required").style.display = "none";
        document.getElementById("error-id-required").style.display = "none";

        let name = event.target["user-name"].value;
        let surname = event.target["user-surname"].value;
        let age = event.target["user-age"].value;
        let id = event.target["user-id"].value;

        if (!name || name === "") {
            document.getElementById("error-name-required").style.display = "block";
            console.log("error-name-required");
            return;
        }

        if (!surname || surname === "") {
            document.getElementById("error-surname-required").style.display = "block";
            console.log("error-surname-required");
            return;
        }

        if (!age || age === "") {
            document.getElementById("error-age-required").style.display = "block";
            console.log("error-age-required");
            return;
        }

        if (!id || id === "") {
            document.getElementById("error-id-required").style.display = "block";
            console.log("error-id-required");
            return;
        }

        let newPurchase = {
            name: name,
            surname: surname,
            age: age,
            id: id,
        };

        tickets.push(newPurchase);
        showTickets();
    }

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

    showStyle();
    showTickets();
    listenToEvents();
});