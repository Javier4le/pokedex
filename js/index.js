
tinymce.init({
    selector: '#descripcion-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });

const enviarProfeOak = async function() {
  //"this" Siempre devuelve una referencia al elemento que llamó la función, en este caso el botón
  let nro = this.nro;
  let res = await Swal.fire({
    title: "¿Desea realmente continuar?",
    text: "Está intentando enviar el pokémon al profesor Oak. Esto no se puede revertir.",
    icon: "warning",
    showCancelButton: true,
    conifmButtonText: "Sí, Hazlo!"
  });
  if (res.isConfirmed){
    //"splice" Para eliminar elementos de una lista y reestructurarla
    pokemones.splice(nro, 1);
    cargarTabla();
    Swal.fire("Pokémon descartado", "Pokémon enviado al profesor", "info");
  } else {
    Swal.fire("Cancelado", "Operación cancelada", "error");
  }
};

const pokemones = []; //Definir un array
const cargarTabla = () => {

  //1. Obtener una referencia a la tabla
  let tbody = document.querySelector("#tbody-tabla");
  //Eliminar el contenido de tbody
  tbody.innerHTML = "";
  //2. Recorrer la lista de pokemones
  for (let i=0; i < pokemones.length; ++i) {
    let p = pokemones[i];
    //3. Por cada pokemon generar una fila de la tabla (tr)
    let tr = document.createElement("tr");
    //4. Por cada atributo generar un td de la tabla
    let tdNro = document.createElement("td");
    let tdNombre = document.createElement("td");
    let tdTipo = document.createElement("td");
    let tdDescripcion = document.createElement("td");
    let tdAcciones = document.createElement("td");

    //Definir lo que va en la tabla
    tdNro.innerText = i + 1;
    tdNombre.innerText = p.nombre;

    //TODO: El tipo tiene que ser un icono --> agregar clase dinamicamente
    let tipo = document.createElement("i");
    if (p.tipo == "1") {
      //Tipo planta <i class="fas fa-leaf"></i>
      tipo.classList.add("fas","fa-leaf","text-success","fa-2x");
    } else if (p.tipo == "2") {
      //Tipo agua <i class="fas fa-tint"></i>
      tipo.classList.add("fas","fa-tint","text-primary","fa-2x");
    } else if (p.tipo == "3") {
      //Tipo fuego <i class="fas fa-fire"></i>
      tipo.classList.add("fas","fa-fire","text-danger","fa-2x");
    } else if (p.tipo == "4") {
      //Tipo eléctrico <i class="fas fa-bolt"></i>
      tipo.classList.add("fas","fa-bolt","text-warning","fa-2x");
    } else {
      //Tipo normal <i class="fas fa-bullseye"></i>
      tipo.classList.add("fas","fa-bullseye","text-info","fa-2x");
    }

    tdTipo.classList.add("text-center"); // Para centrar el ícono
    tdTipo.appendChild(tipo);
    //Cuando quiero agregar un elemento dentro de otro: appendChild
    //Cuando quiero definir texto: innerText
    //Cuando quiero definir derectamente el html: innerHTML
    
    tdDescripcion.innerHTML = p.descripcion;
    
    let boton = document.createElement("button");
    boton.classList.add("btn", "btn-danger");
    boton.innerText = "Enviar al profesor Oak";

    boton.nro = i;
    tdAcciones.appendChild(boton);
    tdAcciones.classList.add("text-center");

    boton.addEventListener("click", enviarProfeOak);

    //5. Agregar los td al tr
    tr.appendChild(tdNro);
    tr.appendChild(tdNombre);
    tr.appendChild(tdTipo);
    tr.appendChild(tdDescripcion);
    tr.appendChild(tdAcciones);
    //6. Agregar el tr a la tabla
    tbody.appendChild(tr);
  }
};

document.querySelector("#registrar-btn").addEventListener("click", ()=>{
    let nombre = document.querySelector("#nombre-txt").value;
    let tipo = document.querySelector("#tipo-select").value;  
    let legendario = document.querySelector("#legendario-si").checked; //Si es o no legendario
    let descripcion = tinymce.get("descripcion-txt").getContent(); //Sólo para el tinymce

    //Crea un objeto
    let pokemon = {};
    //Crea un atributo del objeto
    pokemon.nombre = nombre;
    pokemon.tipo = tipo;
    pokemon.legendario = legendario;
    pokemon.descripcion = descripcion;

    pokemones.push(pokemon);
    cargarTabla();
    Swal.fire("Resultado Exitoso!", "Pokémon Registrado", "info")
    // console.log("Hola Mundo!", nombre, " ", tipo, " ", legendario);
  });



  // if(total.value < 0){
  //  Swal.fire("Ingresa un total mayor a cero") 
  // }