/**
 * Newsnet switch logic
 * Author: tg.
 * Last changed: 11/7/2014
 */
// Newsnet site detection
newsnet = {};
newsnet.host = window.location.hostname.split('.');
newsnet.host = newsnet.host[newsnet.host.length - 2];
// default
newsnet.sitevar = "newsnet";
newsnet.sitetitle = 'Newsnet';
newsnet.wemfvar = "";
newsnet.gavar = "UA-431029-7";
if (newsnet.host == "tages-anzeiger" || newsnet.host == "tagesanzeiger" || newsnet.host == "tagi") {
    newsnet.sitevar = "tagi";
    newsnet.sitetitle = 'Tages-Anzeiger';
    newsnet.wemfvar = "tagesanz";
    newsnet.gavar = "UA-431029-1";
}
if (newsnet.host == "bernerzeitung" || newsnet.host == 'bz') {
    newsnet.sitevar = "bz";
    newsnet.sitetitle = 'Berner Zeitung';
    newsnet.wemfvar = "bernerz";
    newsnet.gavar = "UA-343437-3";
}
if (newsnet.host == "derbund") {
    newsnet.sitevar = "bund";
    newsnet.sitetitle = 'Der Bund';
    newsnet.wemfvar = "derbund";
    newsnet.gavar = "UA-8391408-1";
}
if (newsnet.host == "bazonline" || newsnet.host == 'baz') {
    newsnet.sitevar = "baz";
    newsnet.sitetitle = 'Basler Zeitung';
    newsnet.wemfvar = "baz";
    newsnet.gavar = "UA-674994-1";
}
if (newsnet.host == "lematin") {
    newsnet.sitevar = "lm";
    newsnet.sitetitle = 'Le Matin';
    newsnet.wemfvar = "lematin";
    newsnet.gavar = "UA-32795635-1";
}
if (newsnet.host == "tdg") {
    newsnet.sitevar = "tdg";
    newsnet.sitetitle = 'Tribune de Genève';
    newsnet.wemfvar = "tdg";
    newsnet.gavar = "UA-4263654-1";
}
if (newsnet.host == "24heures") {
    newsnet.sitevar = "heures";
    newsnet.wemfvar = "24heures";
    newsnet.sitetitle = '24 heures';
    newsnet.gavar = "UA-4334105-1";
}
newsnet.ga_domainname = newsnet.host + '.ch';
var szmvars = newsnet.wemfvar + "//CP//interactive/sfl-fussballfans";
newsnet.WEMF = "http://" + newsnet.wemfvar + ".wemfbox.ch/cgi-bin/ivw/CP/";
newsnet.WEMF2 = "http://newsnetz.wemfbox.ch/cgi-bin/ivw/CP/" + newsnet.wemfvar + "/";

/**	dynamically change assets based on current domain
 *	to be executed in initial method of main.js
 */
newsnet.onDOMReady = function() {
    // add custom logo
    $('.navbar-brand.logo').addClass('site-' + newsnet.sitevar);
    // manipulate href
    $('.navbar-brand.logo').attr('href', 'http://' + newsnet.host + '.ch');
    // manipulate title attribute
    $('title').text($('title').text() + ' | ' + newsnet.sitetitle);
    // manipulate facebook open graph (og)
    $('meta#og_title').attr('content', $('meta#og_title').attr('content') + ' | ' + newsnet.sitetitle);
    $('meta#og_url').attr('content', 'http://' + 'sfl-fussballfans' + '.' + newsnet.host + '.ch');
}
/* 
 * The following actions need to be taken as soon as possible
 * Cannot use jQuery syntax inside here, as it hasn't been loaded yet
 */
newsnet.onLoadStart = function() {
    // manipulate favicon
    document.getElementById('favicon').setAttribute('href', 'images/favicons/' + newsnet.sitevar + '.ico');
    // manipulate homescreen
    document.getElementById('homescreen').setAttribute('href', 'images/homescreens/' + newsnet.sitevar + '.png');
}

/* Generates a page impression (WEMF) by loading and adding an invisible img */
newsnet.generatePI = function() {
    // delete previous
    $('.generatedPI').remove();
    $('body').append($("<img class='generatedPI' src='" + newsnet.WEMF + "interactive/sfl-fussballfans?r=" + escape(document.referrer) + "&amp;d=" + (Math.random() * 100000) + "' width='1' height='1' alt='' />"));
    $('body').append($("<img class='generatedPI' src='" + newsnet.WEMF2 + "interactive/sfl-fussballfans?r=" + escape(document.referrer) + "&amp;d=" + (Math.random() * 100000) + " ' width='1' height='1' alt='' />"));
}
