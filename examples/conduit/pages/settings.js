function logout () {
  coral.ui.find('[coral=header]').methods.logout()
  window.location.href = '#'
}
coral.ui.register('*settings', {
  state: {
    datasrc: 'state.userdata.user',
    updateduser: null
  },
  data: {
    form: {}
  },
  bind: {
    userdata: { selector: '[coral=header]' }
  },
  observers: {
    updateduser: function(updates) {
      if (updates.value) {
        this.state.userdata = this.state.updateduser
        window.location.href = '#/profile/' + this.state.userdata.user.username
      }
    }
  },
  listeners: {
    input: function (event) {this.data.form[event.target.placeholder] = event.target.value},
    submit: function (event) {
      var fd = this.data.form
      var u = this.state.userdata.user
      this.bind('state.updateduser', '$json$' + baseurl + '/user', undefined, {
        method: 'PUT',
        headers: coral.assign({'Content-Type': 'application/json'}, authorization()),
        body: {
          user: {
            email: fd['Email'],
            password: fd['Password'],
            username: fd['Your Name'] || u.username,
            bio: fd['Short bio about you'],
            image: fd['URL of profile picture']
          }
        }
      })
    }
  }

})
coral.ui.clientSideInclude(function () { /*
<div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form coral=settings onsubmit='event.preventDefault();' coral-on-submit>
          <script type=coral-template(d)>
            <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" type="text" placeholder="URL of profile picture" value='${d.image||""}' coral-on-input>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" value='${d.username}' coral-on-input>
                </fieldset>
                <fieldset class="form-group">
                  <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you"coral-on-input>${d.bio}</textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email" value='${d.email}' coral-on-input>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password" coral-on-input>
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </script>
        </form>
        <hr>
        <button class="btn btn-outline-danger" onclick='logout()'>Or click here to logout.</button>
      </div>

    </div>
  </div>
</div>
*/ })
