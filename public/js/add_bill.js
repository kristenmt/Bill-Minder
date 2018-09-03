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
            recurring: recurringInput.val().trim(),
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


        $.get("/api/user_data").then(function (data) {

            console.log(data.id);

        });

    });

    // Submits a new post and brings user to blog page upon completion
    function submitBill(Post) {
        $.post("/api/bills/", Post, function () {
            window.location.href = "/dashboard";
        });
    }
});