function isFunction(fn) {
    return fn && typeof fn === 'function';
}

function isEnd(index, arr) {
    return index > (arr.length - 1);
}
module.exports = function(options) {
    var strIndex = 0;
    var lineIndex = 0;
    var str = '';
    var contentArr = options.content.split('\n');

    if (!options.lineTimer) {
    	options.lineTimer = 500;
    }

    var promiseContent = new Promise(function(resolve, reject) {
        var refreshIntervalOne = setInterval(function() {
            if (isEnd(lineIndex, contentArr)) {
                resolve();
                clearInterval(refreshIntervalOne);
                return;
            }
            strIndex = 0;
            str = contentArr[lineIndex] + '\n';

            // var promiseLine = new Promise(function(resolveIn, rejectIn) {
                var refreshIntervalTwo = setInterval(function() {
                    if (isEnd(strIndex, str)) {
                        clearInterval(refreshIntervalTwo);
                        return;
                    }
                    // resolveIn(str[strIndex]);
                    if (isFunction(options.strEndCallback)) {
                    	options.strEndCallback(str[strIndex]);	
                    }
                    
                    options.selector.append(str[strIndex]);
                    strIndex++;
                }, parseInt(options.lineTimer / str.length));
            // });

            // promiseLine.then(function(word) {
            //     if (isFunction(options.strEndCallback)) {
            //         options.strEndCallback(word);
            //     }
            // });

            lineIndex++;
            if (isFunction(options.lineEndCallback)) {
                options.lineEndCallback();
            }
            // window.scrollTo(0, document.body.scrollHeight);
        }, 550);
    });

    promiseContent.then(function() {
        if (isFunction(options.contentEndCallback)) {
            options.contentEndCallback();
        }
    })
}
