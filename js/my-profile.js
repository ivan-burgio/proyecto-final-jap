document.addEventListener("DOMContentLoaded", function () {

    //Traemos el mail del locaStorage y llamamos a la funcion que lo agrega en el campo
    const email = localStorage.getItem("email")
    if (email && email.length > 0) {
        addEmail(email);
    }    
});

function addEmail(email){
    //Se hace referencia al campo mail y se le agrega el mail del localStorage
    let campoEmail = document.getElementById('perfilEmail');

    campoEmail.value = email;
}