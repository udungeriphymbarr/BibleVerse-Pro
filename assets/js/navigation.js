function initNavigation() {

    const menuBtn =
        document.getElementById("menuBtn");

    const navMenu =
        document.querySelector(".nav-menu");

    const navLinks =
        document.querySelectorAll(".nav-link");

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        menuBtn.textContent =
            navMenu.classList.contains("active")
            ? "✕"
            : "☰";

    });

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuBtn.textContent = "☰";

        });

    });

}