document.getElementById("lgn-btn").addEventListener("click", function(){

    const usernameIn = document.getElementById("usernameIn");
    const username = usernameIn.value;

    const pass = document.getElementById("pass");
    const password =  pass.value;

    if(username=="admin" && password=="admin123")
    {

        window.location.assign("home.html");
    }
    else
    {
        alert("Wrong Info");
    }

    
})