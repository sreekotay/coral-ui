
// ============================
// our article
// ============================
coral.ui.register('*article', {
  state: {
    datasrc: 'state.articledata.article',
    articledata: { article: { title: '&nbsp;test', author: { username: '&nbsp;', image: ' ' }, body: ' ', favoritesCount: 0 } },
    commentsdata: null,
    taglist: null
  },
  bind: {
    resource: { selector: '[coral=switcher]' } //  same as: coral-s-resource="~~[coral=switcher]"
  },
  observers: {
    articledata: function () {
      if (this.state.articledata) this.state.taglist = this.state.articledata.article.tagList
    },
    resource: function (updates) { 
      if (updates.value) {
        this.bind('state.articledata', '$json$' + baseurl + '/articles/' + this.state.resource) 
        this.bind('state.commentsdata', '$json$' + baseurl + '/articles/' + this.state.resource + '/comments')
      }
    }
  }
})

coral.ui.register('*article-comments', {
  state: {
    datasrc: 'state.commentsdata.comments',
  },
  bind: {
    commentsdata: { selector: '[coral=article]' } //  same as: coral-s-tag="~~[coral=switcher]"
  }
})

if (!window.marked) window.marked = function(s) { return s }
coral.ui.loadScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js', function () {
  console.log ('marked')
  var ui = coral.ui.find('[coral=article]')
  if (ui) ui.render() // let's us load in parallel
})
coral.ui.clientSideInclude(function (d) { /*
<div class="article-page" coral=article>
  <script type=coral-template(d)>
  <div>
  <div class="banner" >
    <div class="container">

      <h1>${d.title}</h1>

      <div class="article-meta">
        <a href=""><img src="${d.author.image}" /></a>
        <div class="info">
          <a href="" class="author">${d.author.username}</a>
          <span class="date">${fdate(d.createdAt)}</span>
        </div>
        <button class="btn btn-sm btn-outline-secondary">
          <i class="ion-plus-round"></i>
          &nbsp;
          Follow ${d.author.username} <span class="counter">(${d.favoritesCount})</span>
        </button>
        &nbsp;&nbsp;
        <button class="btn btn-sm btn-outline-primary">
          <i class="ion-heart"></i>
          &nbsp;
          Favorite Post <span class="counter">(${d.favoritesCount})</span>
        </button>
      </div>

    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class='col-xs-12'>
      <div>
      ${marked(d.body)}
      </div>
      <div coral class="tag-list" coral-s-datasrc="state.taglist" coral-s-taglist="~~[coral=article]" >
        <script type='coral-template(d)'>
          <a href='#?tag=\${d}'  class="tag-pill tag-default tag-outline" >\${d}</a>
        <\/script>
      </div>
      </div>
    </div>

    <hr />

    <div class="article-actions">
      <div class="article-meta">
        <a href="#/profile/${(d.author||{}).username}"><img src="${d.author.image}" /></a>
        <div class="info">
          <a href="#/profile/${(d.author||{}).username}" class="author">${d.author.username}</a>
          <span class="date">${fdate(d.createdAt)}</span>
        </div>

        <button class="btn btn-sm btn-outline-secondary">
          <i class="ion-plus-round"></i>
          &nbsp;
          Follow ${d.author.username} <span class="counter">(${d.favoritesCount})</span>
        </button>
        &nbsp;
        <button class="btn btn-sm btn-outline-primary">
          <i class="ion-heart"></i>
          &nbsp;
          Favorite Post <span class="counter">(${d.favoritesCount})</span>
        </button>
      </div>
    </div>
    <div class="row">

      <div coral='article-comments' class="col-xs-12 col-md-8 offset-md-2">
        <script type='coral-template(d)'>
          <div class="card">
            <div class="card-block">
              <p class="card-text">\${d.body}</p>
            </div>
            <div class="card-footer">
              <a href=""#/profile/\${(d.author||{}).username}" class="comment-author">
                <img src="\${d.author.image}" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="#/profile/\${(d.author||{}).username}" class="comment-author">\${d.author.username}</a>
              <span class="date-posted">\${fdate(d.createdAt)}</span>
            </div>
          </div>
        <\/script>

    </div>
<!--
    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">

        <form class="card comment-form">
          <div class="card-block">
            <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
          </div>
          <div class="card-footer">
            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
            <button class="btn btn-sm btn-primary">
             Post Comment
            </button>
          </div>
        </form>

      </div>

    </div>
-->
  </div>
  </div>
  </script>
</div>
*/ })
