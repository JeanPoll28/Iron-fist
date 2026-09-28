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
