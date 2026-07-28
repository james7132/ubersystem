warnBeforeLogout = function() {
    if (confirm("Are you sure you want to log out?\n\nThis will delete all pending registrations in your cart. It cannot be undone.")) {
        window.location = "../accounts/logout?delete_prereg=True";
    }
};