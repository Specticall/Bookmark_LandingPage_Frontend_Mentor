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
let previous_handler = tabbed_handler({
  type: feature_breakpoint.matches ? "mobile" : "desktop",
});

feature_buttons.addEventListener(
  "click",
  tabbed_handler({
    type: feature_breakpoint.matches ? "mobile" : "desktop",
  })
);

// Initial run (so that the indicator will go to first option)
tabbed_handler({
  type: feature_breakpoint.matches ? "mobile" : "desktop",
  isCallback: false,
});

function tabbed_handler({ type, isCallback = true }) {
  const initial = feature_buttons.children[0];

  function desktop_style(clicked) {
    console.log("desktop");
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

  function mobile_style(clicked) {
    console.log("mobile");
    [...feature_buttons.children].forEach((btn) => {
      btn.classList.remove("highlight-text");
      btn.classList.remove("highlight-indicator");
    });

    clicked.classList.add("highlight-text");
    clicked.classList.add("highlight-indicator");
  }

  // If its a call back then return a function else just run the function
  if (isCallback) {
    feature_breakpoint.matches
      ? mobile_style(initial)
      : desktop_style(initial);
  } else {
    return;
  }

  return function (e) {
    // Initial is for the initial function call (when page loads)
    const clicked = e.target || initial;

    // Resets the highlight text class
    [...feature_buttons.children].forEach((child) =>
      child.classList.remove("highlight-text")
    );

    if (type === "mobile") mobile_style(clicked);
    if (type === "desktop") desktop_style(clicked);
  };
}

// Screen size resize event listener
window.addEventListener("resize", () => {
  // If we're less than 690, then remove the listener, vice versa
  //prettier-ignore
  // feature_buttons.addEventListener("click",   tabbed_handler({
  //   type: feature_breakpoint.matches ? "mobile" : "desktop",
  // }))

  //prettier-ignore
  feature_buttons.removeEventListener("click",   tabbed_handler({
    type: feature_breakpoint.matches ? "desktop" : "mobile",
  }));

  tabbed_handler({
    type: feature_breakpoint.matches ? "mobile" : "desktop",
    isCallback: false,
  });
});
