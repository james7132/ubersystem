// STATIC CONTENT ONLY, included in EVERY PAGE

var setVisible = function (selector, visible) {
    var els = typeof selector === 'string' ? document.querySelectorAll(selector) : (selector ? [selector] : []);
    els.forEach(function(el) {
        el.style.display = visible ? '' : 'none';
    });
};

function getField(field) {
    return document.querySelector('[name="' + field + '"]') || null;
}

function getVal(field) {
    var radio = document.querySelector('[name="' + field + '"]:checked');
    if (radio) return radio.value;
    var el = document.querySelector('[name="' + field + '"]');
    if (!el) return '';
    var val = el.value || '';
    return val.match(/^\W*\d+\W*$/) ? parseInt(val, 10) : val;
}

function focusField(field) {
    var el = getField(field);
    if (el) el.focus();
}

document.addEventListener('DOMContentLoaded', function () {
    if (typeof flatpickr !== 'undefined') {
        flatpickr('.datepicker', { dateFormat: 'Y-m-d' });
    }
});
