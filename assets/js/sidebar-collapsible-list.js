var coll = document.getElementsByClassName("dropdown");
var i;


for (i = 0; i < coll.length; i++) {
    console.log(coll[i])
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var sidebar_sublist = this.getElementsByClassName("sidebar-sublist")[0];
      console.log(sidebar_sublist)
      if (sidebar_sublist.style.maxHeight){
        sidebar_sublist.style.maxHeight = null;
      } else {
        sidebar_sublist.style.maxHeight = sidebar_sublist.scrollHeight + "px";
      } 
    });
  }