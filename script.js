const menuButton = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Open or close the mobile menu
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";

  menuButton.setAttribute("aria-expanded", !isOpen);
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Open navigation" : "Close navigation"
  );

  navMenu.classList.toggle("open", !isOpen);
});

// Close the menu after clicking a navigation link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  });
});

// Close the menu when returning to desktop width
window.addEventListener("resize", () => {
  if (window.innerWidth > 700) {
    navMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  }
});

/* ===== SELECTED WORK: FILTERS ===== */

const workCards = document.querySelectorAll(".work-card");
const filterButtons = document.querySelectorAll(".work-filter");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    button.classList.add("active");

    workCards.forEach(function (card) {
      const category = card.dataset.category;

      if (selectedFilter === "all" || category === selectedFilter) {
        card.hidden = false;
      } else {
        card.hidden = true;
      }
    });
  });
});


/* ===== PROJECT DETAILS POPUP ===== */

const projectModal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalType = document.getElementById("modalType");
const modalStatus = document.getElementById("modalStatus");
const modalLink = document.getElementById("modalLink");

const projectDetails = {
  wt20: {
    title: "WT20 Cricket Website",
    description:
      "A cricket website built as part of my web development journey. Explore the live project to see the current implementation.",
    type: "Web Development",
    status: "Live",
    link: "https://s4njeev-mukhiy4.github.io/WT20/"
  },

  project02: {
    title: "Project Two",
    description:
      "This project is currently being developed. The final concept, screenshots and details will be added as the work progresses.",
    type: "Web Development",
    status: "In Progress",
    link: ""
  },

  project03: {
    title: "Project Three",
    description:
      "An upcoming web project exploring layout, interaction and visual design. More details will be added when the project is ready.",
    type: "Web Development",
    status: "In Progress",
    link: ""
  },

  video01: {
    title: "Visual Stories",
    description:
      "A placeholder for my video editing work. Actual video samples and editing details will be added later.",
    type: "Video Editing",
    status: "In Progress",
    link: ""
  }
};

let previousFocus = null;

function openProject(projectId) {
  const project = projectDetails[projectId];

  if (!project || !projectModal) {
    return;
  }

  previousFocus = document.activeElement;

  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalType.textContent = project.type;
  modalStatus.textContent = project.status;

  if (project.link) {
    modalLink.href = project.link;
    modalLink.hidden = false;
  } else {
    modalLink.hidden = true;
    modalLink.removeAttribute("href");
  }

  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  projectModal.querySelector(".modal-close").focus();
}

function closeProject() {
  if (!projectModal) {
    return;
  }

  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (previousFocus) {
    previousFocus.focus();
  }
}

workCards.forEach(function (card) {
  card.addEventListener("click", function () {
    openProject(card.dataset.project);
  });

  card.addEventListener("keydown", function (event) {
    if (event.target !== card) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(card.dataset.project);
    }
  });
});

document.querySelectorAll("[data-close-modal]").forEach(function (element) {
  element.addEventListener("click", closeProject);
});

document.addEventListener("keydown", function (event) {
  if (
    event.key === "Escape" &&
    projectModal.classList.contains("open")
  ) {
    closeProject();
  }
});


/* ===== SCROLL REVEAL ===== */

if ("IntersectionObserver" in window) {
  const workObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          workObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  workCards.forEach(function (card) {
    workObserver.observe(card);
  });
} else {
  workCards.forEach(function (card) {
    card.classList.add("is-visible");
  });
}

/* ===== SKILLS SCROLL REVEAL ===== */

const skillCards = document.querySelectorAll(".skill-card");

if ("IntersectionObserver" in window) {
  const skillObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          skillObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  skillCards.forEach(function (card) {
    skillObserver.observe(card);
  });
} else {
  skillCards.forEach(function (card) {
    card.classList.add("is-visible");
  });
}

/* VIDEO EDITING PLAYER */

const videoCards = document.querySelectorAll(".video-edit-card");
const videoModal = document.getElementById("videoModal");
const activeVideo = document.getElementById("activeVideo");


function openVideo(card) {
  const source = card.dataset.video;

  if (!source || !videoModal || !activeVideo) return;

  activeVideo.src = source;

  videoModal.classList.add("is-open");
  videoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeVideo() {
  if (!videoModal || !activeVideo) return;

  // Stop the video when the popup closes
  activeVideo.src = "";

  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}


function closeVideo() {
  if (!videoModal || !activeVideo) return;

  activeVideo.pause();
  activeVideo.removeAttribute("src");
  activeVideo.load();

  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

videoCards.forEach((card) => {
  card.addEventListener("click", () => openVideo(card));

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openVideo(card);
    }
  });
});

document.querySelectorAll("[data-video-close]").forEach((button) => {
  button.addEventListener("click", closeVideo);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && videoModal?.classList.contains("is-open")) {
    closeVideo();
  }
});
