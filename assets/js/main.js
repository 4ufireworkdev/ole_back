let member = sessionStorage.getItem('token');
$(document).ready(function () {
    if (!member) {
        window.location.href = '../login.html';
    }else{
      document.getElementById('user_username').innerHTML = sessionStorage.getItem("name");
      document.getElementById('user_role').innerHTML = sessionStorage.getItem("role");
      document.getElementById('user_profile').innerHTML = (sessionStorage.getItem("name")).substring(0,1);
    }
});


const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarBackdrop = document.querySelector(".sidebar-backdrop");
const sidebarLinks = document.querySelectorAll(".sidebar__link");

function openSidebar() {
  if (!sidebar) return;
  sidebar.classList.add("sidebar--open");
  document.body.classList.add("sidebar-open");
}

function closeSidebar() {
  if (!sidebar) return;
  sidebar.classList.remove("sidebar--open");
  document.body.classList.remove("sidebar-open");
}

if (sidebar && sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    if (sidebar.classList.contains("sidebar--open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });
}

if (sidebar && sidebarLinks.length) {
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        closeSidebar();
      }
    });
  });
}

if (sidebarBackdrop) {
  sidebarBackdrop.addEventListener("click", () => {
    closeSidebar();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSidebar();
  }
});

// User dropdown
const topbarUser = document.querySelector(".topbar__user");
if (topbarUser) {
  topbarUser.addEventListener("click", () => {
    topbarUser.classList.toggle("topbar__user--open");
  });

  document.addEventListener("click", (e) => {
    if (!topbarUser.contains(e.target)) {
      topbarUser.classList.remove("topbar__user--open");
    }
  });
}

// Dark mode
const themeToggle = document.getElementById("themeToggle");
const prefersDark =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const storedTheme = localStorage.getItem("olehome-admin-theme");

function applyTheme(mode) {
  if (mode === "dark") {
    document.body.classList.add("theme-dark");
  } else {
    document.body.classList.remove("theme-dark");
  }
  if (themeToggle) {
    const span = themeToggle.querySelector(".theme-toggle__icon");
    if (span) {
      span.textContent = document.body.classList.contains("theme-dark")
        ? span.dataset.themeLight || "☀️"
        : span.dataset.themeDark || "🌙";
    }
  }
}

applyTheme(storedTheme || (prefersDark ? "dark" : "light"));

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextMode = document.body.classList.contains("theme-dark") ? "light" : "dark";
    applyTheme(nextMode);
    localStorage.setItem("olehome-admin-theme", nextMode);
  });
}


async function logout(){
  Swal.fire({
    title: "แจ้งเตือน",
    text: "คุณต้องการที่จะออกจากระบบหรือไม่ ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#28a745",
    cancelButtonColor: "#d33",
    confirmButtonText: "Logout",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("แจ้งเตือน", "ออกจากระบบเรียบร้อยแล้ว", "success").then(
        (result) => {
          if (result.value) {
            sessionStorage.removeItem("token");
            window.location.href = "../login.html";
          }
        }
      );
    }
  });
}