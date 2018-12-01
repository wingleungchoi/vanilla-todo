const createNewsTr = () => {
  const tr = document.createElement('tr');
  const innerHtml = `<td>
    <table border="0" cellpadding="0" cellspacing="0" class="itemlist">
      <tbody>
        <tr class="athing" id="18568682">
          <td align="right" valign="top" class="title"><span class="rank">1.</span></td>
          <td valign="top" class="votelinks"><center><a id="up_18568682" href="https://news.ycombinator.com/vote?id=18568682&amp;how=up&amp;goto=news"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://itnext.io/benchmark-results-of-kubernetes-network-plugins-cni-over-10gbit-s-network-36475925a560" class="storylink">Benchmark results of Kubernetes network plugins (CNI) over 10Gbit/s network</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=itnext.io"><span class="sitestr">itnext.io</span></a>)</span></td></tr><tr><td colspan="2"></td>
            <td class="subtext"><span class="score" id="score_18568682">63 points</span> by <a href="https://news.ycombinator.com/user?id=homarp" class="hnuser">homarp</a> <span class="age"><a href="https://news.ycombinator.com/item?id=18568682">3 hours ago</a></span> <span id="unv_18568682"></span> | <a href="https://news.ycombinator.com/hide?id=18568682&amp;goto=news">hide</a> | <a href="https://news.ycombinator.com/item?id=18568682">19&nbsp;comments</a>              </td></tr>
      </tbody>
    </table>
  </td>`;
  
  tr.innerHTML = innerHtml;
  return tr;
};

export {
  createNewsTr
};
