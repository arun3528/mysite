$(function() {
  $('.error').hide();
  $('.message').hide();
  $("#sendemail").click(function() {
    // validate and process form here

    $('.error').hide();
    var name = $('[name="name"]').val();
    if (name == "") {
      $('.error').show();
      $("input#name").focus();
      return false;
    }
    var email = $('[name="email"]').val();
    if (email == "") {
      $('.error').show();
      $("input#email").focus();
      return false;
    }
    var message = $('[name="message"]').val();
    if (message == "") {
      $('.error').show();
      $("input#message").focus();
      return false;
    }

    var dataString = 'name='+ name + '&email=' + email + '&message=' + message;
    $.ajax({
      type: "POST",
      url: "http://arunganeshan.com/php/mail.php",
      datatype: "json",
      data: dataString,
      success: function(e) {
        $('.message').show();
        //$('#contact_form').html("<div id='message'></div>");
        //$('#message').html("<h2>Contact Form Submitted!</h2>")
        //  .append("<p>We will be in touch soon.</p>")
        //  .hide()
        //  .fadeIn(1500, function() {
        //    $('#message').append("<img id='checkmark' src='images/check.png' />");
        //  });
      },
      error : function(e){
        $('.error').show();
      }
    });
return false;
  });
});