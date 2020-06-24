coral.ui.register ('*header', {
  state: {
    userdata: null
  },
  methods: {
    navitem: function (label, active, href) {
      return '<li class="nav-item"> <a class="nav-link' + (active?'active':'') + 
             '" href="' + href + '">' + label + '</a></li>'
    }
  },
  update: function() {
    var navitem = this.methods.navitem
    this.html(0, navitem('Home', false, '#'))
    if (this.state.userdata) {
      this.html(1, navitem('<i class="ion-compose"></i>&nbsp;New Post', false, '#/create-article'))
      this.html(2, navitem('<i class="ion-gear-a"></i>&nbsp;Settings', false, '#/settings'))
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
