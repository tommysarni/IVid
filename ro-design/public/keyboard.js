/*
    Copyright (c) 2021 by Gregory Schier (https://codepen.io/gschier/pen/VKgyaY)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

function getKey (e) {
    var location = e.location;
    var selector;
    if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
        selector = ['[data-key="' + e.keyCode + '-R"]']
    } else {
        var code = e.keyCode || e.which;
        selector = [
            '[data-key="' + code + '"]',
            '[data-char*="' + encodeURIComponent(String.fromCharCode(code)) + '"]'
        ].join(',');
    }
    return document.querySelector(selector);
}

function pressKey (char) {
    var key = document.querySelector('[data-char*="' + char.toUpperCase() + '"]');
    if (!key) {
        return console.warn('No key for', char);
    }
    key.setAttribute('data-pressed', 'on');
    setTimeout(function () {
        key.removeAttribute('data-pressed');
    }, 200);
}

var h1 = document.querySelector('h1');
var originalQueue = h1.innerHTML;
var queue = h1.innerHTML;

function next () {
    var c = queue[0];
    queue = queue.slice(1);
    h1.innerHTML = originalQueue.slice(0, originalQueue.length - queue.length);
    pressKey(c);
    if (queue.length) {
        setTimeout(next, Math.random() * 200 + 50);
    }
}

h1.innerHTML = "&nbsp;";
setTimeout(next, 500);

document.body.addEventListener('keydown', function (e) {
    var key = getKey(e);
    if (!key) {
        return console.warn('No key for', e.keyCode);
    }

    key.setAttribute('data-pressed', 'on');
});

document.body.addEventListener('keyup', function (e) {
    var key = getKey(e);
    key && key.removeAttribute('data-pressed');
});

function size () {
    var size = keyboard.parentNode.clientWidth / 90;
    keyboard.style.fontSize = size + 'px';
    console.log(size);
}

var keyboard = document.querySelector('.keyboard');
window.addEventListener('resize', function (e) {
    size();
});
size();