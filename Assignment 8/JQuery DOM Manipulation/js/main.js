//this function removes the li
function removeLi() {
    $(this).parent().remove();
  }
  //this function adds a line through the li text or removes it
  function strikeThrough() {
    if ($(this).parent().css('textDecoration') == 'line-through') {
      $(this).parent().css('textDecoration', 'none');
    } else {
      $(this).parent().css('textDecoration', 'line-through');
    }
  }
  $(document).ready(function() {
    //$('#list-item').focus();
    //this function adds an li and the text from the input box as well as clearing the box out and keeping the cursor inside of the input box
    $('button').click(function() {
      var text = $('#list-item').val();
      $('.add').append('<li>' + '<input class="check" type="checkbox"/>' + text + '<button class="delete">x</button>' + '</li>');
      $('#list-item').val('').focus();
     //this deletes the li by calling in the removeLI Function
      $(document).on('click', '.delete', removeLi);
      //this either adds a line-through or removes it by callin in the strikeThrough function
      $(document).on('click', '.check', strikeThrough);
    });
  });
