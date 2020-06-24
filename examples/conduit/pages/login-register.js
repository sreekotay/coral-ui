coral.ui.register('*login', {
  state: ['page', 'userdata'],
  data: { },
  bind: {
    page: { selector: '[coral=switcher]' }
  },
  observers: {
    userdata: function (updates) {
      localStorage.setItem('creds', JSON.stringify(updates.value))
    }
  },
  listeners: {
    input: function (event) {
      this.data[event.target.getAttribute('placeholder')] = event.target.value
    },
    submit: function (event) {
      if (this.state.page === 'login') {
        this.bindForce('state.userdata', '$json$' + baseurl + '/users/login', undefined, {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            user: {
              email: this.data['Email'],
              password: this.data['Password']
            }
          }
        })
      }
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
              ${d.emailtaken?'\
                <ul class="error-messages">\
                  <li>That email is already taken</li>\
                </ul>':''}

              <form onsubmit='event.preventDefault();' coral-on-submit>
                ${d.page==='login' ? '' : '\
                <fieldset class="form-group">\
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" coral-on-input>\
                </fieldset>'}
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right" onclick="console.log">
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
