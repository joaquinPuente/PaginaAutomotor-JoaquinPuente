const stockProductos = [
    {id:1, img:"./img/fiat-cronos.jpg" , Modelo: "Fiat Cronos", Desc:"El auto perfecto para ciudades", Precio: 3627600 },
    {id:2, img: "./img/citroen-c4.jfif", Modelo: "Citroen C4 Nuevo", Desc:"Auto para quien busca confort", Precio: 3410000 },
    {id:3, img: "./img/citroen-berlingo.jpg", Modelo:"Citroen Berlingo", Desc:"Furgoneta perfecta para fletes", Precio: 3825300 },
    {id:4, img: "./img/gol-trend.jpg" ,Modelo: "Volskwagen Gol Trend", Desc:"La mejor opcion como primer auto", Precio: 3600000 }
]


let emailF = document.querySelector("#exampleInputEmail1");
let nypF = document.querySelector("#nyP");
let modeloF = document.querySelector("#modeloA");
let precioF = document.querySelector("#precioA");
let botonS = document.querySelector(".Enviar")
let info = document.querySelector(".info")
let carrito = []

let inputBuscar = document.querySelector("#form1") //form
let btnB = document.querySelector(".btnBuscar")  //boton

let infoB = document.querySelector(".infoB") //lugar a pintar
let contenedor = document.querySelector(".cartas")
let vaciarCarrito = document.querySelector("#vaciarCarrito")


//funcion para buscar!
infoB.innerHTML = ''

const filtrar = ()=>{
    infoB.innerHTML = '';
    //console.log(inputBuscar.value)

    const texto = inputBuscar.value.toLowerCase();

    for (let stockProducto of stockProductos) {
        let producto = stockProducto.Modelo.toLowerCase();
        if (producto.indexOf(texto) !== -1){
            /*infoB.innerHTML += `
            <p>${stockProducto.Modelo}</p>
            `*/

            infoB.innerHTML += `
            <ul class="list-group">
                <li class="list-group-item">${stockProducto.Modelo}</li>
            </ul>
            `
        }
        
    }
    if (infoB.innerHTML === '') {
        infoB.innerHTML += `
            <p>No se encontro el producto!</p>
            `
    }
    else if (inputBuscar.value === '') {
        infoB.innerHTML = ''
    }
   
}
btnB.addEventListener('click', filtrar)
inputBuscar.addEventListener('keyup', filtrar)
filtrar();

stockProductos.forEach((autos) => {
    const { id, img, Modelo, Desc, Precio} = autos
    contenedor.innerHTML += `
    <div class="card" style="width: 18rem;">
            <img src="${img}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${Modelo}</h5> 
              <p class="card-text">${Desc}</p>
              <p class="card-text">$${Precio}</p>             
              <button onclick="agregarCarrito(${id})" class="btn btn-primary btn1">Agregar al carrito.</button>
            </div>
        </div>
    `
})

function agregarCarrito (id) {
    let item = stockProductos.find((autos) => autos.id === id)
    carrito.push(item)
    mostrarCarrito()
}

function mostrarCarrito () {
    const modalBody = document.querySelector(".modal .modal-body")
    
    modalBody.innerHTML = ""
    carrito.forEach ((autos)=> {
        const {id,img,Modelo,Desc,Precio} = autos
        modalBody.innerHTML += `
        <div class="contenedorModal">
            <div class="imgProducto">
                <img src="${img}" class="card-img-top">
            </div>

            <div>
              <p>Descripcion: ${Desc}</p>
            </div>

            <div>
              <p>Precio: ${Precio}</p>
            </div>

            <div>
              <p>Modelo: ${Modelo}</p>
            </div>

            <div>
            <button onclick="eliminarAuto(${id})"class="btn btn-danger">Eliminar producto</button>
            </div>       
        </div>`


        if (carrito.length === 0) {
            console.log("no hay nada")
            /*modalBody.innerHTML = `<p>Aun no seleccionaste producto a comprar</p>`*/
        } 
        carritoAlStorage()
        })

}

function eliminarAuto (id) {
    const autoId = id
    carrito = carrito.filter ((auto) => auto.id !== autoId)
    mostrarCarrito()
}

function carritoAlStorage () {
    localStorage.setItem("carrito", JSON.stringify(carrito))
} 

document.addEventListener ('DOMContentLoaded', () => {
    carrito = JSON.parse(localStorage.getItem ('carrito')) || []
    mostrarCarrito()
})

vaciarCarrito.addEventListener ("click", () => {
    carrito = []   
})




//Formulario
emailF.addEventListener("input", function () {
      console.log(emailF.value)  
});
nypF.addEventListener("input", function () {
      console.log (nypF.value)  
});
modeloF.addEventListener("input", function () {
    console.log (modeloF.value)  
});
precioF.addEventListener("input", function () {
    console.log (precioF.value)  
});
botonS.onclick = function () {
    alert(`Ya recibimos tu formulario, dentro de 3 dias habiles nos estaremos contactando`);
    let form = new Formulario (emailF.value, nypF.value, modeloF.value, precioF.value);
    const aJson = JSON.stringify(form);
    localStorage.setItem("Formulario de contacto", aJson);
}
function Formulario ( email, nyp, modelo, precio ) {
    this.email = email;
    this.nyp = nyp;
    this.modelo = modelo;
    this.precio = precio;
}

//Funcion para Buscar!!!


/*
inputBuscar.addEventListener("input", function () {
    artBuscado = buscar
    console.log(artBuscado.value)
})

btnB.addEventListener("click", function () { 
        
    
        console.log("empece a buscar")



        const compra = [
            { nombre: "Fiat cronos", precio: 3627600 },
            { nombre: "Citroen Nuevo C3", precio: 3410000 },
            { nombre: "Citroen Berlingo Furg??n", precio: 3825300 },
        ];
        const resultado = compra.filter((el) => el.nombre.includes(artBuscado.value));
        console.log(resultado);
        infoB.innerHTML= `<div class="alert alert-warning" role="alert">
    <h5>El resultado de su busqueda es ${resultado}</h5></div>
    `;
})*/