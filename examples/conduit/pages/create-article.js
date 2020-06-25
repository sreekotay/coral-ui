var storedArticle = {}
try {
  storedArticle = JSON.parse(localStorage.getItem('article')) || {}
} catch (err) {}
coral.ui.register('*create-article', {
  state: {
    title: storedArticle.t || '',
    description: storedArticle.d || '',
    body: storedArticle.b || '',
    taglist: storedArticle.tt || '',
    postResponse: ''
  },
  methods: {

  },
  mutate: function () {
    var s = this.state
    var js = JSON.stringify({ t: s.title, d: s.description, b: s.body, tt: s.taglist })
    if (js.length >= 4) localStorage.setItem('article', js)
    else localStorage.removeItem('article')
  },
  observers: {
    postResponse: function (updates) {
      if (!updates.value) return
      localStorage.removeItem('article')
      enableInputs(true)
      window.location.href = '#/article/' + updates.value.article.slug
    }
  },
  listeners: {
    input: function (event) {
      var t = event.target
      this.state[t.getAttribute('coral-name')] = event.target.value
    },
    coralLoadDataFail: function (event) {
      enableInputs(true)
      var xhr = event.detail.xhr
      console.log(xhr.status, xhr.response)
      alert('crap - some error.  better messaging in the works')
    },
    submit: function (event) {
      enableInputs(false)
      var ad = this.state
      this.bind('state.postResponse', '$json$' + baseurl + '/articles', undefined, {
        method: 'POST',
        headers: coral.assign({ 'Content-Type': 'application/json' }, authorization()),
        body: {
          article: {
            title: ad.title,
            description: ad.description,
            body: ad.body,
            tagList: ad.taglist.split(' ')
          }
        }
      })
    }
  }
})
coral.ui.clientSideInclude(function () { /*
<div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form coral="create-article" coral-s-datasrc="state" onsubmit='event.preventDefault();' coral-on-submit>
          <script type=coral-template(d)>
            <fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control form-control-lg" placeholder="Article Title" value="${d.title}" coral-name='title' coral-on-input>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="What's this article about?" value="${d.description||''}" coral-name='description' coral-on-input>
              </fieldset>
              <fieldset class="form-group">
                  <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" coral-name='body' coral-on-input>${d.body}</textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="Enter tags" value="${d.taglist||''}" coral-name='taglist' coral-on-input>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" >
                  Publish Article
              </button>
            </fieldset>
          </script>
        </form>
      </div>

    </div>
  </div>
</div>
*/ })
