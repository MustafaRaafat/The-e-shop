// Globale Variables
// Side Bar Left
const sideBar = document.querySelector(".add-hide");
// Toggle Button
const toggleButton = document.querySelector(".toggle-icon");
// Main Right
const mainRight = document.querySelector(".main-right");
// Input Nav Bar Search
const searchNav = document.querySelector(".nav-top .left .form input");
// Search Div
const searchDiv = document.querySelector(".nav-top .left .form .search-div");
// Side Bar Link Pages
const linkPages = document.querySelectorAll(".nav-left .nav-title");
// Side Bar Minue Pages
const menuPages = document.querySelectorAll(".nav-left .nav-title ul");
// Meida Quaries
const max992 = window.matchMedia("(max-width: 992px)");
const min993 = window.matchMedia("(min-width: 993px)");


//   if(max992.matches) {
//     sideBar.classList.add("hide");
//     mainRight.classList.add("main-width");
//     sideBar.style.zIndex = "99999999";
//   }else if(min993.matches) {
//     sideBar.classList.remove("hide");
//     mainRight.classList.remove("main-width");
//   }

// Side Bar Open Minue Pages
function openMenu() {
  for(const link of linkPages) {
    link.addEventListener("click", () => {
      for(const men of menuPages) {
        if(link.id === men.id) {
          men.classList.toggle("open");
        }
      }
    });
  }
}
openMenu();

// Toggle Side Bar
function toggleSideBar() {
  toggleButton.addEventListener("click", () => {
    sideBar.classList.toggle("hide");
    mainRight.classList.toggle("main-width");
  });
}
toggleSideBar();

// document.onresize(() => {
//   if(max992.matches) {
//     sideBar.classList.add("hide");
//     mainRight.classList.add("main-width");
//   }else if(min993.matches) {
//     sideBar.classList.remove("hide");
//     mainRight.classList.remove("main-width");
//   }
// })

// Toggle Sidebar When Press Escape
function escapeToToggleSideBar() {
  document.addEventListener("keydown", (e) => {
    if(max992.matches && e.key === "Escape"
        && sideBar.className.includes("hide")) {
        sideBar.classList.remove("hide");
      }
    });
}
escapeToToggleSideBar();

// Search Nav
  searchNav.addEventListener("focus", () => {
    searchDiv.style.display = "flex";
  });
  searchNav.addEventListener("blur", () => {
    searchDiv.style.display = "none";
  });

