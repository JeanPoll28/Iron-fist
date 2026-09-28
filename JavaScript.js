Swal.fire({
    title : '¿Preparado para salvar el mundo? <br><br> <img src="IMG/planeta_tierra.png" width = "120px"><br>',
    html: 'IRON FIST, es un juego que mejorara tus reflejos a medida que pases de nivel, retandote cada vez mas a medida que avances y desbloqueando grandes logros al final de cada nivel, esperamos te diviertas y disfrutes de este gran juego ',
    icon: 'success',
    confirmButtonText: 'ESTOY PREPARADO',
    background: '#0a0528',
    color: '#eafcff',
    confirmButtonColor: '#00e5ff',
    width: '50%',
    height: '80%',
    timer: 100000,
    timerProgressbar: true,
    allowOutsideClick: true,
    allowEscapeKey: false,
    allowEnterkey: false,
    stopKeydownPropagation: false,
});

Tiempo = 71
Puntaje = 0

Narracion = 1
document.getElementById("Contenedor_narracion").addEventListener('click', Iniciar_narracion)
function Iniciar_narracion(){
    if(Narracion == 1){
    document.getElementById("narracion").play()
    document.getElementById("Fondo_Ciberpunk").volume = 0.15
    document.getElementById("VOLUMEN").style.display = "none"
    document.getElementById("PAUSE").style.display = "table"
    Narracion = 2}
    else{
        document.getElementById("narracion").pause()
        document.getElementById("Fondo_Ciberpunk").volume = 1
        document.getElementById("VOLUMEN").style.display = "table"
        document.getElementById("PAUSE").style.display = "none"
        Narracion = 1
    }
}

Graficos = 1
function Graficos_fondo(){
Contenedor_RQ = document.getElementById("Contenedor_RC")
if(Graficos == 1){
document.getElementById("Recursos").style.marginLeft = "60%"
document.getElementById("Fondo").style.background = "url(IMG/Fondo_Espacio2.jpg)"
document.getElementById("Fondo").style.backgroundAttachment = "fixed"
document.getElementById("Fondo").style.backgroundRepeat = "no-repeat"
document.getElementById("Fondo").style.backgroundSize = "100% 120%"
Graficos = 2}
else{
document.getElementById("Recursos").style.marginLeft = "0%"
document.getElementById("Fondo").style.backgroundImage = "url(IMG/Fondo_Espacio.gif) "
Graficos = 1
}
}

function JUEGO(){
    function Tiempo_Disminur(){
        Tiempo--;
        document.getElementById("Tiempo").innerHTML = Tiempo
        if(Tiempo == 0){
            Tiempo = 71
            Puntaje = 0
            document.getElementById("Perdiste_sound").play()
            alert("Lo lamento perdiste")} }
        Restar_Tiempo = setInterval(Tiempo_Disminur, 1000)

        document.getElementById("Meteiorito").addEventListener('mouseover', Aumentar_Puntos)
        document.getElementById("Meteiorito2").addEventListener('mouseover', Aumentar_Puntos)

        function Aumentar_Puntos(){
    Puntaje++;
    document.getElementById("Puntaje").innerHTML = Puntaje + "&nbsp;/&nbsp;15"
    if(Puntaje == 15){
        Puntaje = 0
        Tiempo = 71
        document.getElementById("Tiempo").innerHTML = 70
        document.getElementById("Puntaje").innerHTML = 0+"&nbsp;/&nbsp;"+15
        document.getElementById("Fondo_Ciberpunk").pause()
        document.getElementById("Triunfo").play()
        document.getElementById("Puntos_sound").pause()
        document.getElementById("Punto2").pause()
        document.getElementById("Punto3").pause()
        document.getElementById("Punto4").pause()
        document.getElementById("GANASTE_PANTALLA").style.display = "flex"
        
        function Ganaste_Pantalla(){
            clearInterval(Reanudar_trayectoria)
            clearInterval(Reanudar_trayectoria2)
            clearInterval(Restar_Tiempo)
            document.getElementById("Meteiorito").style.left = "-70%"
            document.getElementById("Meteiorito").style.transition = "0s"
            document.getElementById("Meteiorito2").style.left = "-70%"
            document.getElementById("Meteiorito2").style.transition = "0s"
        }
        Desbloquear_Pantalla = setInterval(Ganaste_Pantalla, 1)

        // --- INICIO DEL ARREGLO NIVEL 2 - NO BORRAR ---
        function Habilitar_Siguienten_LVL(){
            clearInterval(Restar_Tiempo);
            clearInterval(Reanudar_trayectoria);
            clearInterval(Reanudar_trayectoria2);
            clearInterval(Desbloquear_Pantalla);
            document.getElementById("GANASTE_PANTALLA").style.display = "none";
            document.getElementById("NIVEL_01").style.display = "none";
            document.getElementById("NIVEL_02").style.display = "flex";
            Swal.close();
        }

        Swal.fire({
            title: 'FELICIDADES POR SUPERAR <br> EL NIVEL <br><br> <img src="IMG/Check.png" width = "120px"><br>',
            html: 'Al parecer nos salvamos, agradecemos tu ayuda y ezfuerzo al superar este nivel, esperamos seguir contando contigo',
            icon: 'success',
            confirmButtonText: 'QUIERO CONTINUAR',
            width: '50%',
            height: '80%',
            timer: 100000,
            timerProgressBar: true,
            allowOutsideClick: true,
            allowEscapeKey: false,
            allowEnterKey: false,
            stopKeydownPropagation: false,
        }).then((result) => {
            if (result.isConfirmed) {
                Habilitar_Siguienten_LVL();
            }
        });
        // --- FIN DEL ARREGLO ---
    }
}


        function Metiorito_Direccion(){
            Distancia1 = 80
            Altura1 = Math.round(Math.random()* 450)
            document.getElementById("Meteiorito").style.left = Distancia1 + "%"
            document.getElementById("Meteiorito").style.top = Altura1 + "px"}
            setTimeout(Metiorito_Direccion, 2000)
            Reanudar_trayectoria = setInterval(Metiorito_Direccion, 2430)

        function Metiorito_Direccion2(){
            Distancia2 = 80
            Altura2 = Math.round(Math.random()* 450)
            document.getElementById("Meteiorito2").style.left = Distancia2 + "%"
            document.getElementById("Meteiorito2").style.top = Altura2 + "px"}
            setTimeout(Metiorito_Direccion2, 2600)
            Reanudar_trayectoria2 = setInterval(Metiorito_Direccion2, 2350)

        document.getElementById("Meteiorito").addEventListener('mouseover', Explulsar)
        document.getElementById("Meteiorito2").addEventListener('mouseover', Explulsar2)

        function Explulsar (){
            document.getElementById("Puntos_sound").play()
            Distancia = "-500"
            Altura = Math.round(Math.random()* 450)
            document.getElementById("Meteiorito").style.left = Distancia + "px"
            document.getElementById("Meteiorito").style.top = Altura + "px"
            document.getElementById("Meteiorito").style.transition = "1.8s"}
        function Explulsar2 (){
            document.getElementById("Punto2").play()
            Distancia = "-500"
            Altura = Math.round(Math.random()* 450)
            document.getElementById("Meteiorito2").style.left = Distancia + "px"
            document.getElementById("Meteiorito2").style.top = Altura + "px"
            document.getElementById("Meteiorito2").style.transition = "1.8s"}

        // *** ARREGLO LINEA BLANCA VS NARANJA ***
        // Antes era 630 fijo, ahora es 72% del contenedor = donde está tu línea blanca
        function perdiste (){
            let cont = document.querySelector(".Contenedor");
            let limiteX = cont? cont.offsetWidth * 0.72 : 800; // 72% = linea blanca
            if((document.getElementById("Meteiorito").offsetLeft > limiteX) ||
               (document.getElementById("Meteiorito2").offsetLeft > limiteX)) {
                document.getElementById("Perdiste_sound").play()
                alert("YA ES DEMASIADO TARDE, LOS METEORITOS DESTRUYERON GRAN PARTE DEL CONTINENTE Y LO MEJOR ES ESPERAR LO PEOR")
                document.getElementById("Meteiorito").style.left = "-70%"
                document.getElementById("Meteiorito").style.transition = "0s"
                document.getElementById("Meteiorito2").style.left = "-70%"
                document.getElementById("Meteiorito2").style.transition = "0s"
                Tiempo = 71
                Puntaje = 0 }
            else {
                document.getElementById("Meteiorito").style.transition = "2.4s"
                document.getElementById("Meteiorito2").style.transition = "2.4s"} }
        setInterval(perdiste, 10)
        }

        document.getElementById("Play").addEventListener('click', PLAY)
        Conteo = 3
            function PLAY(){
                document.getElementById("Fondo_Ciberpunk").play()
                document.getElementById("Texo").style.left = "-900px"
                document.getElementById("Contenedor_Mensaje_Star").style.left = "-100%"
                    function ARRACAR(){ JUEGO()}
                tiempo_de_arranque = setTimeout(ARRACAR, 1800)
                function ESPERAR(){
                    function Cuenta_rg(){
                        Conteo--;
                        document.getElementById("RGB").innerHTML = Conteo
                        if(Conteo == -1){
                        document.getElementById("Contenedor_contador").style.display = "none"
                        function Borrar(){
                        document.getElementById("Start").style.display = "none"
                            DETENER_JUEGO() }
                        setTimeout(Borrar, 500) } }
                        setInterval (Cuenta_rg, 1000)}
                        setTimeout(ESPERAR, 350)}

            function DETENER_JUEGO (){
                document.getElementById("Pause").addEventListener('click', PAUSE)
                Activo = 1
                    function PAUSE(){
                        if (Activo == 1){
                        document.getElementById("Fondo_Ciberpunk").pause()
                        document.getElementById("Pausa_Pantalla").style.display = "table"
                        clearInterval(Restar_Tiempo)
                        document.getElementById("Tiempo").innerHTML = Tiempo
                        clearInterval(Reanudar_trayectoria2)
                        clearInterval(Reanudar_trayectoria)
                            function Metiorito_detener (){
                            document.getElementById("Meteiorito").style.left = document.getElementById("Meteiorito").offsetLeft + "px"
                            document.getElementById("Meteiorito2").style.left = document.getElementById("Meteiorito2").offsetLeft + "px"
                            document.getElementById("Meteiorito").style.top = document.getElementById("Meteiorito").offsetTop + "px"
                            document.getElementById("Meteiorito2").style.top = document.getElementById("Meteiorito2").offsetTop + "px" }
                            Pusae_offf = setInterval(Metiorito_detener, 1)
                            Activo = 2}
                        else {
                            clearInterval(Pusae_offf)
                            document.getElementById("Pausa_Pantalla").style.display = "none"
                            document.getElementById("Fondo_Ciberpunk").play()
                            function Tiempo_Disminur(){
                                Tiempo--;
                                document.getElementById("Tiempo").innerHTML = Tiempo
                                if(Tiempo == 0){
                                    Tiempo = 71
                                    Puntaje = 0
                                document.getElementById("Perdiste_sound").play()
                                alert("Lo lamento perdiste")
                                document.getElementById("Meteiorito").style.left = "-70%"
                                document.getElementById("Meteiorito").style.transition = "0s"
                                document.getElementById("Meteiorito2").style.left = "-70%"
                                document.getElementById("Meteiorito2").style.transition = "0s"}
                                else{
                                    document.getElementById("Meteiorito").style.transition = "2.4s"
                                    document.getElementById("Meteiorito2").style.transition = "2.4s"}}
                        Restar_Tiempo = setInterval(Tiempo_Disminur, 1000)
                        document.getElementById("Meteiorito").style.left = Distancia1 + "%"
                        document.getElementById("Meteiorito").style.top = Altura1 + "px"
                        document.getElementById("Meteiorito").style.transition = "2.4s"
                        document.getElementById("Meteiorito2").style.left = Distancia2 + "%"
                        document.getElementById("Meteiorito2").style.top = Altura2 + "px"
                        document.getElementById("Meteiorito2").style.transition = "2.4s"
                        function Metiorito_Direccion(){
                            Distancia1 = 80
                            Altura1 = Math.round(Math.random()* 450)
                            document.getElementById("Meteiorito").style.left = Distancia1 + "%"
                            document.getElementById("Meteiorito").style.top = Altura1 + "px"}
                            setTimeout(Metiorito_Direccion, 2000)
                            Reanudar_trayectoria = setInterval(Metiorito_Direccion, 2430)
                        function Metiorito_Direccion2(){
                            Distancia2 = 80
                            Altura2 = Math.round(Math.random()* 450)
                            document.getElementById("Meteiorito2").style.left = Distancia2 + "%"
                            document.getElementById("Meteiorito2").style.top = Altura2 + "px"}
                            setTimeout(Metiorito_Direccion2, 2000)
                            Reanudar_trayectoria2 = setInterval(Metiorito_Direccion2, 2350)
                        Activo = 1} } }

function Mover() {
    var contenedor = document.getElementById("Seccion_01")
    contenedor.style.top = "-100%"
    contenedor.style.transition = "2s"
    function Desaparecer(){
    var contenedor = document.getElementById("Seccion_01")
    var Reglas = document.getElementById("Reglas")
    Reglas.style.top = "3%"
    Reglas.style.transition = "1s"
    contenedor.style.display = "none"
    }
    setTimeout(Desaparecer,1090)
}

function Mover_2(){
    var Reglas_Sacar = document.getElementById("Reglas")
    Reglas_Sacar.style.top = "-100%"
    Reglas_Sacar.style.transition = "1.4s"
    function Desaparecer2(){
    var Reglas_Sacar = document.getElementById("Reglas")
    var contenedor_2 = document.getElementById("Seccion_2")
    var imagen = document.getElementById("Imagen")
    var mensaje = document.getElementById("Mensaje")
    var titulo = document.getElementById("Titulo_historia")
    Reglas_Sacar.style.display = "none"
    contenedor_2.style.top = "0%"
    imagen.style.left = "2%"
    imagen.style.transition = "2s"
    mensaje.style.right = "2%"
    mensaje.style.transition = "2s"
    titulo.style.left = "2%"
    titulo.style.transition = "1s"
    }
    setTimeout(Desaparecer2, 1260)
}

// UN SOLO Mover_3 CON TODO
function Mover_3(){
  var contenedor_2 = document.getElementById("Seccion_2")
  var Supremo = document.getElementById("Seccion_suprema")
  document.getElementById("narracion").pause()
  contenedor_2.style.top = "-100%"
  contenedor_2.style.transition = "1.4s"
  Supremo.style.height = "100vh"
  document.getElementById('Seccion_2').style.left = '-100%';
  var Seccion_Juego = document.getElementById("Seccion_Juego")
  Seccion_Juego.style.left = "0%";
  Seccion_Juego.classList.add('activo-full');
  setTimeout(() => {
    document.getElementById('Splash_EsHora').style.display = 'none';
    document.getElementById('WrapperJuego').style.display = 'block';
  }, 2500);
}

const cards=document.querySelectorAll('.regla-card'),dots=document.querySelectorAll('.dot');let c=0;
function show(i){cards.forEach(x=>x.classList.remove('active'));dots.forEach(x=>x.classList.remove('active'));cards[i].classList.add('active');dots[i].classList.add('active')}
document.getElementById('nextRegla').onclick=()=>{c=(c+1)%cards.length;show(c)}
document.getElementById('prevRegla').onclick=()=>{c=(c-1+cards.length)%cards.length;show(c)}
dots.forEach((d,i)=>d.onclick=()=>{c=i;show(c)})
function IrNivel2(){
    document.getElementById("GANASTE_PANTALLA").style.display = "none";
    document.getElementById("NIVEL_01").style.display = "none";
    document.getElementById("NIVEL_02").style.display = "flex";
    document.getElementById("NIVEL_02").style.flexDirection = "column";
    document.getElementById("NIVEL_02").style.width = "100vw";
    document.getElementById("NIVEL_02").style.height = "100vh";
    if(window.Swal){ Swal.close(); }
}
