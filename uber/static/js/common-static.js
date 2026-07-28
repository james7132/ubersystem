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

// Native Bootstrap 5 Modal implementation replacing Bootbox (Zero jQuery)
window.bootbox = {
    alert: function(options, callback) {
        var message = typeof options === 'string' ? options : (options.message || '');
        var title = (typeof options === 'object' && options.title) ? options.title : 'Alert';
        var cb = (typeof options === 'object' && options.callback) ? options.callback : callback;
        
        var modalEl = document.createElement('div');
        modalEl.className = 'modal fade';
        modalEl.tabIndex = -1;
        modalEl.innerHTML = 
            '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                    '<div class="modal-header">' +
                        '<h5 class="modal-title">' + title + '</h5>' +
                        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                    '</div>' +
                    '<div class="modal-body">' + message + '</div>' +
                    '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        document.body.appendChild(modalEl);

        var modal = (typeof bootstrap !== 'undefined' && bootstrap.Modal) ? new bootstrap.Modal(modalEl) : null;
        if (modal) {
            modal.show();
            modalEl.addEventListener('hidden.bs.modal', function() {
                modalEl.remove();
                if (cb) cb();
            });
        } else {
            alert(message.replace(/<[^>]+>/g, ''));
            modalEl.remove();
            if (cb) cb();
        }
    },

    confirm: function(options, callback) {
        var message = typeof options === 'string' ? options : (options.message || '');
        var title = (typeof options === 'object' && options.title) ? options.title : 'Confirm';
        var cb = typeof options === 'function' ? options : ((typeof options === 'object' && options.callback) ? options.callback : callback);

        var modalEl = document.createElement('div');
        modalEl.className = 'modal fade';
        modalEl.tabIndex = -1;
        modalEl.innerHTML = 
            '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                    '<div class="modal-header">' +
                        '<h5 class="modal-title">' + title + '</h5>' +
                        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                    '</div>' +
                    '<div class="modal-body">' + message + '</div>' +
                    '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-secondary btn-cancel" data-bs-dismiss="modal">Cancel</button>' +
                        '<button type="button" class="btn btn-primary btn-confirm">OK</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        document.body.appendChild(modalEl);

        var confirmed = false;
        var modal = (typeof bootstrap !== 'undefined' && bootstrap.Modal) ? new bootstrap.Modal(modalEl) : null;

        if (modal) {
            modalEl.querySelector('.btn-confirm').addEventListener('click', function() {
                confirmed = true;
                modal.hide();
            });
            modalEl.addEventListener('hidden.bs.modal', function() {
                modalEl.remove();
                if (cb) cb(confirmed);
            });
            modal.show();
        } else {
            confirmed = confirm(message.replace(/<[^>]+>/g, ''));
            modalEl.remove();
            if (cb) cb(confirmed);
        }
    },

    dialog: function(options) {
        this.confirm(options);
    }
};
