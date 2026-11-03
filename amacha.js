/* =============================================
   SITE CONFIG — Yahan apni asli details daalein
   ============================================= */

const SITE_CONFIG = {

  // ⚠️ WHATSAPP NUMBER — country code ke saath, bina + ya dash
  // Misal: Pakistan ke liye "923001234567"
  whatsapp: "923169419929",   // <-- APNA NUMBER YAHAN

  // Business email
  email: "machamarkhor888@gmail.com",  // <-- APNI EMAIL YAHAN

  // Social links (baad mein update karein)
  instagram: "https://instagram.com/",   // <-- APNA LINK
  facebook: "https://facebook.com/",    // <-- APNA LINK

  // Company info
  companyName: "Amacha Markhor Travel and Tour",
  location: "Gilgit-Baltistan, Pakistan",

};

/* =============================================
   Helper: WhatsApp link banayein
   Misal: waLink("Hunza tour ke baare mein poochna hai")
   ============================================= */
function waLink(message) {
  const num = SITE_CONFIG.whatsapp;
  const text = encodeURIComponent(message || "Hello! I’d like to inquire about Amacha Markhor’s tour packages.");
  return "https://wa.me/" + num + "?text=" + text;
}

/* =============================================
   MAIN JS — Menu, FAQ, back-to-top, scroll reveal
   ============================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. MOBILE MENU ---------- */
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      nav.classList.toggle("open");
      // icon change
      menuBtn.textContent = nav.classList.contains("open") ? "✕" : "☰";
    });
  }

  /* ---------- 2. FAQ ACCORDION ---------- */
  const faqQuestions = document.querySelectorAll(".faq-q");
  faqQuestions.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains("open");

      // Pehle sab band karo (ek waqt mein sirf ek khula)
      faqQuestions.forEach(function (otherBtn) {
        otherBtn.classList.remove("open");
        otherBtn.nextElementSibling.style.maxHeight = null;
      });

      // Agar ye pehle se band tha, to khol do
      if (!isOpen) {
        btn.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* ---------- 3. BACK TO TOP ---------- */
  const backBtn = document.querySelector(".back-top");
  if (backBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 500) {
        backBtn.classList.add("show");
      } else {
        backBtn.classList.remove("show");
      }
    });
    backBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 4. SCROLL REVEAL (halka fade-in) ---------- */
  const revealItems = document.querySelectorAll(".card, .tile, .exp-card");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealItems.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
  }

  /* ---------- 5. WHATSAPP BUTTONS (auto-link) ---------- */
  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    const msg = el.getAttribute("data-whatsapp") || "";
    el.href = waLink(msg);
    el.target = "_blank";
    el.rel = "noopener";
  });

});

  //  TOURS FILTER — Tours page ke liye

document.addEventListener("DOMContentLoaded", function () {

  const filterBtns = document.querySelectorAll(".filter-btn");
  const tourCards = document.querySelectorAll(".tour-item");

  if (filterBtns.length === 0) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {

      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      tourCards.forEach(function (card) {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });

    });
  });

});


  //  GALLERY LIGHTBOX

document.addEventListener("DOMContentLoaded", function () {

  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");

  if (!lightbox || galleryItems.length === 0) return;

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");

  let currentIndex = 0;
  const images = Array.from(galleryItems).map(function (item) {
    return item.querySelector("img").src;
  });

  // Image kholna
  function openImage(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex];
    lightbox.classList.add("open");
  }

  // Band karna
  function closeImage() {
    lightbox.classList.remove("open");
  }

  // Next / Prev
  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
  }
  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  // Click listeners
  galleryItems.forEach(function (item, i) {
    item.addEventListener("click", function () { openImage(i); });
  });
  closeBtn.addEventListener("click", closeImage);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  // Keyboard support
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeImage();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

  // Background pe click karne se band
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeImage();
  });

});


/* =============================================
   FORM VALIDATION + WhatsApp submit
   Koi backend nahi — form submit hone pe
   WhatsApp khulta hai pre-filled message ke saath.
   ============================================= */

document.addEventListener("DOMContentLoaded", function () {

  // Sirf wo forms pakro jinpe data-wa-form="" laga hai
  const forms = document.querySelectorAll("form[data-wa-form]");

  forms.forEach(function (form) {

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;

      // Har required input check karo
      form.querySelectorAll("[required]").forEach(function (input) {
        const group = input.closest(".form-group");
        const errorEl = group ? group.querySelector(".form-error") : null;

        // Pehle purane error clear karo
        if (group) group.classList.remove("error");
        if (errorEl) errorEl.textContent = "";

        const value = input.value.trim();

        if (value === "") {
          if (group) group.classList.add("error");
          if (errorEl) errorEl.textContent = "Ye field zaroori hai";
          isValid = false;
        } else if (input.type === "email" && !isValidEmail(value)) {
          if (group) group.classList.add("error");
          if (errorEl) errorEl.textContent = "Sahi email address likhein";
          isValid = false;
        } else if (input.type === "tel" && !isValidPhone(value)) {
          if (group) group.classList.add("error");
          if (errorEl) errorEl.textContent = "Sahi phone number likhein";
          isValid = false;
        }
      });

      if (!isValid) return;

      // Form ki values ko message mein convert karo
      const formData = new FormData(form);
      let message = "Assalam-o-Alaikum! Website se inquiry bhej raha hoon:\n\n";
      formData.forEach(function (value, key) {
        if (value.toString().trim() !== "") {
          message += key + ": " + value + "\n";
        }
      });

      // WhatsApp khulo
      window.open(waLink(message), "_blank");

      // Success message dikhao
      let success = form.querySelector(".form-success");
      if (!success) {
        success = document.createElement("div");
        success.className = "form-success";
        form.appendChild(success);
      }
      success.textContent = "Shukriya! WhatsApp khul gaya hai — wahan 'Send' dabakar inquiry complete karein.";
      success.classList.add("show");

      form.reset();
    });

  });

  // Email check
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Phone check (kam se kam 7 digits)
  function isValidPhone(phone) {
    return /[0-9]{7,}/.test(phone.replace(/[\s\-\(\)]/g, ""));
  }

});