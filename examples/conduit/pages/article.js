
// ============================
// our article
// ============================
coral.ui.register('*article', {
  state: {
    datasrc: 'state.articledata.article',
    articledata: null,
    taglist: null
  },
  bind: {
    resource: { selector: '[coral=switcher]' } //  same as: coral-s-resource="~~[coral=switcher]"
  },
  observers: {
    articledata: function () {
      if (this.state.articledata) this.state.taglist = this.state.articledata.article.tagList
    },
    resource: function () {this.bind('state.articledata', '$json$' + baseurl + '/articles/' + this.state.resource)}
  }
})

coral.ui.register('*article-comments', {
  state: {
    datasrc: 'state.commentsdata.comments',
    commentsdata: null,
  },
  bind: {
    resource: { selector: '[coral=switcher]' } //  same as: coral-s-tag="~~[coral=switcher]"
  },
  observers: {
    resource: function () { this.bind('state.commentsdata', '$json$' + baseurl + '/articles/' + this.state.resource + '/comments')}
  }
})

coral.ui.loadScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js')
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
      <p>
      ${marked(d.body)}
    </div>

    <hr />
      <div coral class="tag-list" coral-s-datasrc="data.taglist" coral-s-taglist="~~[coral=article]" >
        <script type='coral-template(d)'>
          <a href='#?tag=\${d}'  class="tag-pill tag-default" >\${d}</a>
        <\/script>
      </div>

    <div class="article-actions">
      <div class="article-meta">
        <a href="profile.html"><img src="${d.author.image}" /></a>
        <div class="info">
          <a href="" class="author">${d.author.username}</a>
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
              <a href="" class="comment-author">
                <img src="\${d.author.image}" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="" class="comment-author">\${d.author.username}</a>
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
