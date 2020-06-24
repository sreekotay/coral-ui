coral.ui.register('*login', {
  state: ['page', 'errorMessage'],
  data: { },
  bind: {
    page: { selector: '[coral=switcher]' },
    userdata: { selector: '[coral=header]' }
  },
  observers: {
    userdata: function (updates) {
      if (updates.value) {
        window.location.href = '#'
      }
    }
  },
  listeners: {
    coralLoadDataFail: function (event) {
      this.state.errorMessage = '<li>Error. Please correct and try again.</li>'
      try {
        var err = JSON.parse(event.detail.xhr.response)
        if (err.errors) {
          var msg = '' 
          for (var k in err.errors) msg += k + ' ' + err.errors[k]
          this.state.errorMessage = msg
        }
      } catch (err) {}
    },
    input: function (event) {
      this.data[event.target.getAttribute('placeholder')] = event.target.value
    },
    submit: function (event) {
      var endpoint = this.state.page === 'login' ? '/users/login' : '/users'
      this.bind('state.userdata', '$json$' + baseurl + endpoint, undefined, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          user: {
            email: this.data['Email'],
            password: this.data['Password'],
            username: this.data['Your Name']
          }
        }
      })
    }
  }
})

coral.ui.clientSideInclude(function () { /*
<div class="auth-page">
  <div class="container page">
    <div class="row">

      <div coral=login coral-s-datasrc='state'
           class="col-md-6 offset-md-3 col-xs-12">
        <script type='coral-template(d)'>
          <div>
            <h1 class="text-xs-center"> ${d.page==='login' ? 'Sign in' : 'Sign up'}</h1>
            ${d.page==='login'?'\
              <p class="text-xs-center">\
                <a href="#/register">Need an account?</a>\
              </p>':'\
              <p class="text-xs-center">\
                <a href="#/login">Have an account?</a>\
              </p>'}
            <div>
              ${d.errorMessage?'\
                <ul class="error-messages">'
                  + d.errorMessage +
                '</ul>':''}

              <form onsubmit='event.preventDefault();' coral-on-submit>
                ${d.page==='login' ? '' : '\
                <fieldset class="form-group">\
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" autocomplete="username" coral-on-input>\
                </fieldset>'}
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email" autocomplete="email">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password" autocomplete="current-password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right" >
                  ${d.page==='login' ? 'Sign in' : 'Sign up'}
                </button>

              </form>
            </div>
        </script>
        </div>
      </div>
    </div>
  </div>
</div>
*/ })
