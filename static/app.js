let next = document.getElementById("next");
let previous = document.getElementById("previous");
let coroImages = document.getElementsByClassName("corousel_Img");
let positioLog = document.getElementsByClassName("counter");
let projectTitle = document.getElementById("project_title");
let projectDesc = document.getElementById("project_desc");
let clickCount = 0;

const projectData = [
  { title: "ATM Management System", desc: "atm-management-system is a console-based application written in C that allows users to manage their accounts through functionalities such as account creation, updating account details, checking account information, making transactions, and transferring account ownership.", stack: "C, makefile, CLI app", feat: "User Registration & Login\nAccount Creation & Updates\nView Account Details\nList User Accounts\nDeposit & Withdraw Funds\nDelete Account\nTransfer Account Ownership", github: "" },
  { title: "Bandify", desc: "Description for Project 2 goes here." },
  { title: "Wget Mimic", desc: "Description for Project 3 goes here." },
  { title: "Alpha-Beta", desc: "Description for Project 4 goes here." }
];

function updateCarousel() {
  // Update images
  for (let i = 0; i < coroImages.length; i++) {
    coroImages[i].classList.remove("active");
  }
  coroImages[clickCount].classList.add("active");

  // Update project details
  projectTitle.innerText = projectData[clickCount].title;
  projectDesc.innerText = projectData[clickCount].desc;
  for (let i = 0; i < positioLog.length; i++) {
    positioLog[i].innerHTML = "○";
  }
  positioLog[clickCount].innerHTML = "●";
}

next.onclick = () => {
  clickCount = (clickCount + 1) % coroImages.length;
  updateCarousel();
};

previous.onclick = () => {
  clickCount = (clickCount - 1 + coroImages.length) % coroImages.length;
  updateCarousel();
};

// Initialize the carousel with the first image and project details
updateCarousel();

// setInterval(() => {
//   clickCount = (clickCount + 1) % coroImages.length;
//   updateCarousel();
// }, 6000);