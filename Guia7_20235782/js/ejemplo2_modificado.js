const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];
const nombreINput = document.getElementById("idNombre");
const apellidoInput = document.getElementById("idApellidos");
const labelContra = document.getElementById("idPassword");
const labelRepetirContra = document.getElementById("idPasswordRepetir");
const fechaInput = document.getElementById("idFechaNac");
const emailInput = document.getElementById("idCorreo");
const fileInput = document.getElementById("idArchivo");
const paisInput = document.getElementById("idCmPais");


const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
const ahora = new Date();
let correoValido = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/; //voy a usar el mismo de la guía 6
const bodyModal = document.getElementById("idBodyModal");

const recorrerFormulario = function () {
    let totText = 0;
    let totRadio = 0;
    let totCheck = 0;
    let totDate = 0;
    let totSelect = 0;
    let totFile = 0;
    let totPass = 0;
    let totEmail = 0;
    let intereses = 0;
    let carrera = 0;
    const intesesArray = []; //para meter los intereses que seleccione y mostrarlos en el modal
    const carreraArray = [];
 
    let elementos = formulario.elements;
    let totalElementos = elementos.length;
    
    for (let index = 0; index < totalElementos; index++) {
        let elemento = elementos[index];
        let tipoElemento = elemento.type;
        let tipoNode = elemento.nodeName;

        if (tipoElemento == "text" && tipoNode == "INPUT") {
            if (elemento.value == "" || elemento.value.trim() =="") {
                alert(`Hay campos vacíos.`)
                return;
            }
            totText++;
        } else if (tipoElemento == "password" && tipoNode == "INPUT") {
            if (elemento.value == "" || elemento.value.trim() == "") {
                alert(`La contraseña no puede estar vacía.`)
                return;
            } else {
                if (labelContra.value !== labelRepetirContra.value) {
                    alert("La contraseña no es la misma. Intente de nuevo.")
                    return;
                }
            }
            totPass++;
        } else if (tipoElemento == "email" && tipoNode == "INPUT") {
            if (elemento.value == "" || elemento.value.trim() == "") {
                alert(`El email no puede estar vacía.`)
                return;
            } else {
                if (!correoValido.test(emailInput.value)) {
                    alert("El correo no cumple con el formato complemento@dominio.com'.")
                    return;
                }
            }
            totEmail++;
        } else if (tipoElemento == "radio" && tipoNode == "INPUT") {
            if (elemento.checked) {
                carreraArray.push(elemento.value);
                carrera++;
            }
            console.log(elemento);
            totRadio++;
        } else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
            if (elemento.checked) {
                intesesArray.push(elemento.value);
                intereses++;
            }
            totCheck++;
        } else if (tipoElemento == "file" && tipoNode == "INPUT") {
            if (elemento.files.length === 0) {
                alert("Debe selecccionar un archivo.");
                return;
            }
            totFile++;
        } else if (tipoElemento == "date" && tipoNode == "INPUT") {
            if (elemento.value == "" || elemento.value.trim() == "") {
                alert(`La fecha no puede estar vacía.`)
                return;
            } else {
                //Solo contemple el caso de que fuera mayor, no qué pasaría si fuera igual
                const fechaIngresada = new Date(fechaInput.value);
                const fechaActual = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
                console.log(fechaActual)
                console.log(fechaIngresada)
                if (fechaIngresada > fechaActual) {
                    alert("La fecha no puede ser posterior a la actual");
                    return;
                }
            }
            totDate++;
        } else if (tipoNode == "SELECT") {
            if (elemento.selectedIndex === 0) {
                alert("Seleccione un país.");
                return;
            }
            totSelect++;
        }
    }

    if (intereses === 0) {
        alert("Selecciona al menos 1 interés.");
        return;
    }
    //yo  sé que no es lo más eficiente, pero el cerebro no me dio para más profe, todas las neuronas las deje en el ejemplo1_modificado.js
    if (carrera === 0) {
        alert("Selecciona 1 carrera.")
        return;
    }

    //pa limpiar el modal
    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }

    const nombreTexto = document.createElement("h4");
    nombreTexto.textContent = `Nombre: ${nombreINput.value}`;
    bodyModal.appendChild(nombreTexto);


    const apellidoTexto = document.createElement("h4");
    apellidoTexto.textContent = `Apellido: ${apellidoInput.value}`;
    bodyModal.appendChild(apellidoTexto);

    const fechaTexto = document.createElement("h4");
    fechaTexto.textContent = `Fecha nacimiento: ${fechaInput.value}`;
    bodyModal.appendChild(fechaTexto);


    const emailTexto = document.createElement("h4");
    emailTexto.textContent = `Email: ${emailInput.value}`;
    bodyModal.appendChild(emailTexto);


    const contraTexto = document.createElement("h4");
    contraTexto.textContent = `Contraseña: ${labelRepetirContra.value}`;
    bodyModal.appendChild(contraTexto);

    const fileTexto = document.createElement("h4");
    fileTexto.textContent = `Archivo: ${fileInput.files[0].name}`;
    bodyModal.appendChild(fileTexto);

    const paisTexto = document.createElement("h4");
    const paisNombre = paisInput.options[paisInput.selectedIndex].text;
    paisTexto.textContent = `Pais seleccionado: ${paisNombre}`;
    bodyModal.appendChild(paisTexto);

    const interesesTexto = document.createElement("h4");
    interesesTexto.textContent = `Intereses: ${intesesArray.join(', ')}`;
    bodyModal.appendChild(interesesTexto);


    const carreraTexto = document.createElement("h4");
    carreraTexto.textContent = `Carrera: ${carreraArray.join(', ')}`;
    bodyModal.appendChild(carreraTexto);

    modal.show();
};

button.onclick = () => {
    recorrerFormulario();
};