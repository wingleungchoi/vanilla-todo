const loadMorePage = (page) => (event) => {
  const url = window.location.href.split('?')[0];
  history.pushState({}, 'Hacker News', `${url}?p=${page}`);
  event.preventDefault();
  const vanillaEvent = new Event('vanilla-load-more-page');
  document.dispatchEvent(vanillaEvent);
}

export {
  loadMorePage
}
