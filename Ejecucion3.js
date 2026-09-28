<<<<<<< HEAD
Tiempolvl3 = 50; Puntajelvl3 = 0;
let Activolvl3 = 1;
const METALVL3 = 40; // meta de puntaje del nivel 3 (coincide con "0 / 40" del header)

const METEOROS_LVL3 = ["Meteoritolvl3", "Meteorito2lvl3", "Meteorito3lvl3", "Meteorito4lvl3"];
const RETARDO_INICIAL_LVL3 = [2200, 2660, 2900, 3100];
const INTERVALO_LVL3 = [2950, 2750, 2550, 2350];
const SONIDOS_LVL3 = ["Puntos_sound", "Punto2", "Punto3", "Punto4"];

let Activadores_iniciales_lvl3 = [];
let Intervalos_lvl3 = [];
let Chequeo_colision_lvl3 = null;

function JUEGOlvl3() {
    function Tiempo_Disminurlvl3() {
        Tiempolvl3--; document.getElementById("Tiempolvl3").innerHTML = Tiempolvl3;
        if (Tiempolvl3 <= 0) {
            Tiempolvl3 = 50; Puntajelvl3 = 0;
            document.getElementById("Puntajelvl3").innerHTML = "0 / " + METALVL3;
            let ps=document.getElementById("Perdiste_sound"); if(ps){ ps.currentTime = 0; ps.play(); }
            METEOROS_LVL3.forEach(id=>{
                let m=document.getElementById(id); if(m){ m.style.transition="0s"; m.style.left="-70%"; }
            });
            Swal.fire({title:'¡Perdiste!', text:'El tiempo se agotó', icon:'error'});
        }
    }
    Restar_Tiempolvl3 = setInterval(Tiempo_Disminurlvl3, 1000);

    function Aumentar_Puntoslvl3() {
        Puntajelvl3++;
        document.getElementById("Puntajelvl3").innerHTML = Puntajelvl3 + " / " + METALVL3;
        if (Puntajelvl3 >= METALVL3) {
            Puntajelvl3 = 0; Tiempolvl3 = 50;
            document.getElementById("Fondo_Ciberpunk").pause();
            document.getElementById("Triunfo").play();

            detenerTodoLvl3();

            METEOROS_LVL3.forEach(id=>{
                let m=document.getElementById(id); if(m){ m.style.transition="0s"; m.style.left="-70%"; }
            });

            document.getElementById("Musica_Final").play();
            document.getElementById("Pantalla_Ovnislvl3").style.left = "7%";
            document.getElementById("Pantalla_Ovnislvl3").style.transition = "6s";
            document.getElementById("Pantalla_Nodrizalvl3").style.left = "10%";
            document.getElementById("Pantalla_Nodrizalvl3").style.transition = "5s";
            document.getElementById("Pantalla_Ovnis2lvl3").style.left = "7%";
            document.getElementById("Pantalla_Ovnis2lvl3").style.transition = "6s";
            setTimeout(()=>{
                document.getElementById("Pantalla_creditoslvl3").style.background = "black";
                document.getElementById("Creditoslvl3").style.top = "-15%";
                document.getElementById("Creditoslvl3").style.transition = "10s";
                document.getElementById("Proximolvl3").style.bottom = "-34%";
                document.getElementById("Proximolvl3").style.transition = "15s";
            }, 5000);
            Swal.fire({
                title: '¡Felicidades por parte del Grupo Omega!<br><br><img src="IMG/Logo_Omega.png" width="120px">',
                html: '<b>Sabía que lo lograrías, nos salvaste de la destrucción, pero ahora nos espera otra lucha. ¡Esperamos verte en IRON FIST 2!<br><br>CONTACTOS:<br>71727432@certus.edu.pe<br>71663265@certus.edu.pe<br>70845813@certus.edu.pe</b>',
                icon: 'success',
                confirmButtonText: 'De acuerdo',
                confirmButtonColor:'#00e5ff',
                background:'#0a0528',
                color:'#eafcff',
                width:'50%',
            });
        }
    }

    function lanzarMeteoritolvl3(idx){
        let m = document.getElementById(METEOROS_LVL3[idx]);
        if(!m) return;
        m.style.transition = "1.9s";
        m.style.left = "80%";
        m.style.top = Math.round(Math.random()*450) + "px";
    }

    METEOROS_LVL3.forEach((id, idx)=>{
        Activadores_iniciales_lvl3[idx] = setTimeout(()=>lanzarMeteoritolvl3(idx), RETARDO_INICIAL_LVL3[idx]);
        Intervalos_lvl3[idx] = setInterval(()=>lanzarMeteoritolvl3(idx), INTERVALO_LVL3[idx]);
    });

    METEOROS_LVL3.forEach((id, idx)=>{
        let m = document.getElementById(id);
        if(!m) return;
        m.addEventListener('mouseover', ()=>{
            Aumentar_Puntoslvl3();
            m.style.transition = "1.5s";
            m.style.left = "-500px";
            let s=document.getElementById(SONIDOS_LVL3[idx]); if(s){ s.currentTime = 0; s.play(); }
        });
    });

    // --- Colision contra la linea blanca (.Limitelvl3) ---
    function perdistelvl3(){
        let limite = document.querySelector(".Limitelvl3");
        if(!limite) return;
        let limiteX = limite.offsetLeft;
        let pierde = METEOROS_LVL3.some(id=>{
            let m = document.getElementById(id);
            return m && m.offsetLeft > 50 && (m.offsetLeft + m.offsetWidth) >= limiteX;
        });
        if(pierde){
            let ps=document.getElementById("Perdiste_sound"); if(ps){ ps.currentTime = 0; ps.play(); }
            METEOROS_LVL3.forEach(id=>{
                let m=document.getElementById(id); if(m){ m.style.transition="0s"; m.style.left="-70%"; }
            });
            Tiempolvl3 = 50; Puntajelvl3 = 0;
            document.getElementById("Tiempolvl3").innerHTML = 50;
            document.getElementById("Puntajelvl3").innerHTML = "0 / " + METALVL3;
            Swal.fire({title:'¡Perdiste!', text:'Un meteorito llegó al planeta', icon:'error'});
        }
    }
    Chequeo_colision_lvl3 = setInterval(perdistelvl3, 50);

    function detenerTodoLvl3(){
        clearInterval(Restar_Tiempolvl3);
        Intervalos_lvl3.forEach(i=>clearInterval(i));
        Activadores_iniciales_lvl3.forEach(t=>clearTimeout(t));
        clearInterval(Chequeo_colision_lvl3);
    }
}

document.getElementById("Playlvl3").addEventListener('click', PLAYlvl3);
Conteolvl3 = 3;
function PLAYlvl3(){
    document.getElementById("Fondo_Ciberpunk").play();
    setTimeout(()=>{ JUEGOlvl3(); }, 1500);

    function ESPERARlvl3(){
        function Cuenta_rglvl3(){
            Conteolvl3--;
            document.getElementById("RGBlvl3").innerHTML = Conteolvl3 >= 0 ? Conteolvl3 : "";

            // el titulo/dificultad/boton recien se van cuando el contador llega a 0
            if(Conteolvl3 == 0){
                let texto = document.getElementById("Textolvl3");
                let play = document.getElementById("Playlvl3");
                let dif = document.getElementById("Dificultadlvl3");
                if(texto){ texto.style.transition = "0.6s"; texto.style.left = "-900px"; }
                if(play){ play.style.transition = "0.6s"; play.style.left = "-900px"; }
                if(dif){ dif.style.transition = "0.6s"; dif.style.left = "-900px"; }
            }

            if(Conteolvl3 == -1){
                document.getElementById("Contenedor_contadorlvl3").style.display = "none";
                setTimeout(()=>{
                    document.getElementById("Startlvl3").style.display = "none";
                    DETENER_JUEGOlvl3();
                }, 650);
            }
        }
        setInterval(Cuenta_rglvl3, 600);
    }
    setTimeout(ESPERARlvl3, 350);
}

function DETENER_JUEGOlvl3(){
    document.getElementById("Pauselvl3").addEventListener('click', PAUSElvl3);
    Activolvl3 = 1;
    function PAUSElvl3(){
        if(Activolvl3 == 1){
            // --- PAUSAR: congelar meteoritos y detener el chequeo de colision ---
            document.getElementById("Pausa_Pantallalvl3").style.display = "table";

            clearInterval(Restar_Tiempolvl3);
            Intervalos_lvl3.forEach(i=>clearInterval(i));
            Activadores_iniciales_lvl3.forEach(t=>clearTimeout(t));
            clearInterval(Chequeo_colision_lvl3);

            METEOROS_LVL3.forEach(id=>{
                let m = document.getElementById(id);
                if(m){
                    m.style.left = m.offsetLeft + "px";
                    m.style.top = m.offsetTop + "px";
                    m.style.transition = "0s";
                }
            });

            document.getElementById("Fondo_Ciberpunk").pause();
            Activolvl3 = 2;
        } else {
            // --- REANUDAR ---
            document.getElementById("Pausa_Pantallalvl3").style.display = "none";
            document.getElementById("Fondo_Ciberpunk").play();

            Restar_Tiempolvl3 = setInterval(()=>{
                Tiempolvl3--;
                document.getElementById("Tiempolvl3").innerHTML = Tiempolvl3;
                if(Tiempolvl3 <= 0){
                    Tiempolvl3 = 50; Puntajelvl3 = 0;
                    document.getElementById("Puntajelvl3").innerHTML = "0 / " + METALVL3;
                    let ps=document.getElementById("Perdiste_sound"); if(ps){ ps.currentTime = 0; ps.play(); }
                    METEOROS_LVL3.forEach(id=>{
                        let m=document.getElementById(id); if(m){ m.style.transition="0s"; m.style.left="-70%"; }
                    });
                    Swal.fire({title:'¡Perdiste!', text:'El tiempo se agotó', icon:'error'});
                }
            }, 1000);

            METEOROS_LVL3.forEach((id, idx)=>{
                let m = document.getElementById(id);
                if(m){ m.style.transition = "1.9s"; m.style.left = "80%"; }
                Intervalos_lvl3[idx] = setInterval(()=>{
                    let mm = document.getElementById(id);
                    if(mm){ mm.style.transition = "1.9s"; mm.style.left = "80%"; mm.style.top = Math.round(Math.random()*450)+"px"; }
                }, INTERVALO_LVL3[idx]);
            });

            Chequeo_colision_lvl3 = setInterval(function(){
                let limite = document.querySelector(".Limitelvl3");
                if(!limite) return;
                let limiteX = limite.offsetLeft;
                let pierde = METEOROS_LVL3.some(id=>{
                    let m = document.getElementById(id);
                    return m && m.offsetLeft > 50 && (m.offsetLeft + m.offsetWidth) >= limiteX;
                });
                if(pierde){
                    let ps=document.getElementById("Perdiste_sound"); if(ps){ ps.currentTime = 0; ps.play(); }
                    METEOROS_LVL3.forEach(id=>{
                        let m=document.getElementById(id); if(m){ m.style.transition="0s"; m.style.left="-70%"; }
                    });
                    Tiempolvl3 = 50; Puntajelvl3 = 0;
                    document.getElementById("Tiempolvl3").innerHTML = 50;
                    document.getElementById("Puntajelvl3").innerHTML = "0 / " + METALVL3;
                    Swal.fire({title:'¡Perdiste!', text:'Un meteorito llegó al planeta', icon:'error'});
                }
            }, 50);

            Activolvl3 = 1;
        }
    }
}
=======
Tiempolvl3 = 16 //VARIBLE DE INICIO TIEMPO
Puntajelvl3 = 0 //VARIABLE DE INICIO PUNTOS

//CONTENEDOR QUE CONTIENE TOO EL JUEGO
//DE POR SI ESTA FUNCION NO SE EJECUTA HASTA QUE SE LA LLAMA, MAS ADELANTE LA LLAMAREMOS
//PARA QUE EL JUEGO INICIE UNA VEZ SE PRESIONE JUGAR
function JUEGOlvl3() {
  //FUNCION QUE REDUCE EL TIEMPO Y RESETEAL EL RESULTADO UNA VEZ LLEGUE A 0
  function Tiempo_Disminurlvl3() {
    Tiempolvl3--
    document.getElementById('Tiempolvl3').innerHTML = Tiempolvl3
    if (Tiempolvl3 == 0) {
      Tiempolvl3 = 16
      Puntajelvl3 = 0
      alert('Lo lamento perdiste')
    }
  }
  Restar_Tiempolvl3 = setInterval(Tiempo_Disminurlvl3, 1000)

  //AÑADIMOS LA FUNCION AUMENTAR PUNTOS AL PASAR EL CURSOR SOBRE LOS METEORITOS
  document
    .getElementById('Meteoritolvl3')
    .addEventListener('mouseover', Aumentar_Puntoslvl3)
  document
    .getElementById('Meteorito2lvl3')
    .addEventListener('mouseover', Aumentar_Puntoslvl3)
  document
    .getElementById('Meteorito3lvl3')
    .addEventListener('mouseover', Aumentar_Puntoslvl3)
  document
    .getElementById('Meteorito4lvl3')
    .addEventListener('mouseover', Aumentar_Puntoslvl3)

  //FUNCION QUE UNICAMENTE AUMENTA PUNTOS Y RESETEA LAS VARIABLES AL LLEGAR A CIERTO LIMITE
  function Aumentar_Puntoslvl3() {
    Puntajelvl3++
    document.getElementById('Puntajelvl3').innerHTML = Puntajelvl3 + ' / 15'
    if (Puntajelvl3 == 15) {
      Puntajelvl3 = 0
      Tiempolvl3 = 16
      function Contactos() {
        Swal.fire({
          title:
            'Felicitaciones por parte del <br> Grupo Omega<br><br><img src="IMG/Logo_Omega.png" width = "120px">',
          html: '<b class="Aumentar puntos">Sabia que lo lograrias, nos salVaste de la destrucciÓn, pero ahora nos espera otra lucha, esperemos volVerte a ver jugando IRON FIST 2 en un futuro <br><br> CONTACTOS:<br><br> 71727432@certus.edu.pe <br><br> 71663265@certus.edu.pe <br><br> 70845813@certus.edu.pe <br> </b>',
          icon: 'sucess',
          confirmButtonText: '<span id="Pausear_musica">De acuerdo</span>',
          width: '50%',
          height: '80%',
          timer: 100000,

          timerProgressbar: true,
          /*Funcion de cerrar la alerta*/
          allowOutsideClick: true,
          allowEscapeKey: false,
          allowEnterkey: false,
          stopKeydownPropagation: false,
        })
      }
      setTimeout(Contactos, 15000)

      document.getElementById('Fondo_Ciberpunk').pause()
      document.getElementById('Triunfo').play()

      function Ganaste_Pantallalvl3() {
        document.getElementById('Meteoritolvl3').style.left = '-70%'
        document.getElementById('Meteoritolvl3').style.transition = '0s'

        document.getElementById('Meteorito2lvl3').style.left = '-70%'
        document.getElementById('Meteorito2lvl3').style.transition = '0s'

        document.getElementById('Meteorito3lvl3').style.left = '-70%'
        document.getElementById('Meteorito3lvl3').style.transition = '0s'

        document.getElementById('Meteorito4lvl3').style.left = '-70%'
        document.getElementById('Meteorito4lvl3').style.transition = '0s'
      }

      setInterval(Ganaste_Pantallalvl3, 1)

      Tiempolvl3 = 16
      Puntajelvl3 = 0

      clearInterval(Intervalo_Dirlvl3)
      clearInterval(Intervalo_Dir2lvl3)
      clearInterval(Intervalo_Dir3lvl3)
      clearInterval(Intervalo_Dir4lvl3)
      clearInterval(Restar_Tiempolvl3)

      document.getElementById('Musica_Final').play()

      document.getElementById('Pantalla_Ovnislvl3').style.left = '7%'
      document.getElementById('Pantalla_Ovnislvl3').style.transition = '6s'
      document.getElementById('Pantalla_Nodrizalvl3').style.left = '10%'
      document.getElementById('Pantalla_Nodrizalvl3').style.transition = '5s'
      document.getElementById('Pantalla_Ovnis2lvl3').style.left = '7%'
      document.getElementById('Pantalla_Ovnis2lvl3').style.transition = '6s'

      function Creditoslvl3() {
        document.getElementById('Pantalla_creditoslvl3').style.background =
          'black'
        document.getElementById('Creditoslvl3').style.top = '-15%'
        document.getElementById('Creditoslvl3').style.transition = '10s'
        document.getElementById('Proximolvl3').style.bottom = '-34%'
        document.getElementById('Proximolvl3').style.transition = '15s'
      }
      setTimeout(Creditoslvl3, 5000)
    }
  }

  //ESTA FUNCION DIRIGE AL PRIMER METEORITO 1 A LA TIERRA
  function Meteorito_Direccionlvl3() {
    Distancia1lvl3 = 80
    Altura1lvl3 = Math.round(Math.random() * 450)

    document.getElementById('Meteoritolvl3').style.left = Distancia1lvl3 + '%'
    document.getElementById('Meteoritolvl3').style.top = Altura1lvl3 + 'px'
    document.getElementById('Meteoritolvl3').style.transition = '1.9s'
  }

  setTimeout(Meteorito_Direccionlvl3, 2200)
  Intervalo_Dirlvl3 = setInterval(Meteorito_Direccionlvl3, 2950)

  //ESTA FUNCION DIRIGE AL METEORITO 2 A LA TIERRA
  function Meteorito_Direccion2lvl3() {
    Distancia2lvl3 = 80
    Altura2lvl3 = Math.round(Math.random() * 450)

    document.getElementById('Meteorito2lvl3').style.left = Distancia2lvl3 + '%'
    document.getElementById('Meteorito2lvl3').style.top = Altura2lvl3 + 'px'
    document.getElementById('Meteorito2lvl3').style.transition = '1.9s'
  }

  setTimeout(Meteorito_Direccion2lvl3, 2660)
  Intervalo_Dir2lvl3 = setInterval(Meteorito_Direccion2lvl3, 2750)

  //ESTA FUNCION DIRIGE AL METEORITO 3 A LA TIERRA
  function Meteorito_Direccion3lvl3() {
    Distancia3lvl3 = 80
    Altura3lvl3 = Math.round(Math.random() * 450)

    document.getElementById('Meteorito3lvl3').style.left = Distancia3lvl3 + '%'
    document.getElementById('Meteorito3lvl3').style.top = Altura3lvl3 + 'px'
    document.getElementById('Meteorito3lvl3').style.transition = '1.9s'
  }

  setTimeout(Meteorito_Direccion3lvl3, 2900)
  Intervalo_Dir3lvl3 = setInterval(Meteorito_Direccion3lvl3, 2550)

  //ESTA FUNCION DIRIGE AL METEORITO 4 A LA TIERRA
  function Meteorito_Direccion4lvl3() {
    Distancia4lvl3 = 80
    Altura4lvl3 = Math.round(Math.random() * 450)

    document.getElementById('Meteorito4lvl3').style.left = Distancia4lvl3 + '%'
    document.getElementById('Meteorito4lvl3').style.top = Altura4lvl3 + 'px'
    document.getElementById('Meteorito4lvl3').style.transition = '1.9s'
  }

  setTimeout(Meteorito_Direccion4lvl3, 3100)
  Intervalo_Dir4lvl3 = setInterval(Meteorito_Direccion4lvl3, 2150)

  //AQUI ADJUNTAMOS LA ACCION DE LA FUNCION EXPULZAR AL PASAR SOBRE EL METEORITO
  document
    .getElementById('Meteoritolvl3')
    .addEventListener('mouseover', Explulsarlvl3)
  document
    .getElementById('Meteorito2lvl3')
    .addEventListener('mouseover', Explulsar2lvl3)
  document
    .getElementById('Meteorito3lvl3')
    .addEventListener('mouseover', Explulsar3lvl3)
  document
    .getElementById('Meteorito4lvl3')
    .addEventListener('mouseover', Explulsar4lvl3)

  //ESTA ES LA FUNCION QUE EXPULSA AL METIRITO 1 DE MANERA ALEATORIA FUERA DEL MAPA
  function Explulsarlvl3() {
    document.getElementById('Puntos_sound').play()
    Distancialvl3 = '-500'
    Alturalvl3 = Math.round(Math.random() * 600)

    document.getElementById('Meteoritolvl3').style.left = Distancialvl3 + 'px'
    document.getElementById('Meteoritolvl3').style.top = Alturalvl3 + 'px'
    document.getElementById('Meteoritolvl3').style.transition = '1.7s'
  }

  //ESTA ES LA FUNCION QUE EXPULSA AL METIRITO 2 DE MANERA ALEATORIA FUERA DEL MAPA
  function Explulsar2lvl3() {
    document.getElementById('Punto2').play()
    Distancialvl3 = '-500'
    Alturalvl3 = Math.round(Math.random() * 500)

    document.getElementById('Meteorito2lvl3').style.left = Distancialvl3 + 'px'
    document.getElementById('Meteorito2lvl3').style.top = Alturalvl3 + 'px'
    document.getElementById('Meteorito2lvl3').style.transition = '1.7s'
  }

  //ESTA ES LA FUNCION QUE EXPULSA AL METIRITO 3 DE MANERA ALEATORIA FUERA DEL MAPA
  function Explulsar3lvl3() {
    document.getElementById('Punto3').play()
    Distancialvl3 = '-500'
    Alturalvl3 = Math.round(Math.random() * 600)

    document.getElementById('Meteorito3lvl3').style.left = Distancialvl3 + 'px'
    document.getElementById('Meteorito3lvl3').style.top = Alturalvl3 + 'px'
    document.getElementById('Meteorito3lvl3').style.transition = '1.7s'
  }

  //ESTA ES LA FUNCION QUE EXPULSA AL METIRITO 4 DE MANERA ALEATORIA FUERA DEL MAPA
  function Explulsar4lvl3() {
    document.getElementById('Punto4').play()
    Distancialvl3 = '-500'
    Alturalvl3 = Math.round(Math.random() * 600)

    document.getElementById('Meteorito4lvl3').style.left = Distancialvl3 + 'px'
    document.getElementById('Meteorito4lvl3').style.top = Alturalvl3 + 'px'
    document.getElementById('Meteorito4lvl3').style.transition = '1.7s'
  }

  //ESTA FUNCION SE ENCARGA DE ALERTARTE UNA VEZ EL METEORITO CRUZE LA LINEA CON UN PERDISTE
  //TAMBIEN RESETEA LOS VALORES Y LLEVA A LOS METEORITOS FUERA DEL MAPA DE MANERA INSTANTANEA
  function perdistelvl3() {
    if (
      document.getElementById('Meteoritolvl3').offsetLeft > 630 ||
      document.getElementById('Meteorito2lvl3').offsetLeft > 630 ||
      document.getElementById('Meteorito3lvl3').offsetLeft > 630 ||
      document.getElementById('Meteorito4lvl3').offsetLeft > 630
    ) {
      alert(
        'YA ES DEMASIADO TARDE LOS METIORITOS DESTRUYERON GRAN PARTE DEL CONTINENTE LO MEJOR ES ESPERAR LO PEOR',
      )
      document.getElementById('Perdiste_sound').play()

      document.getElementById('Meteoritolvl3').style.left = '-70%'
      document.getElementById('Meteoritolvl3').style.transition = '0s'
      setTimeout(Meteorito_Direccion4lvl3, 2000)

      document.getElementById('Meteorito2lvl3').style.left = '-70%'
      document.getElementById('Meteorito2lvl3').style.transition = '0s'
      setTimeout(Meteorito_Direccion4lvl3, 2000)

      document.getElementById('Meteorito3lvl3').style.left = '-70%'
      document.getElementById('Meteorito3lvl3').style.transition = '0s'
      setTimeout(Meteorito_Direccion4lvl3, 2600)

      document.getElementById('Meteorito4lvl3').style.left = '-70%'
      document.getElementById('Meteorito4lvl3').style.transition = '0s'
      setTimeout(Meteorito_Direccion4lvl3, 2900)

      Tiempolvl3 = 16
      Puntajelvl3 = 0
    } else {
      document.getElementById('Meteoritolvl3').style.transition = '1.9s'
      document.getElementById('Meteorito2lvl3').style.transition = '1.9s'
      document.getElementById('Meteorito3lvl3').style.transition = '1.9s'
      document.getElementById('Meteorito4lvl3').style.transition = '1.9s'
    }
  }

  Vigilancia_Perdidalvl3 = setInterval(perdistelvl3, 1) //LE COLOCAMOS UNO PARA QUE SIEMPRE SE ESTE EJECUTANDO, DADO A
  //QUE NO SABEMOS CUANDO EL METEORITO VA A SUPERAR EL LIMITE
}

//LE DECIMOS QUE AL PRESIONAR EL BOTON JUGAR EJECUTARA LA FUNCION PLAY
document.getElementById('Playlvl3').addEventListener('click', PLAYlvl3)

//ESTE ES EL CONTEO DE LA CUENTA REGRESIVA QUE SE DA DESPUEZ DE PRESINAR JUGAR
Conteolvl3 = 4

//ESTA FUNCION EJECUTA UN CONJUNTO DE ACCIONES AL PRESIONAR JUGAR
function PLAYlvl3() {
  document.getElementById('Fondo_Ciberpunk').play()
  //MUEVE EL TITULO FUERA DEL CONTENEDOR UNA VEZ DE CLICK A JUGAR
  document.getElementById('Textolvl3').style.left = '-900px'
  //MUEVE AL BOTON PLAY TRANS PRESIONAR PRESIONAR AL MISMO BOTON
  document.getElementById('Playlvl3').style.left = '-900px'
  //MUEVE LA DIFICULTAD AL PRESIONAR JUGAR
  document.getElementById('Dificultadlvl3').style.left = '-900px'
  function ARRACARlvl3() {
    JUEGOlvl3()
  }
  //INVOCA AL JUEGO UNA VEZ PASEN 4 SEGUNDO - OSEA UNA VEZ TERMINE EL CONTADOR
  tiempo_de_arranquelvl3 = setTimeout(ARRACARlvl3, 4100)
  //ESTA FUNCION EJECUTA LA CUENTA REGRESIVA Y RETIRA LA PANTALLA START
  function ESPERARlvl3() {
    function Cuenta_rglvl3() {
      Conteolvl3--
      document.getElementById('RGBlvl3').innerHTML = Conteolvl3
      if (Conteolvl3 == -1) {
        document.getElementById('Contenedor_contadorlvl3').style.display =
          'none'

        function Borrarlvl3() {
          document.getElementById('Startlvl3').style.display = 'none'

          DETENER_JUEGOlvl3()
        } //HABILITA LA FUNCION DE PAUSE Y REANUDAR UNA VEZ CARGUE EL JUEGO
        setTimeout(Borrarlvl3, 500)
      }
    }
    setInterval(Cuenta_rglvl3, 1000)
  }

  setTimeout(ESPERARlvl3, 350)
} //SE EJECUTARA EN UN LAPSO DE 350, DESPUES DE PRESIONAR EL BOTON

//ESTA FUNCION CONTIENE EL REANUDE Y PAUSE DEL BOTON
function DETENER_JUEGOlvl3() {
  //INDICA QUE LA FUNCION DE PAUSE SE EJECUTARA UNA VEZ SE DE CLICK AL BOTON DE PAUSE
  document.getElementById('Pauselvl3').addEventListener('click', PAUSElvl3)
  //ESTA VARIABLE INDICA SI SE EJECUTA O NO EL DESPAUSEO
  Activolvl3 = 1
  //HACE QUE EL JUEGO SE DETENGA
  function PAUSElvl3() {
    //SI LLEGA A UNA EJECUTA LA FUNCION PAUSE
    if (Activolvl3 == 1) {
      document.getElementById('Pausa_Pantallalvl3').style.display = 'table'
      clearInterval(Restar_Tiempolvl3) //BORRAMOS LA FUNCION DE TIEMPO
      document.getElementById('Tiempolvl3').innerHTML = Tiempolvl3
      document.getElementById('Fondo_Ciberpunk').pause()
      function Meteorito_detenerlvl3() {
        clearInterval(Intervalo_Dirlvl3)
        clearInterval(Intervalo_Dir2lvl3)
        clearInterval(Intervalo_Dir3lvl3)
        clearInterval(Intervalo_Dir4lvl3)

        document.getElementById('Meteoritolvl3').style.left =
          document.getElementById('Meteoritolvl3').offsetLeft + 'px'
        document.getElementById('Meteorito2lvl3').style.left =
          document.getElementById('Meteorito2lvl3').offsetLeft + 'px'
        document.getElementById('Meteorito3lvl3').style.left =
          document.getElementById('Meteorito3lvl3').offsetLeft + 'px'
        document.getElementById('Meteorito4lvl3').style.left =
          document.getElementById('Meteorito4lvl3').offsetLeft + 'px'

        document.getElementById('Meteoritolvl3').style.top =
          document.getElementById('Meteoritolvl3').offsetTop + 'px'
        document.getElementById('Meteorito2lvl3').style.top =
          document.getElementById('Meteorito2lvl3').offsetTop + 'px'
        document.getElementById('Meteorito3lvl3').style.top =
          document.getElementById('Meteorito3lvl3').offsetTop + 'px'
        document.getElementById('Meteorito4lvl3').style.top =
          document.getElementById('Meteorito4lvl3').offsetTop + 'px'
      }

      Pause_offlvl3 = setInterval(Meteorito_detenerlvl3, 0.01) //LE ASEGNAMOS UNA ID, PARA BORRALO UNA VEZ SE DESPAUSEE
      Activolvl3 = 2
    }
    //CAMBIAMOS EL VALOR PARA QUE AL VOLVER A DARLE CLICK EJECUTE LA CONDICIONAL DE REANUDAR
    else {
      //LA FUNCION DE REANUDAR
      document.getElementById('Pausa_Pantallalvl3').style.display = 'none'
      //BORRAMOS LA FUNCION, PARA QUE EL REANUDAR PUEDA EJECUTARSE DE NUEVO
      document.getElementById('Fondo_Ciberpunk').play()
      clearInterval(Pause_offlvl3)

      function Tiempo_Disminurlvl3() {
        //VOLVEMOS A CREAR LA FUNCION DE TIEMPO PARA QUE REANUDE EL CONTEO
        Tiempolvl3--
        document.getElementById('Tiempolvl3').innerHTML = Tiempolvl3
        if (Tiempolvl3 == 0) {
          Tiempolvl3 = 16
          Puntajelvl3 = 0
          alert('Lo lamento perdiste')
        }
      }

      Restar_Tiempolvl3 = setInterval(Tiempo_Disminurlvl3, 1000)

      document.getElementById('Meteoritolvl3').style.left = Distancia1lvl3 + '%'
      document.getElementById('Meteoritolvl3').style.top = Altura1lvl3 + 'px'
      document.getElementById('Meteoritolvl3').style.transition = '2.7s'

      document.getElementById('Meteorito2lvl3').style.left =
        Distancia2lvl3 + '%'
      document.getElementById('Meteorito2lvl3').style.top = Altura2lvl3 + 'px'
      document.getElementById('Meteorito2lvl3').style.transition = '2.7s'

      document.getElementById('Meteorito3lvl3').style.left =
        Distancia3lvl3 + '%'
      document.getElementById('Meteorito3lvl3').style.top = Altura3lvl3 + 'px'
      document.getElementById('Meteorito3lvl3').style.transition = '2.7s'

      document.getElementById('Meteorito4lvl3').style.left =
        Distancia4lvl3 + '%'
      document.getElementById('Meteorito4lvl3').style.top = Altura4lvl3 + 'px'
      document.getElementById('Meteorito4lvl3').style.transition = '2.7s'

      //ESTA FUNCION DIRIGE AL METEORITO 1 A LA TIERRA
      function Meteorito_Direccionlvl3() {
        Distancia1lvl3 = 80
        Altura1 = Math.round(Math.random() * 450)

        document.getElementById('Meteoritolvl3').style.left =
          Distancia1lvl3 + '%'
        document.getElementById('Meteoritolvl3').style.top = Altura1lvl3 + 'px'
        document.getElementById('Meteoritolvl3').style.transition = '1.9s'
      }

      setTimeout(Meteorito_Direccionlvl3, 2000)
      Intervalo_Dirlvl3 = setInterval(Meteorito_Direccionlvl3, 2430)

      //ESTA FUNCION DIRIGE AL METEORITO 2 A LA TIERRA
      function Meteorito_Direccion2lvl3() {
        Distancia2lvl3 = 80
        Altura2lvl3 = Math.round(Math.random() * 450)

        document.getElementById('Meteorito2lvl3').style.left =
          Distancia2lvl3 + '%'
        document.getElementById('Meteorito2lvl3').style.top = Altura2lvl3 + 'px'
        document.getElementById('Meteoritolvl3').style.transition = '1.9s'
      }

      setTimeout(Meteorito_Direccion2lvl3, 2000)
      Intervalo_Dir2lvl3 = setInterval(Meteorito_Direccion2lvl3, 2350)

      //ESTA FUNCION DIRIGE AL METEORITO 3 A LA TIERRA
      function Meteorito_Direccion3lvl3() {
        Distancia3lvl3 = 80
        Altura3lvl3 = Math.round(Math.random() * 450)

        document.getElementById('Meteorito3lvl3').style.left =
          Distancia3lvl3 + '%'
        document.getElementById('Meteorito3lvl3').style.top = Altura3lvl3 + 'px'
        document.getElementById('Meteoritolvl3').style.transition = '1.9s'
      }

      setTimeout(Meteorito_Direccion3lvl3, 2000)
      Intervalo_Dir3lvl3 = setInterval(Meteorito_Direccion3lvl3, 2250)

      //ESTA FUNCION DIRIGE AL METEORITO 4 A LA TIERRA
      function Meteorito_Direccion4lvl3() {
        Distancia4lvl3 = 80
        Altura4lvl3 = Math.round(Math.random() * 450)

        document.getElementById('Meteorito4lvl3').style.left =
          Distancia4lvl3 + '%'
        document.getElementById('Meteorito4lvl3').style.top = Altura4lvl3 + 'px'
        document.getElementById('Meteoritolvl3').style.transition = '1.9s'
      }

      setTimeout(Meteorito_Direccion4lvl3, 2000)
      Intervalo_Dir4lvl3 = setInterval(Meteorito_Direccion4lvl3, 2150)

      //BORRAMOS LA FUNCION, PARA QUE EL REANUDAR PUEDA EJECUTARSE DE NUEVO

      Activolvl3 = 1
    }
  }
} //CAMBIAMOS EL VALOR DE NUEVO A 1 PARA QUE AL SIGUIENTE CLICK SE EJECUTE EL PAUSE  S
>>>>>>> origin/main
