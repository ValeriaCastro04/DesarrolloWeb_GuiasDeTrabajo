const containerEstudiantes = document.querySelector("#idContainerEstudiantes");
const btnPromedio = document.querySelector("#idBtnPromedio");

btnPromedio.addEventListener("click", generarEstudiantes);


function generarEstudiantes() {
    let arrayEstudiante = new Array();
    let totalEstudiantes = document.querySelector(
        "#inputNumeroEstudiantes"
    ).value;
    let contador = 1;

    let estudiante,
        calificacion,
        convertir = 0;
    while (contador <= totalEstudiantes) {
        //Le agregue esto por que aceptaba nulos.
        do {
            estudiante = prompt(`Ingrese el nombre del estudiante ${contador}`).trim();
        } while (estudiante == "");
        do {
            calificacion = prompt(
                `Ingrese la calificación del estudiante ${contador}`
            );

            convertir = parseFloat(calificacion);
        } while (isNaN(convertir) || convertir < 0 || convertir > 10 || estudiante =="" );
        arrayEstudiante.push(new Array(estudiante, parseFloat(calificacion)
        ));
/*
        arrayEstudiante[contador - 1] = new Array(
            estudiante,
            parseFloat(calificacion)
        );*/
        contador++;
    }
    let calificacionAlta = 0,
        promedio = 0,
        posicion = 0;
    
    let listado = "<h3>Listado de estudiantes registrados</h3>";
    listado += "<ol>";
    for (let estudiante of arrayEstudiante) {
        let nombre = estudiante[0];
        let nota = estudiante[1];
        listado += `<li><b>Nombre:</b> ${nombre} - <b>Calificación:</b> ${nota} </li>`;

        if (nota > calificacionAlta) {
            posicion = estudiante;
            calificacion = nota;
        }
        promedio += parseFloat(nota);
    }
    listado += "</ol>";
    promedio = parseFloat(promedio / arrayEstudiante.length).toFixed(2);
    listado += `<p><b>Promedio de calificaciones:</b> ${promedio}`;
    listado += `<br><b>Estudiante con mejor calificación:</b> ${posicion[0]}</p>`;
    containerEstudiantes.innerHTML = listado;
}