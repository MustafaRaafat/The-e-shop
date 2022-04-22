// Globale Variables
// Side Bar Left
const sideBar = document.querySelector(".add-hide");
// Toggle Button
const toggleButton = document.querySelector(".toggle-icon");
// Main Right
const mainRight = document.querySelector(".main-right");
// Search Icon Right
const searchIconRight = document.querySelector(".nav-top .right .search-icon-right i");
// Show Input Search
const showInputSearch = document.querySelector(".nav-top .left .form-container");
// Nav Bar Account
const account = document.querySelector(".nav-top .right .account");
// Nav Bar List Account
const listAccount = document.querySelector(".nav-top .right .list-account");
// Form Nav Bar Search
const searchForm = document.querySelector(".nav-top .left .form");
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



// search()
const search = () => {
  const searchBox = document.getElementById("search-item").value.toUpperCase();
  const storeitems = document.getElementById("product-list");
  const storeArr = Array.from(storeitems);
  // console.log(storeArr);
  const product = document.querySelectorAll(".product");
  const pname = document.getElementsByTagName('h2');
  // console.log(pnameArr[0]);
  for(const name of pname) {
    console.log(name)
    // console.log(name.parentElement)
    // let match = product[name];
    // if(searchBox) {
    //   // console.log(searchBox)
    //   if(name.innerHTML.toUpperCase().includes(searchBox)) {
    //     // storeitems.innerHTML = name.parentElement.innerHTML;
    //     console.log(name.parentElement.innerHTML)
        
    //   }else {
    //     console.log(storeitems.innerHTML)
    // //   storeitems.innerHTML;
    // //   // name.style.display = "";
    // }
    //   // name.style.display = "";

    // }
    // console.log(storeArr)
    // name.innerHTML.toUpperCase().includes(searchBox) ? storeitems.appendChild(name) : storeitems;
    // console.log(name.innerHTML.toUpperCase().includes(searchBox) ? name : "")
    // if(match) {
    //   let textValue = match.textContent || match.innerHTML;
    //   if(textValue.toUpperCase().indexOf(searchBox) > -1) {
    //     product[name].style.display = "";
    //   }else {
    //   product[name].style.display = "none";
    // }
  }
  // console.log(searchBox);
  // console.log(storeitems);
  // console.log(product);
  // console.log(pname);
}





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

// Search Nav
function openSearchDivOnFocus() {
  searchNav.addEventListener("focus", () => {
    searchDiv.style.display = "flex";
  });
}
openSearchDivOnFocus();

document.addEventListener("click", (e) => {
  if(e.target !== searchNav
    && e.target !== searchDiv
    && e.target !== searchIconRight) {
      searchDiv.style.display = "none";
  }
  });

// Stop Propagation On Search Div
  stopPropagation(searchDiv)

// Toggle Input Search
function showSearchInput() {
  searchIconRight.addEventListener("click", () => {
    showInputSearch.classList.add("show");
    searchNav.focus();
  })
}
showSearchInput();

// Hide Search Input When Press Escape
function escapeToHideSearchInput() {
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"
        && showInputSearch.className.includes("show")) {
          showInputSearch.classList.remove("show");
      }
    });
}
escapeToHideSearchInput();

// Hide Search Input When Click On Document
function clickToHideSearchInput() {
  window.addEventListener("click", (e) => {
    if(e.target !== searchIconRight
      && e.target !== searchForm) {
        
        showInputSearch.classList.remove("show");
    }
    });
    // Stop Propagation On Menu Container
    stopPropagation(searchForm)
  }
  clickToHideSearchInput();

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

