
// ============================
// our articles control
// ============================
coral.ui.register('*articlesList', {
  state: {
    datasrc: 'state.articlesdata.articles',
    articlesdata: null,
    tagsdata: null
  },
  bind: {
    page: { selector: '[coral=switcher]' }, //  same as: coral-s-page="~~[coral=switcher]"
    tag: { selector: '[coral=switcher]' } //  same as: coral-s-tag="~~[coral=switcher]"
  },
  observers: {
    'tag': function () {
      if (this.state.page!=='home') return
      var url = baseurl + '/articles?'
      var tag = this.state.tag; if (tag) url += '&tag=' + tag
      this.bind('state.articlesdata', '$json$' + url) 
      if (!this.tagsdata) {
        this.tagsdata = {}
        this.bind('state.tagsdata', '$json$' + baseurl + '/tags')
      }
      var list = coral.ui.find ('.nav-pills')
      if (list) {
        if (!tag) {
          list.state.links[1].state = 'active'
          if (list.state.links.length>2) list.state.links[2].state = ''
        } else {
          list.state.links[1].state = ''
          list.state.links.length = 2
          list.state.links.push ({label:'# ' + tag, state:'active', href:'#?tag='+tag})
        }
      }
    }
  }
})

coral.ui.clientSideInclude (function () {/*
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul coral class="nav nav-pills outline-active" coral-s-datasrc='state.links'>
            <script type='coral-template(d)'>
              <li class="nav-item">
                <a class="nav-link ${d.state}" href="${d.href}">${d.label}</a>
              </li>
            </script>
            <script type='coral-s-links'>
            [
              {"label": "Your Feed", "state":"disabled", "href":"#/login-register"},
              {"label": "Global Feed", "state":"active", "href":"#"}
            ]
            </script>
          </ul>
        </div>
        <div coral=articlesList >
          <script type='coral-template(d)'>
            <div class="article-preview">
              <div class="article-meta">
                <a href="#/profile/${d.author.username}"><img src="${d.author.image}" /></a>
                <div class="info">
                  <a href="#/profile/${d.author.username}" class="author">${d.author.username}</a>
                  <span class="date">${fdate(d.createdAt)}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart"></i> ${d.favoritesCount}
                </button>
              </div>
              <a href="#/article/${d.slug}" class="preview-link">
                <h1>${d.title}</h1>
                <p>${d.description}</p>
                <ul class="tag-list">
                  ${
                  (d.tagList && d.tagList.length ?
                      d.tagList.map(function(c){
                          return '<li class="tag-default tag-pill tag-outline"\
                                   onclick="event.preventDefault(); window.location.href=\'#\?tag=' + c + '\'">'+c+'</li>'}).join('') : '')
                  }
                </ul>
                <span>Read more...</span>
              </a>
            </div>
          </script>
        </div>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div coral class="tag-list" coral-s-datasrc="state.tagsdata.tags" coral-s-tagsdata="~~[coral=articlesList]" >
            <script type='coral-template(d)'>
              <a href='#?tag=${d}'  class="tag-pill tag-default" style='cursor:pointer' >${d}</a>
            </script>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
*/ })
