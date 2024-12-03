import { dictionary } from "./dictionary.js";

// Obtener la palabra del input cuando se hace "click" en traducir
document.getElementById("traducir").addEventListener("click", () => {
    const palabra = document.getElementById("pobtenida").value.trim().toLowerCase();
    const idioma = document.getElementById("idioma").value;

    // Verificación de campo vacío
    if (!palabra) {
        alert("La palabra introducida no se encuentra disponible");
        return;
    }

    // Buscar la palabra para traducirla al idioma elegido
    let ptraducida = "";
    for (let objectIterator in dictionary.categories) {
        const palabras = dictionary.categories[objectIterator];
        const palabrasEncontradas = palabras.find(item => {
            return item.spanish.toLowerCase() === palabra || item.english.toLowerCase() === palabra
        });

        if (palabrasEncontradas) {
            if (idioma === "ingles") {
                ptraducida = palabrasEncontradas.english;
            } else {
                ptraducida = palabrasEncontradas.spanish;
            }
            break;
        }
    }

    if (ptraducida) {
        document.getElementById("resultado").value = `${ptraducida}`;
    } else {
        document.getElementById("resultado").value = `La palabra ${palabra} no está disponible en el diccionario`;
    }
});

// Mostrar palabras disponibles al hacer clic en el botón "Mostrar palabras"
document.getElementById("mostrarPalabras").addEventListener("click", () => {
    const idioma = document.getElementById("idioma").value;
    const palabrasContainer = document.getElementById("palabrasDisponibles");

    // Desmarcar cualquier radio previamente seleccionado
    const categoriaSeleccionada = Array.from(document.getElementsByName('categoria'))
        .find(radio => radio.checked)?.value;

    if (!categoriaSeleccionada) {
        palabrasContainer.textContent = "Por favor selecciona una categoría.";
        return;
    }

    const palabras = dictionary.categories[categoriaSeleccionada];
    palabrasContainer.innerHTML = ""; // Limpia el contenido previo

    // Crear el título de la categoría
    const tituloCategoria = document.createElement("h3");
    tituloCategoria.textContent = `Categoría: ${categoriaSeleccionada.charAt(0).toUpperCase() + categoriaSeleccionada.slice(1)}`;
    palabrasContainer.appendChild(tituloCategoria);

    // Crear lista de palabras
    const lista = document.createElement("ul");
    palabras.forEach(item => {
        const listItem = document.createElement("li");
        if (idioma === "espanol") {
            listItem.textContent = `${item.spanish} - ${item.english}: ${item.example}`;
        } else {
            listItem.textContent = `${item.english} - ${item.spanish}: ${item.example}`;
        }
        lista.appendChild(listItem);
    });

    palabrasContainer.appendChild(lista);
});


