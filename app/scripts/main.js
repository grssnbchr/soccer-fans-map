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
/*(function() {
    //Here we redefine set() method.
    //If it is called for map option, we hide InfoWindow, if "noSupress" option isnt true.
    //As Google doesn't know about this option, its InfoWindows will not be opened.
    var set = google.maps.InfoWindow.prototype.set;
    google.maps.InfoWindow.prototype.set = function(key, val) {
        if (key === 'map') {
            if (!this.get('noSupress')) {
                console.log('This InfoWindow is supressed. To enable it, set "noSupress" option to true');
                return;
            }
        }
        set.apply(this, arguments);
    }
})();*/
/* GLOBAL PARAMETERS */
var VIZAPI = 'http://wnstnsmth.cartodb.com/api/v2/viz/649eafa8-0901-11e4-99f0-0e10bcd91c2b/viz.json';
/* NAMESPACES */
var clubs = {};


var allData;

clubs['fca'] = {};
clubs['fca'].css = '#fussballfans_merge { polygon-opacity: 0; line-color: #FFFFFF; line-width: 0.5; line-opacity: 1; polygon-fill: #163479; } #fussballfans_merge [ dom2_fca <= 27.0701614388313] { polygon-opacity: 0.9; } #fussballfans_merge [ dom2_fca <= 3.690036900369] { polygon-opacity: 0.8; } #fussballfans_merge [ dom2_fca <= 0.56772100567721] { polygon-opacity: 0.6; } #fussballfans_merge [ dom2_fca <= 0.194287934719254] { polygon-opacity: 0.4; } #fussballfans_merge [ dom2_fca <= 0.0311148448924982] { polygon-opacity: 0.2; } #fussballfans_merge [ dom2_fca = 0] { polygon-opacity: 0; } #fussballfans_merge[best="keine"] { polygon-opacity: 0; }';

clubs['fcb'] = {};
clubs['fcb'].css = '#fussballfans_merge { polygon-opacity: 0; line-color: #FFFFFF; line-width: 0.5; line-opacity: 1; polygon-fill: #db4140; } #fussballfans_merge [ dom2_fcb <= 60.2409638554217] { polygon-opacity: 0.9; } #fussballfans_merge [ dom2_fcb <= 0.685871056241425] { polygon-opacity: 0.8; } #fussballfans_merge [ dom2_fcb <= 0.37425149742268] { polygon-opacity: 0.6; } #fussballfans_merge [ dom2_fcb <= 0.177346890517853] { polygon-opacity: 0.4; } #fussballfans_merge [ dom2_fcb <= 0.0745934656124125] { polygon-opacity: 0.2; } #fussballfans_merge [ dom2_fcb = 0] { polygon-opacity: 0; } #fussballfans_merge[best="keine"] { polygon-opacity: 0; }';

clubs['fcl'] = {};
clubs['fcl'].css = '#fussballfans_merge { polygon-opacity: 0; line-color: #FFFFFF; line-width: 0.5; line-opacity: 1; polygon-fill: #0091d0; } #fussballfans_merge [ dom2_fcl <= 79.4726803182168] { polygon-opacity: 0.9;} #fussballfans_merge [ dom2_fcl <= 8.58652575958188] { polygon-opacity: 0.8;} #fussballfans_merge [ dom2_fcl <= 2.8169014084507] { polygon-opacity: 0.6;} #fussballfans_merge [ dom2_fcl <= 0.40724903268719] { polygon-opacity: 0.4;} #fussballfans_merge [ dom2_fcl <= 0.0199808184143222] { polygon-opacity: 0.2;} #fussballfans_merge [ dom2_fcl = 0] { polygon-opacity: 0;} #fussballfans_merge[best="keine"] { polygon-opacity: 0; }';

clubs['fcls'] = {};
clubs['fcls'].css = '#fussballfans_merge { polygon-opacity: 0; line-color: #FFFFFF; line-width: 0.5; line-opacity: 1; polygon-fill: #b0764e; } #fussballfans_merge [ dom2_fcls <= 15.3846153846154] { polygon-opacity: 0.9; } #fussballfans_merge [ dom2_fcls <= 3.76647834375] { polygon-opacity: 0.8; } #fussballfans_merge [ dom2_fcls <= 2.64536739726004] { polygon-opacity: 0.6; } #fussballfans_merge [ dom2_fcls <= 1.33689839572193] { polygon-opacity: 0.4; } #fussballfans_merge [ dom2_fcls <= 0.617516895927602] { polygon-opacity: 0.2; } #fussballfans_merge [ dom2_fcls = 0] { polygon-opacity: 0;} #fussballfans_merge[best="keine"] { polygon-opacity: 0; }';

clubs['fcsg'] = {};
clubs['fcsg'].css = '#fussballfans_merge { polygon-opacity: 0; line-color: #FFFFFF; line-width: 0.5; line-opacity: 1; polygon-fill: #4ab969; } #fussballfans_merge [ dom2_fcsg <= 52.09953345] { polygon-opacity: 0.9;} #fussballfans_merge [ dom2_fcsg <= 5.21388790141012] { polygon-opacity: 0.8;} #fussballfans_merge [ dom2_fcsg <= 1.64473684210526] { polygon-opacity: 0.6;} #fussballfans_merge [ dom2_fcsg <= 0.290613193839] { polygon-opacity: 0.4;} #fussballfans_merge [ dom2_fcsg <= 0.0241756116429746] { polygon-opacity: 0.2; } #fussballfans_merge [ dom2_fcsg = 0] { polygon-opacity: 0;} #fussballfans_merge[best="keine"] { polygon-opacity: 0; }';

clubs['fct'] = {};
clubs['fct'].css = '#fussballfans_merge { polygon-opacity: 0; line-color: #FFFFFF; line-width: 0.5; line-opacity: 1; polygon-fill: #f49ac1; } #fussballfans_merge [ dom2_fct <= 28.8770053475936] { polygon-opacity: 0.9;} #fussballfans_merge [ dom2_fct <= 2.34082396990741] { polygon-opacity: 0.8;} #fussballfans_merge [ dom2_fct <= 0.565667836879433] { polygon-opacity: 0.6;} #fussballfans_merge [ dom2_fct <= 0.100918357076609] { polygon-opacity: 0.4;} #fussballfans_merge [ dom2_fct <= 0.00978703413717506] { polygon-opacity: 0.2;} #fussballfans_merge [ dom2_fct = 0] { polygon-opacity: 0;} #fussballfans_merge[best="keine"] { polygon-opacity: 0; }';

clubs['fcz'] = {};
clubs['fcz'].css = '#fussballfans_merge { polygon-opacity: 0; line-color: #FFFFFF; line-width: 0.5; line-opacity: 1; polygon-fill: #9f6eaf; } #fussballfans_merge [ dom2_fcz <= 6.75694541393271] { polygon-opacity: 0.9;} #fussballfans_merge [ dom2_fcz <= 1.42467789890981] { polygon-opacity: 0.8;} #fussballfans_merge [ dom2_fcz <= 0.51150895140665] { polygon-opacity: 0.6;} #fussballfans_merge [ dom2_fcz <= 0.169808116829746] { polygon-opacity: 0.4;} #fussballfans_merge [ dom2_fcz <= 0.0291842988472202] { polygon-opacity: 0.2;} #fussballfans_merge [ dom2_fcz = 0] { polygon-opacity: 0;} #fussballfans_merge[best="keine"] { polygon-opacity: 0; }';

clubs['gcz'] = {};
clubs['gcz'].css = '#fussballfans_merge { polygon-opacity: 0; line-color: #FFFFFF; line-width: 0.5; line-opacity: 1; polygon-fill: #f7941d; } #fussballfans_merge [ dom2_gcz <= 32.3844125609574] { polygon-opacity: 0.9;} #fussballfans_merge [ dom2_gcz <= 0.789733464955576] { polygon-opacity: 0.8;} #fussballfans_merge [ dom2_gcz <= 0.368822227686255] { polygon-opacity: 0.6;} #fussballfans_merge [ dom2_gcz <= 0.123331597563727] { polygon-opacity: 0.4;} #fussballfans_merge [ dom2_gcz <= 0.0289901288611228] { polygon-opacity: 0.2;} #fussballfans_merge [ dom2_gcz = 0] { polygon-opacity: 0;} #fussballfans_merge[best="keine"] { polygon-opacity: 0; }';

clubs['yb'] = {};
clubs['yb'].css = '#fussballfans_merge { polygon-opacity: 0; line-color: #FFFFFF; line-width: 0.5; line-opacity: 1; polygon-fill: #FFCC00; } #fussballfans_merge [ dom2_yb <= 65.3827865079365] { polygon-opacity: 0.9;} #fussballfans_merge [ dom2_yb <= 5.61009817671809] { polygon-opacity: 0.8;} #fussballfans_merge [ dom2_yb <= 1.99203187250996] { polygon-opacity: 0.6;} #fussballfans_merge [ dom2_yb <= 0.5091649694501] { polygon-opacity: 0.4;} #fussballfans_merge [ dom2_yb <= 0.0306396016758634] { polygon-opacity: 0.2;} #fussballfans_merge [ dom2_yb = 0] { polygon-opacity: 0;} #fussballfans_merge[best="keine"] { polygon-opacity: 0; }';

clubs['all'] = {};

var gmapstyles = {
    styles: [{
        "featureType": "water",
        "elementType": "all",
        "stylers": [{
            "hue": "#e9ebed"
        }, {
            "saturation": -78
        }, {
            "lightness": 67
        }, {
            "visibility": "simplified"
        }]
    }, {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{
            "hue": "#ffffff"
        }, {
            "saturation": -100
        }, {
            "lightness": 100
        }, {
            "visibility": "simplified"
        }]
    }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
            "hue": "#bbc0c4"
        }, {
            "saturation": -93
        }, {
            "lightness": 31
        }, {
            "visibility": "simplified"
        }]
    }, {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{
            "hue": "#ffffff"
        }, {
            "saturation": -100
        }, {
            "lightness": 100
        }, {
            "visibility": "off"
        }]
    }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
            "hue": "#e9ebed"
        }, {
            "saturation": -90
        }, {
            "lightness": -8
        }, {
            "visibility": "simplified"
        }]
    }, {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{
            "hue": "#e9ebed"
        }, {
            "saturation": 10
        }, {
            "lightness": 69
        }, {
            "visibility": "on"
        }]
    }, {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [{
            "hue": "#2c2e33"
        }, {
            "saturation": 7
        }, {
            "lightness": 19
        }, {
            "visibility": "on"
        }]
    }, {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{
            "hue": "#bbc0c4"
        }, {
            "saturation": -93
        }, {
            "lightness": 31
        }, {
            "visibility": "on"
        }]
    }, {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [{
            "hue": "#bbc0c4"
        }, {
            "saturation": -93
        }, {
            "lightness": -2
        }, {
            "visibility": "simplified"
        }]
    }, {
        "featureType": "all",
        "elementType": "all",
        "stylers": [{
            "lightness": 60
        }]
    }]
};

window.currentTeam = 'all';

window.defaultText = '<p>Die <strong>Schweizer Fankarte</strong> veranschaulicht wo die <strong>Saisonkarten-KäuferInnen</strong> der Schweizer Fussballclubs wohnen (Saison 2013/14). Die <strong>Farbe</strong> zeigt den dominanten Club in jeder Gemeinde, während deren <strong>Intensität</strong> den jeweiligen Saisonkarten-Anteil widerspiegelt. Die Einwohnerzahl wird dabei ebenfalls berücksichtigt.</p><p><strong>Wählen Sie einen Verein aus</strong>, um dessen Verbreitung in allen Gemeinden genauer zu untersuchen.</p><p><strong>Klicken Sie auf eine Gemeinde</strong>, um zu sehen, welche Vereine darin dominieren.</p>';

window.defaultTable = '<table class="table"> <thead> <tr> <th colspan="2"> {{n}} </th> </tr> </thead> <tbody> <tr> <td> Saisonkarten (Total) </td> <td> {{sk}} </td> </tr> <tr> <td> Zuschauerschnitt pro Spiel (2013/14) </td> <td> {{zs}} </td> </tr> <tr> <td> Stadiongrösse (Fassungsvermögen) </td> <td> {{stgr}} </td> </tr> <tr> <td> Meistertitel </td> <td> {{mt}} </td> </tr> <tr> <td> Cuptitel </td> <td> {{ct}} </td> </tr> <tr> <td> Marktwert (Juli 2014, Mio. CHF) </td> <td> {{mw}} </td> </tr> <tr> <td> Gründungsjahr </td> <td> {{gj}} </td> </tr> </tbody> <tfoot> <tr> <td colspan="2"> Datenquellen: Transfermarkt.ch, Clubs </td> </tr> </tfoot> </table>';
/**
 * Init
 * Initializes the application
 * Runs as soon as the DOM is ready
 */

$(function() {
    // Newsnet initialization
    newsnet.onDOMReady();
    server.initializeGA();
    server.trackGAPageview();
    window.isMobile = window.detectDevice();

    // attach spinner
    $('#map').html('<div class="spinner"><i class="fa fa-spinner fa-spin"></i><p>Wird geladen...</p></div>');
    $(window).on('dataLoaded', initializeMap);
    $(window).on('dataLoaded', initializeClubInfo);
    $(window).on('dataLoaded', initializeUi);

    $(window).on('teamChanged', updateUi);
    $(window).on('teamChanged', function() {
        newsnet.generatePI();
        server.trackGAPageview();
    });
    loadData();


});

var loadData = function() {
    var sql = new cartodb.SQL({
        user: 'wnstnsmth'
    });
    var overallDataPromise = sql.execute("SELECT cartodb_id,fca,fcb,fcls,fcl,fcsg,fct,fcz,gcz,yb,name,total,kt,einwohner FROM sg_2014_07_fussballfans_merge_v2 where kt is not null and kt != 'VS' and kt != 'FL' and kt != 'TI'");

    var teamDataPromise = sql.execute("SELECT ct,gj,mt,mw,n,sk,stgr,team,zs FROM s_2014_07_vereine ORDER by team ASC");

    // CartoDB promises need to be transformed
    var jQueryPromise1 = $.Deferred();

    var jQueryPromise2 = $.Deferred();

    teamDataPromise
        .done(function(data) {
            var teams = data.rows;
            window.teamData = {};
            $.each(teams, function(index, item) {
                window.teamData[item.team.toLowerCase()] = item;
            })
            jQueryPromise1.resolve();
        })
        .error(function(errors) {
            console.log("errors:" + errors);
            jQueryPromise1.reject();
        });

    overallDataPromise
        .done(function(data) {
            window.allData = data.rows;
            jQueryPromise2.resolve();
        })
        .error(function(errors) {
            console.log("errors:" + errors);
            jQueryPromise2.reject();
        });

    $.when(jQueryPromise1, jQueryPromise2).done(function() {
        $(window).trigger('dataLoaded');
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
            center_lon: 8.5,
            zoom: (isMobile ? 7 : 9),
            cartodb_logo: true
        })
        .done(function(vis, layers) {

            // return;
            // remove spinner
            $('#map .spinner').remove();
            // layer 0 is the base layer, layer 1 is cartodb layer
            // setInteraction is disabled by default
            window.layers = layers;
            window.vis = vis;
            layers[1].setInteraction(true);
            // layers[1] is "all"
            layers[1].on('featureOver', function(e, pos, latlng, data) {
                if (isMobile) {
                    updateClubInfo(data.cartodb_id);
                }
            });
            layers[1].on('featureClick', function(e, latlng, pos, data) {
                if (isMobile) {
                    updateClubInfo(data.cartodb_id);
                } else {
                    // open popup
                    showMuniPopup(pos, data.cartodb_id);
                }
            });
            // layers[1].setOpacity(0.2);
            // save original map css
            clubs['all'].css = layers[1].getSubLayer(0).getCartoCSS();

            // custom google map styles
            vis.getNativeMap().setOptions(gmapstyles);
            // layers[1].getSubLayer(0).setCartoCSS(clubs['fcl'].css);
            window.overlays = vis.getOverlays();

            // take search and append it to panelBody
            if (!isMobile) {
                var searchBox = $('.cartodb-searchbox').detach();
                $('#ui .panel-body').append(searchBox);
            }
            $('.cartodb-searchbox').find('input.text').attr('placeholder', 'Nach Gemeinde suchen');

        })

    .error(function(err) {
        console.log(err);
    });
};

var initializeClubInfo = function() {
    $('footer .clubinfo').each(function(index, item) {
        // get class 
        var team = $(item).attr('class').split(/\s+/)[2];
        // get team title
        // append img
        var img = $('<img>', {
            'src': 'images/logos/' + team + '.png',
            'title': teamData[team].n
        });
        $(item).prepend(img);
    });
};

var updateClubInfo = function(cartodbid) {
    // fetch data
    var result = allData.filter(function(item, index) {
        return item.cartodb_id === cartodbid;
    });
    if (result[0] === undefined) {
        return;
    }
    $('footer .gde').html('<strong>' + result[0]['name'] + ' (Kt. ' + result[0]['kt'] + ')</strong> - ' + $.number(result[0]['einwohner']).replace(',', '\'') + ' Einwohner');
    $('footer .clubinfo').each(function(index, item) {
        // get class 
        var team = $(item).attr('class').split(/\s+/)[2];
        $(item).find('.text').text(result[0][team] + ' (' + $.number(result[0][team] / result[0]['total'] * 100, 1) + '%)');
    });
}

var initializeUi = function() {
    // team selector
    var teamSelector = $('<select>', {
        id: 'teamSelector',
        on: {
            'change': function(e) {
                window.currentTeam = $(this).val();
                $(window).trigger('teamChanged');
            }
        }
    });
    $.each(window.teamData, function(index, item) {
        var option = $('<option>', {
            'value': index,
            'text': item.n
        });
        teamSelector.append(option);

    });
    var allOption = $('<option>', {
        'value': 'all',
        'text': 'Alle Clubs',
        'selected': 'selected'
    });
    teamSelector.append(allOption);


    // panel
    // only in desktop
    if (isMobile) {
        $('#map').append(teamSelector);
        return;
    }
    var panel = $('<div>', {
        'class': 'panel panel-default',
        'id': 'ui'
    });
    var panelBody = $('<div>', {
        'class': 'panel-body',
        'html': window.defaultText + '<p><a href="#" data-toggle="modal" data-target="#impressum" class="impressum-link">Über die Karte.</a></p>'
    });
    panel.append(panelBody);
    panelBody.append(teamSelector);
    $('#map').append(panel);

    // attach invisible tooltip
    var tooltip = $('<div>', {
        'id': 'map-tooltip'
    });
    $('#map').append(tooltip);
};

var updateUi = function() {
    // update carto css
    window.layers[1].getSubLayer(0).setCartoCSS(clubs[window.currentTeam].css);
    // clean ui
    if (!isMobile) {
        $('#ui .panel-body img').remove();
        $('#ui .panel-body table').remove();
        $('#ui .panel-body p').remove();
    }
    // update ui
    if (window.currentTeam === 'all') {
        // show legend
        $('.cartodb-legend-stack').show();
        $('a.toggle').show(); // mobile legend
        if (!isMobile) {
            // populate panel
            $('#ui .panel-body').prepend($(window.defaultText + '<p><a href="#" data-toggle="modal" data-target="#impressum" class="impressum-link">Über die Karte.</a></p>'));
        }
    } else {
        // hide legend
        $('.cartodb-legend-stack').hide();
        $('a.toggle').hide(); // mobile legend
        if (!isMobile) {
            // replace table placeholders with actual club data
            var newTable = window.defaultTable;
            $.each(window.teamData[window.currentTeam], function(index, item) {
                var formattedItem = ((index !== 'gj' && index !== 'n') ? $.number(item).replace(',', '\'') : item);
                newTable = newTable.replace('{{' + index + '}}', formattedItem);
            });
            newTable = $(newTable);
            // append club image
            var img = $('<img>', {
                'src': 'images/logos/' + window.currentTeam + '.png',
                'title': teamData[window.currentTeam].n,
                'class': 'clubLogo center-block'
            });
            // prepend img and table
            $('#ui .panel-body').prepend(newTable).prepend(img);
        }
    }
};

var showMuniPopup = function(pos, id) {
    // set new position
    $('#map-tooltip').css('left', pos.x + 10);
    $('#map-tooltip').css('top', pos.y + 10);
    // fetch data
    var result = allData.filter(function(item, index) {
        return item.cartodb_id === id;
    });
    if (result[0] === undefined) {
        return;
    }
    $('#map-tooltip').html('<strong>' + result[0]['name'] + ' (Kt. ' + result[0]['kt'] + ')</strong><br>' + $.number(result[0]['einwohner']).replace(',', '\'') + ' Einwohner');
    // sort
    var teamsToSort = [];
    $.each(window.teamData, function(index, item) {
        if (result[0][index] > 0) {
            teamsToSort.push({
                'name': item.n,
                'abbr': index,
                'fans': result[0][index],
                'perc': $.number(result[0][index] / result[0]['total'] * 100, 1)
            });
        }
    });
    teamsToSort.sort(function(b, a) {
        if (a.fans > b.fans) {
            return 1;
        } else if (a.fans < b.fans) {
            return -1;
        } else {
            // if there is a draw, let randomness decide
            if (Math.random() > 0.5) {
                return 1;
            } else {
                return -1;
            }
        }
    });
    var table = $('<table>', {
        'class': 'table'
    });
    var tbody = $('<tbody>');
    table.append(tbody);
    $.each(teamsToSort, function(index, item) {
        var tr = $('<tr>');
        var td = $('<td>');
        var img = $('<img>', {
            'src': 'images/logos/' + item.abbr + '.png',
            'title': item.name
        });
        var span = $('<span>', {
            'text': item.abbr.toUpperCase()
        });
        td.append(img);
        td.append(span);
        tr.append(td);
        td = $('<td>', {
            'text': item.fans + '  (' + item.perc + ' %)'
        });
        tr.append(td);
        tbody.append(tr);
    });
    $('#map-tooltip').append(table);
    var closeButton = $('<div>', {
        'class': 'closeme',
        'text': 'X',
        'on': {
            'click': function() {
                $('#map-tooltip').hide();
            }
        }
    });
    $('#map-tooltip').append(closeButton);
    $('#map-tooltip').show();
}



/* Android Stock Browser Fix for Bootstrap */
if (this.includeBootstrap) {
    var nua = navigator.userAgent;
    var is_android = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));
    if (is_android) {
        $('select.form-control').removeClass('form-control').css('width', '100%');

    }
}

window.detectDevice = function() {
    return $('.device-xs').is(':visible');
};

var server = {};
var ga = {};
server.trackGAPageview = function() {
    if (typeof ga.pageTracker !== 'undefined') {
        ga.pageTracker._trackPageview();
    }
    if (typeof ga.secondTracker !== 'undefined') {
        ga.secondTracker._trackPageview();
    }
    if (typeof ga.thirdTracker !== 'undefined') {
        ga.thirdTracker._trackPageview();
    }
}

server.initializeGA = function() {
    if (typeof(_gat) == 'object') {
        ga.pageTracker = _gat._getTracker(newsnet.gavar);
        ga.pageTracker._setDomainName(newsnet.ga_domainname);
        ga.pageTracker._initData();
        ga.pageTracker._trackPageview();
        ga.secondTracker = _gat._getTracker("UA-431029-7");
        ga.secondTracker._setDomainName("none");
        ga.secondTracker._setAllowLinker(true);
        ga.secondTracker._initData();
        ga.secondTracker._trackPageview();
        ga.thirdTracker = _gat._getTracker("UA-51696144-2");
        ga.thirdTracker._setDomainName(newsnet.ga_domainname);
        ga.thirdTracker._setAllowLinker(true);
        ga.thirdTracker._initData();
        ga.thirdTracker._trackPageview();
    }
}
