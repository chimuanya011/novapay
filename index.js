// ===========================
// NOVAPAY HOME PAGE
// ===========================

const getStartedBtn = document.querySelector(".primary-btn");

const navButton = document.querySelector(".nav-btn");

const loginLink = document.querySelector(".login-text a");

const featureLink = document.querySelector('a[href="#features"]');

const supportLink = document.querySelector('a[href="#support"]');

// ===========================
// GET STARTED
// ===========================

if (getStartedBtn) {

    getStartedBtn.addEventListener("click", () => {

        window.location.href = "register.html";

    });

}

if (navButton) {

    navButton.addEventListener("click", (e) => {

        e.preventDefault();

        window.location.href = "register.html";

    });

}

// ===========================
// LOGIN
// ===========================

if (loginLink) {

    loginLink.addEventListener("click", (e) => {

        e.preventDefault();

        window.location.href = "login.html";

    });

}

// ===========================
// FEATURES
// ===========================

if (featureLink) {

    featureLink.addEventListener("click", (e) => {

        e.preventDefault();

        document
            .getElementById("features")
            .scrollIntoView({

                behavior: "smooth"

            });

    });

}

// ===========================
// SUPPORT
// ===========================

if (supportLink) {

    supportLink.addEventListener("click", (e) => {

        e.preventDefault();

        document
            .getElementById("support")
            .scrollIntoView({

                behavior: "smooth"

            });

    });

}

console.log("NovaPay Home Loaded Successfully");