const productos =
[
    {
        id: 1,
        nombre: "Hamburguesa",
        tipo: "hamburguesa",
        desc: "Una jugosa hamburguesa de 225 gr. de carne Angus, sazonada con nuestra mezcla de especias y servida con lechuga, tomate, cebolla roja, pepinillos y mayonesa en un pan Kaiser tostado.",
        precio: 999,
        img: '/public/images/f2.png',
        
    },

    {
        id: 2,
        nombre: "Pizza",
        tipo: "pizza",
        desc: "Pomodoro italiano, mozzarella fior di latte, albahaca, aceite de oliva",
        precio: 1200,
        img: '/public/images/f3.png',
        
    },

    {
        id: 3,
        nombre: "Pasta",
        tipo: "pasta",
        desc: "Pasta corta italiana con salsa de tomate italiano, stracciattella, aceite de oliva extra virgen, ajo, tomate cherry y albahaca fresca.",
        precio: 850,
        img: '/public/images/f4.png',
        
    },

    {
        id: 4,
        nombre: "Papas fritas",
        tipo: "papas",
        desc: "Deliciosas papas fritas crujientes",
        precio: 600,
        img: '/public/images/f5.png',
        
    },

    {
        id: 5,
        nombre: "Pizza especial",
        tipo: "pizza",
        desc: "Salsa de tomate, mozzarella fior di latte, rodajas de tomate fresco c/ajo, albahaca, aceite de oliva extra virgen.",
        precio: 1350,
        img: '/public/images/f6.png',
        
    },

    {
        id: 6,
        nombre: "Hamburguesa de pollo",
        tipo: "hamburguesa",
        desc: "Pechuga de pollo a la parrilla, queso mozzarella, lechuga y rebanadas de tomate. Servido con aderezo chipotle.",
        precio: 900,
        img: '/public/images/f8.png',
        
    }
];


 
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function pintar() {
    const tienda = document.getElementById('tienda');
    
    productos.forEach((p)=> {

        let producto = document.createElement('div')
        producto.classList.add('col-12');
        producto.classList.add('col-md-4');
        producto.classList.add('mb-5');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');
        


        producto.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${p.img}">
        <div class="card-body">
            <span class="card-title">${p.nombre}</span>
            <p>${p.desc}</p>
            <p>$${p.precio}</p>
            <button class="btn btn-primary halfway-fab wabes-effect waves-light red" id="${p.id}"><i class="material-icons">COMPRAR</i></button>
        </div>
        </div>
        `

        tienda.appendChild(producto);

        producto.querySelector('button').addEventListener('click', ()=>{

            agregarPructosCarrito(p.id);
            
        })

         

    })

}

pintar();

function agregarPructosCarrito(id){

   let producto = productos.find(producto => producto.id === id);

   let productoEnCarrito = carrito.find(producto => producto.id === id)

   if(productoEnCarrito){
    productoEnCarrito.cantidad++;

    
    console.log(carrito);

    alert(`ya agregaste ${producto.nombre} desea volver a agregar el mismo?`);

   }else {

    producto.cantidad = 1;
    
    carrito.push(producto);

    

    console.log(carrito);


   }
    
   renderizarCarrito();
   calcularTotal();
}

function renderizarCarrito(){

    const d = document;
    let carritoHTML = d.querySelector('#carrito');

    carritoHTML.innerHTML = '';

    carrito.forEach((p, index)=> {

        let producto = document.createElement('div')
        producto.classList.add('col-12');
        producto.classList.add('col-md-4');
        producto.classList.add('mb-5');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');
        
        producto.innerHTML = `

        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${p.img}">
        <div class="card-body">
            <span class="card-title">${p.nombre}</span>
            <p>${p.desc}</p>
            <p>$${p.precio}</p>
            <p>Cantidad: ${p.cantidad}</p>
            <button class="btn btn-danger">eliminar</button>
        </div>
        </div>
        `
       producto.querySelector('button').addEventListener('click', ()=>{

        eliminarProductos(index)

       })

        carritoHTML.appendChild(producto);
    })
   
}

function eliminarProductos(index){

    carrito[index].cantidad--;

    alert(`ELIMINASTE ${carrito[index].nombre} del carrito de compras`);

    if (carrito[index].cantidad === 0){

        carrito.splice(index,1);

        
    }

    renderizarCarrito();
    calcularTotal();
    
}

function calcularTotal() {
    
    let total = 0

    carrito.forEach ((p)=>{

        total += p.precio * p.cantidad;
    })

    const t = document.getElementById('total');

    t.innerHTML = `<h4>$${total}</h4>`

    
 
    localStorage.setItem("carrito", JSON.stringify(carrito));

}
    



