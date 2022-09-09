document.querySelector('input[type=range]').value = '99'


document.querySelector('input[type=range]').oninput = function () {
    percent = document.querySelector('input[type=range]').value
    document.querySelector('img').style.width = percent + '%'
    document.querySelector('img').style.height = percent + '%'
}

function updateimg() {
    document.querySelector("img").src = window.URL.createObjectURL(this.files[0])

}

const new_img_input = document.querySelector("#new-img")
new_img_input.addEventListener("change", updateimg)


var img = _('img'),
    canvas = _('#cs'),
    result = _('.info'),
    x = '', y = '';
img.addEventListener('click', function (e) {
    if (e.offsetX) {
        x = e.offsetX;
        y = e.offsetY;
    }
    else if (e.layerX) {
        x = e.layerX;
        y = e.layerY;
    }
    useCanvas(canvas, img, function () {
        var p = canvas.getContext('2d')
            .getImageData(x, y, 1, 1).data;
        result.innerHTML = '<p>HEX: ' + rgbToHex(p[0], p[1], p[2]) + '</p>' +
            '<p>RGB:  rgb(' +
            p[0] + ',' +
            p[1] + ',' +
            p[2] + ')</p>';

        color = 'rgb(' +
            p[0] + ',' +
            p[1] + ',' +
            p[2] + ')'
        document.querySelectorAll('.info p')[0].style.color = color
        document.querySelectorAll('.info p')[1].style.color = color
    });
}, false);
img.addEventListener('mousemove', function (e) {
    if (e.offsetX) {
        x = e.offsetX;
        y = e.offsetY;
    }
    else if (e.layerX) {
        x = e.layerX;
        y = e.layerY;
    }

}, false);
function useCanvas(el, image, callback) {
    el.width = image.width;
    el.height = image.height;
    el.getContext('2d')
        .drawImage(image, 0, 0, image.width, image.height);
    return callback();
}
function _(el) {
    return document.querySelector(el);
};
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}