document.addEventListener("DOMContentLoaded", () => {
  // Contact Form Handler
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      // Try to send via EmailJS if configured (client-side service)
      // To use this, replace the placeholders below with your EmailJS values.
      const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // e.g. "service_xxx"
      const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // e.g. "template_xxx"
      const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY"; // public key

      const myEmail = "natymiskir@gmail.com";
      const subject = `Portfolio Contact from ${name}`;

      const templateParams = {
        from_name: name,
        from_email: email,
        to_email: myEmail,
        subject: subject,
        message: message,
      };

      const isConfigured =
        EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" &&
        EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID" &&
        EMAILJS_PUBLIC_KEY !== "YOUR_EMAILJS_PUBLIC_KEY";

      if (
        isConfigured &&
        window.emailjs &&
        typeof emailjs.send === "function"
      ) {
        // Initialize (in case index.html init didn't run)
        try {
          emailjs.init(EMAILJS_PUBLIC_KEY);
        } catch (err) {
          // already initialized or missing key
        }

        emailjs
          .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
          .then(
            function (response) {
              alert("Message sent — thanks!");
              contactForm.reset();
            },
            function (error) {
              // fallback to mailto if EmailJS fails
              console.error("EmailJS error:", error);
              const body = `Name: ${name}\r\nEmail: ${email}\r\n\r\nMessage:\r\n${message}`;
              const mailtoLink = `mailto:${myEmail}?subject=${encodeURIComponent(
                subject
              )}&body=${encodeURIComponent(body)}`;
              window.location.href = mailtoLink;
            }
          );
      } else {
        // Fallback: open user's email client with prefilled message
        const body = `Name: ${name}\r\nEmail: ${email}\r\n\r\nMessage:\r\n${message}`;
        const mailtoLink = `mailto:${myEmail}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
      }
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
