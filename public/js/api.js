function makeRequest (method, url) {
  // credit: https://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

const fetchHackerNews = async (topNewsStore, page) => {
  if (topNewsStore.length >= page * 30) {
    // no need to fetch as news in topNewsStore matches page requirement
    return [];
  }
  const topStoryIdsInString = await makeRequest('GET', 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
  const topStoryIds = JSON.parse(topStoryIdsInString).slice(topNewsStore.length, page * 30);
  
  const topStories = await Promise.all(topStoryIds.map(async (topStoryId) => {
    const topStoryInString = await makeRequest('GET', `https://hacker-news.firebaseio.com/v0/item/${topStoryId}.json?print=pretty`);
    const topStory = JSON.parse(topStoryInString);
    return topStory
  }));
  return topStories;
};

export {
  fetchHackerNews
};
