var sidemenu = document.getElementById("sidemenu")


function openMenu()
{
    sidemenu.style.right = "0";
}

function closeMenu()
{
    setTimeout(function() {
        sidemenu.style.right = "-200px";
    }, 300); 
}

var navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        closeMenu(); 
    });
});