document.addEventListener("DOMContentLoaded", function () {
    const visitorForm = document.getElementById("visitor-form");
    const visitorTableBody = document.querySelector("#visitor-table tbody");
    const checkEmailInput = document.getElementById("check-email");
    const statusMessage = document.getElementById("status-message");

    // Check if a visitor is pre-registered
    window.checkPreRegistration = function () {
        let email = checkEmailInput.value.trim();
        let storedVisitor = JSON.parse(localStorage.getItem(email));

        if (storedVisitor && storedVisitor.role === "visitor") {
            statusMessage.textContent = "✅ You have been pre-registered!";
            statusMessage.style.color = "green";
        } else {
            statusMessage.textContent = "❌ No pre-registration found. Please register.";
            statusMessage.style.color = "red";
        }
    };

    // Handle Visitor Registration
    if (visitorForm) {
        visitorForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let name = document.getElementById("visitor-name").value.trim();
            let email = document.getElementById("visitor-email").value.trim();
            let purpose = document.getElementById("purpose").value.trim();
            let host = document.getElementById("host").value.trim();

            let visitorData = { name, email, purpose, host, role: "visitor" };
            localStorage.setItem(email, JSON.stringify(visitorData));

            alert("Visitor registration completed!");
            window.location.href = "visitor dashboard.html";
        });
    }

    // Load Visitors on Admin Dashboard
    if (visitorTableBody) {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let storedVisitor = JSON.parse(localStorage.getItem(key));

            if (storedVisitor && storedVisitor.role === "visitor") {
                let row = visitorTableBody.insertRow();
                row.insertCell(0).textContent = storedVisitor.name;
                row.insertCell(1).textContent = storedVisitor.email;
                row.insertCell(2).textContent = storedVisitor.purpose;
                row.insertCell(3).textContent = storedVisitor.host;
            }
        }
    }

    // Logout function
    document.getElementById("logout").addEventListener("click", function () {
        sessionStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    });
});
