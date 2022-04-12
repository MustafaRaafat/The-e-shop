// Globale Variables
// Side Bar Left
const sideBar = document.querySelector(".add-hide");
// Toggle Button
const toggleButton = document.querySelector(".toggle-icon");
// Main Right
const mainRight = document.querySelector(".main-right");
// Nav Bar Account
const account = document.querySelector(".nav-top .right .account");
// Nav Bar List Account
const listAccount = document.querySelector(".nav-top .right .list-account");
// Input Nav Bar Search
const searchNav = document.querySelector(".nav-top .left .form input");
// Search Div
const searchDiv = document.querySelector(".nav-top .left .form .search-div");
// Side Bar Link Pages
const linkPages = document.querySelectorAll(".nav-left .nav-title");
// Side Bar Link Nav Arrow
const navArrow = document.querySelectorAll(".nav-left .nav-link .nav-arrow");
// Side Bar Menu Pages
const menuPages = document.querySelectorAll(".nav-left .nav-title ul");
// Side Bar Menu Container
const menuContainer = document.querySelector(".simplebar-content-wrapper");
// Meida Quaries
const max992 = window.matchMedia("(max-width: 992px)");

// Stop Propagation
function stopPropagation(i) {
  i.onclick = function(e) {
    e.stopPropagation();
  }
}

// Close Items On Click Of Window
function toggleOnClick(i) {
  document.addEventListener("click", (e) => {
    if(e.target !== i && i.className.includes("show")){
      i.classList.toggle("show");
    }
  });
}

// Toggle Items On Click Of Item
function toggleList(e, i) {
  e.addEventListener("click", () => {
    i.classList.toggle("show");
  });
  stopPropagation(e)
  toggleOnClick(i)
}

// Toggle List Account
toggleList(account, listAccount);

// Hide Sidebar When Window Resize
window.addEventListener("resize", () => {
    if(max992.matches) {
      if(sideBar.className.includes("hide")
        || mainRight.className.includes("main-width")) {
          sideBar.classList.remove("hide");
          mainRight.classList.remove("main-width");
        }
    }
  });

// Side Bar Open Minue Pages
function openMenu() {
  for(const link of linkPages) {
    link.addEventListener("click", () => {
      for(const men of menuPages) {
        if(link.id === men.id) {
          men.classList.toggle("open");
        }
      }
      if(link.firstElementChild.lastElementChild.className.includes("nav-arrow")) {
        link.firstElementChild.lastElementChild.classList.toggle("arrow");
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

// Hide Sidebar When Press Escape
function escapeToHideSideBar() {
  document.addEventListener("keydown", (e) => {
    if(max992.matches && e.key === "Escape"
        && sideBar.className.includes("hide")) {
        sideBar.classList.remove("hide");
      }
    });
}
escapeToHideSideBar();

// Hide Sidebar When Click On Document
function clickToHideSideBar() {
  document.addEventListener("click", (e) => {
    if(max992.matches
      && e.target !== menuContainer
      && e.target !== toggleButton) {
        
      sideBar.classList.remove("hide");
    }
    });
    // Stop Propagation On Menu Container
    stopPropagation(menuContainer)
  }
  clickToHideSideBar();

// Search Nav
  searchNav.addEventListener("focus", () => {
    searchDiv.style.display = "flex";
  });

  document.addEventListener("click", (e) => {
    if(e.target !== searchNav
      && e.target !== searchDiv) {
        
        searchDiv.style.display = "none";
    }
    });

  // Stop Propagation On Search Div
    stopPropagation(searchDiv)
