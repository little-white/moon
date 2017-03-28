function load() {
    var cssText = require('./style.css');
    var partText = require('./part.html');
    var insertCss = require('insert-css');
    var typing = require('./typing.js');

    var sheet = (function() {
        var style = document.createElement("style");
        style.appendChild(document.createTextNode(""));

        // Add the <style> element to the page
        document.head.appendChild(style);

        return style.sheet;
    })();

    typing({
        content: partText,
        selector: document.getElementById('part'),
        contentEndCallback: function() {
            document.getElementById('part-view').insertAdjacentHTML('beforeend', document.getElementById('part').innerText);
        }
    });


    setTimeout(function() {
        var k = 0;
        typing({
            content: cssText,
            selector: document.querySelector('pre'),
            strEndCallback: function(word) {
                if (word === '}') {
                    sheet.insertRule(cssText.split('}')[k] + '}', 0);
                    k++;
                }
            },
            lineEndCallback: function(){
                window.scrollTo(0, document.body.scrollHeight);
            }
        });
    }, partText.split('\n').length * 550 + 1000);


    var editable = document.getElementById('editor');
    editable.addEventListener('input', function() {
        var styleElement = insertCss(document.querySelector('pre').innerText, document.querySelector('style').nextSibling);
    });
}

window.onload = load;
