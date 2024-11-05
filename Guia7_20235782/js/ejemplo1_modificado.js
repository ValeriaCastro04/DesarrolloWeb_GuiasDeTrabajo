const newForm = document.getElementById("idNewForm");
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");

const cmbElemento = document.getElementById("idCmbElemento");
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

const buttonValidar = document.getElementById("idBtnValidar");
//Quería que el boton solo saliera si habían controles en el formulario
const mostrarBtn = () => {
    buttonValidar.style.display = newForm.elements.length > 0 ? "inline" : "none";
}


const vericarTipoElemento = function () {
    let elemento = cmbElemento.value;
    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creara");
    }
};


const verificarID = (idNuevo) => {
    const ids = Array.from(newForm.querySelectorAll("label")).map(label => label.textContent);

    if (ids.indexOf(idNuevo) !== -1) {
        alert("Este ID ya existe. Elige otro titulo.");
        return false
    }
    return true;
}

const newSelect = function () {
    const tituloId = tituloElemento.value;

    if (!verificarID(tituloId)){
        return;
    };
    let addElemento = document.createElement("select");
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-select");
    let agregarDefault = document.createElement("option");
    agregarDefault.value = "";
    agregarDefault.innerHTML = "Escoge una opci+on";
    agregarDefault.selected = true;
    addElemento.appendChild(agregarDefault);
    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opcion ${i}`;
        addElemento.appendChild(addOption);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;
    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);
    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
    mostrarBtn();
};

const newRadioCheckbox = function (newElemento) {
    const tituloId = tituloElemento.value;

    if (!verificarID(tituloId)) {
        return;
    };
    let addElemento = document.createElement("input");
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    labelElemento.textContent = tituloElemento.value;
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;
    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);
    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
    mostrarBtn();
};

const newInput = function (newElemento) {
    const tituloId = tituloElemento.value;

    if (!verificarID(tituloId)) {
        return;
    };
    let addElemento =
        newElemento == "textarea"
            ? document.createElement("textarea")
            : document.createElement("input");
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    labelElemento.textContent = tituloElemento.value;

    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;
    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");
    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);
    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
    mostrarBtn();
};

buttonCrear.onclick = () => {
    vericarTipoElemento();
};

const validarCampos = function () {
    const elementosForm = newForm.elements;
    const gruposCheckbox = {};
    const gruposRadio = {};

    for (let element of elementosForm) {
        if (element.tagName === "TEXTAREA" && element.value.trim() === "") {
            alert(`El campo ${element.id} no puedr estar vacío.`);
            return;
        }
        else if (element.tagName === "INPUT" && element.type !== "radio" && element.type !== "checkbox" && element.value.trim() === "") {
            alert(`El campo ${element.id} no puedr estar vacío.`);
            return;
        }
        else if (element.tagName === "SELECT" && element.selectedIndex === 0) {
            alert(`Seleccione una opcion para ${element.id}.`);
            return;
        }
        else if (element.type === "radio") {
            if (!gruposRadio[element.name]) {
                gruposRadio[element.name] = false;
            }
            if (element.checked) {
                gruposRadio[element.name] = true;
            }
        } else if (element.type === "checkbox") {
            if (!gruposCheckbox[element.name]) {
                gruposCheckbox[element.name] = false;
            }
            if (element.checked) {
                gruposCheckbox[element.name] = true;
            }
        }
    }
    for (const group in gruposRadio) {
        if (!gruposRadio[group]) {
            alert(`Selecciona al menos una opción para el radio.`);
            return;
        }
    }
    for (const group in gruposCheckbox) {
        if (!gruposCheckbox[group]) {
            alert(`Selecciona al menos una opción para el checkbox.`);
            return;
        }
    }
    alert("Todo bien :).");
};

buttonValidar.onclick = () => {
    validarCampos();
}
buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        let elemento = cmbElemento.value;
        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
    } else {
        alert("Faltan campos por completar");
    }
};

document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});