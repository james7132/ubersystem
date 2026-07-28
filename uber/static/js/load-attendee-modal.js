document.addEventListener('DOMContentLoaded', function () {
    var modalEl = document.getElementById('attendee_modal');
    var attendee_modal = (modalEl && typeof bootstrap !== 'undefined') ? new bootstrap.Modal(modalEl) : null;

    var loadAttendeeModal = function() {
        if (!attendee_modal) return false;
        var form_link = window.location.hash;
        if (form_link && form_link.includes('attendee_form')) {
            form_link = form_link.substr(1);
            attendee_modal.show();
            var contentContainer = modalEl.querySelector('.modal-content');
            fetch('../registration/' + form_link)
                .then(function(res) { return res.text(); })
                .then(function(html) {
                    if (contentContainer) {
                        contentContainer.innerHTML = html;
                        if (contentContainer.querySelector('#attendeeData')) {
                            window.dispatchEvent(new Event('runJavaScript'));
                        } else {
                            if (typeof showErrorMessage === 'function') {
                                showErrorMessage("Form loading failed.");
                            }
                            window.location.hash = "";
                            window.location.reload();
                        }
                    }
                }).catch(function() {});
        }
    };

    document.addEventListener('keydown', function(event) {
        if (attendee_modal != null && event.keyCode == 27) {
            attendee_modal.hide();
        }
    });

    loadAttendeeModal();
    window.addEventListener('hashchange', function() { loadAttendeeModal(); });

    if (modalEl) {
        modalEl.addEventListener('hidden.bs.modal', function () {
            var scrollV, scrollH, loc = window.location;
            if ("pushState" in history) {
                history.pushState("", document.title, loc.pathname + loc.search);
            } else {
                scrollV = document.body.scrollTop;
                scrollH = document.body.scrollLeft;
                loc.hash = "";
                document.body.scrollTop = scrollV;
                document.body.scrollLeft = scrollH;
            }
        });
    }
});