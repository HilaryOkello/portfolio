const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})

let next = document.getElementById("next");
let previous = document.getElementById("previous");
let imagesContainer = document.getElementById("images");
let positioLog = document.getElementsByClassName("counter");
let projectTitle = document.getElementById("project_title");
let projectDesc = document.getElementById("project_desc");
let projectStack = document.getElementById("project_stack");
let projectLink = document.getElementById("project_link");
let clickCount = 0;

const projectData = [
  {
    title: "Atm Management System",
    desc: "Atm-management-system is a CLI application written in C that allows users to manage their accounts through functionalities such as account creation, updating account details, checking account information, making transactions, and transferring account ownership.", stack: "C, makefile, CLI app", feat: "User Registration & Login\nAccount Creation & Updates\nView Account Details\nList User Accounts\nDeposit & Withdraw Funds\nDelete Account\nTransfer Account Ownership",
    img: "/static/atm-management-system.png",
    stack: "<strong>Stack:</strong><br>Vanilla C",
    github: "https://github.com/HilaryOkello/atm-management-system"
  },
  {
    title: "Artists Tracker",
    desc: "Artists Tracker is a web application that fetches artists' details from various APIs and presents it in an engaging and accessible manner. The application allows users to track their favorite music groups and view their past and upcoming concerts' dates and locations.",
    img: "/static/artists-tracker.png",
    stack: "<strong>Stack:</strong><br>Go, JavaScript, APIs, Docker",
    github: "https://github.com/HilaryOkello/bandify"
  },
  {
    title: "Wget Mimic",
    desc: "wget is a command-line program written in Go that seeks to replicate the functionality of the free, open source tool, wget, used to retrieve content from web servers. It supports HTTP and HTTPS protocols.",
    img: "/static/wget-mimic.png",
    stack: "Vanilla Go, Docker",
    github: "https://github.com/HilaryOkello/dow"
  },
  {
    title: "Alpha-Beta: A Vaccine Tracking System",
    desc: "This project is a platform designed to track the distribution and administration of vaccines from the manufacturer to the patient, leveraging blockchain for transparency and Go APIs for data integration and analytics. ",
    img: "/static/alpha-beta.png",
    stack: "<strong>Stack:</strong><br>Go, Javascript",
    github: "https://github.com/HilaryOkello/alpha-beta"
  }
];

function updateCarousel() {
  // Update the image
  imagesContainer.innerHTML = ""; // Clear existing image
  const img = document.createElement("img");
  img.classList.add("corousel_Img");
  img.src = projectData[clickCount].img;
  img.alt = projectData[clickCount].title;
  img.classList.add("active");
  imagesContainer.appendChild(img);

  // Update project details
  projectTitle.innerText = projectData[clickCount].title;
  projectDesc.innerText = projectData[clickCount].desc;
  projectStack.innerHTML = projectData[clickCount].stack;
  projectLink.setAttribute("href", projectData[clickCount].github)
  for (let i = 0; i < positioLog.length; i++) {
    positioLog[i].innerHTML = "○";
  }
  positioLog[clickCount].innerHTML = "●";
}

// Carousel controls
next.onclick = () => {
  clickCount = (clickCount + 1) % projectData.length;
  updateCarousel();
};

previous.onclick = () => {
  clickCount = (clickCount - 1 + projectData.length) % projectData.length;
  updateCarousel();
};

// Swipe functionality for mobile
let startX = 0;

imagesContainer.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

imagesContainer.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const diffX = startX - endX;

  if (diffX > 50) {
    clickCount = (clickCount + 1) % projectData.length;
    updateCarousel();
  } else if (diffX < -50) {
    clickCount = (clickCount - 1 + projectData.length) % projectData.length;
    updateCarousel();
  }
});

updateCarousel();

// Array of logo file paths
const logos = [
  'static/go.svg',
  'static/javascript.svg',
  'static/docker.svg',
  'static/mysql.svg',
  'static/php.png',
  'static/git.svg',
  'static/vscode.svg',
  
];

const skillsLogoContainer = document.querySelector('.skills-logo');

logos.forEach(logoPath => {
    const img = document.createElement('img');
    img.src = logoPath;
    img.alt = 'Programming Language Logo';
    skillsLogoContainer.appendChild(img);
});
