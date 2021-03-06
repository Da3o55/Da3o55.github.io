var docMenu = [
  {
    divider : true
  },{
    fr_FR : "Plugin MagicMirror²",
    en_US : "Plugin MagicMirror²",
    es_ES : "Plugin MagicMirror²",
    de_DE : "Plugin MagicMirror²",
    pt_PT : "Plugin MagicMirror²",
	link : "/#LANG#/plugin_magicmirror2/"
  },
]

if(getUrlVars('theme') == 'light' || getUrlVars('theme') == 'dark'){
  setCookie('theme',getUrlVars('theme'),7)
}

setTheme();

$('#ul_menu').empty();
var html = '';
var lang = 'fr_FR' ;
if(window.location.href.indexOf('fr_FR') != -1){
  lang = 'fr_FR'
}else if(window.location.href.indexOf('en_US') != -1){
  lang = 'en_US'
}else if(window.location.href.indexOf('es_ES') != -1){
  lang = 'es_ES'
}else if(window.location.href.indexOf('de_DE') != -1){
  lang = 'de_DE'
}else if(getCookie('lang') != ''){
  lang = getCookie('lang');
}
if(getCookie('lang') != lang){
  setCookie('lang',lang,7)
}

$('#meta-lang').attr('content',lang)
var jeedomVersion = '3.3'
if(window.location.href.indexOf('3.3') != -1){
  jeedomVersion = '3.3'
}else if(window.location.href.indexOf('4.0') != -1){
  jeedomVersion = '4.0'
}else if(window.location.href.indexOf('4.1') != -1){
  jeedomVersion = '4.1'
}else if(getCookie('jeedomVersion') != ''){
  jeedomVersion = getCookie('jeedomVersion');
}
if(getCookie('jeedomVersion') != jeedomVersion){
  setCookie('jeedomVersion',jeedomVersion,7)
}
if($('#sel_jeedomVersion').val() != jeedomVersion){
  $('#sel_jeedomVersion').val(jeedomVersion);
}
$('#sel_lang').val(lang);
for(var i in docMenu){
  var menu = docMenu[i]
  if(menu.divider){
    html += '<li><div class="divider"></div></li>';
  }else if(menu.submenu){
    html += '<li>';
    html += '<div class="collapsible-header">'+genText(menu,lang)+'</div>';
    html += '<div class="collapsible-body">';
    html += '<ul>';
    for(var j in menu.submenu){
      var submenu = menu.submenu[j];
      if(submenu.link == ''){
        continue;
      }
      if(submenu.version && submenu.version.indexOf(jeedomVersion) == -1){
        continue;
      }
      html += '<li><a href="'+submenu.link.replace('#LANG#',lang).replace('#VERSION#',jeedomVersion)+'">'+genText(submenu,lang)+'</a></li>';
    }
    html += '</ul>';
    html += '</div>';
    html += '</li>';
  }else{
    if(menu.link){
      if(menu.link == ''){
        continue;
      }
      html += '<li><a href="'+menu.link.replace('#LANG#',lang).replace('#VERSION#',jeedomVersion)+'">'+genText(menu,lang)+'</a></li>';
    }else{
      html += '<li><strong style="margin-left:5px;" href="#!">'+genText(menu,lang)+'</strong></li>';
    }
  }
}
//html += '<li class="small"><small>Jeedom: Free, Opened, Cloudless, Multiprotocol solution since 2014</small></li>'
$('#ul_menu').empty().html(html);

function genText(_menu,_lang){
  if(_menu.icon){
    return '<i class="'+_menu.icon+'"></i>'+_menu[lang];
  }else{
    return _menu[lang];
  }
}

$(function(){
  document.title = 'Documentation Da3o55'
  $('.sidenav').sidenav();
  $('.parallax').parallax();
  $('.dropdown-trigger').dropdown();
  $('.collapsible').collapsible();
  
  $('#div_summary').empty().append('<ul></ul>');
  var i=0;
  $('#div_content h1,h2').each(function(){
    $(this).attr('id','tocAnchor-'+i)
    if($(this).is('h1')){
      $('#div_summary ul').append('<li><a href="#tocAnchor-'+i+'" class="tocAnchor">'+$(this).text()+'</a></li>')
    }
    if($(this).is('h2')){
      $('#div_summary ul').append('<li><a href="#tocAnchor-'+i+'" class="tocAnchor" style="margin-left:15px;">'+$(this).text()+'</a></li>')
    }
    $(this).addClass('scrollspy');
    i++;
  });
  $('.scrollspy').scrollSpy();
  
  setTimeout(function() {
    $('#div_summary').pushpin({top:$('nav').height(),offset:$('nav').height()+10})
  }, 100);
  
  $('#sel_lang').on('change',function(){
    setCookie('lang',$(this).val(),7)
    var url = window.location.href.replace('fr_FR',$(this).val()).replace('en_US',$(this).val()).replace('es_ES',$(this).val()).replace('de_DE',$(this).val());
    window.location.href = url;
  })
  
  $('#sel_theme').on('change',function(){
    setCookie('theme',$(this).val(),7)
    setTheme();
  })
  
  $('#sel_jeedomVersion').on('change',function(){
    setCookie('jeedomVersion',$(this).val(),7)
    var url = window.location.href;
    if(url.indexOf('/core/') != -1 && url.indexOf(getCookie('jeedomVersion')) == -1){
      window.location.href = url.replace('3.3',getCookie('jeedomVersion')).replace('4.0',getCookie('jeedomVersion')).replace('4.1',getCookie('jeedomVersion'))
      return;
    }
    window.location.reload();
  })
  
  $('select').formSelect();
  $('#div_content :not(td)>img').addClass('responsive-img')
  cookiesPolicyBar();
  setLeftMenu();
});

function setTheme(){
  if(getCookie('theme') == 'dark'){
    $('html').addClass('dark')
    if($('#sel_theme').val() != 'dark'){
      $('#sel_theme').val('dark');
    }
  }else{
    $('html').removeClass('dark')
  }
}

function getCookie(name) {
  var cookies = document.cookie.split(';');
  for(var i in cookies){
    var csplit = cookies[i].split('=');
    if(name.trim() == csplit[0].trim()){
      return csplit[1];
    }
  }
  return '';
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;samesite=Strict;secure";
}

function cookiesPolicyBar(){
  if (getCookie('cookiePolicyAccept') != "active") $('#cookieAcceptBar').show();
  $('#cookieAcceptBarConfirm').on('click',function(){
    setCookie('cookiePolicyAccept', 'active', 30);
    $('#cookieAcceptBar').fadeOut();
  });
}

function setLeftMenu(){
  var url = window.location.href;
  if(url.indexOf('design3d') != -1){
    $('#ul_menu a').each(function(){
      if($(this).attr('href') && $(this).attr('href').indexOf('design3d') != -1){
        $(this).closest('li').addClass('menu_active');
        if($(this).closest('li').closest('ul').closest('li')){
          $(this).closest('li').closest('ul').closest('li').find('.collapsible-header').click();
          return false;
        }
      }
    })
    return;
  }
  $('#ul_menu a').each(function(){
    if($(this).attr('href') && url.indexOf($(this).attr('href')) != -1){
      $(this).closest('li').addClass('menu_active');
      if($(this).closest('li').closest('ul').closest('li')){
        $(this).closest('li').closest('ul').closest('li').find('.collapsible-header').click();
        return false;
      }
    }
  })
}

function getUrlVars(_key) {
  var vars = [], hash, nbVars = 0;
  var hashes = window.location.search.replace('?','').split('&');
  for (var i = 0; i < hashes.length; i++) {
    if (hashes[i] !== "" && hashes[i] !== "?") {
      hash = hashes[i].split('=');
      nbVars++;
      vars[hash[0]] = hash[1];
      if (_key && _key == hash[0]) {
        return hash[1];
      }
    }
  }
  if (!_key) {
    return false;
  }
  vars.length = nbVars;
  return vars;
}
