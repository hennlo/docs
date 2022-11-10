var coll = document.getElementsByClassName("dropdown");
var i;


for (i = 0; i < coll.length; i++) {
    
    coll[i].addEventListener("click", function() {
      var parent = this.parentElement;
      console.log("Parent: ", parent);
      var sidebar_sublist = parent.getElementsByClassName("sidebar-sublist")[0];

      
      var list_item = this.getElementsByClassName("sidebar-item");

      console.log("Sub_List: ", sidebar_sublist);

      //list_item.classList.toggle("active");
      
      sidebar_sublist.classList.toggle("unfolded");
      if (sidebar_sublist.style.maxHeight){
        sidebar_sublist.style.maxHeight = null;
      } else {
        sidebar_sublist.style.maxHeight = sidebar_sublist.scrollHeight + "px";
      } 
    });
}

////////////////////
// Add Active Link selection on all leave nodes
var leafs = document.getElementsByClassName("sidebar-leaf");
var i;
console.log("LEAFS:", leafs);

for (i = 0; i < leafs.length; i++) {
  console.log("parents:", leafs[i].parentElement.parentElement);
  leafs[i].addEventListener("click", function() {
      
      this.classList.add("active");
    
      var parent = this.parentElement;
      if ( parent.parentElement.classList.contains("sidebar-sublist") ) {
        parent.parentElement.add("unfolded");
        parent.parentElement.style.display = "block";
        //parent.parentElement.style.maxHeight = sidebar_sublist.scrollHeight + "px";
      } 
       
      
    });
}

