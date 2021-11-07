function validateSignUp() {

    let alert_div = document.getElementById("alert-div");

    //name validation
    let first_name_value = document.forms["signup-form"]["fname"].value;

    if (first_name_value == "") {
      alert_div.style.display = "block";
      alert_div.innerHTML = "First name is a required value."
      document.getElementById('fname').focus();
      setTimeout(() => { alert_div.style.display = "none" }, 3000);
      return false;
    }

    let last_name_value = document.forms["signup-form"]["lname"].value;

    if (last_name_value == "") {
      alert_div.style.display = "block";
      alert_div.innerHTML = "Last name is a required value."
      document.getElementById('lname').focus();
      setTimeout(() => { alert_div.style.display = "none" }, 3000);
      return false;
    }
    
    // email validation
    let email_value = document.forms["signup-form"]["email"].value;
    var regex = /\S+@\S+\.\S+/;

    if (email_value == "") {
      alert_div.style.display = "block";
      alert_div.innerHTML = "Email is a required value."
        document.getElementById('email').focus();
        setTimeout(() => { alert_div.style.display = "none" }, 3000);
        return false;
    }
    else if (!regex.test(email_value)) {
      alert_div.style.display = "block";
      alert_div.innerHTML = "Email format is invalid."
        document.getElementById('email').focus();
        setTimeout(() => { alert_div.style.display = "none" }, 3000);
        return false;
    }

    // password validation
    let password_value = document.forms["signup-form"]["spass"].value;

    if (password_value == "") {
      alert_div.style.display = "block";
      alert_div.innerHTML = "Password is required."
      document.getElementById('spass').focus();
      setTimeout(() => { alert_div.style.display = "none" }, 3000);
      return false;
    }

    let password_value2 = document.forms["signup-form"]["rpass"].value;

    if (password_value2 == "") {
      alert_div.style.display = "block";
      alert_div.innerHTML = "Please re-enter your password.";
      document.getElementById('rpass').focus();
      setTimeout(() => { alert_div.style.display = "none" }, 3000);
      return false;
    }
}

function validateSignIn() {
    let alert_div = document.getElementById("signin-alert");

    // email validation
    let email_val = document.forms["signin-form"]["email-login"].value;
    var regex = /\S+@\S+\.\S+/;

    if (email_val == "") {
      alert_div.style.display = "block";
      alert_div.innerHTML = "Email is a required value."
      document.getElementById('email-login').focus();
      setTimeout(() => { alert_div.style.display = "none" }, 3000);
      return false;
    }
    else if (!regex.test(email_val)) {
      alert_div.style.display = "block";
      alert_div.innerHTML = "Email format is invalid."
      document.getElementById('email-login').focus();
      setTimeout(() => { alert_div.style.display = "none" }, 3000);
      return false;
    }

    // password validation
    let password_val = document.forms["signin-form"]["pass"].value;

    if (password_val == "") {
      alert_div.style.display = "block";
      alert_div.innerHTML = "Please enter your password."
      document.getElementById('pass').focus();
      setTimeout(() => { alert_div.style.display = "none" }, 3000);
      return false;
    }
}
