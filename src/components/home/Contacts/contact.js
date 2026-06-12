// ─────────────────────────────────────────────
// Scroll Animation
// ─────────────────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
      }
    });
  },
  { threshold: 0.1 }
);

fadeEls.forEach((el) => observer.observe(el));


// ─────────────────────────────────────────────
// EmailJS Configuration
// ─────────────────────────────────────────────
// const PUBLIC_KEY = "y9t1GNlWsACUYft99";
// const SERVICE_ID = "service_pgtk07u";
// const TEMPLATE_ID = "template_ppw603t";

// const btn = document.getElementById("sendBtn");
// const btnText = document.getElementById("btnText");
// const btnIcon = document.getElementById("btnIcon");

// let isSending = false;


// ─────────────────────────────────────────────
// Utility Functions
// ─────────────────────────────────────────────
// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// function loadScript(src) {
//   return new Promise((resolve, reject) => {
//     const existing = document.querySelector(`script[src="${src}"]`);

//     if (existing) {
//       resolve();
//       return;
//     }

//     const script = document.createElement("script");
//     script.src = src;

//     script.onload = resolve;
//     script.onerror = reject;

//     document.head.appendChild(script);
//   });
// }


// ─────────────────────────────────────────────
// Toast
// ─────────────────────────────────────────────
// function showToast(message, type = "success") {
//   const toast = document.getElementById("toast");

//   toast.textContent = message;
//   toast.className = `toast show ${type}`;

//   setTimeout(() => {
//     toast.className = "toast";
//   }, 4000);
// }


// ─────────────────────────────────────────────
// Button States
// ─────────────────────────────────────────────
// function setProcessing() {
  // btn.disabled = true;

//   if (btnIcon) btnIcon.style.display = "none";

//   btnText.textContent = "Sending...";
// }

// function setSuccess() {
//   btnText.textContent = "Message Sent ✓";

//   setTimeout(() => {
//     resetButton();
//   }, 3000);
// }

// function resetButton() {
//   btn.disabled = false;

//   if (btnIcon) btnIcon.style.display = "inline";

//   btnText.textContent = "Send Message";

//   isSending = false;
// }


// ─────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────
function validate() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name) {
    alert("Please enter your name.", "error");
    return null;
  }

  if (
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    alert("Please enter a valid email address.", "error");
    return null;
  }

  if (!subject) {
    alert("Please enter a subject.", "error");
    return null;
  }

  if (!message) {
    alert("Please enter a message.", "error");
    return null;
  }

  return {
    name,
    email,
    subject,
    message,
  };
}


// ─────────────────────────────────────────────
// Clear Form
// ─────────────────────────────────────────────
function clearFields() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("message").value = "";
}


// ─────────────────────────────────────────────
// EmailJS Initialization
// ─────────────────────────────────────────────
// async function initEmailJS() {
//   try {
//     if (!window.emailjs) {
//       await loadScript(
//         "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
//       );
//     }

//     emailjs.init({
//       publicKey: PUBLIC_KEY,
//     });

//     console.log("EmailJS initialized");
//   } catch (error) {
//     console.error("Failed to load EmailJS:", error);
//     alert("Failed to load email service.", "error");
//   }
// }


// ─────────────────────────────────────────────
// Send Email
// ─────────────────────────────────────────────
// async function handleSend(event) {
//   if (event) event.preventDefault();

//   if (isSending) return;

//   const data = validate();

//   if (!data) return;

//   isSending = true;
//   setProcessing();

//   try {
//     const response = await emailjs.send(
//       SERVICE_ID,
//       TEMPLATE_ID,
//       {
//         from_name: data.name,
//         from_email: data.email,
//         subject: data.subject,
//         message: data.message,
//         reply_to: data.email,
//       }
//     );

//     console.log("Email Sent:", response);

//     setSuccess();

//     alert(
//       "Your message has been sent successfully!",
//       "success"
//     );

//     clearFields();
//   } catch (error) {
//     console.error("EmailJS Error:", error);

//     alert(
//       "Failed to send message. Please try again.",
//       "error"
//     );

//     resetButton();
//   }
// }


// ─────────────────────────────────────────────
// Initialize Everything
// ─────────────────────────────────────────────
// document.addEventListener("DOMContentLoaded", async () => {
//   await initEmailJS();

//   if (btn) {
//     btn.addEventListener("click", handleSend);
//   }
// });