//  JERSON DAVID OVIEDO CASTRO R4

// LLAMADO DE ID FORMULARIO CREACION DE ARTICULOS -----------------
const formCre = document.getElementById('formCreProdc');
let inputName = document.getElementById('inputName');
let inputVal = document.getElementById('valInput');

// OBTENER LOS ARTICULOS DEL LOCALSTORAGE -------------------------
let artcl = JSON.parse(localStorage.getItem('articulo')) || [];
let valor = JSON.parse(localStorage.getItem('valorArt')) || [];


// ESTO ES SOLAMENTE VISUAL ---------------------------------------
function cambio(){
    var cambiarAccord = document.getElementById("flush-collapseOne");
    cambiarAccord.setAttribute("class", 'accordion-collapse collapse bg-dark');
}
// ----------------------------------------------------------------
formCre.addEventListener('submit', (e) => {
    e.preventDefault();
    aggArticulo();
})

// AGREGAR LOS ARTICULOS ------------------------------------------
function aggArticulo(){
    var nombre = document.getElementById('inputName').value;
    var val = document.getElementById('valInput').value;

    if (nombre) {
        artcl.push(nombre);
        valor.push(val);

        mostrarArticulo();

        localStorage.setItem('articulo',JSON.stringify(artcl));
        localStorage.setItem('valorArt',JSON.stringify(valor));
    }
    
    formCre.reset();
}


// MOSTRAR ARTICULOS ----------------------------------------------
function mostrarArticulo(){
    var spawn = document.getElementById('spawnCards');
    spawn.innerHTML = '';

    for (let i = 0; i < artcl.length; i++) {
        let cardMaster = document.createElement('div');
        cardMaster.className= 'card m-2 prueba';
        cardMaster.setAttribute('style', 'width: 18rem;');

        let imgCard = document.createElement('img');
        imgCard.src='icon-buy.png';
        imgCard.className= 'card-img-top';
        imgCard.alt= 'Foto Articulo';

        let divBodyCard = document.createElement('div');
        divBodyCard.className= 'card-body item';

        let tittleCard = document.createElement('h5');
        tittleCard.className= 'card-title';
        tittleCard.textContent=`${artcl[i]}`;
        
        
        let textCard = document.createElement('p');
        textCard.className= 'card-text';
        textCard.textContent = '$ '+ `${valor[i]}`;

        let btnCard = document.createElement('button');
        // btnCard.setAttribute('id', `${i}`);
        btnCard.className = 'btn btn-outline-success';
        btnCard.textContent = 'CARRITO';
        btnCard.setAttribute('onclick',`aggCarrito(this,${i})`);

        divBodyCard.appendChild(tittleCard);
        divBodyCard.appendChild(textCard);
        divBodyCard.appendChild(btnCard);

        cardMaster.appendChild(imgCard);
        cardMaster.appendChild(divBodyCard);


        //if
        spawn.appendChild(cardMaster);
    }
}


// BOTON ASIGNADO PARA ELIMINAR TODOS LOS ARTICULOS----------------
function eliminarArticulos(){
    artcl = [];
    valor = [];
    mostrarArticulo();
    var spawn = document.getElementById('spawnCards');
    spawn.innerHTML = '';
    localStorage.removeItem("articulo");
    localStorage.removeItem("valorArt");
    localStorage.removeItem("carTiculo");
    location.reload();
}
// mostrarArticulo();


// ----------------------------------------------------------------
// var carItems 

class itemsCarrito{
    constructor(nombreArticulo, valor){
        this.articulo = nombreArticulo;
        this.valor = valor;
    }
}
class almcenadorCarrito{
    constructor(){
        this.almCarrito= JSON.parse(localStorage.getItem("carTiculo")) || [];
    }
    addItem(item,b){
        this.almCarrito.push(item);
        localStorage.setItem('carTiculo',JSON.stringify(this.almCarrito));

        localStorage.removeItem("articulo");
        localStorage.removeItem("valorArt");
        artcl.splice(b,1);
        valor.splice(b,1);
        localStorage.setItem('articulo',JSON.stringify(artcl));
        localStorage.setItem('valorArt',JSON.stringify(valor));
    }

    removeItem(index){
        localStorage.removeItem("carTiculo");
        localStorage.removeItem("articulo");
        localStorage.removeItem("valorArt");

        artcl.push(this.almCarrito[index]['articulo']);
        valor.push(this.almCarrito[index]['valor']);
        this.almCarrito.splice(index,1);

        localStorage.setItem('articulo',JSON.stringify(artcl));
        localStorage.setItem('valorArt',JSON.stringify(valor));
        localStorage.setItem('carTiculo',JSON.stringify(this.almCarrito));
    }

    getCar(){
        var spawn = document.getElementById('spawnCarrito');
        spawn.innerHTML = '';
        for (let i = 0; i < this.almCarrito.length; i++) {
            let cardMaster = document.createElement('div');
            cardMaster.className= 'card m-2 prueba';
            cardMaster.setAttribute('style', 'width: 18rem;');
    
            let imgCard = document.createElement('img');
            imgCard.src='icon-buy.png';
            imgCard.className= 'card-img-top';
            imgCard.alt= 'Foto Articulo';
    
            let divBodyCard = document.createElement('div');
            divBodyCard.className= 'card-body item';
    
            let tittleCard = document.createElement('h5');
            tittleCard.className= 'card-title';
            tittleCard.textContent=`${this.almCarrito[i]['articulo']}`;
            
            
            let textCard = document.createElement('p');
            textCard.className= 'card-text';
            textCard.textContent = '$ '+ `${this.almCarrito[i]['valor']}`;
    
            let elimItemCar = document.createElement('button');
            elimItemCar.textContent = 'Eliminar';
            elimItemCar.className='btn btn-outline-danger';
            elimItemCar.setAttribute('onclick',`eliminarItem(${i})`);
    
            divBodyCard.appendChild(tittleCard);
            divBodyCard.appendChild(textCard);
            divBodyCard.appendChild(elimItemCar);
    
            cardMaster.appendChild(imgCard);
            cardMaster.appendChild(divBodyCard);

            carritos.appendChild(cardMaster);
        }

    }

    getTotal(){
        let total=0;
        let tott = document.getElementById('total');
        for (let i = 0; i < this.almCarrito.length; i++) {
            total += Number(this.almCarrito[i]['valor']);
            tott.innerHTML=`Total:${eval(total)}`;
        }
    }
}

const almacenador = new almcenadorCarrito();

let carritos = document.getElementById('spawnCarrito');


function aggCarrito(a,b){
    // let contenidoCard = a.closest('.item');
    carritos.appendChild(a.closest('.card'));

    // let elimItemCar = document.createElement('button');
    // elimItemCar.textContent = 'Eliminar';
    // elimItemCar.className='btn btn-outline-danger';
    // elimItemCar.setAttribute('onclick',`eliminarItem(${b})`);
    // contenidoCard.appendChild(elimItemCar);
    
    location.reload();
    almacenador.getTotal();
    a.remove();
    
    

    const nombreArtic = artcl[b];
    const valorArt = valor[b];

    const artclo = new itemsCarrito(nombreArtic,valorArt);
    almacenador.addItem(artclo,b);
}

function eliminarItem(b){
    almacenador.removeItem(b);
    carritos.innerHTML='';
    almacenador.getCar();
    mostrarArticulo();
    almacenador.getTotal();
}

document.addEventListener('DOMContentLoaded',()=>{
    mostrarArticulo();
    almacenador.getCar();
    almacenador.getTotal();
})