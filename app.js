function load() {
    var cssText = require('./style.css');
    var cssArr = cssText.split('\n');
    var insertCss = require('insert-css');

    // function insertAfter(newNode, referenceNode) {
    //     referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    // }
    
    // window.document.designMode = "On";
    var pre = document.querySelector('pre');
    var i = 0;
    var j = 0;
    var k = 0;
    var str = '';

    var sheet = (function() {
        // Create the <style> tag
        var style = document.createElement("style");

        // Add a media (and/or media query) here if you'd like!
        // style.setAttribute("media", "screen")
        // style.setAttribute("media", "only screen and (max-width : 1024px)")

        // WebKit hack :(
        style.appendChild(document.createTextNode(""));

        // Add the <style> element to the page
        document.head.appendChild(style);

        return style.sheet;
    })();
    var refreshIntervalOne = setInterval(function() {
        if (j > (cssArr.length - 1)) {
            clearInterval(refreshIntervalOne);
            return;
        }
        i = 0;
        str = cssArr[j] + '\n';

        var refreshIntervalTwo = setInterval(function() {
            if (i > (str.length - 1)) {
                clearInterval(refreshIntervalTwo);
                return;
            }
            if (str[i] === '}') {
                sheet.insertRule(cssText.split('}')[k] + '}', 0);
                k++;
            }
            pre.append(str[i]);

            i++;
        }, parseInt(500 / str.length));
        j++;
        // body.append('\n');
    }, 550);


    var editable = document.getElementById('editor');
    editable.addEventListener('input', function() {
        // sheet.insertRule(cssText.split('}')[k] + '}', 0);
        var styleElement = insertCss(document.querySelector('pre').innerText, document.querySelector('style').nextSibling);
        console.log('Hey, somebody changed something in my text!');
    });
}

window.onload = load;
