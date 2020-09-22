// ==UserScript==
// @name         USF Update Behavior
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Testing various changes to form update post court selection
// @author       You
// @match        https://cert7-advance.lexis.com/*
// @match        https://advance.lexis.com/*
// @grant    	 GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    //UTILITY SCRIPTS   ##########################################################################################################################
	function waitForKeyElements(e,t,a,n){var o,r;(o=void 0===n?$(e):$(n).contents().find(e))&&o.length>0?(r=!0,o.each(function(){var e=$(this);e.data("alreadyFound")||!1||(t(e)?r=!1:e.data("alreadyFound",!0))})):r=!1;var l=waitForKeyElements.controlObj||{},i=e.replace(/[^\w]/g,"_"),c=l[i];r&&a&&c?(clearInterval(c),delete l[i]):c||(c=setInterval(function(){waitForKeyElements(e,t,a,n)},300),l[i]=c),waitForKeyElements.controlObj=l}

	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}

	//##########################################################################################################################

	//HIDE THE SPINNER AND BACKGROUND
	addGlobalStyle(`
      div#loadbox {
         display:none !important;
      }
      .sheath {
         background-color: transparent;
      }

      fieldset {
         border: 0;
         padding: 0;
         margin: 0;
         min-width: 0;
      }
      .courtlinkasf .segmentflexcontainer > div:nth-child(odd) > fieldset {
         padding-right: 40px;
      }
      .courtlinkasf .segmentflexcontainer > div:nth-child(even) > fieldset {
         padding-left: 40px;
      }
    `);

	waitForKeyElements(".segmentflexcontainer", initSearchBox, false);

	function initSearchBox() {
		$(".segment").wrapInner('<fieldset class="segmentfield"></fieldset>');
	}

	$(function() {

    var observer = new MutationObserver(function(mutations) {
	  $('.segmentfield').prop('disabled', $(".sheath").is(":visible"));
    });

    var target = document.querySelector('.sheath');
    observer.observe(target, {
      attributes: true
    });
});
})();