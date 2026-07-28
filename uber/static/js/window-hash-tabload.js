let updateLinkHashes = function() {
    document.querySelectorAll('a.include-tab-hash').forEach(function(link) {
        let baseLink = (link.getAttribute('href') || '').split('#')[0];
        link.setAttribute('href', baseLink + window.location.hash);
    });
};

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-tabs button').forEach(function(btn) {
        btn.addEventListener('click', function() {
            let target = this.getAttribute('data-bs-target');
            if (target) {
                window.location.hash = target;
                updateLinkHashes();
            }
        });
    });

    var tabID = window.location.hash;
    updateLinkHashes();
    var tab = tabID ? document.querySelector(tabID + '-tab') : null;
    var firstBtn = document.querySelector('.nav-tabs button');
    if (tab && typeof bootstrap !== 'undefined') {
        try {
            new bootstrap.Tab(tab).show();
        } catch (e) {
            if (firstBtn) new bootstrap.Tab(firstBtn).show();
        }
    } else if (firstBtn && typeof bootstrap !== 'undefined') {
        new bootstrap.Tab(firstBtn).show();
    }
});