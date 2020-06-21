coral.ui.clientSideInclude (function () {/*
<div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div coral class="row"
            coral-s-resource="~~[coral=switcher]"
            coral-s-profiledata='{"profile":{"username":"", "image":" ", "bio":""}}'
            coral-s-datasrc="state.profiledata.profile"
        >
          <script type="coral-observer(updates)" name="resource">
          this.bind('state.profiledata', '$json$' + baseurl + '/profiles/' + this.state.resource)
        </script>

        <script type='coral-template(d)'>
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img src="${d.image}" class="user-img" />
            <h4>${d.username}</h4>
            <p>
              ${d.bio}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow ${d.username}
            </button>
          </div>
        </script>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div coral class="col-xs-12 col-md-10 offset-md-1"
        coral-s-resource="~~[coral=switcher]"
        coral-s-articledata
        coral-s-datasrc="state.articledata.articles"
        >
        <script type="coral-observer(updates)" name="resource">
          this.bind('state.articledata', '$json$' + baseurl + '/articles/?author=' + this.state.resource)
        </script>
        <script type='coral-template(d)' coral-slot='header'>
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active" href="">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Favorited Articles</a>
              </li>
            </ul>
          </div>
        </script>

        <script type='coral-template(d)' >
          <div class="article-preview">
            <div class="article-meta">
              <a href="profile.html"><img src="${d.author.image}" /></a>
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
                (d.tagList && d.tagList.length ? '<li class="tag-default tag-pill tag-outline">' : '') +
                (d.tagList||[]).join ('</li><li class="tag-default tag-pill tag-outline">') +
                (d.tagList && d.tagList.length ? '</li>' : '')
                }
              </ul>
              <span>Read more...</span>
            </a>
          </div>
        </div>
      </script>

    </div>
  </div>

</div>
*/})