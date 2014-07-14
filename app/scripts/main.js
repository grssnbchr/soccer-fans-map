/*global window:false */
/*global navigator:false */
/*global document:false */
/*global newsnet:false */
/*global queue:false */
/*global colorbrewer:false */
/*global Gettext:false */
/*global json_locale_data:false */
/*global d3:false */
'use strict';

/**
 * Main logic
 * Author: tg.
 * Last changed: 11/7/2014
 */
// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/* GOOGLE MAPS POPUP FIX */
(function() {
    //Here we redefine set() method.
    //If it is called for map option, we hide InfoWindow, if "noSupress" option isnt true.
    //As Google doesn't know about this option, its InfoWindows will not be opened.
    var set = google.maps.InfoWindow.prototype.set;
    google.maps.InfoWindow.prototype.set = function (key, val) {
        if (key === 'map') {
            if (!this.get('noSupress')) {
                console.log('This InfoWindow is supressed. To enable it, set "noSupress" option to true');
                return;
            }
        }
        set.apply(this, arguments);
    }
})();
/* GLOBAL PARAMETERS */
var VIZAPI = 'http://wnstnsmth.cartodb.com/api/v2/viz/649eafa8-0901-11e4-99f0-0e10bcd91c2b/viz.json';
/* NAMESPACES */
var clubs = {};


var allData;

clubs['fca'] = {};
clubs['fca'].css = '';

clubs['fcb'] = {};
clubs['fcb'].css = '';

clubs['fcl'] = {};
clubs['fcl'].css = '';

clubs['fcls'] = {};
clubs['fcls'].css = '';

clubs['fcsg'] = {};
clubs['fcsg'].css = '';

clubs['fct'] = {};
clubs['fct'].css = '';

clubs['fcz'] = {};
clubs['fcz'].css = '';

clubs['gcz'] = {};
clubs['gcz'].css = '';

clubs['yb'] = {};
clubs['yb'].css = '';

/**
 * Init
 * Initializes the application
 * Runs as soon as the DOM is ready
 */
$(function() {
    // Newsnet initialization
    newsnet.onDOMReady();

    $(window).on('dataLoaded', initializeMap);

    loadData();

    initializeClubInfo();
});

var loadData = function() {
    var sql = new cartodb.SQL({
        user: 'wnstnsmth'
    });
    sql.execute("SELECT * FROM fussballfans_merge WHERE kt IN ('BE','VD','AG','ZH','FR','GR','TI','SO','LU','BL','SG','TG','JU','GE','NE','SZ','SH','FL','AR','UR','ZG','NW','AI','OW','BS','GL','DE','IT') AND kt IS NOT NULL")
    .done(function(data) {
        window.allData = data.rows;
        $(window).trigger('dataLoaded');
    })
    .error(function(errors) {
        console.log("errors:" + errors);
    });

}
var initializeMap = function() {
    // map initialization
    cartodb.createVis('map', VIZAPI, {
            shareable: false,
            title: false,
            description: false,
            search: true,
            tiles_loader: false,
            center_lat: 47,
            center_lon: 8,
            zoom: 9,
            cartodb_logo: false
        })
        .done(function(vis, layers) {
            // layer 0 is the base layer, layer 1 is cartodb layer
            // setInteraction is disabled by default
            window.layers = layers;
            layers[1].setInteraction(true);
            // layers[1] is "all"
            layers[1].on('featureOver', function(e, pos, latlng, data) {
                updateClubInfo(data.cartodb_id);
            });
            layers[1].on('featureClick', function(e, pos, latlng, data) {
                updateClubInfo(data.cartodb_id);
            });

            // layers[1].getSubLayer(0).setCartoCSS()
            window.overlays = vis.getOverlays();
        })

    .error(function(err) {
        console.log(err);
    });
};

var initializeClubInfo = function() {
    $('footer .clubinfo').each(function(index, item) {
        // get class 
        var team = $(item).attr('class').split(/\s+/)[2];
        // append img
        var img = $('<img>', {
            'src': 'images/logos/' + team + '.png',
            'title': ''
        });
        $(item).prepend(img);
    });
};
/* Android Stock Browser Fix for Bootstrap */
if (this.includeBootstrap) {
    var nua = navigator.userAgent;
    var is_android = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));
    if (is_android) {
        $('select.form-control').removeClass('form-control').css('width', '100%');

    }
}

var updateClubInfo = function(cartodbid){
    // fetch data
    var result = allData.filter(function(item, index){
        return item.cartodb_id === cartodbid;
    });
    if(result[0] === undefined){
        return;
    }
    $('footer .gde').text(result[0]['name'] + ' (Kt. ' + result[0]['kt'] + ') - ' + $.number(result[0]['einwohner']).replace(',','\'') + ' Einwohner');
    $('footer .clubinfo').each(function(index, item){
        // get class 
        var team = $(item).attr('class').split(/\s+/)[2];
        $(item).find('.text').text(result[0][team] + ' (' + $.number(result[0][team]/result[0]['total'] * 100,1) + '%)');
    });
}