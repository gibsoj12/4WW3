function validateSignUp() {
  var data = {};

  const first_name = document.getElementById('fname').value;
  data['first_name'] = first_name;

  const last_name = document.getElementById('lname').value;
  data['last_name'] = last_name;

  const birthday = document.getElementById('bday').value;
  data['birthday'] = birthday;
  
  const email = document.getElementById('email').value;
  data['email'] = email;
  
  const password = document.getElementById('spass').value;
  data['password'] = password;

  const tos = document.getElementById('tos').checked;
  const valid = validateSignUpForm();
  console.log("valid", valid, tos);
  if (validateSignUpForm() && tos) {
    $.ajax({
      type: "POST",
      url: 'user-registration-page-register.php',
      timeout: 20000,
      data: {arguments: JSON.stringify(data)},
      dataType: 'json'})
    .done(function(ret) {
      console.log('Success ', ret);
      window.location = "../index.html";
    }) 
    .fail(function(textStatus) {
      console.log('Fail: ', textStatus['responseText']); 
    });
  }
}

function validateSignUpForm() {
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

    if (password_value !== password_value2) {
      alert_div.style.display = "block";
      alert_div.innerHTML = "Please ensure your passwords match.";
      document.getElementById('rpass').focus();
      setTimeout(() => { alert_div.style.display = "none" }, 3000);
      return false;
    }

    return true;
}

function validateSignIn() {
  var formData = {};
  
  const email = document.getElementById('email-login').value;
  formData['email'] = email;
  
  const password = document.getElementById('pass').value;
  formData['password'] = password;

  if (validateSignInForm()) {
    $.ajax({
      type: "POST",
      url: 'user-registration-page-login.php',
      timeout: 20000,
      data: {arguments: email},
      dataType: 'json' })
    .done(function(obj) {
      if (!obj.error) {
        console.log(obj);
        response = obj['response_data'];
        if (response['password'] === password) {
          console.log('Success ', obj);
          window.location = "../index.html";
        } 
        else {
          let alert_div = document.getElementById("signin-alert");
          alert_div.style.display = "block";
          alert_div.innerHTML = "Password is incorrect, please try again."
          document.getElementById('pass').focus();
          setTimeout(() => { alert_div.style.display = "none" }, 3000);
          console.log('Password is incorrect');
        }
        
      } else {
        console.log('Error ', obj.error);
      }
        
    }) 
    .fail(function(textStatus) {
      console.log('Fail: ', textStatus['responseText']); 
    });
  }
}

function validateSignInForm() {
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

  return true;
}

function signOut() {
  if (validateSignInForm()) {
    $.ajax({
      type: "POST",
      url: 'user-registration-page-logout.php',
      timeout: 20000,
      data: {arguments: email},
      dataType: 'json' })
    .done(function(obj) {
      if (!obj.error) {
        console.log(obj);
        response = obj['response_data'];
      } else {
        console.log('Error ', obj.error);
      }
        
    }) 
    .fail(function(textStatus) {
      console.log('Fail: ', textStatus['responseText']); 
    });
  }
}