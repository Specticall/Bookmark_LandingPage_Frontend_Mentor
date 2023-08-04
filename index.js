// Todo :
/*
3. Mobile nav menu
4. footer belom di tambahin highlight class.
*/

// Desktop Features Section Scroll
const feature_buttons = document.querySelector(
  ".features__buttons"
);
const feature_desktop_indicator = document.querySelector(
  ".desktop__indicator"
);
const feature_breakpoint = window.matchMedia(
  "(max-width:690px)"
);
const feature_tabs = document.querySelectorAll(
  ".features__tabbed"
);

feature_buttons.addEventListener(
  "click",
  tabbed_handler({})
);

// Initial run (so that the indicator will go to first option)
tabbed_handler({ isCallback: false });

function tabbed_handler({ isCallback = true }) {
  const initial = feature_buttons.children[0];

  function desktop_style(clicked, remove = false) {
    // Measurement stuff
    const element_width =
      clicked.getBoundingClientRect().width;
    const element_left =
      clicked.getBoundingClientRect().left;
    const container_left =
      feature_buttons.getBoundingClientRect().left;

    // Moves the indicator to the desired position
    feature_desktop_indicator.style.width = `${element_width}px`;
    feature_desktop_indicator.style.transform = `translateX(${
      (container_left - element_left) * -1
    }px)`;

    // Adds class that highlights the text
    clicked.classList.add("highlight-text");
  }

  function mobile_style(clicked, remove = false) {
    [...feature_buttons.children].forEach((btn) => {
      btn.classList.remove("highlight-text");
      btn.classList.remove("highlight-indicator");
    });

    if (remove) return;

    clicked.classList.add("highlight-text");
    clicked.classList.add("highlight-indicator");
  }

  // If its a call back then return a function else just run the function
  if (!isCallback) {
    feature_breakpoint.matches
      ? mobile_style(initial)
      : desktop_style(initial);
    return;
  }

  return function (e) {
    // Initial is for the initial function call (when page loads)
    const clicked = e.target || initial;

    // Resets the highlight text class
    [...feature_buttons.children].forEach((child) =>
      child.classList.remove("highlight-text")
    );

    feature_breakpoint.matches
      ? mobile_style(clicked)
      : desktop_style(clicked);

    switch_tab(clicked.dataset.tab);
  };
}

function switch_tab(destination) {
  feature_tabs.forEach((tab) => {
    tab.classList.add("features--hidden");
  });

  feature_tabs[destination].classList.remove(
    "features--hidden"
  );
}

// Screen size resize event listener
window.addEventListener("resize", () => {
  // If we're less than 690, then remove the listener, vice versa

  // Refresh the positions.
  tabbed_handler({
    isCallback: false,
  });

  // Remove instances of classes used for mobile viewport size
  if (!feature_breakpoint.matches)
    [...feature_buttons.children].forEach((btn) => {
      btn.classList.remove("highlight-text");
      btn.classList.remove("highlight-indicator");
    });
});

// Accordion
const accordion_wrappers = document.querySelectorAll(
  ".accordion-wrapper"
);
const accordion_container =
  document.querySelector(".accordion");
// const accordions =

accordion_container.addEventListener("click", (e) => {
  const clicked = e.target.closest(".accordion__block");

  if (!clicked) return;

  const faq_index = clicked.dataset.faq - 1;

  accordion_wrappers.forEach((wrapper) =>
    wrapper.classList.add("accordion--hidden")
  );

  accordion_wrappers[faq_index].classList.remove(
    "accordion--hidden"
  );
});

// Search Bar
const signup_input = document.querySelector(
  ".signup__input"
);
const signup_submit = document.querySelector(
  ".signup__submit"
);
const signup_container = document.querySelector(
  ".signup__input-container"
);

let countdown;
signup_submit.addEventListener("click", (e) => {
  e.preventDefault();

  const input_value = signup_input.value;

  // if input is NOT EMAIL, the display the wrong msg
  if (!input_isEmail(input_value)) {
    signup_container.classList.add("wrong-email");

    // Reset the countdown so that it doesn't overlap
    clearInterval(countdown);

    // Sets the countdown timer, after 1000ms, the popup disappears
    countdown = setTimeout(() => {
      signup_container.classList.remove("wrong-email");
    }, 4000);
  } else {
  }
});

function input_isEmail(input) {
  const regex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(input);
}

// Scroll Reveal
const sections = document.querySelectorAll(".section");
const images = document.querySelectorAll(".images");

function scroll_reveal(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("invisible");

    observer.unobserve(entry.target);
  });
}
const scroll_reveal_observer = new IntersectionObserver(
  scroll_reveal,
  { root: null, threshold: 0.2 }
);

sections.forEach((section) =>
  scroll_reveal_observer.observe(section)
);
images.forEach((image) =>
  scroll_reveal_observer.observe(image)
);

// Mobile Open navigation
const mobile_menu_toggle = document.querySelector(
  ".mobile_nav-button"
);

mobile_menu_toggle.addEventListener("click", function (e) {
  this.closest(".nav").classList.toggle("mobile-open");
});
