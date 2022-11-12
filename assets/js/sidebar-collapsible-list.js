var coll = document.getElementsByClassName("dropdown");
var i;


for (i = 0; i < coll.length; i++) {
    
    coll[i].addEventListener("click", function() {
      var parent = this.parentElement;
      var sidebar_sublist = parent.getElementsByClassName("sidebar-sublist")[0];

      
      var nested_arrow = this.getElementsByClassName("sidebar-nested-arrow")[0];

      var list_item = this.getElementsByClassName("sidebar-item");

      sidebar_sublist.classList.toggle("unfolded");
      nested_arrow.classList.toggle("sidebar-nested-arrow-unfolded");
      if (sidebar_sublist.style.display === "block") {
        sidebar_sublist.style.display = "none";
      } else {
        sidebar_sublist.style.display = "block";
      }
      
      // Unfold effect instead of block
      //if (sidebar_sublist.style.maxHeight){
      //  sidebar_sublist.style.maxHeight = null;
      //} else {
      // sidebar_sublist.style.maxHeight = sidebar_sublist.scrollHeight + "px";
      //} 

    });
}



////////////////////
// Add Active Link selection on all leave nodes
var leafs = document.getElementsByClassName("sidebar-leaf");
const list_items = Array.from(leafs);
var i;

var selectedolditem = sessionStorage.getItem("selectedolditem");

// Initialize leaf links
for (i = 0; i < leafs.length; i++) {

  // Attach active-leaf class from previous page
  if (selectedolditem !== null) {
      if (  leafs[i].id === selectedolditem ){
        leafs[i].classList.add("active-leaf");

        // Loop back to tier-1 to unfold all lists and intermediate lists
        // Get parent and repeat until at navigation top
        var reached_top = false;
        var parent = leafs[i];

        while ( !reached_top ){
          console.log("current:", parent);
          var parent = parent.parentElement;
          if ( parent.classList.contains("tier-1")  ){
            reached_top = true;
            break;
          }

          if ( parent.classList.contains("sidebar-sublist") ) {
            console.log("inside");
            parent.classList.add("unfolded");
            parent.style.display = "block";
            
            // Get Sibling that must be anchor and has class=dropdown
            console.log("Sibling:", parent.previousElementSibling);//.getElementsByClassName("sidebar-nested-arrow"));
            var anchor_sibling = parent.previousElementSibling;
            console.log("Anchor:", anchor_sibling.getElementsByClassName("sidebar-nested-arrow")[0]);
            anchor_sibling.getElementsByClassName("sidebar-nested-arrow")[0].classList.toggle("sidebar-nested-arrow-unfolded");
            //parent.getElementsByClassName("sidebar-nested-arrow")[0].classList.add("sidebar-nested-arrow-unfolded");
          } 

          
        } 
      }
  }


  // Add event listener
  leafs[i].addEventListener("click", function() {
    // Removes all active links from other leafs
    list_items.forEach(list_item => {
      if ( list_item.classList.contains('active-leaf') ) {
        // Remove active from all sidebar-leafs
        list_item.classList.remove('active-leaf');
      }
    });

    // Obtains anchor and id which is equal to the identifier defined in _data/side-nav.yml
    var id = this.id;
    // If the link is clicked and the page is switch, this tore helps to uniquely identify which link to highlight
    sessionStorage.setItem("selectedolditem", id);
    this.classList.add("active-leaf");
  
      
  });
}