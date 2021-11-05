function validateSignUp() {
    //name validation
    let first_name_value = document.forms["signup-form"]["fname"].value;

    if (first_name_value == "") {
      alert("Name is a required field.");
      document.getElementById('fname').focus();
      return false;
    }

    let last_name_value = document.forms["signup-form"]["lname"].value;

    if (last_name_value == "") {
      alert("Password is a required field.");
      document.getElementById('lname').focus();
      return false;
    }

    // password validation
    let password_value = document.forms["signup-form"]["spass"].value;

    if (password_value == "") {
      alert("Name is a required field.");
      document.getElementById('spass').focus();
      return false;
    }

    // email validation
    let email_value = document.forms["signup-form"]["email"].value;
    var regex = /\S+@\S+\.\S+/;

    if (email_value == "") {
        alert("Email is a required field");
        document.getElementById('email').focus();
        return false;
    }
    else if (!regex.test(email_value)) {
        alert("Email is invalid");
        document.getElementById('email').focus();
        return false;
    }
  }

  function validateSignIn() {
    // password validation
    let password_value = document.forms["signin-form"]["pass"].value;

    if (password_value == "") {
      alert("Password is a required field.");
      document.getElementById('pass').focus();
      return false;
    }

    // email validation
    let email_value = document.forms["signin-form"]["email-login"].value;
    var regex = /\S+@\S+\.\S+/;

    if (email_value == "") {
        alert("Email is a required field");
        document.getElementById('email-login').focus();
        return false;
    }
    else if (!regex.test(email_value)) {
        alert("Email is invalid");
        document.getElementById('email-login').focus();
        return false;
    }
  }
  