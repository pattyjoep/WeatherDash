// Top Scope Variables
   var SubmitBtn = $("#submitBtn");

   var CityHistoryArray = [];

// Document Ready
    $(document).ready(function(){


    });


    
// Event Listeners
    SubmitBtn.click(function() {
        var TypedValue = $("#searchBar").val()
        
        console.log(TypedValue);
        localStorage.setItem("NewSearchItem", TypedValue);
        
    });

