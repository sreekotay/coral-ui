
/*

perfMonitor.startFPSMonitor()
perfMonitor.startMemMonitor()
perfMonitor.initProfiler("render")

var anim = true
var render = function () {
  databases = ENV.generateData(true).toArray()
	perfMonitor.startProfile("render")
  var reef = reefer.find('#reeftable')
  reef.render()
	perfMonitor.endProfile("render")
  if (anim) setTimeout(render, ENV.timeout)
}

reefer.ready(function () {
  var databases = ENV.generateData().toArray()
  var reef = reefer.find('#reeftable')
  reef.data.w = { databases: databases }
  reef.render()
  render()
})
*/
var anim = true
var render = function () {
  Monitoring.renderRate.ping()
  o.databases = databases = ENV.generateData(true).toArray()
  if (anim) setTimeout(render, ENV.timeout)
  var ui = coral.ui.find('#coraltable')
  if (ui) ui.render()
  if (!ui) do_()
}

coral.ui.ready(function () {
  var databases = ENV.generateData().toArray()
  var ui = coral.ui.find('#coraltable')
  if (!ui) document.querySelector('#app').innerHTML='';
  o.databases = databases
  //coral.observe (o)
//  do_()
  if (ui) {
    ui.state.w = { databases: databases }
    ui.render()
  }
  render()
})
