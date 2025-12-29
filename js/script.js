document.addEventListener("DOMContentLoaded", () => {
  // Contact Form Handler
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Construct mailto link (encode subject and body so spaces/newlines work)
      const myEmail = "natymiskir@gmail.com";
      const subject = `Portfolio Contact from ${name}`;
      const body = `Name: ${name}\r\nEmail: ${email}\r\n\r\nMessage:\r\n${message}`;

      const mailtoLink = `mailto:${myEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoLink;
    });
  }

  // Smooth Scrolling for anchor links (safeguard for older browsers)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
