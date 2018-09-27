// ==UserScript==
// @name         Citation Map - Overruling Risk
// @namespace    https://advance.lexis.com
// @version      0.1
// @description  Add overruling risk aspect to citation map
// @author       Jason Bressler
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @match        https://advance.lexis.com/search*
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function() {
    'use strict';
     var riskArray = [
         "urn:contentItem:4956-W4M0-0039-406N-00000-00",
         "urn:contentItem:5K9T-KX01-F04M-B2B9-00000-00",
         "urn:contentItem:5G39-5B71-F04B-N0GR-00000-00",
         "urn:contentItem:5BTK-0BK1-F04G-S07H-00000-00",
         "urn:contentItem:3RW5-XXJ0-003B-X0N7-00000-00",
         "urn:contentItem:82TR-W601-652N-801P-00000-00"
     ]

     var termsArray = [
         "tax (65) <span>Overruling Risk</span>",
         "commerce clause (16)",
         "substantial nexus (8)",
         "physical presence (9) <span>Overruling Risk</span>",
         "tax law (10)",
         "interstate commerce (9)",
         "nexus requirement (3)",
         "out of state (5)",
         "due process requirement (2)",
         "due process clause (3)",
         "state taxation (3)",
         "minimum contact (3)",
         "mail order house (2)",
         "collect tax (2)",
     ]

     waitForKeyElements(".citationmap li.row_sr0", addCoreTerms, false);

     waitForKeyElements("circle[id='urn:contentItem:4956-W4M0-0039-406N-00000-00']", addDottedLines, false);

     function addCoreTerms() {
         var $Quill = $(".row_sr0");
         var observer = new MutationObserver(function(mutations) {
             mutations.forEach(function(mutation) {
                 if (mutation.attributeName === "class") {
                     if($Quill.hasClass("highlight-row")) {
                        $("body").addClass("risk");
                     } else {
                        $("body").removeClass("risk");
                     }
                 }
             });
         });
         observer.observe($Quill[0], {
             attributes: true
         });



         var $coreterms = $('<div class="coretermslist"><h3>Focus on core concepts from this case:</h3><ul></ul></div>');
         $coreterms.appendTo($Quill.find("div.item"));

         var $coretermslist = $coreterms.find("ul");

         $.each(termsArray, function( index, value ) {
               $("<li><label><input type=checkbox checked=true>"+value+"</lable></li>").appendTo($coretermslist);
         });

         $( ".coretermslist label" ).click(function(e) {

             var selectedTerm = $(this);

             if(selectedTerm.text().includes("tax (65)") || selectedTerm.text().includes("physical presence")) {
                if(selectedTerm.text().includes("tax")){
                    if($(this).find("input:checkbox").is(":checked")) {
                        $("path.riskline:first, path.riskline:last").attr("opacity", 1);
                    } else {
                        $("path.riskline:first, path.riskline:last").attr("opacity", 0);
                    }
                } else {
                    if($(this).find("input:checkbox").is(":checked")) {
                        $("path.riskline").not(':first').not(':last').attr("opacity", 1);
                    } else {
                        $("path.riskline").not(':first').not(':last').attr("opacity", 0);
                    }
                }
             }
             e.stopPropagation();
             return false();
         });
     }

     function addDottedLines() {

         //Create paths for overruling risks
         var svg = document.getElementsByTagName("svg")[0];

         $.each(riskArray, function( index, value ) {
             var $citingCase = $("circle[id='" + value + "']"),
                 path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

             if($citingCase.attr("cy") != undefined) {

                 path.setAttribute('d','M915,180.2668406978225Z L '+$citingCase.attr("cx")+','+$citingCase.attr("cy")+'');
                 path.setAttribute('stroke','#E98310');
                 path.setAttribute('stroke-width','1px');
                 path.setAttribute('stroke-dasharray','5px,4px');
                 path.setAttribute('class','riskline');

                 svg.appendChild(path)
             }
         });

         //Update Legend
         if(!$("hr.risk").length) {
             $('<div class="circles connection" style="margin-top:10px;"><div class="circle eleven"></div><hr class="risk"><div class="circle eleven"></div><p>Overruling Risk</p></div>')
                 .insertAfter($(".legendDropdown").find(".circles.connection").last());
         }
     }





    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
    addGlobalStyle('.citationmap .results-list>.wrapper>ol>li { display:flex; padding-top:5px; }; .citationmap .results-list>.wrapper>ol>div>div.breadcrumb { padding:0; } ');
    addGlobalStyle('.citationmap .results-list>.wrapper>ol>li.highlight-row { border-color:#0077cc; border-width:2px }; ');
    addGlobalStyle('path.riskline, .coretermslist { display:none; }');
    addGlobalStyle('body.risk path.riskline, body.risk .coretermslist { display:block !important; }');
    addGlobalStyle('.circles.connection hr { border-width:0; height:2px; }');
    addGlobalStyle('.circles.connection hr.risk { background: linear-gradient(90deg, #fff 50%, #E98310 50%, rgba(0,0,0,0) 0), #E98310; background-size:6px auto; }');

    addGlobalStyle('.coretermslist { font-weight:bold; background:#efefef; padding:10px; ');
    addGlobalStyle('.coretermslist h3 { font-weight:bold; ');
    addGlobalStyle('.coretermslist h3, .coretermslist li label { font-family:helvetica; font-size:inherit; padding:2px; ');
    addGlobalStyle('.coretermslist li label span { background:#ffc550; padding:0 4px; display:inline-block; ');
    addGlobalStyle('.citationmap .results-list>.wrapper li.selected { background:transparent; }');
    addGlobalStyle('.citationmap [data-menu="viewtray"] button { display:none !important; }');



})();