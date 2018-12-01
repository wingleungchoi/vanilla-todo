import { createNewsTr } from './helper.js';
import { fetchHackerNews } from './api.js'

const ready = async () => {
  const topNews = await fetchHackerNews();
  console.log('topNews', topNews);
  
  const hnMainTableBody = document.getElementById('hnmain-table-body');
  const hackerNewsLinksRow = document.getElementById('hacker-news-links-row');
  topNews.forEach((news, index) => {
    const tr = createNewsTr({news, position: (index + 1)});
    hnMainTableBody.insertBefore(tr, hackerNewsLinksRow);
  });
};

document.addEventListener('DOMContentLoaded', ready);
