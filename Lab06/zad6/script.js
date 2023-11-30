var atLeast8Chars = function (str) {
        return str.length >= 8;
}
var hasUpperCase = function (str) {
        return str.toLowerCase() != str;
}
var hasSpecialChar = function (str) {
        return !str.match(/^[0-9a-zA-Z]+$/);
}
var hasDigit = function (str) {
        return str.match(/[0-9]/);
}

var atLeast8charsBool = false;
var hasUpperCaseBool = false;
var hasSpecialCharBool = false;
var hasDigitBool = false;

const confirm_password = document.getElementById("confirm_password");
const new_password = document.getElementById("new_password");
function handleEnterKeyPress(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();

        // Save inputs
        var new_password_value = document.getElementById("new_password").value;
        var confirm_password_value = document.getElementById("confirm_password").value;

        // Check if password is valid
        if (new_password_value != confirm_password_value) {
            alert("Passwords do not match");
            return;
        } else {
            // Update checkboxes with id's length_check, capital_check, special_check, number_check
            atLeast8charsBool = atLeast8Chars(new_password_value);
            hasUpperCaseBool = hasUpperCase(new_password_value);
            hasSpecialCharBool = hasSpecialChar(new_password_value);
            hasDigitBool = hasDigit(new_password_value);
            document.getElementById("length_check").checked = atLeast8charsBool;
            document.getElementById("capital_check").checked = hasUpperCaseBool;
            document.getElementById("special_check").checked = hasSpecialCharBool;
            document.getElementById("number_check").checked = hasDigitBool;
        }

        // Clear inputs
        document.getElementById("new_password").value = "";
        document.getElementById("confirm_password").value = "";
    }
}

confirm_password.addEventListener("keypress", handleEnterKeyPress);
new_password.addEventListener("keypress", handleEnterKeyPress);

function togglePasswordVisibility(input_id){
    var input = document.getElementById(input_id);
    var icon = document.getElementById(input_id + "_icon");
     console.log(icon)
    if (input.type === "password") {
        input.type = "text";
        icon.src = "icons/eye_off.svg";
    } else {
        input.type = "password";
        icon.src = "icons/eye_on.svg";
    }
}