
"use strict";

// Vector global utilizado en todos los ejercicios.
let vector = [];
let vectorCargado = false;

// Elementos del HTML original.
const selectorDimension = document.getElementById("select-dimension-arreglo");
const campoBusqueda = document.getElementById("id-valor-busqueda");
const tablaVector = document.getElementById("id-table-vector-numerico");
const campoRespuesta = document.getElementById("id-txt-respuesta");

const btnCargar = document.getElementById("btn-cargar-vector");
const btnVaciar = document.getElementById("btn-vaciar-vector");
const btnMayor = document.getElementById("btn-numero-mayor");
const btnMenor = document.getElementById("btn-numero-menor");
const btnSuma = document.getElementById("btn-sumar-valores");
const btnProducto = document.getElementById("btn-producto-vector");
const btnModa = document.getElementById("btn-calcular-moda");
const btnMedia = document.getElementById("btn-calcular-media");
const btnMediana = document.getElementById("btn-calcular-mediana");

// Mostrar los resultados en el campo original.
function mostrarResultado(mensaje) {
    campoRespuesta.value = mensaje;
}

// Comprobar que exista un vector con elementos.
function validarVector() {
    if (!vectorCargado || vector.length === 0) {
        mostrarResultado("Primero debe cargar el vector.");
        return false;
    }
    return true;
}

// Dibujar los índices y los valores actuales del vector.
function actualizarTabla() {
    const tbody = tablaVector.querySelector("tbody");
    tbody.innerHTML = "";

    const filaIndices = document.createElement("tr");
    const filaValores = document.createElement("tr");

    vector.forEach((valor, indice) => {
        const celdaIndice = document.createElement("td");
        celdaIndice.textContent = indice;
        filaIndices.appendChild(celdaIndice);

        const celdaValor = document.createElement("td");
        celdaValor.textContent = valor;
        filaValores.appendChild(celdaValor);
    });

    tbody.appendChild(filaIndices);
    tbody.appendChild(filaValores);

    const encabezado = tablaVector.querySelector("thead td");
    encabezado.colSpan = Math.max(vector.length, 1);
}

// Cargar números aleatorios en el vector.
btnCargar.addEventListener("click", function () {
    const dimension = Number(selectorDimension.value);

    vector = [];

    for (let i = 0; i < dimension; i++) {
        vector.push(Math.floor(Math.random() * 100) + 1);
    }

    vectorCargado = true;
    actualizarTabla();

    mostrarResultado("Vector cargado: [" + vector.join(", ") + "]");
});

// Vaciar completamente el vector.
btnVaciar.addEventListener("click", function () {
    vector = [];
    vectorCargado = false;
    actualizarTabla();
    mostrarResultado("El vector ha sido vaciado.");
});

// Encontrar el número mayor y su posición.
btnMayor.addEventListener("click", function () {
    if (!validarVector()) return;

    const mayor = Math.max(...vector);
    const posiciones = [];

    vector.forEach((valor, indice) => {
        if (valor === mayor) posiciones.push(indice);
    });

    mostrarResultado(
        "Número mayor: " + mayor +
        " (posición/es: " + posiciones.join(", ") + ")"
    );
});

// Encontrar el número menor y su posición.
btnMenor.addEventListener("click", function () {
    if (!validarVector()) return;

    const menor = Math.min(...vector);
    const posiciones = [];

    vector.forEach((valor, indice) => {
        if (valor === menor) posiciones.push(indice);
    });

    mostrarResultado(
        "Número menor: " + menor +
        " (posición/es: " + posiciones.join(", ") + ")"
    );
});

// Sumar todos los valores.
btnSuma.addEventListener("click", function () {
    if (!validarVector()) return;

    const suma = vector.reduce((acumulado, valor) => acumulado + valor, 0);

    mostrarResultado("Suma de los valores: " + suma);
});

// Multiplicar todos los valores.
btnProducto.addEventListener("click", function () {
    if (!validarVector()) return;

    const producto = vector.reduce(
        (acumulado, valor) => acumulado * valor,
        1
    );

    mostrarResultado("Producto de los valores: " + producto);
});

// Calcular la moda. Puede haber más de una.
btnModa.addEventListener("click", function () {
    if (!validarVector()) return;

    const frecuencias = {};

    vector.forEach(valor => {
        frecuencias[valor] = (frecuencias[valor] || 0) + 1;
    });

    const frecuenciaMaxima = Math.max(...Object.values(frecuencias));

    if (frecuenciaMaxima === 1) {
        mostrarResultado("Moda: no existe; todos los valores son diferentes.");
        return;
    }

    const modas = Object.keys(frecuencias)
        .filter(valor => frecuencias[valor] === frecuenciaMaxima);

    mostrarResultado(
        "Moda: " + modas.join(", ") +
        " (frecuencia: " + frecuenciaMaxima + ")"
    );
});

// Calcular la media aritmética.
btnMedia.addEventListener("click", function () {
    if (!validarVector()) return;

    const suma = vector.reduce((acumulado, valor) => acumulado + valor, 0);
    const media = suma / vector.length;

    mostrarResultado("Media aritmética: " + media.toFixed(2));
});

// Calcular la mediana sin modificar el vector original.
btnMediana.addEventListener("click", function () {
    if (!validarVector()) return;

    const ordenado = [...vector].sort((a, b) => a - b);
    const mitad = Math.floor(ordenado.length / 2);
    let mediana;

    if (ordenado.length % 2 === 0) {
        mediana = (ordenado[mitad - 1] + ordenado[mitad]) / 2;
    } else {
        mediana = ordenado[mitad];
    }

    mostrarResultado("Mediana: " + mediana);
});

// Crear controles adicionales sin editar el HTML original.
function agregarControles() {
    const contenedor = document.createElement("div");
    contenedor.id = "controles-adicionales";

    contenedor.innerHTML = `
        <hr>
        <h4>Ordenamiento de vectores</h4>
        <label for="orden-tipo">Orden:</label>
        <select id="orden-tipo">
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
        </select>
        <br><br>
        <button id="btn-seleccion">Ordenar Selección</button>
        <button id="btn-burbuja">Ordenar Burbuja</button>
        <button id="btn-insercion">Ordenar Inserción</button>
        <button id="btn-fusion">Ordenar por Fusión</button>

        <hr>
        <h4>Búsqueda de elementos</h4>
        <button id="btn-secuencial">Búsqueda Secuencial</button>
        <button id="btn-binaria">Búsqueda Binaria</button>

        <hr>
        <h4>Transformaciones básicas</h4>
        <button id="btn-invertir">Invertir Vector</button>
        <button id="btn-duplicados">Eliminar Duplicados</button>

        <hr>
        <h4>Rotar vector</h4>
        <label for="numero-rotaciones">Número de posiciones:</label>
        <input type="number" id="numero-rotaciones" min="1" value="1">
        <br>
        <input type="radio" name="direccion-rotacion"
            id="rotar-izquierda" value="izquierda" checked>
        <label for="rotar-izquierda">Izquierda</label>
        <input type="radio" name="direccion-rotacion"
            id="rotar-derecha" value="derecha">
        <label for="rotar-derecha">Derecha</label>
        <br><br>
        <button id="btn-rotar">Rotar Vector</button>

        <hr>
        <h4>Intercambiar elementos</h4>
        <label for="posicion-uno">Primera posición:</label>
        <input type="number" id="posicion-uno" min="0" value="0">
        <br>
        <label for="posicion-dos">Segunda posición:</label>
        <input type="number" id="posicion-dos" min="0" value="1">
        <br><br>
        <button id="btn-intercambiar">Intercambiar Elementos</button>
        <hr>
    `;

    tablaVector.parentNode.insertBefore(contenedor, tablaVector.nextSibling);
}

// Ordenamiento por selección.
function ordenarSeleccion(datos, ascendente) {
    const arreglo = [...datos];

    for (let i = 0; i < arreglo.length - 1; i++) {
        let posicion = i;

        for (let j = i + 1; j < arreglo.length; j++) {
            if (
                ascendente
                    ? arreglo[j] < arreglo[posicion]
                    : arreglo[j] > arreglo[posicion]
            ) {
                posicion = j;
            }
        }

        [arreglo[i], arreglo[posicion]] = [arreglo[posicion], arreglo[i]];
    }

    return arreglo;
}

// Ordenamiento burbuja.
function ordenarBurbuja(datos, ascendente) {
    const arreglo = [...datos];

    for (let i = 0; i < arreglo.length - 1; i++) {
        for (let j = 0; j < arreglo.length - 1 - i; j++) {
            if (
                ascendente
                    ? arreglo[j] > arreglo[j + 1]
                    : arreglo[j] < arreglo[j + 1]
            ) {
                [arreglo[j], arreglo[j + 1]] =
                    [arreglo[j + 1], arreglo[j]];
            }
        }
    }

    return arreglo;
}

// Ordenamiento por inserción.
function ordenarInsercion(datos, ascendente) {
    const arreglo = [...datos];

    for (let i = 1; i < arreglo.length; i++) {
        const actual = arreglo[i];
        let j = i - 1;

        while (
            j >= 0 &&
            (ascendente
                ? arreglo[j] > actual
                : arreglo[j] < actual)
        ) {
            arreglo[j + 1] = arreglo[j];
            j--;
        }

        arreglo[j + 1] = actual;
    }

    return arreglo;
}

// Combinar dos listas ordenadas para el método de fusión.
function combinar(izquierda, derecha, ascendente) {
    const resultado = [];
    let i = 0;
    let j = 0;

    while (i < izquierda.length && j < derecha.length) {
        if (
            ascendente
                ? izquierda[i] <= derecha[j]
                : izquierda[i] >= derecha[j]
        ) {
            resultado.push(izquierda[i++]);
        } else {
            resultado.push(derecha[j++]);
        }
    }

    return resultado.concat(izquierda.slice(i), derecha.slice(j));
}

// Ordenamiento por fusión.
function ordenarFusion(datos, ascendente) {
    if (datos.length <= 1) return [...datos];

    const mitad = Math.floor(datos.length / 2);
    const izquierda = ordenarFusion(datos.slice(0, mitad), ascendente);
    const derecha = ordenarFusion(datos.slice(mitad), ascendente);

    return combinar(izquierda, derecha, ascendente);
}

// Aplicar un método de ordenamiento y actualizar la tabla.
function ejecutarOrdenamiento(metodo) {
    if (!validarVector()) return;

    const ascendente = document.getElementById("orden-tipo").value === "asc";

    if (metodo === "seleccion") {
        vector = ordenarSeleccion(vector, ascendente);
    } else if (metodo === "burbuja") {
        vector = ordenarBurbuja(vector, ascendente);
    } else if (metodo === "insercion") {
        vector = ordenarInsercion(vector, ascendente);
    } else if (metodo === "fusion") {
        vector = ordenarFusion(vector, ascendente);
    }

    actualizarTabla();

    mostrarResultado(
        "Vector ordenado " + (ascendente ? "ascendentemente" : "descendentemente") +
        ": [" + vector.join(", ") + "]"
    );
}

// Búsqueda secuencial: revisar todos los elementos.
function busquedaSecuencial() {
    if (!validarVector()) return;

    const texto = campoBusqueda.value.trim();

    if (texto === "" || !Number.isFinite(Number(texto))) {
        mostrarResultado("Ingrese un número válido en el campo de búsqueda.");
        return;
    }

    const buscado = Number(texto);
    const posiciones = [];

    vector.forEach((valor, indice) => {
        if (valor === buscado) posiciones.push(indice);
    });

    if (posiciones.length === 0) {
        mostrarResultado("El valor " + buscado + " no se encontró en el vector.");
    } else {
        mostrarResultado(
            "Valor " + buscado + " encontrado en la/s posición/es: " +
            posiciones.join(", ")
        );
    }
}

// Búsqueda binaria: ordenar una copia y buscar dentro de ella.
function busquedaBinaria() {
    if (!validarVector()) return;

    const texto = campoBusqueda.value.trim();

    if (texto === "" || !Number.isFinite(Number(texto))) {
        mostrarResultado("Ingrese un número válido en el campo de búsqueda.");
        return;
    }

    const buscado = Number(texto);
    const ordenado = [...vector].sort((a, b) => a - b);

    let izquierda = 0;
    let derecha = ordenado.length - 1;
    let encontrado = false;

    while (izquierda <= derecha) {
        const mitad = Math.floor((izquierda + derecha) / 2);

        if (ordenado[mitad] === buscado) {
            encontrado = true;
            break;
        } else if (ordenado[mitad] < buscado) {
            izquierda = mitad + 1;
        } else {
            derecha = mitad - 1;
        }
    }

    if (!encontrado) {
        mostrarResultado("Búsqueda binaria: el valor " + buscado + " no existe.");
        return;
    }

    // Informar todas las posiciones originales, no las de la copia ordenada.
    const posiciones = [];

    vector.forEach((valor, indice) => {
        if (valor === buscado) posiciones.push(indice);
    });

    mostrarResultado(
        "Búsqueda binaria: valor " + buscado +
        " encontrado. Posición/es original/es: " + posiciones.join(", ") +
        ". Vector ordenado utilizado: [" + ordenado.join(", ") + "]"
    );
}

// Invertir el orden de los elementos.
function invertirVector() {
    if (!validarVector()) return;

    vector.reverse();
    actualizarTabla();

    mostrarResultado("Vector invertido: [" + vector.join(", ") + "]");
}

// Eliminar valores repetidos.
function eliminarDuplicados() {
    if (!validarVector()) return;

    const cantidadAnterior = vector.length;
    vector = [...new Set(vector)];
    const eliminados = cantidadAnterior - vector.length;

    actualizarTabla();

    mostrarResultado(
        "Duplicados eliminados: " + eliminados +
        ". Elementos restantes: " + vector.length +
        ". Vector: [" + vector.join(", ") + "]"
    );
}

// Rotar a la izquierda o a la derecha.
function rotarVector() {
    if (!validarVector()) return;

    const campo = document.getElementById("numero-rotaciones");
    const cantidad = Number(campo.value);
    const tamano = vector.length;

    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > tamano) {
        mostrarResultado(
            "Ingrese un número de rotaciones entre 1 y " + tamano + "."
        );
        return;
    }

    const direccion = document.querySelector(
        'input[name="direccion-rotacion"]:checked'
    ).value;

    const posiciones = cantidad % tamano;

    if (direccion === "izquierda") {
        vector = vector.slice(posiciones).concat(vector.slice(0, posiciones));
    } else {
        vector = vector.slice(tamano - posiciones)
            .concat(vector.slice(0, tamano - posiciones));
    }

    actualizarTabla();

    mostrarResultado(
        "Vector rotado hacia la " + direccion +
        " " + cantidad + " posición/es: [" + vector.join(", ") + "]"
    );
}

// Intercambiar dos elementos mediante sus índices.
function intercambiarElementos() {
    if (!validarVector()) return;

    const primera = Number(document.getElementById("posicion-uno").value);
    const segunda = Number(document.getElementById("posicion-dos").value);

    if (
        !Number.isInteger(primera) ||
        !Number.isInteger(segunda) ||
        primera < 0 ||
        segunda < 0 ||
        primera >= vector.length ||
        segunda >= vector.length
    ) {
        mostrarResultado(
            "Las posiciones deben estar entre 0 y " + (vector.length - 1) + "."
        );
        return;
    }

    if (primera === segunda) {
        mostrarResultado("Seleccione dos posiciones diferentes.");
        return;
    }

    [vector[primera], vector[segunda]] =
        [vector[segunda], vector[primera]];

    actualizarTabla();

    mostrarResultado(
        "Se intercambiaron las posiciones " + primera + " y " + segunda +
        ". Vector: [" + vector.join(", ") + "]"
    );
}

// Crear los botones y conectar sus eventos cuando el HTML esté listo.
agregarControles();

document.getElementById("btn-seleccion").addEventListener(
    "click", () => ejecutarOrdenamiento("seleccion")
);

document.getElementById("btn-burbuja").addEventListener(
    "click", () => ejecutarOrdenamiento("burbuja")
);

document.getElementById("btn-insercion").addEventListener(
    "click", () => ejecutarOrdenamiento("insercion")
);

document.getElementById("btn-fusion").addEventListener(
    "click", () => ejecutarOrdenamiento("fusion")
);

document.getElementById("btn-secuencial").addEventListener(
    "click", busquedaSecuencial
);

document.getElementById("btn-binaria").addEventListener(
    "click", busquedaBinaria
);

document.getElementById("btn-invertir").addEventListener(
    "click", invertirVector
);

document.getElementById("btn-duplicados").addEventListener(
    "click", eliminarDuplicados
);

document.getElementById("btn-rotar").addEventListener(
    "click", rotarVector
);

document.getElementById("btn-intercambiar").addEventListener(
    "click", intercambiarElementos
);

// Dibujar la tabla vacía al iniciar.
actualizarTabla();
