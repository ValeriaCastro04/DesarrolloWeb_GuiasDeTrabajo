const containerEstudiantes = document.querySelector(
        "#idContainerEstudiantes"
);
let carnetValido = /[A-Z]{2}[0-9]{3}/;
let nombreValido = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/;
let duiValido = /[0-9]{8}-[0-9]{1}/;
let nitValido = /[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]{1}/;
let fechaValida = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/; //ejemplos que encontre: https://es.stackoverflow.com/questions/73759/expresi%C3%B3n-regular-para-validar-fecha-y-hora-dd-mm-yyyy-hhmm
let correoValido = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/; //no se especificó mucho del correo. Así que asumí un formato como este: nat.pon1@ese.n.com
let edadValida = /^\d{2}$/;
    const btnAddEstudiante = document.querySelector("#idBtnAgregarEstudiante");
    const btnViewEstudiantes = document.querySelector("#idBtnMostrarEstudiantes");
    btnAddEstudiante.addEventListener("click", addEstudiantes);
    btnViewEstudiantes.addEventListener("click", viewEstudiantes);
let arrayEstudiantes = new Array();
viewEstudiantes();

    function addEstudiantes() {
        const inputCarnet = document
            .querySelector("#inputCarnet")
            .value.toString().trim()
        const inputNombre = document
            .querySelector("#inputNombre")
            .value.toString().trim()
        const inputDUI = document
            .querySelector("#inputDUI")
            .value.toString().trim()
        const inputNIT = document
            .querySelector("#inputNIT")
            .value.toString().trim()
        const inputFecha = document
            .querySelector("#inputFecha")
            .value.toString().trim()
        const inputCorreo = document
            .querySelector("#inputCorreo")
            .value.toString().trim()
        const inputEdad = document
            .querySelector("#inputEdad")
            .value.toString().trim()
        
        let fechaParts = inputFecha.split("-"); //le meti estoy porque la fecha se formato aaaa/mm/dd
        console.log(fechaParts);
        let edadFormateada = parseInt(inputEdad);
        let fechaFormatoDDMMYYYY = `${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`;
        
        //Profe, soy consciente que no es la forma más elegante de hacerlo, pero tengo mucho sueño :(.
        if (!carnetValido.test(inputCarnet)) {
            alert(`${inputCarnet} no cumple con el formato válido.`);
            return;
        } else if (!nombreValido.test(inputNombre)) {
            alert(`${inputNombre} no cumple con el formato válido.`);
            return;
        } else if (!duiValido.test(inputDUI)) {
            alert(`${inputDUI} no cumple con el formato válido.`);
            return;
        } else if (!nitValido.test(inputNIT)) {
            alert(`${inputNIT} no cumple con el formato válido.`);
            return;
        } else if (!fechaValida.test(fechaFormatoDDMMYYYY)) {
            alert(`${fechaFormatoDDMMYYYY} no cumple con el formato dd/mm/aaaa.`);
            return;
        } else if (!correoValido.test(inputCorreo)) {
            alert(`${inputCorreo} no cumple con el formato 'complemento@dominio.com'.`);
            return;
        } else if (!edadValida.test(edadFormateada) || edadFormateada < 12 || edadFormateada >99) {
            alert(`${edadFormateada} debe tener solo números. También, debe estar entre 12 y 99.`); //lo del rango lo asumi para que se viera más realista
            return;
        }
        if (inputCarnet != "" && inputNombre != "" && inputDUI != "" && inputNIT != "" && inputFecha != "" && inputCorreo != "" && inputEdad != "") {
            const estudiante = {
                carnet: inputCarnet,
                nombre: inputNombre,
                dui: inputDUI,
                nit: inputNIT, 
                fechaNacimiento: inputFecha, 
                correo: inputCorreo,
                edad: inputEdad
            }

            arrayEstudiantes.push(estudiante);
            localStorage.setItem("estudiantes", JSON.stringify(arrayEstudiantes));
            alert("Se registro el nuevo estudiante");
            document.querySelector("#inputCarnet").value = "";
            document.querySelector("#inputNombre").value = "";
            document.querySelector("#inputDUI").value = "";
            document.querySelector("#inputNIT").value = "";
            document.querySelector("#inputFecha").value = "";
            document.querySelector("#inputCorreo").value = "";
            document.querySelector("#inputEdad").value = "";
            document.querySelector("#inputCarnet").focus();
            viewEstudiantes();
        } else {
            alert("Faltan campos que completar");
        }
    }
function viewEstudiantes() {
        
    arrayEstudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
        let totalEstudiantes = arrayEstudiantes.length;
        if (totalEstudiantes > 0) {
            let carnet;
            let nombres;
            let dui;
            let nit;
            let fechaNacimiento;
            let correo;
            let edad;
            let table = "<table class='table table-light table-striped'>";
            table += "<thead>";
            table += "<tr>";
            table += "<th scope='col' style='width: 5%;'>#</th>";
            table += "<th scope='col' style= 'width: 15%;'>Carnet</th>";
            table += "<th scope='col'>Nombres</th>";
            table += "<th scope='col'>DUI</th>";
            table += "<th scope='col'>NIT</th>";
            table += "<th scope='col'>Fecha nacimiento</th>";
            table += "<th scope='col'>Correo</th>";
            table += "<th scope='col'>Edad</th>";
            table += "</tr>";
            table += "</thead>";
            table += "</tbody>";
            let i = 0;
            for (const estudiante of arrayEstudiantes) {
                i++;
                let { carnet, nombre, dui, nit, fechaNacimiento, correo, edad} = estudiante;
                table += `<tr>`;
                table += `<td scope='row' style='font-weight: bold;'>${i} </td>`;
                table += `<td> ${carnet} </td>`;
                table += `<td> ${nombre} </td>`;
                table += `<td> ${dui} </td>`;
                table += `<td> ${nit} </td>`;
                table += `<td> ${fechaNacimiento} </td>`;
                table += `<td> ${correo} </td>`;
                table += `<td> ${edad} </td>`;
                table += `</tr>`;
            }
            table += "</tbody>";
            table += "</table>";
            containerEstudiantes.innerHTML = table;
        } else {
            alert("No se han registrado estudiantes");
        }
    }