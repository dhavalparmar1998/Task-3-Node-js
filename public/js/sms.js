$(function(){
    const api = "http://localhost:9008";
    

    /////////////
    $('#messageForm').submit(function(ev){
        console.log('test');
        ev.preventDefault();
        var record = $('#messageForm').serialize();

        $.ajax({
            type : "POST",
            data: record,
            url : api + '/message',
            success : function(data){
                console.log(data);
                $("#msg-err").html(data.message);
            },
            error:function(err){
                console.log(err);
            }
        })
    })
    /////////////

    /////////////
    $("#libraryForm").submit(function(ev){
      console.log('test')
        ev.preventDefault();
        var record = $("#libraryForm").serialize()

        $.ajax({
            type : "POST",
            data : record,
            url : api + '/library/showLib',
            success : function(data){
                // console.log(data);
                $("#library-err").html(data.message)
                if(data.message === 'Library Inserted'){
                    window.location.href = '/library/showLib'
                }
            },
            error: function(err){
                console.log(err);
            }
        })
    })
    /////////////

    /////////////
    $('#groupForm').submit(function(ev){
        const api = "http://localhost:9008";
        console.log('test')
        ev.preventDefault();
        var record = $("#groupForm").serialize();

        $.ajax({
            type: "POST",
            data : record,
            url : api + '/group/showGrp',
            success : function(data){
                console.log(data);
                $("#group-err").html(data.message);
                if (data.message === 'Group Name Is Inserted') {
                    window.location.href = '/group/showGrp';
                }
            },
            error : function(err){
                console.log(err)
            }
        })
    })
    /////////////


    /////////////
    $("#contactForm").submit(function(ev){
        console.log('test')
        ev.preventDefault()
        var record = $("#contactForm").serialize()

        $.ajax({
            type : 'POST',
            data : record,
            url : api + "/contact",
            success : function(data){
                console.log(data);
                $("#contact-err").html(data.message);
            }
            
        })
    })
    /////////////

    /////////////
    $(".contact-link").on("click", function() {
        var contactId = $(this).data("contact-id");
    
        // Fetch contact details from the server
        $.ajax({
          url: '/contact/' + contactId,
          method: 'GET',
          dataType: 'json',
          success: function(data) {
            // Populate the form fields with the contact data
            $("#userName").val(data.contactName);
            $("#userPhone").val(data.contactPhone);
            $("#userEmail").val(data.contactEmail);
            $("#userMsg").val(""); // Clear the message field
          },
          error: function(err) {
            console.log("Error fetching contact data:", err);
          }
        });
      });

    /////////////
    $(".contact-link").on("click", function() {
        var contactId = $(this).data("contact-id");
    
        if (!contactId) {
          console.log("No contact ID found");
          return;
        }
    
        // Fetch contact details from the server
        $.ajax({
          url: '/contact/' + contactId,
          method: 'GET',
          dataType: 'json',
          success: function(data) {
            if (data && data.contactName) {
              // Populate the form fields with the contact data
              $("#contactName").val(data.contactName);
              $("#contactPhone").val(data.contactPhone);
              $("#contactEmail").val(data.contactEmail);
              $("#userMsg").val(""); // Clear the message field
            } else {
              console.log("No contact data returned");
            }
          },
          error: function(err) {
            console.log("Error fetching contact data:", err.responseText);
          }
        });
      });
    /////////////
    
    /////////////
    $(".library-link").click(function(e) {
      e.preventDefault();  // Prevent the default anchor behavior
      
      var selectedLibraryId = $(this).data('library-id');  // Get the clicked library's ID
      
      // Display the msgList div
      $("#msgList").show();
      
      // Loop through all messages and only show those that belong to the selected library
      $("#msgItems li").each(function() {
          var msgLibraryId = $(this).data('library-id');
          
          if (msgLibraryId === selectedLibraryId) {
              $(this).show();  // Show the message if it matches the selected library
          } else {
              $(this).hide();  // Hide the message if it doesn't match
          }
      });
  });
    /////////////

    /////////////
    $(".group-link").click(function(e) {
      e.preventDefault();  // Prevent default anchor behavior
      
      var selectedGroupId = $(this).data('group-id');  // Get the clicked group's ID
      
      // Display the contactList div
      $("#contactList").show();
      
      // Loop through all contacts and only show those that belong to the selected group
      $("#contactItems li").each(function() {
          var contactGroupId = $(this).data('group-id');
          
          if (contactGroupId === selectedGroupId) {
              $(this).show();  // Show the contact if it matches the selected group
          } else {
              $(this).hide();  // Hide the contact if it doesn't match
          }
      });
  });
    /////////////

    /////////////
    $(".msg-link").click(function(e) {
      e.preventDefault();  // Prevent default anchor behavior

      // Get the message content from the clicked message link
      var messageContent = $(this).text();

      // Populate the userMsg input with the message content
      $("#userMsg").val(messageContent);
  });
    /////////////

    /////////////
    $(document).on('click', '.btn-edit', function () {
      // Get the library name of the current row
      var libraryName = $(this).closest('tr').find('td:first').text();
  
      // Redirect to the form page (addLibraryPage) with the library name as a query parameter
      window.location.href = `/library/addLibraryPage?libraryName=${libraryName}`;
  });
    /////////////

    $(document).on('click', '.btn-delete', function () {
      // Get the library name of the current row
      var libraryName = $(this).closest('tr').find('td:first').text();
      
      // Send an AJAX request to delete the library from the database
      $.ajax({
          url: '/library/deleteLibrary', // Define the route for delete
          type: 'POST',
          data: { libraryName: libraryName },
          success: function (response) {
              // On success, remove the row from the table
              alert(response.message);
              $(this).closest('tr').remove();
          }.bind(this),
          error: function (error) {
              alert('Error deleting library: ' + error.message);
          }
      });
  });
  

})