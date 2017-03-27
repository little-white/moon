function load() {
    var cssText = require('./style.css');
    var partText = require('./part.html');
    var insertCss = require('insert-css');

    var sheet = (function() {
        var style = document.createElement("style");
        style.appendChild(document.createTextNode(""));

        // Add the <style> element to the page
        document.head.appendChild(style);

        return style.sheet;
    })();

    function typing(content, selector, callback, final) {
        var i = 0;
        var j = 0;
        var k = 0;
        var str = '';
        var contentArr = content.split('\n');

        var refreshIntervalOne = setInterval(function() {
            if (j > (contentArr.length - 1)) {
                if (final && typeof final === 'function') {
                    final();
                }
                clearInterval(refreshIntervalOne);
                return;
            }
            i = 0;
            str = contentArr[j] + '\n';

            var refreshIntervalTwo = setInterval(function() {
                if (i > (str.length - 1)) {
                    clearInterval(refreshIntervalTwo);
                    return;
                }
                if (callback && typeof callback === 'function') {
                    callback(str, i);
                    
                }

                selector.append(str[i]);
                i++;
            }, parseInt(500 / str.length));
            j++;
            window.scrollTo(0,document.body.scrollHeight);
        }, 550);
    }

    typing(partText, document.getElementById('part'), '', function() {
        document.getElementById('part-view').insertAdjacentHTML('beforeend', document.getElementById('part').innerText);
    });


    setTimeout(function() {
    	var k = 0;
        typing(cssText, document.querySelector('pre'), function(str, i) {
            if (str[i] === '}') {
                sheet.insertRule(cssText.split('}')[k] + '}', 0);
                k++;
            }
        });
    }, partText.split('\n').length * 550 + 1000);




    var editable = document.getElementById('editor');
    editable.addEventListener('input', function() {
        var styleElement = insertCss(document.querySelector('pre').innerText, document.querySelector('style').nextSibling);
    });
}

window.onload = load;
