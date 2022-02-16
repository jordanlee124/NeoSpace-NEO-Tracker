/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("openSidebar").style.visibility = "hidden";
}
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("openSidebar").style.visibility = "visible";
}

function openRight() {
    document.getElementById("rightSidebar").style.width = "400px";
    document.getElementById("rightSidebar").style.padding = "20px";
    document.getElementById("main").style.marginRight = "250px";

}

function closeRight() {
    document.getElementById("rightSidebar").style.width = "0px";
    document.getElementById("rightSidebar").style.padding = "0px";
    document.getElementById("main").style.marginRight = "0px";

}


//For each of the filters in the sidebar, expand the sidebar
function myFunction(id) {
  document.getElementById(id).classList.toggle("show");
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
