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
  // var recurringInput = $("#recurring");
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
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this bill!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your bill has been deleted!", {
          icon: "success",
        });
        var currentID = $("#delete").val();
      deleteBill(currentID);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
   
    
  });

  // This function does an API call to delete bills
  function deleteBill(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/bills/" + id
    })
      .then(function () {
        window.location.href = "/dashboard";
      });
  }


  var isToggleOff = true;
  //click event for paid toggle button
  $(document).on("click", ".toggle", function () {
    if (isToggleOff) {
      $(this).removeClass("fa-toggle-off").addClass("fa-toggle-on");
      isToggleOff = false;
      
      swal({
        title: "PAID!",
        icon: "success",
      });
    //   $(this).parent.();
      // console.log( $(this).parent().parent().next("img"));

    }
    else {
      $(this).removeClass("fa-toggle-on").addClass("fa-toggle-off");
      isToggleOff = true;
    }

  });


  // click event for update button
  $("#update").on("click", function handleUpdate(event) {
    event.preventDefault();
  
    var currentID = $("#update").val();
    var paid = $(this).attr("data-paid");
    console.log("what is this: " + paid);
    // paid = !paid;
    if(paid === "false"){
      paid = "true";
      $("#update").attr("data-paid", "true");
    } else if (paid === "true") {
      paid = "false";
      $("#update").attr("data-paid", "false");
    }
   
    updateBill(currentID,paid);
  });


  // This function does an API call to update a bill
  function updateBill(id, paid) {
    $.ajax({
      method: "PUT",
      url: "/api/bills/" + id,
      data: {paid: paid}
    })
      .then(function () {
        // window.location.href = "/dashboard";
      });
  }



});

