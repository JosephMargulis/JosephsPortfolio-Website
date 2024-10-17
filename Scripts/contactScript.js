document.addEventListener('DOMContentLoaded', function() 
{
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(event) 
    { 
        setTimeout(function() 
        {
            form.reset(); 
        }, 500); 
    });
});