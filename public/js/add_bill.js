$(document).ready(function () {
// Getting jQuery references to the post body, title, form, and category select
// var bodyInput = $("#body");
// var titleInput = $("#title");
// var cmsForm = $("#cms");
// var postCategorySelect = $("#category");
  var nameInput = $("#bill-name");
  var amountInput = $("#billamount");
  var duedateInput = $("#due-date");
  var urlInput = $("#url");
  var remindInput = $("#reminder");
  var recurringInput = $("#recurring");
  var billCategorySelect = $("#bill-cat");
  // Giving the postCategorySelect a default value
  billCategorySelect.val("Miscellaneous");
  // Adding an event listener for when the form is submitted
  $("#newbillbtn").on("click", function handleFormSubmit(event) {
    event.preventDefault();

    // Constructing a newPost object to hand to the database
    var newBill = {
      name: nameInput.val().trim(),
      amount: amountInput.val().trim(),
      dueDay: duedateInput.val().trim(),
      URL: urlInput.val().trim(),
      remind: remindInput.val().trim(),
      paid: 0,
      recurring: 0,
      category: billCategorySelect.val().trim()
    };

    console.log(newBill);
    submitBill(newBill);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    //     if (updating) {
    //       newBill.id = postId;
    //       updateBill(newBill);
    //     }
    //     else {
    //       submitBill(newBill);
    //     }
  });

  // Submits a new bill and brings user to dashboard page upon completion
  function submitBill(Post) {
    $.post("/api/bills/", Post, function () {
      window.location.href = "/dashboard";
    });
  }

  //click event for delete button
  $("#delete").on("click", function handleDelete(event) {
    event.preventDefault();
    var currentID = $("#delete").val();
    deleteBill(currentID);
  });

  // This function does an API call to delete bills
  function deleteBill(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/bills/" + id
    })
      .then(function() {
        window.location.href = "/dashboard";
      });
  }

   
  var isToggleOff = true;
  //click event for paid toggle button
  $(document).on("click",".toggle",function () {
    // console.log("hello");
    if (isToggleOff){
      $(this).removeClass("fa-toggle-off").addClass("fa-toggle-on");
      isToggleOff = false;
    //   $(this).parent.();
      // console.log( $(this).parent().parent().next("img"));
    }
    else {$(this).removeClass("fa-toggle-on").addClass("fa-toggle-off");
      isToggleOff = true;
    }
  }); 
});
