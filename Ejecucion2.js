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
