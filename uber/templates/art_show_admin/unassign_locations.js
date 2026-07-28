var unassignLocation = function(id, removeSpace, alertId) {
    alertId = alertId || "message-alert";
    var formData = new FormData();
    formData.append('id', id);
    formData.append('remove_space', removeSpace);
    formData.append('csrf_token', typeof csrf_token !== 'undefined' ? csrf_token : '');

    fetch('unassign_location', {
        method: 'POST',
        body: formData
    })
    .then(function(response) { return response.json(); })
    .then(function(json) {
        if (typeof hideMessageBox === 'function') hideMessageBox();
        var message = json.message;
        if (json.success) {
            var alertEl = document.getElementById(alertId);
            if (alertEl) {
                alertEl.classList.add("alert-info");
                alertEl.style.display = 'block';
                var span = alertEl.querySelector('span');
                if (span) span.innerHTML = message;
            }
            window.scrollTo(0,0);
            setTimeout(function() { window.scrollTo(0, 0); }, 100);
        } else {
            if (typeof showErrorMessage === 'function') showErrorMessage(message, alertId);
        }
    })
    .catch(function() {
        if (typeof showErrorMessage === 'function') {
            showErrorMessage('Unable to connect to server, please try again.', alertId);
        }
    });
};

var confirmUnassignLocation = function(id, label, alertId) {
    if (confirm('Unassign location ' + label + ' from this artist?\n\nClick OK to Unassign, or Cancel to keep.')) {
        var removeSpace = confirm('Do you also want to REMOVE the requested table/panel space from the application?') ? 'true' : '';
        unassignLocation(id, removeSpace, alertId);
    }
};