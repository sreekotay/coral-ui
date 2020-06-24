coral.ui.register ('*header', {
  state: {
    userdata: null
  },
  methods: {
    logout: function () {
      localStorage.removeItem('creds')
      this.state.userdata = null
    },
    navitem: function (label, active, href) {
      return '<li class="nav-item"> <a class="nav-link' + (active?'active':'') + 
             '" href="' + href + '">' + label + '</a></li>'
    }
  },
  observers: {
    userdata: function(updates) {
      if (updates.value===null) {
        var ud = JSON.parse(localStorage.getItem('creds'))
        if (ud) this.state.userdata = ud
      } else if (updates.prev!==updates.value) {
        localStorage.setItem('creds', JSON.stringify(updates.value))
      }
    }
  },
  update: function() {
    var navitem = this.methods.navitem
    this.html(0, navitem('Home', false, '#'))
    var ud = this.state.userdata
    if (ud) {
      this.html(1, navitem('<i class="ion-compose"></i>&nbsp;New Post', false, '#/create-article'))
      this.html(2, navitem('<i class="ion-gear-a"></i>&nbsp;Settings', false, '#/settings'))
      this.html(3, navitem(ud.user.username, false, '#/profile/' + ud.user.username))
    } else {
      this.html(1, navitem('Sign-in', false, '#/login'))
      this.html(2, navitem('Sign-up', false, '#/register'))
    }
  }
})
coral.ui.clientSideInclude(function () { /*
<nav class="navbar navbar-light">
  <div class="container">
    <a class="navbar-brand" href="#">conduit</a>
    <ul coral='header' class="nav navbar-nav pull-xs-right">
    </ul>
  </div>
</nav>
*/ })
