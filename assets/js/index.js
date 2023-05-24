(function () {
    const contenido = document.getElementById("contenido");
    let datos;

    fetch('https://digimon-api.vercel.app/api/digimon')
        .then(response => response.json())
        .then(data => {
            datos = data;
            console.log(datos);
            tabla(datos);
        });

    function tabla(objetos) {
        contenido.innerHTML = "";

        for (let objeto of objetos) {
            contenido.innerHTML += `<tr>
          <th scope="row">${objeto.name}</th>
          <td><img src="${objeto.img}" alt="${objeto.name}" style="width: 50px; height: auto;"></td>
          <td>${objeto.level}</td>
        </tr>`;
        }

        let imagenes = contenido.getElementsByTagName("img");
        for (let imagen of imagenes) {
            imagen.addEventListener("click", function (event) {
                event.stopPropagation();

                let imgup = document.createElement("img");
                imgup.src = event.target.src.replace("small", "large");
                imgup.style.maxHeight = "80%";
                imgup.style.maxWidth = "80%";
                imgup.style.margin = "auto";

                let digimonnombre = document.createElement("div");
                digimonnombre.innerText = event.target.alt;
                digimonnombre.style.fontWeight = "bold";
                digimonnombre.style.textAlign = "center";
                digimonnombre.style.fontSize = "1.5em";

                let digimonnivel = document.createElement("div");
                digimonnivel.innerText = datos.find(digimon => digimon.img === event.target.src).level;
                digimonnivel.style.textAlign = "center";
                digimonnivel.style.fontSize = "1em";

                let fondo = document.createElement("div");
                fondo.style.position = "fixed";
                fondo.style.top = "50%";
                fondo.style.left = "50%";
                fondo.style.transform = "translate(-50%, -50%)";
                fondo.style.width = "30vw";
                fondo.style.height = "60vh";
                fondo.style.backgroundColor = "white";
                fondo.style.border = "3px solid black";
                fondo.style.display = "flex";
                fondo.style.flexDirection = "column";
                fondo.style.alignItems = "center";
                fondo.style.padding = "10px";
                fondo.appendChild(digimonnombre);
                fondo.appendChild(digimonnivel);
                fondo.appendChild(imgup);

                document.body.appendChild(fondo);

                fondo.addEventListener("click", function () {
                    fondo.remove();
                });
            });
        }
    }

    contenido.addEventListener("click", function (event) {
        if (event.target.closest("#contenido") !== null) {
            tabla(datos);
        }
    });

    document.getElementById("buscar-btn").addEventListener("click", function () {
        buscarDigimon();
    });

    document.getElementById("search-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            buscarDigimon();
            event.preventDefault(); // Evita que el formulario se envíe si está dentro de un formulario
        }
    });

    function buscarDigimon() {
        const searchTerm = document.getElementById("search-input").value;
        if (searchTerm.trim() === "") {
            alert("Ingresa el nombre del Digimon que buscas");
        } else {
            const digimonesFiltrados = datos.filter(objeto => objeto.name.toLowerCase().includes(searchTerm.toLowerCase()));
            if (digimonesFiltrados.length > 0) {
                tabla(digimonesFiltrados);
            } else {
                alert("No se encontró el Digimon buscado");
            }
        }
    }

    const logoDigimon = document.getElementById("logodigimon");

    logoDigimon.addEventListener("click", function () {
        location.reload();
    });

    document.getElementById("ordenar-nombre").addEventListener("click", function () {
        datos.sort((a, b) => a.name.localeCompare(b.name));
        tabla(datos);
    });

    document.getElementById("ordenar-nivel").addEventListener("click", function () {
        datos.sort((a, b) => a.level.localeCompare(b.level));
        tabla(datos);
    });

})();
