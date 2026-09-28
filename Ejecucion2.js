<<<<<<< HEAD
Tiempolvl2 = 61
Puntajelvl2 = 0
let Activolvl2 = 1;
const METALVL2 = 34; // meta de puntaje del nivel 2 (coincide con el "0 / 34" del header)

// ids de los 3 meteoritos y sus intervalos/retardos de lanzamiento
const METEOROS_LVL2 = ["Meteioritolvl2", "Meteiorito2lvl2", "Meteiorito3lvl2"];
const RETARDO_INICIAL_LVL2 = [3500, 3000, 2200];
const INTERVALO_LVL2 = [2030, 2750, 2470];

let Activadores_iniciales_lvl2 = [];
let Reanudar_trayectorias_lvl2 = [];
let Chequeo_colision_lvl2 = null;

function JUEGOlvl2(){
    function Tiempo_Disminurlvl2(){
        Tiempolvl2--;
        let el = document.getElementById("Tiempolvl2");
        if(el) el.innerHTML = Tiempolvl2;
        if(Tiempolvl2 <= 0){
            Tiempolvl2 = 61; Puntajelvl2 = 0;
            document.getElementById("Puntajelvl2").innerHTML = "0 / " + METALVL2;
            let ps=document.getElementById("Perdiste_sound"); if(ps){ ps.currentTime = 0; ps.play(); }
            alert("El tiempo se agoto");
            METEOROS_LVL2.forEach(id=>{
                let m=document.getElementById(id); if(m){ m.style.transition="0s"; m.style.left="-70%"; }
            });
        }
    }
    Restar_Tiempolvl2 = setInterval(Tiempo_Disminurlvl2, 1000);

    function Aumentar_Puntoslvl2(){
        Puntajelvl2++;
        document.getElementById("Puntajelvl2").innerHTML = Puntajelvl2 + " / " + METALVL2;
        if(Puntajelvl2 >= METALVL2){
            Puntajelvl2 = 0; Tiempolvl2 = 61;
            document.getElementById("Tiempolvl2").innerHTML = 60;
            document.getElementById("Puntajelvl2").innerHTML = "0 / " + METALVL2;
            let f=document.getElementById("Fondo_Ciberpunk"); if(f) f.pause();
            let t=document.getElementById("Triunfo"); if(t) t.play();

            detenerTodoLvl2();

            METEOROS_LVL2.forEach(id=>{
                let m=document.getElementById(id); if(m){ m.style.transition="0s"; m.style.left="-70%"; }
            });

            let pantalla = document.getElementById("GanastePantallaLvL2");
            pantalla.style.display = "flex";
            pantalla.style.flexDirection = "column";
            pantalla.style.cursor = "pointer";

            if(!document.getElementById("btnIrNivel3")){
                let btn = document.createElement("div");
                btn.id = "btnIrNivel3";
                btn.innerText = "IR AL NIVEL 3 →";
                btn.style.background = "#00e5ff";
                btn.style.color = "#000";
                btn.style.padding = "18px 35px";
                btn.style.borderRadius = "30px";
                btn.style.fontFamily = "'Press Start 2P', cursive";
                btn.style.fontSize = "14px";
                btn.style.cursor = "pointer";
                btn.style.marginTop = "30px";
                btn.style.boxShadow = "0 0 20px rgba(0,229,255,0.8)";
                btn.style.zIndex = "9999";
                btn.onclick = irANivel3;
                pantalla.appendChild(btn);
            }

            Swal.fire({
                title : 'FELICIDADES POR SUPERAR <br> EL NIVEL',
                html: 'LOGRO: AGILIDAD EXTREMA<br><br>Dale a IR AL NIVEL 3',
                icon: 'success',
                confirmButtonText: 'IR AL NIVEL 3',
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) { irANivel3(); }
            });
        }
    }

    // --- Movimiento de meteoritos (uno por indice del array METEOROS_LVL2) ---
    function lanzarMeteorito(idx){
        let m = document.getElementById(METEOROS_LVL2[idx]);
        if(!m) return;
        m.style.transition = "2s";
        m.style.left = "80%";
        m.style.top = Math.round(Math.random()*450) + "px";
    }

    METEOROS_LVL2.forEach((id, idx)=>{
        Activadores_iniciales_lvl2[idx] = setTimeout(()=>lanzarMeteorito(idx), RETARDO_INICIAL_LVL2[idx]);
        Reanudar_trayectorias_lvl2[idx] = setInterval(()=>lanzarMeteorito(idx), INTERVALO_LVL2[idx]);
    });

    const SONIDOS_LVL2 = ["Puntos_sound", "Punto2", "Punto3"];
    METEOROS_LVL2.forEach((id, idx)=>{
        let m = document.getElementById(id);
        if(!m) return;
        m.addEventListener('mouseover', ()=>{
            Aumentar_Puntoslvl2();
            m.style.transition = "1.8s";
            m.style.left = "-500px";
            let s=document.getElementById(SONIDOS_LVL2[idx]); if(s){ s.currentTime = 0; s.play(); }
        });
    });

    // --- Chequeo de colision contra la linea limite ---
    function perdistelvl2(){
        let limite = document.querySelector(".Limitelvl2");
        if(!limite) return;
        let limiteX = limite.offsetLeft;
        let pierde = METEOROS_LVL2.some(id=>{
            let m = document.getElementById(id);
            return m && m.offsetLeft > 50 && (m.offsetLeft + m.offsetWidth) >= limiteX;
        });
        if(pierde){
            let ps=document.getElementById("Perdiste_sound"); if(ps){ ps.currentTime = 0; ps.play(); }
            alert("YA ES DEMASIADO TARDE, LOS METEORITOS DESTRUYERON GRAN PARTE DEL CONTINENTE");
            METEOROS_LVL2.forEach(id=>{
                let m=document.getElementById(id); if(m){ m.style.transition="0s"; m.style.left="-70%"; }
            });
            Tiempolvl2 = 61; Puntajelvl2 = 0;
            document.getElementById("Tiempolvl2").innerHTML = 60;
            document.getElementById("Puntajelvl2").innerHTML = "0 / " + METALVL2;
        }
    }
    Chequeo_colision_lvl2 = setInterval(perdistelvl2, 50);

    function irANivel3(){
        document.getElementById("GanastePantallaLvL2").style.display = "none";
        document.getElementById("NIVEL_02").style.display = "none";
        document.getElementById("NIVEL_01").style.display = "none";
        let n3 = document.getElementById("NIVEL3");
        n3.style.display = "block";
        n3.style.width = "100vw";
        n3.style.height = "100vh";
        n3.style.position = "relative";
        document.getElementById("Startlvl3").style.display = "flex";
        document.getElementById("Textolvl3").style.left = "0px";
        document.getElementById("Playlvl3").style.left = "0px";
        let dif = document.getElementById("Dificultadlvl3");
        if(dif){ dif.style.display="flex"; dif.style.left="0px"; }
        document.getElementById("Contenedor_contadorlvl3").style.display = "table";
        document.getElementById("RGBlvl3").innerHTML = "";
        Conteolvl3 = 3;
        Swal.close();
    }
    window.irANivel3 = irANivel3;

    // helper para dejar todo limpio (usado al ganar)
    function detenerTodoLvl2(){
        clearInterval(Restar_Tiempolvl2);
        Reanudar_trayectorias_lvl2.forEach(i=>clearInterval(i));
        Activadores_iniciales_lvl2.forEach(t=>clearTimeout(t));
        clearInterval(Chequeo_colision_lvl2);
    }
}

document.getElementById("Playlvl2").addEventListener('click', PLAYlvl2);
Conteolvl2 = 3;
function PLAYlvl2(){
    let fc=document.getElementById("Fondo_Ciberpunk"); if(fc) fc.play();
    setTimeout(()=>{ JUEGOlvl2(); }, 1800);

    function ESPERARlvl2(){
        function Cuenta_rglvl2(){
            Conteolvl2--;
            document.getElementById("RGBlvl2").innerHTML = Conteolvl2 >= 0 ? Conteolvl2 : "";

            // El tiburon/titulo/boton recien se van cuando el contador llega a 0
            if(Conteolvl2 == 0){
                let texo = document.getElementById("Texolvl2");
                let play = document.getElementById("Playlvl2");
                let dif = document.getElementById("Dificultad");
                if(texo){ texo.style.transition = "0.6s"; texo.style.left = "-900px"; }
                if(play){ play.style.transition = "0.6s"; play.style.left = "-900px"; }
                if(dif){ dif.style.transition = "0.6s"; dif.style.left = "-900px"; }
            }

            if(Conteolvl2 == -1){
                document.getElementById("Contenedor_contadorlvl2").style.display = "none";
                setTimeout(()=>{
                    document.getElementById("Startlvl2").style.display = "none";
                    DETENER_JUEGOlvl2();
                }, 650);
            }
        }
        setInterval(Cuenta_rglvl2, 600);
    }
    setTimeout(ESPERARlvl2, 350);
}

function DETENER_JUEGOlvl2(){
    document.getElementById("Pauselvl2").addEventListener('click', PAUSElvl2)
    Activolvl2 = 1
    function PAUSElvl2(){
        if(Activolvl2 == 1){
            // --- PAUSAR: congelar meteoritos en su posicion actual y detener TODO chequeo ---
            document.getElementById("Pausa_Pantallalvl2").style.display = "table"

            clearInterval(Restar_Tiempolvl2)
            Reanudar_trayectorias_lvl2.forEach(i=>clearInterval(i))
            Activadores_iniciales_lvl2.forEach(t=>clearTimeout(t))
            clearInterval(Chequeo_colision_lvl2) // esto es lo que evitaba que "perdiste" saliera en bucle

            METEOROS_LVL2.forEach(id=>{
                let m = document.getElementById(id);
                if(m){
                    // se congela en su posicion real (px) para que la transicion CSS no lo siga moviendo
                    m.style.left = m.offsetLeft + "px";
                    m.style.top = m.offsetTop + "px";
                    m.style.transition = "0s";
                }
            });

            let fc=document.getElementById("Fondo_Ciberpunk"); if(fc) fc.pause()
            Activolvl2 = 2
        } else {
            // --- REANUDAR: restaurar timers y volver a lanzar los meteoritos desde donde quedaron ---
            document.getElementById("Pausa_Pantallalvl2").style.display = "none"
            let fc=document.getElementById("Fondo_Ciberpunk"); if(fc) fc.play()

            Restar_Tiempolvl2 = setInterval(()=>{
                Tiempolvl2--;
                document.getElementById("Tiempolvl2").innerHTML = Tiempolvl2
                if(Tiempolvl2 <= 0){
                    Tiempolvl2 = 61; Puntajelvl2 = 0;
                    document.getElementById("Puntajelvl2").innerHTML = "0 / " + METALVL2;
                    let ps=document.getElementById("Perdiste_sound"); if(ps){ ps.currentTime = 0; ps.play(); }
                    alert("El tiempo se agoto");
                    METEOROS_LVL2.forEach(id=>{
                        let m=document.getElementById(id); if(m){ m.style.transition="0s"; m.style.left="-70%"; }
                    });
                }
            }, 1000)

            METEOROS_LVL2.forEach((id, idx)=>{
                let m = document.getElementById(id);
                if(m){ m.style.transition = "2s"; m.style.left = "80%"; }
                Reanudar_trayectorias_lvl2[idx] = setInterval(()=>{
                    let mm = document.getElementById(id);
                    if(mm){ mm.style.transition = "2s"; mm.style.left = "80%"; mm.style.top = Math.round(Math.random()*450)+"px"; }
                }, INTERVALO_LVL2[idx])
            })

            Chequeo_colision_lvl2 = setInterval(function(){
                let limite = document.querySelector(".Limitelvl2");
                if(!limite) return;
                let limiteX = limite.offsetLeft;
                let pierde = METEOROS_LVL2.some(id=>{
                    let m = document.getElementById(id);
                    return m && m.offsetLeft > 50 && (m.offsetLeft + m.offsetWidth) >= limiteX;
                });
                if(pierde){
                    let ps=document.getElementById("Perdiste_sound"); if(ps){ ps.currentTime = 0; ps.play(); }
                    alert("YA ES DEMASIADO TARDE, LOS METEORITOS DESTRUYERON GRAN PARTE DEL CONTINENTE");
                    METEOROS_LVL2.forEach(id=>{
                        let m=document.getElementById(id); if(m){ m.style.transition="0s"; m.style.left="-70%"; }
                    });
                    Tiempolvl2 = 61; Puntajelvl2 = 0;
                    document.getElementById("Tiempolvl2").innerHTML = 60;
                    document.getElementById("Puntajelvl2").innerHTML = "0 / " + METALVL2;
                }
            }, 50)

            Activolvl2 = 1
        }
    }
}
=======
Tiempolvl2 = 61 //VARIBLE DE INICIO TIEMPO
Puntajelvl2 = 0 //VARIABLE DE INICIO PUNTOS
GameOvl2 = 0 //VARIABLE QUE CONGELA LOS METEORITOS MIENTRAS SE MUESTRA EL MENSAJE DE PERDIDA





//CONTENEDOR QUE CONTEIENE TOO EL JUEGO
//DE POR SI ESTA FUNCION NO SE EJECUTA HASTA QUE SE LA LLAMA, MAS ADELANTE LA LLAMAREMOS
//PARA QUE EL JUEGO INICIE UNA VEZ SE PRESIONE JUGAR
function JUEGOlvl2(){

    function Tiempo_Disminurlvl2(){ //FUNCION QUE REDUCE EL TIEMPO Y RESETEAL EL RESULTADO UNA VEZ LLEGUE A 0
        Tiempolvl2--;
        document.getElementById("Tiempolvl2").innerHTML = Tiempolvl2
        if(Tiempolvl2 == 0){
            Tiempolvl2 = 61
            Puntajelvl2 = 0
            GameOvl2 = 1 //CONGELAMOS EL JUEGO PARA QUE LOS METEORITOS NO SIGAN CAYENDO
            alert("El tiempo se agotó, lo lamento, de seguro lo lograrás para la siguiente")
            GameOvl2 = 0 } } //SE REANUDA EL JUEGO UNA VEZ SE CIERRE EL MENSAJE

    
        Restar_Tiempolvl2 = setInterval(Tiempo_Disminurlvl2, 1000)

        //AÑADIMOS LA FUNCION AUMENTAR PUNTOS AL PASAR EL CURSOR SOBRE LOS METIORITOS
        document.getElementById("Meteioritolvl2").addEventListener('mouseover', Aumentar_Puntoslvl2)
        document.getElementById("Meteiorito2lvl2").addEventListener('mouseover', Aumentar_Puntoslvl2)
        document.getElementById("Meteiorito3lvl2").addEventListener('mouseover', Aumentar_Puntoslvl2)


        //FUNCION QUE UNICAMENTE AUMENTA PUNTOS Y RESETEA LAS VARIABLES AL LLEGAR A CIERTO LIMITE
        function Aumentar_Puntoslvl2(){
            Puntajelvl2++;
            document.getElementById("Puntajelvl2").innerHTML = Puntajelvl2 + " / 4"
            if(Puntajelvl2 == 2){
                Puntajelvl2 = 0 
                Tiempolvl2 = 61

                document.getElementById("Tiempolvl2").innerHTML = 60
                document.getElementById("Puntajelvl2").innerHTML = 0+"&nbsp;/&nbsp;"+34
                document.getElementById("Fondo_Ciberpunk").pause()
                document.getElementById("Triunfo").play()
                document.getElementById("NEXT").addEventListener('click', Habilitar_Siguienten_LVL)
                function Habilitar_Siguienten_LVL(){
                document.getElementById("NIVEL_01").style.display = "none"
                document.getElementById("NIVEL_02").style.display = "none"
                document.getElementById("NIVEL3").style.display = "block"
                document.querySelector(".Contenedor_Reloj").style.display = "none"
                document.getElementById("Nada").style.display = "none"
                document.getElementById("NEXT").style.display = "none"}
                            
                function Ganaste_Pantallalvl2(){

                    clearInterval(Reanudar_trayectorialvl2)
                    clearTimeout(Activador_iniciallvl2)
                    clearInterval(Reanudar_trayectoria2lvl2)
                    clearTimeout(Activador_inicial2lvl2)
                    clearInterval(Reanudar_trayectoria3lvl2)
                    clearTimeout(Activador_inicial3lvl2) 
                    clearInterval(Restar_Tiempolvl2) 

                    document.getElementById("Meteioritolvl2").style.left = "-70%"
                    document.getElementById("Meteioritolvl2").style.transition = "0s"

                    document.getElementById("Meteiorito2lvl2").style.left = "-70%"
                    document.getElementById("Meteiorito2lvl2").style.transition = "0s"
                    
                    document.getElementById("Meteiorito3lvl2").style.left = "-70%"
                    document.getElementById("Meteiorito3lvl2").style.transition = "0s"}

                     setInterval(Ganaste_Pantallalvl2, 1)


                document.getElementById("GanastePantallaLvL2").style.display = "flex"
                Swal.fire({
                    title : 'FELICIDADES POR SUPERAR <br> EL NIVEL <br><br> <img src="IMG/Check.png" width = "120px"><br>',
                    html: '¿VERDAD QUE FUE DIFÍCIL?. Prepárate para el siguiente nivel que las cosas van a empeorar. Agradecemos tu dedicación en pasar este nivel, esperemos que puedas seguir defendiendo la tierra de esa manera y mejores tu habilidad de reacción ',
                    icon: 'sucess',
                    confirmButtonText: 'QUIERO CONTINUAR',
                    width: '50%',
                    height: '80%',
                    timer: 100000,
                    
                    
                    timerProgressbar: true,
                    /*Funcion de cerrar la alerta*/
                    allowOutsideClick: true,
                    allowEscapeKey: false,
                    allowEnterkey: false,
                    stopKeydownPropagation: false,
                    });

                                }
                                     }


        //ESTA FUNCION DIRIGE AL PRIMER METIORITO 1 A LA TIERRA 
        function Metiorito_Direccionlvl2(){
            if(GameOvl2 == 1){ return } //NO SE MUEVE EL METEORITO SI EL JUEGO ESTA CONGELADO
            Distancia1lvl2 = 80
            Altura1lvl2 = Math.round(Math.random()* 450)

            document.getElementById("Meteioritolvl2").style.left = Distancia1lvl2 + "%"
            document.getElementById("Meteioritolvl2").style.top = Altura1lvl2 + "px"}

            Activador_iniciallvl2 = setTimeout(Metiorito_Direccionlvl2, 3500)//PRIMERO VA A SER EJECUTADO A LOS DOS PRIMEROS SEGUNDOS
            Reanudar_trayectorialvl2 = setInterval(Metiorito_Direccionlvl2, 2030)//LUEGO SE VA A LLAMAR A LOS METIORITOS CADA 2,4 SEGUNDOS


        //ESTA FUNCION DIRIGE AL PRIMER METIORITO 2 A LA TIERRA         
        function Metiorito_Direccion2lvl2(){
            if(GameOvl2 == 1){ return } //NO SE MUEVE EL METEORITO SI EL JUEGO ESTA CONGELADO
            Distancia2lvl2 = 80
            Altura2lvl2 = Math.round(Math.random()* 450)

            document.getElementById("Meteiorito2lvl2").style.left = Distancia2lvl2 + "%"
            document.getElementById("Meteiorito2lvl2").style.top = Altura2lvl2 + "px"}

            Activador_inicial2lvl2 = setTimeout(Metiorito_Direccion2lvl2, 3000)//PRIMERO VA A SER EJECUTADO A LOS DOS PRIMEROS SEGUNDOS
            Reanudar_trayectoria2lvl2 = setInterval(Metiorito_Direccion2lvl2, 2750)//LUEGO SE VA A LLAMAR A LOS METIORITOS CADA 2,3 SEGUNDOS

            //ESTA FUNCION DIRIGE AL PRIMER METIORITO 3 A LA TIERRA
            function Metiorito_Direccion3lvl2(){
                if(GameOvl2 == 1){ return } //NO SE MUEVE EL METEORITO SI EL JUEGO ESTA CONGELADO
                Distancia3lvl2 = 80
                Altura3lvl2 = Math.round(Math.random()* 450)
    
                document.getElementById("Meteiorito3lvl2").style.left = Distancia3lvl2 + "%"
                document.getElementById("Meteiorito3lvl2").style.top = Altura3lvl2 + "px"}
    
            Activador_inicial3lvl2  = setTimeout(Metiorito_Direccion3lvl2, 2200)//PRIMERO VA A SER EJECUTADO A LOS DOS PRIMEROS SEGUNDOS
            Reanudar_trayectoria3lvl2 = setInterval(Metiorito_Direccion3lvl2, 2470)//LUEGO SE VA A LLAMAR A LOS METIORITOS CADA 2,3 SEGUNDOS
       


        //AQUI ADJUNTAMOS LA ACCION DE LA FUNCION EXPULZAR AL PASAR SOBRE EL METIORITO
        document.getElementById("Meteioritolvl2").addEventListener('mouseover', Explulsarlvl2)
        document.getElementById("Meteiorito2lvl2").addEventListener('mouseover', Explulsar2lvl2)
        document.getElementById("Meteiorito3lvl2").addEventListener('mouseover', Explulsar3lvl2)

        //ESTA ES LA FUNCION QUE EXPULSA AL METEORITO 1 DE MANERA ALEATORIA FUERA DEL MAPA
        function Explulsarlvl2 (){
            document.getElementById("Puntos_sound").play()
            Distancialvl2 = "-500"
            Alturalvl2 = Math.round(Math.random()* 450)
            document.getElementById("Meteioritolvl2").style.left = Distancialvl2 + "px"
            document.getElementById("Meteioritolvl2").style.top = Alturalvl2 + "px"
            document.getElementById("Meteioritolvl2").style.transition = "1.8s"}


        //ESTA ES LA FUNCION QUE EXPULSA AL METEORITO 2 DE MANERA ALEATORIA FUERA DEL MAPA
        function Explulsar2lvl2 (){
            document.getElementById("Punto2").play()
            Distancialvl2 = "-500"
            Alturalvl2 = Math.round(Math.random()* 450)
            document.getElementById("Meteiorito2lvl2").style.left = Distancialvl2 + "px"
            document.getElementById("Meteiorito2lvl2").style.top = Alturalvl2 + "px"
            document.getElementById("Meteiorito2lvl2").style.transition = "1.8s"}

         //ESTA ES LA FUNCION QUE EXPULSA AL METEORITO 3 DE MANERA ALEATORIA FUERA DEL MAPA
        function Explulsar3lvl2 (){
            document.getElementById("Punto3").play()
            Distancialvl2 = "-500"
            Alturalvl2 = Math.round(Math.random()* 450)
            document.getElementById("Meteiorito3lvl2").style.left = Distancialvl2 + "px"
            document.getElementById("Meteiorito3lvl2").style.top = Alturalvl2 + "px"
            document.getElementById("Meteiorito3lvl2").style.transition = "1.8s"}




        
        //ESTA FUNCION SE ENCARGA DE ALERTARTE UNA VEZ EL METIORITO CRUZE LA LINEA CON UN PERDISTE
        //TAMBIEN RESETEA LOS VALORES Y LLEVA A LOS METIORITOS FUERA DEL MAPA DE MANERA INSTANTANEA
        function perdistelvl2 (){
            if(GameOvl2 == 1){ return } //NO SE REVISA NADA MIENTRAS EL JUEGO ESTA CONGELADO

            if((document.getElementById("Meteioritolvl2").offsetLeft > 630) ||
            (document.getElementById("Meteiorito2lvl2").offsetLeft > 630) ||
            (document.getElementById("Meteiorito3lvl2").offsetLeft > 630))
            
            {
                document.getElementById("Perdiste_sound").play()
            
                GameOvl2 = 1 //CONGELAMOS EL JUEGO PARA QUE LOS METEORITOS NO SIGAN CAYENDO
                alert("YA ES DEMASIADO TARDE, LOS METEORITOS DESTRUYERON GRAN PARTE DEL CONTINENTE Y LO MEJOR ES ESPERAR LO PEOR")


                document.getElementById("Meteioritolvl2").style.left = "-70%"
                document.getElementById("Meteioritolvl2").style.transition = "0s"

                document.getElementById("Meteiorito2lvl2").style.left = "-70%"
                document.getElementById("Meteiorito2lvl2").style.transition = "0s"

                document.getElementById("Meteiorito3lvl2").style.left = "-70%"
                document.getElementById("Meteiorito3lvl2").style.transition = "0s"

                document.getElementById("Meteioritolvl2").style.transition = "2s"
                document.getElementById("Meteiorito2lvl2").style.transition = "2s"
                document.getElementById("Meteiorito3lvl2").style.transition = "2s"

                Tiempolvl2 = 61
                Puntajelvl2 = 0 
                
                GameOvl2 = 0 } //SE REANUDA EL JUEGO UNA VEZ SE CIERRE EL MENSAJE
        
            else {
                document.getElementById("Meteioritolvl2").style.transition = "2s"
                document.getElementById("Meteiorito2lvl2").style.transition = "2s"
                document.getElementById("Meteiorito3lvl2").style.transition = "2s"           
            } }

        setInterval(perdistelvl2, 1)//LE COLOCAMOS UNO PARA QUE SIEMPRE SE ESTE EJECUTANDO, DADO A 
        //QUE NO SABEMOS CUANDO EL METIORITO VA A SUPERAR EL LIMITE
        }

        
        //LE DECIMOS QUE AL PRECIONAR EL BOTON JUGAR EJECUTARA LA FUNCION PLAY     
        document.getElementById("Playlvl2").addEventListener('click', PLAYlvl2)

        Conteolvl2 = 4 //ESTE ES EL CONTEO DE LA CUENTA REGRESIVA QUE SE DA DESPUEZ DE PRESINAR JUGAR
            
            //ESTA FUNCION EJECUTA UN CONJUNTO DE ACCIONES AL PRESIONAR JUGAR
            function PLAYlvl2(){
                document.getElementById("Fondo_Ciberpunk").play()
                //MUEVE EL TITULO FUERA DEL CONTENEDOR UNA VEZ DE CLICK A JUGAR
                document.getElementById("Texolvl2").style.left = "-900px" 
                //MUEVE AL BOTON PLAY TRANS PRESIONAR PRESIONAR AL MISMO BOTON
                document.getElementById("Playlvl2").style.left = "-900px" 
                document.getElementById("Dificultad").style.left = "-900px"
                    //ESTA FUNCION CONTIENE AL JUEGO COMO TAL
                    function ARRACARlvl2(){    
                        JUEGOlvl2()}
                //INVOCA AL JUEGO UNA VEZ PASEN 4 SEGUNDO - OSEA UNA VEZ TERMINE EL CONTADOR
                tiempo_de_arranquelvl2 =  setTimeout(ARRACARlvl2, 4100)
                //ESTA FUNCION EJECUTA LA CUENTA REGRESIVA Y RETIRA LA PANTALLA START 
                function ESPERARlvl2(){
                    function Cuenta_rglvl2(){
                        Conteolvl2--;
                        document.getElementById("RGBlvl2").innerHTML = Conteolvl2
                        if(Conteolvl2 == -1){
                        document.getElementById("Contenedor_contadorlvl2").style.display = "none"
                        function Borrarlvl2(){
                        document.getElementById("Startlvl2").style.display = "none"

                            DETENER_JUEGOlvl2() }//HABILITA LA FUNCION DE PAUSE Y REANUDAR UNA VEZ CARGUE EL JUEGO
                        setTimeout(Borrarlvl2, 500) }  }
                        setInterval (Cuenta_rglvl2, 1000)}

                        setTimeout(ESPERARlvl2, 350)}//SE EJECUTARA EN UN LAPSO DE 350, DESPUES DE PRESIONAR EL BOTON


            //ESTA FUNCION CONTIENE EL REANUDE Y PAUSE DEL BOTON
            function DETENER_JUEGOlvl2 (){
                //INDICA QUE LA FUNCION DE PAUSE SE EJECUTARA UNA VEZ SE DE CLICK AL BOTON DE PAUSE        
                document.getElementById("Pauselvl2").addEventListener('click', PAUSElvl2)
                //ESTA VARIABLE INDICA SI SE EJECUTA O NO EL DESPAUSEO
                Activolvl2 = 1 
                    //HACE QUE EL JUEGO SE DETENGA
                    function PAUSElvl2(){
                        //SI LLEGA A UNA EJECUTA LA FUNCION PAUSE
                        if (Activolvl2 == 1){
                        document.getElementById("Pausa_Pantallalvl2").style.display = "table"
                        document.getElementById("Fondo_Ciberpunk").pause()
                        clearInterval(Restar_Tiempolvl2)//BORRAMOS LA FUNCION DE TIEMPO
                        document.getElementById("Tiempolvl2").innerHTML = Tiempolvl2
                            clearInterval(Reanudar_trayectorialvl2)
                            clearInterval(Reanudar_trayectoria2lvl2)
                            clearInterval(Reanudar_trayectoria3lvl2)

                            function Metiorito_detenerlvl2 (){   
                            document.getElementById("Meteioritolvl2").style.left = document.getElementById("Meteioritolvl2").offsetLeft + "px" 
                            document.getElementById("Meteiorito2lvl2").style.left = document.getElementById("Meteiorito2lvl2").offsetLeft + "px" 
                            document.getElementById("Meteiorito3lvl2").style.left = document.getElementById("Meteiorito3lvl2").offsetLeft + "px" 

                            document.getElementById("Meteioritolvl2").style.top = document.getElementById("Meteioritolvl2").offsetTop + "px" 
                            document.getElementById("Meteiorito2lvl2").style.top = document.getElementById("Meteiorito2lvl2").offsetTop + "px" 
                            document.getElementById("Meteiorito3lvl2").style.top = document.getElementById("Meteiorito3lvl2").offsetTop + "px" }

                            Pusae_offflvl2 = setInterval(Metiorito_detenerlvl2, 0.01) //LE ASEGNAMOS UNA ID, PARA BORRALO UNA VEZ SE DESPAUSEE
                            Activolvl2 = 2} //CAMBIAMOS EL VALOR PARA QUE AL VOLVER A DARLE CLICK EJECUTE LA CONDICIONAL DE REANUDAR

                        else { //LA FUNCION DE REANUDAR
                            clearInterval(Pusae_offflvl2) 
                            document.getElementById("Pausa_Pantallalvl2").style.display = "none"
                            document.getElementById("Fondo_Ciberpunk").play()
                            function Tiempo_Disminurlvl2(){//VOLVEMOS A CREAR LA FUNCION DE TIEMPO PARA QUE REANUEDE EL CONTEO
                                Tiempolvl2--;
                                document.getElementById("Tiempolvl2").innerHTML = Tiempolvl2
                                if(Tiempolvl2 == 0){
                                    Tiempolvl2 = 61
                                    Puntajelvl2 = 0
                                GameOvl2 = 1 //CONGELAMOS EL JUEGO PARA QUE LOS METEORITOS NO SIGAN CAYENDO
                                alert("Lo lamento perdiste")
                                GameOvl2 = 0 } } //SE REANUDA EL JUEGO UNA VEZ SE CIERRE EL MENSAJE

                                Restar_Tiempolvl2 = setInterval(Tiempo_Disminurlvl2, 1000)
        
                        document.getElementById("Meteioritolvl2").style.left = Distancia1lvl2 + "%"
                        document.getElementById("Meteioritolvl2").style.top = Altura1lvl2 + "px"
                        document.getElementById("Meteioritolvl2").style.transition = "2s"

                        document.getElementById("Meteiorito2lvl2").style.left = Distancia2lvl2 + "%"
                        document.getElementById("Meteiorito2lvl2").style.top = Altura2lvl2 + "px"
                        document.getElementById("Meteiorito2lvl2").style.transition = "2s"

                        document.getElementById("Meteiorito3lvl2").style.left = Distancia3lvl2 + "%"
                        document.getElementById("Meteiorito3lvl2").style.top = Altura3lvl2 + "px"
                        document.getElementById("Meteiorito3lvl2").style.transition = "2s"

                        function Metiorito_Direccionlvl2(){
                            if(GameOvl2 == 1){ return } //NO SE MUEVE EL METEORITO SI EL JUEGO ESTA CONGELADO
                            Distancia1lvl2 = 80
                            Altura1lvl2 = Math.round(Math.random()* 450)
                
                            document.getElementById("Meteioritolvl2").style.left = Distancia1lvl2 + "%"
                            document.getElementById("Meteioritolvl2").style.top = Altura1lvl2 + "px"}
                
                            setTimeout(Metiorito_Direccionlvl2, 1700)//PRIMERO VA A SER EJECUTADO A LOS DOS PRIMEROS SEGUNDOS
                            Reanudar_trayectorialvl2 = setInterval(Metiorito_Direccionlvl2, 2430)//LUEGO SE VA A LLAMAR A LOS METIORITOS CADA 2,4 SEGUNDOS
                
                
                            function Metiorito_Direccion2lvl2(){
                                if(GameOvl2 == 1){ return } //NO SE MUEVE EL METEORITO SI EL JUEGO ESTA CONGELADO
                                Distancia2lvl2 = 80
                                Altura2lvl2 = Math.round(Math.random()* 400)
                
                                document.getElementById("Meteiorito2lvl2").style.left = Distancia2lvl2 + "%"
                                document.getElementById("Meteiorito2lvl2").style.top = Altura2lvl2 + "px"}
                
                                setTimeout(Metiorito_Direccion2lvl2, 1)
                                Reanudar_trayectoria2lvl2 = setInterval(Metiorito_Direccion2lvl2, 2050)
                
                            
                            function Metiorito_Direccion3lvl2(){
                                if(GameOvl2 == 1){ return } //NO SE MUEVE EL METEORITO SI EL JUEGO ESTA CONGELADO
                                Distancia3lvl2 = 80
                                Altura3lvl2 = Math.round(Math.random()* 350)
                    
                                document.getElementById("Meteiorito3lvl2").style.left = Distancia3lvl2 + "%"
                                document.getElementById("Meteiorito3lvl2").style.top = Altura3lvl2 + "px"}
                    
                                setTimeout(Metiorito_Direccion3lvl2, 1700)//PRIMERO VA A SER EJECUTADO A LOS DOS PRIMEROS SEGUNDOS
                                Reanudar_trayectoria3lvl2 = setInterval(Metiorito_Direccion3lvl2, 2570)//LUEGO SE VA A LLAMAR A LOS METIORITOS CADA 2,3 SEGUNDOS

                        Activolvl2 = 1 } } } //CAMBIAMOS EL VALOR DE NUEVO A 1 PARA QUE AL SIGUIENTE CLICK SE EJECUTE EL PAUSE  S 

                
>>>>>>> origin/main
