// ==UserScript==
// @name         Global - Product Switcher
// @namespace    https://advance.lexis.com/
// @version      0.1
// @description  Udate Product Switcher
// @author       Jason
// @resource     psCSS https://raw.githubusercontent.com/bressljr/GMScripts/master/product_switcher.css?v5
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @match        https://advance.lexis.com/*
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function() {
    'use strict';

    var css = GM_getResourceText ("psCSS");

    GM_addStyle (css);

    var switcherArray = {
        '1000516': 'Lexis Advance\<sup\>&reg;\</sup\>',
        '1001008': 'Global UI Builder',
        '1000547': 'Litigation Profile Suite',
        '1000534': 'Medical Navigator\<sup\>&trade;\</sup\>',
        '1000200': 'Public Records',
        '1000117': 'Verdict & Settlement Analyzer',
        '1001091': 'Tax',
        '1001021': 'Law 360',
        '9999999': 'Courtlink',
        '1518392': 'Diligence\<sup\>&reg;\</sup\>',
        '1001005': 'Dossier',
        '1000579': 'Get & Print',
        '1000522': 'Practice Advisor\<sup\>&reg;\</sup\>',
        '1000522_1001008': 'Practice Advisor\<sup\>&reg;\</sup\> Editor',
        '1518394': 'Newsdesk\<sup\>&reg;\</sup\>',
        '1001006': 'Publisher',
        '1518396': 'MLex\<sup\>&reg;\</sup\>',
        '1513675': 'Shepard\'s\<sup\>&reg;\</sup\> BriefCheck\<sup\>&trade;\</sup\>',
        '1513674': 'Shepard\'s\<sup\>&reg;\</sup\> BriefLink'
    };


     waitForKeyElements("#nav_productswitcher_menu a", initPS, false);



     function initPS() {

        var pagemodel = Injector.get("page.model");
        var mfid = getValues(pagemodel, "masterfeatureid");
        console.log(mfid[0]);

         $("#nav_productswitcher_menu a").each(function(){
              $(this).attr("id") == mfid[0] && $(this).addClass("active");
              $(this).find('span.text').html(switcherArray[$(this).attr("id")]);
         });


         $("#nav_productswitcher_menu ul li").sort(asc_sort).appendTo('#nav_productswitcher_menu ul');

    }

    function asc_sort(a, b){
       return ($(b).text()) < ($(a).text()) ? 1 : -1;
    }


    function getValues(obj, key) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(getValues(obj[i], key));
            } else if (i == key) {
                objects.push(obj[i]);
            }
        }
        return objects;
    }

})();




