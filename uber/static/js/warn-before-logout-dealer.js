warnBeforeLogout = function() {
    if (confirm("Are you sure you want to log out?\n\nThis will delete the dealer application information you have entered so far and you will have to fill out the form again. It cannot be undone.")) {
        window.location = "../accounts/logout?delete_prereg=True";
    }
};