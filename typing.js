function isFunction(fn) {
    return fn && typeof fn === 'function';
}

function isEnd(index, arr) {
    return index > (arr.length - 1);
}

function typingAnimation(options) {
    var strIndex = 0;
    var lineIndex = 0;
    var str = '';
    var contentArr = options.content.split('\n');
    var preSelector = options.selector.appendChild(document.createElement('pre'));

    if (!options.lineTimer) {
        options.lineTimer = 500;
    }

    var promisesLine = [];
    var promisesWord = [];

    function makePromiseLine(elem, index) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                if (isFunction(options.lineEndCallback)) {
                    options.lineEndCallback();
                }
                word(elem + '\n');
                resolve(elem);
            }, (options.lineTimer + 50) * index)
        })
    }

    contentArr.forEach(function(elem, index) {
        promisesLine.push(makePromiseLine(elem, index));
    })

    Promise.all(promisesLine).then(function(){
        if (isFunction(options.contentEndCallback)) {
            options.contentEndCallback();
        }
    });

    function word(line) {
        function makePromiseWord(elem, index) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    if (isFunction(options.strEndCallback)) {
                        options.strEndCallback(elem);
                    }
                    document.querySelector('pre').append(elem);
                    resolve(elem);
                }, index * parseInt(options.lineTimer / line.length))
            })
        }

        for (var i = 0; i < line.length; i++) {
            promisesWord.push(makePromiseWord(line[i], i));
        }

        Promise.all(promisesWord);
    }


    // var promiseContent = new Promise(function(resolve, reject) {
    //     var refreshIntervalOne = setInterval(function() {
    //         if (isEnd(lineIndex, contentArr)) {
    //             resolve();
    //             clearInterval(refreshIntervalOne);
    //             return;
    //         }
    //         strIndex = 0;
    //         str = contentArr[lineIndex] + '\n';

    //         var refreshIntervalTwo = setInterval(function() {
    //             if (isEnd(strIndex, str)) {
    //                 clearInterval(refreshIntervalTwo);
    //                 return;
    //             }
    //             if (isFunction(options.strEndCallback)) {
    //                 options.strEndCallback(str[strIndex]);
    //             }

    //             preSelector.append(str[strIndex]);
    //             strIndex++;
    //         }, parseInt(options.lineTimer / str.length));

    //         lineIndex++;
    //         if (isFunction(options.lineEndCallback)) {
    //             options.lineEndCallback();
    //         }
    //     }, options.lineTimer + 50);
    // });

    // promiseContent.then(function() {
    //     if (isFunction(options.contentEndCallback)) {
    //         options.contentEndCallback();
    //     }
    // })
}

// if (process.browser) {
//     window.typingAnimation = typingAnimation;
// } else {
//     module.exports = function(){};
// }

module.exports = typingAnimation;
