import { fetchHackerNews } from './api.js'
import { createMoreTr, createNewsTr, removeMoreTr } from './helper.js';

window.topNewsStore = [];

const getPageParams = () => {
  const params = (new URL(document.location)).searchParams;
  return params.get("p") || 1;
}

const loadAndShowNews = async (topNewsStore, page) => {
  const topNews = await fetchHackerNews(topNewsStore, page);
  
  const hnMainTableBody = document.getElementById('hnmain-table-body');
  const hackerNewsLinksRow = document.getElementById('hacker-news-more-row');
  topNews.forEach((news, index) => {
    const position = window.topNewsStore.length + index + 1;
    const tr = createNewsTr({news, position });
    hnMainTableBody.insertBefore(tr, hackerNewsLinksRow);
  });
  removeMoreTr();
  const moreTr = createMoreTr(page);
  hnMainTableBody.insertBefore(moreTr, hackerNewsLinksRow);
  window.topNewsStore = topNewsStore.concat(topNews);
};

const ready = async () => {
  const initialPage = getPageParams();
  await loadAndShowNews(window.topNewsStore, Number(initialPage));
};

document.addEventListener('DOMContentLoaded', ready);
document.addEventListener('vanilla-load-more-page', async () => {
  const page = getPageParams();
  await loadAndShowNews(window.topNewsStore, Number(page));
});
