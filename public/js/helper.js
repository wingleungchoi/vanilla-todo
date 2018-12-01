import { loadMorePage } from './eventListeners.js'

const MORE_NEWS_TR_ID = 'more-news-tr';

const timeAgo = (timeStamp) => {
  const secondsAgo = Math.floor(Date.now() / 1000) - timeStamp;
  if (secondsAgo <= 60) {
    return 'recently';
  }
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo <  60) {
    return `${minutesAgo} minute ago`;
  }
  if (minutesAgo === 60) {
    return `${minutesAgo} hour ago`;
  }
  const hoursAgo = Math.floor(minutesAgo / 60);
  if ( hoursAgo < 24 ) {
    return `${hoursAgo} hours ago`;
  };
  return 'old news is exciting!'
};

const extractHostname = (url) => {
  let hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2];
  }
  else {
    hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove '?'
  hostname = hostname.split('?')[0];

  return hostname;
}

const extractRootDomain = (url) => {
  if (typeof url !== 'string') { return ''};
  // credit: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
  let domain = extractHostname(url);
  const splitArr = domain.split('.');
  const arrLen = splitArr.length;

  //extracting the root domain here
  //if there is a subdomain 
  if (arrLen > 2) {
    domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
    //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. '.me.uk')
    if (splitArr[arrLen - 2].length === 2 && splitArr[arrLen - 1].length === 2) {
      //this is using a ccTLD
      domain = splitArr[arrLen - 3] + '.' + domain;
    }
  }
  return domain;
}

const createNewsTr = ({news, position}) => {
  const tr = document.createElement('tr');
  const innerHtml = `<td>
    <table border='0' cellpadding='0' cellspacing='0' class='itemlist'>
      <tbody>
        <tr class='athing' id='${news.id}'>
          <td align='right' valign='top' class='title'><span class='rank'>${position}.</span></td>
          <td valign='top' class='votelinks'>
            <center>
            <a id='up_${news.id}' href='https://news.ycombinator.com/vote?id=${news.id}&amp;how=up&amp;goto=news'>
              <div class='votearrow' title='upvote'></div>
            </a>
            </center>
          </td>
          <td class='title'>
            <a href='${news.url}' class='storylink'>
              ${news.title}
            </a>
            <span class='sitebit comhead'>
              (<a href='https://news.ycombinator.com/from?site=${extractRootDomain(news.url)}'>
                <span class='sitestr'>${extractRootDomain(news.url)}</span>
              </a>)
            </span>
          </td>
          </tr><tr>
          <td colspan='2'></td>
          <td class='subtext'><span class='score' id='score_${news.id}'>${news.score} points</span> by <a href='https://news.ycombinator.com/user?id=${news.by}' class='hnuser'>homarp</a> <span class='age'><a href='https://news.ycombinator.com/item?id=${news.id}'>${timeAgo(news.time)}</a></span> <span id='unv_${news.id}'></span> | <a href='https://news.ycombinator.com/hide?id=${news.id}&amp;goto=news'>hide</a> | <a href='https://news.ycombinator.com/item?id=${news.id}'>${news.descendants}&nbsp;comments</a>              </td></tr>
      </tbody>
    </table>
  </td>`;
  
  tr.innerHTML = innerHtml;
  return tr;
};

const createMoreTr = (oldPage) => {
  const newsPage = ((typeof oldPage === 'number') && oldPage >= 2) ? oldPage + 1 : 2;
  const tr = document.createElement('tr');
  tr.setAttribute('id', MORE_NEWS_TR_ID);
  tr.addEventListener('click', loadMorePage(newsPage));
  const innerHtml = `
  <td class="title">
    <a href="?p=${newsPage}" class="morelink" rel="nofollow">&nbsp; &nbsp; More</a>
  </td>`;
  tr.innerHTML = innerHtml;
  return tr;
}

const removeMoreTr  = () => {
  const tr = document.getElementById(MORE_NEWS_TR_ID)
  tr && tr.remove();
}

export {
  createMoreTr,
  createNewsTr,
  removeMoreTr
};
