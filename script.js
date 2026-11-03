/* ==========================================================================
   UTS Pemrograman Web Dasar - Soal 03 (JavaScript native, tanpa library)
   Opsi 1: Hamburger button pada navbar <nav>.
   Logika: tombol kecil tampil di layar sempit, klik untuk membuka/menutup menu.
   ========================================================================== */

(function () {
  "use strict";

  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  const label = toggle.querySelector(".visually-hidden");

  if (!nav || !toggle || !menu) {
    return;
  }

  // Batas harus sama dengan media query di styles.css (860px).
  const mediaKecil = window.matchMedia("(max-width: 860px)");

  function terbuka() {
    return nav.classList.contains("is-open");
  }

  function tutup() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    label.textContent = "Buka menu";
  }

  function buka() {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    label.textContent = "Tutup menu";
  }

  toggle.addEventListener("click", function (event) {
    event.stopPropagation();
    terbuka() ? tutup() : buka();
  });

  // Menu ditutup setelah tautan dipilih supaya layar tetap rapi.
  menu.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      tutup();
    }
  });

  // Tutup saat tombol Esc ditekan atau saat klik terjadi di luar menu.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && terbuka()) {
      tutup();
      toggle.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (terbuka() && !event.target.closest("#site-nav")) {
      tutup();
    }
  });

  // Kalau layar kembali lebar (melewati breakpoint), kembalikan ke menu horizontal.
  const saatBerubah = function () {
    if (!mediaKecil.matches) {
      tutup();
    }
  };

  if (typeof mediaKecil.addEventListener === "function") {
    mediaKecil.addEventListener("change", saatBerubah);
  } else {
    mediaKecil.addListener(saatBerubah); // Dukungan browser versi lama.
  }
})();
