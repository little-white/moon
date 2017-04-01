/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = "<!-- 我叫小moon -->\n<!-- 从小在西安长大 -->\n<!-- 我有个梦想，就是在家办公。。。还可以赚很多钱 -->\n<!-- 估计大家都是这么想的吧^_^ -->\n\n<!-- 我想做个名片 -->\n<!-- 总之不能太难看吧 -->\n<!-- 让我们开始吧 -->\n<img src=\"bear.jpeg\">\n<div class=\"summary\">\n    <div class=\"location\">西安</div>\n    <div class=\"name\">moon</div>\n    <div class=\"position\">xxx职位</div>\n    <div class=\"company\">xxx公司</div>\n</div>\n"

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "/**\n  这网络头像也忒大了，让我变小一点\n  只需要改变width\n*/\n\nimg {\n    width: 300px;\n}\n\n\n/**\n  为了让我的名片凸显出来\n  我们加个\n  圆角\n  阴影\n  看起来像那么回事\n*/\n\n#part-view {\n    border-radius: 5px;\n    box-shadow: 0 0 4px red;\n}\n\n\n/**\n  看起来图片的圆角没生效\n  这个好办加个overflow就ok了\n\n  冗余代码先忽略~\n*/\n\n#part-view {\n    overflow: hidden;\n}\n\n\n/**\n  有点小清新的感觉\n  下面处理文字了\n  先把内边距整大一些\n*/\n\n#part-view .summary {\n    padding: 20px;\n}\n\n\n/**\n  地点加粗一下\n*/\n\n#part-view .summary .location {\n    font-weight: bold;\n}\n\n\n/**\n  名字变个色\n*/\n\n#part-view .summary .name {\n    color: #756b6b;\n}\n\n\n/**\n  职位和公司水平对齐\n*/\n\n#part-view .summary .position {\n    float: left;\n}\n\n#part-view .summary .company {\n    float: right;\n}\n\n\n/**\n  此时我想在名字下面加个下划线\n  由于外层有个padding，我们来适当地重构下\n*/\n\n#part-view .summary {\n    padding: 0 !important;\n}\n\n#part-view .summary .location,\n#part-view .summary .name,\n#part-view .summary .position,\n#part-view .summary .company {\n    padding: 5px 20px;\n}\n\n#part-view .summary .name {\n    border-bottom: 1px solid #ccc;\n}\n\n\n/**\n  好了，就到这了，下次继续优化~\n  88\n*/\n"

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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
    if (options.selector) {
        var preSelector = options.selector.appendChild(document.createElement('pre'));
    }


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

    Promise.all(promisesLine).then(function() {
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
                    if (isFunction(options.wordCallback)) {
                        options.wordCallback(elem);
                    }
                    if (preSelector) {
                        preSelector.append(elem);
                    }

                    resolve(elem);
                }, index * parseInt(options.lineTimer / line.length))
            })
        }

        for (var i = 0; i < line.length; i++) {
            promisesWord.push(makePromiseWord(line[i], i));
        }

        Promise.all(promisesWord);
    }
}

module.exports = typingAnimation;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

function load() {
    var cssText = __webpack_require__(1);
    var partText = __webpack_require__(0);
    // var insertCss = require('insert-css');
    function insertCss(elem, css){
        if (elem.styleSheet) {
            elem.styleSheet.cssText = css;
        } else {
            elem.textContent = css;
        }
    }
    var typing = __webpack_require__(2);
    // var typing = require('./typing');

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
                // if (word === '}') {
                //     sheet.insertRule(cssText.split('}')[k] + '}', 0);
                //     k++;
                // }
                insertCss(document.querySelector('style'), document.querySelector('#editor').innerText);
            },
            lineEndCallback: function(){
                window.scrollTo(0, document.body.scrollHeight);
            }
        });
    }, partText.split('\n').length * 550 + 1000);


    var editable = document.getElementById('editor');
    editable.addEventListener('input', function() {
        insertCss(document.querySelector('style'), document.querySelector('#editor').innerText);
    });
}

window.onload = load;


/***/ })
/******/ ]);