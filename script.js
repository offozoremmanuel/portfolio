
// ==============================
// MOBILE MENU
// ==============================

const menuBtn = document.getElementById("menuBtn");

const navLinks = document.getElementById("navLinks");


if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        const icon = menuBtn.querySelector("i");


        if (navLinks.classList.contains("show")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}


// ==============================
// CLOSE MOBILE MENU
// ==============================

const links = document.querySelectorAll(".nav-links a");


links.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


// ==============================
// ACTIVE NAV LINK
// ==============================

const sections = document.querySelectorAll("section");

const navItems = document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;


        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


// ==============================
// FOOTER YEAR
// ==============================

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


// ==============================
// CONTACT FORM
// ==============================

const contactForm =
    document.getElementById("contactForm");


const formStatus =
    document.getElementById("formStatus");


const submitBtn =
    document.getElementById("submitBtn");


const buttonText =
    document.getElementById("buttonText");


const buttonIcon =
    document.getElementById("buttonIcon");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            // ==============================
            // BUTTON LOADING STATE
            // ==============================

            submitBtn.disabled = true;

            buttonText.textContent =
                "Sending...";

            buttonIcon.className =
                "fa-solid fa-spinner fa-spin";


            formStatus.textContent = "";

            formStatus.className =
                "form-status";


            try {

                const formData =
                    new FormData(contactForm);


                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                const result =
                    await response.json();


                // ==============================
                // SUCCESS
                // ==============================

                if (response.ok) {

                    formStatus.textContent =
                        "Message sent successfully! I'll get back to you soon.";

                    formStatus.classList.add(
                        "success"
                    );


                    // Clear form

                    contactForm.reset();


                    // Change button

                    buttonText.textContent =
                        "Message Sent";

                    buttonIcon.className =
                        "fa-solid fa-check";


                    // Reset button after 3 seconds

                    setTimeout(() => {

                        buttonText.textContent =
                            "Send Message";

                        buttonIcon.className =
                            "fa-solid fa-paper-plane";

                        submitBtn.disabled =
                            false;

                    }, 3000);


                } else {

                    throw new Error(
                        result.message ||
                        "Something went wrong."
                    );

                }


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                // ==============================
                // ERROR
                // ==============================

                formStatus.textContent =
                    "Unable to send your message. Please try again.";

                formStatus.classList.add(
                    "error"
                );


                buttonText.textContent =
                    "Try Again";

                buttonIcon.className =
                    "fa-solid fa-rotate-right";


                submitBtn.disabled =
                    false;

            }

        }
    );

}


// ==============================
// SCROLL REVEAL
// ==============================

const revealElements =
    document.querySelectorAll(
        ".skill-card, .project-card, .service-card, .stat-card"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";


                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";


    revealObserver.observe(element);

});
