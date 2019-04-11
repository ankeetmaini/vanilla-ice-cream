const Tabs = callback => {
  let state = {
    selectedTab: 0,
    headings: [],
    contents: []
  };

  const setState = args => {
    if (
      args.selectedTab !== undefined &&
      args.selectedTab !== state.selectedTab
    ) {
      setTimeout(() => callback(state.selectedTab), 0);
    }
    state = Object.assign({}, state, args);
    setTimeout(render, 0);
  };

  const setInitialState = () => {
    const headings = document.querySelectorAll(".tabs-header");
    const contents = document.querySelectorAll("div.tabs-content");
    setState({ headings, contents });
  };

  const registerClickHandler = () => {
    const headingContainer = document.querySelector("div.tabs-heading");
    headingContainer.addEventListener("click", e => {
      const children = [...headingContainer.children];
      children.forEach((c, i) => {
        if (c === e.target) setState({ selectedTab: i });
      });
    });
  };

  const render = () => {
    state.headings.forEach((h, i) => {
      if (state.selectedTab === i) {
        h.classList.add("selected-heading");
      } else {
        h.classList.remove("selected-heading");
      }
    });
    state.contents.forEach((c, i) => {
      if (state.selectedTab === i) {
        c.classList.add("selected-content");
      } else {
        c.classList.remove("selected-content");
      }
    });
  };
  (() => {
    setInitialState();
    registerClickHandler();
    // render tabs as per state
    render();
  })();
};

export default Tabs;
