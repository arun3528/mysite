$(function() {
  var name, email, message;
  $('.error').hide();
  $('.message').hide();
  $("#sendemail").click(function() {
    // validate and process form here
    $('.error').hide();
    name = $('[name="name"]');
    if (name.val() == "") {
      $('.error').show();
      name.focus();
      return false;
    }
    email = $('[name="email"]');
    if (email.val() == "") {
      $('.error').show();
      email.focus();
      return false;
    }
    message = $('[name="message"]');
    if (message.val() == "") {
      $('.error').show();
      message.focus();
      return false;
    }

    var dataString = 'name='+ name + '&email=' + email + '&message=' + message;
    $.ajax({
      type: "POST",
      url: "http://www.arunganeshan.com/php/mail.php",
      datatype: "json",
      data: dataString,
      success: function(e) {
        $('.message').show();
        name.val('');
        email.val('');
        message.val('');
      },
      error : function(e){
        $('.error').show();
      }
    });
    return false;
  });
});