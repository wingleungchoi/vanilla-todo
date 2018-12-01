import { createNewsTr } from './helper.js';

const ready = () => {
  const tr = createNewsTr();
  
  const hnMainTableBody = document.getElementById('hnmain-table-body');
  const hackerNewsLinksRow = document.getElementById('hacker-news-links-row');
  hnMainTableBody.insertBefore(tr, hackerNewsLinksRow);
};

document.addEventListener('DOMContentLoaded', ready);
