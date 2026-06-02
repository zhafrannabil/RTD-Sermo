fetch("assets/data/contacts.json")
  .then(response => response.json())
  .then(data => {

    const accordion = document.getElementById("contactAccordion");

    let index = 0;

    Object.entries(data).forEach(([category, contacts]) => {

      let contactHTML = "";

      contacts.forEach(contact => {

        const nama = Array.isArray(contact.nama)
          ? contact.nama.join(", ")
          : contact.nama;

        const hp = Array.isArray(contact.hp)
          ? contact.hp.join(", ")
          : contact.hp;

        contactHTML += `
          <div class="contact-item">

            <div class="contact-name">
              ${nama}
            </div>

            <div class="contact-role">
              ${contact.jabatan}
            </div>

            ${contact.kantor ? `
              <div class="contact-office">
                <i class="fa-solid fa-building"></i>
                ${contact.kantor}
              </div>
            ` : ""}

            ${contact.hp ? `
              <div class="contact-phone">
                <i class="fa-solid fa-mobile-screen-button"></i>
                ${hp}
              </div>
            ` : ""}

          </div>
        `;
      });

      accordion.innerHTML += `
        <div class="accordion-item">

          <h2 class="accordion-header">

            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse${index}">

              ${category}

            </button>

          </h2>

          <div
            id="collapse${index}"
            class="accordion-collapse collapse"
            data-bs-parent="#contactAccordion">

            <div class="accordion-body">

              ${contactHTML}

            </div>

          </div>

        </div>
      `;

      index++;

    });

  })
  .catch(error => {
    console.error("Gagal memuat contacts.json", error);
  });