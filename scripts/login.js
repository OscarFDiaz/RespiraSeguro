function login(){
    const navigator = document.querySelector('#navigator');
    navigator.resetToPage('login.html'); 
}

function checkUser(name, pass){
    if(name == "" || pass == ""){
        ons.notification.alert('Datos incorrectos!', {title: "Tuvimos un problema!"});
        return;
    }

    // Obtengo a todos los pacientes que existen en la base de datos y los inserto en la pagina PatientsPage, mediante el div que tiene la pagina
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var tempt = this.responseText; //< Asigno la respuesta del servidor a una variable

            if (tempt == "0") {
                ons.notification.alert('Datos incorrectos!', {title: "Tuvimos un problema!"});
            }else{
                localStorage.setItem('userData', tempt);
                const navigator = document.querySelector('#navigator');
                navigator.resetToPage('splitterUser.html');
            }
        }
    };

    xhttp.open("GET", "http://localhost/RespiraSeguro/checkUser.php?name="+ name + "&pass=" + pass, true);

    xhttp.send();
}