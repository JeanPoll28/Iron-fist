Swal.fire({
    title: '¿Preparado para salvar el mundo?<br><br><img src="IMG/planeta_tierra.png" width="120px"><br>',
    html: 'IRON FIST es un juego que mejorará tus reflejos a medida que pases de nivel. ¡Esperamos que te diviertas!',
    confirmButtonText: 'ESTOY PREPARADO',
    width: '50%',
    timer: 100000,
    timerProgressBar: true,
    allowOutsideClick: true,
    allowEscapeKey: false
});

let Tiempo = 70;
let Puntaje = 0;
let Narracion = 1;
let Graficos = 1;

document.getElementById('Contenedor_narracion')
    .addEventListener('click', Iniciar_narracion);

function Iniciar_narracion() {
    if (Narracion === 1) {
        document.getElementById('narracion').play();
        document.getElementById('VOLUMEN').style.display = 'none';
        document.getElementById('PAUSE').style.display = 'table';
        Narracion = 2;
    } else {
        document.getElementById('narracion').pause();
        document.getElementById('VOLUMEN').style.display = 'table';
        document.getElementById('PAUSE').style.display = 'none';
        Narracion = 1;
    }
}

function Graficos_fondo() {
    if (Graficos === 1) {
        document.getElementById('Recursos').style.marginLeft = '60%';
        document.getElementById('Fondo').style.backgroundImage =
            'url(IMG/Fondo_Espacio2.jpg)';
        document.getElementById('Fondo').style.backgroundAttachment = 'fixed';
        document.getElementById('Fondo').style.backgroundRepeat = 'no-repeat';
        document.getElementById('Fondo').style.backgroundSize = '100% 120%';
        Graficos = 2;
    } else {
        document.getElementById('Recursos').style.marginLeft = '0%';
        document.getElementById('Fondo').style.backgroundImage =
            'url(IMG/Fondo_Espacio.gif)';
        Graficos = 1;
    }
}

function alturaAleatoriaMeteorito(id) {
    const meteorito = document.getElementById(id);
    const tablero = meteorito.parentElement;
    const alturaMaxima = Math.max(
        0,
        tablero.clientHeight - meteorito.offsetHeight
    );

    return Math.floor(Math.random() * (alturaMaxima + 1));
}

const meteoritos = [
    {
        id: 'Meteiorito',
        sonido: 'Puntos_sound',
        periodo: 2430,
        inicio: 2000
    },
    {
        id: 'Meteiorito2',
        sonido: 'Punto2',
        periodo: 2350,
        inicio: 2600
    }
];

let partidaIniciada = false;
let partidaPausada = false;
let partidaTerminada = false;
let relojJuego = null;
let detectorImpacto = null;

function programarMeteorito(datos, espera) {
    clearTimeout(datos.temporizador);

    datos.restanteAparicion = espera;
    datos.proximaAparicion = performance.now() + espera;

    datos.temporizador = setTimeout(() => {
        if (partidaPausada || partidaTerminada) return;

        moverMeteorito(
            datos,
            '80%',
            alturaAleatoriaMeteorito(datos.id) + 'px',
            2400
        );

        programarMeteorito(datos, datos.periodo);
    }, espera);
}

function moverMeteorito(datos, izquierda, arriba, duracion) {
    const elemento = document.getElementById(datos.id);

    datos.movimiento = {
        izquierda: izquierda,
        arriba: arriba,
        duracion: duracion,
        inicio: performance.now(),
        restante: duracion
    };

    elemento.style.transition =
        `left ${duracion}ms linear, top ${duracion}ms linear`;

    elemento.style.left = izquierda;
    elemento.style.top = arriba;
}

function congelarMeteorito(datos) {
    const elemento = document.getElementById(datos.id);
    const estilo = getComputedStyle(elemento);

    // Esta es la posición que el usuario ve al pulsar pausa.
    const izquierdaActual = estilo.left;
    const arribaActual = estilo.top;

    datos.restanteAparicion = Math.max(
        0,
        datos.proximaAparicion - performance.now()
    );

    clearTimeout(datos.temporizador);

    if (datos.movimiento) {
        datos.movimiento.restante = Math.max(
            0,
            datos.movimiento.duracion -
                (performance.now() - datos.movimiento.inicio)
        );
    }

    elemento.style.transition = 'none';
    elemento.style.left = izquierdaActual;
    elemento.style.top = arribaActual;
}

function reanudarMeteorito(datos) {
    const movimiento = datos.movimiento;

    if (movimiento && movimiento.restante > 0) {
        const elemento = document.getElementById(datos.id);

        // Registra la posición congelada antes de continuar la animación.
        void elemento.offsetWidth;

        elemento.style.transition =
            `left ${movimiento.restante}ms linear, ` +
            `top ${movimiento.restante}ms linear`;

        elemento.style.left = movimiento.izquierda;
        elemento.style.top = movimiento.arriba;

        movimiento.duracion = movimiento.restante;
        movimiento.inicio = performance.now();
    }

    programarMeteorito(datos, datos.restanteAparicion);
}

function sacarMeteoritos() {
    for (const datos of meteoritos) {
        clearTimeout(datos.temporizador);
        datos.movimiento = null;

        const elemento = document.getElementById(datos.id);
        elemento.style.transition = 'none';
        elemento.style.left = '-70%';
    }
}

function reiniciarPartida() {
    sacarMeteoritos();

    Puntaje = 0;
    Tiempo = 70;

    document.getElementById('Puntaje').innerHTML = '0&nbsp;/&nbsp;5';
    document.getElementById('Tiempo').textContent = Tiempo;

    for (const datos of meteoritos) {
        programarMeteorito(datos, datos.inicio);
    }
}

function perder(mensaje) {
    if (partidaTerminada || partidaPausada) return;

    document.getElementById('Perdiste_sound').play();
    reiniciarPartida();
    alert(mensaje);
}

function ganar() {
    partidaTerminada = true;
    clearInterval(relojJuego);
    sacarMeteoritos();

    Puntaje = 5;
    document.getElementById('Puntaje').innerHTML = '5&nbsp;/&nbsp;5';
    document.getElementById('GANASTE_PANTALLA').style.display = 'flex';

    document.getElementById('Fondo_Ciberpunk').pause();
    document.getElementById('Puntos_sound').pause();
    document.getElementById('Punto2').pause();
    document.getElementById('Triunfo').play();

    document.getElementById('NEXT').addEventListener(
        'click',
        () => {
            document.getElementById('NIVEL_01').style.display = 'none';
            document.getElementById('NIVEL_02').style.display = 'block';
        },
        { once: true }
    );

    Swal.fire({
        title: '¡MISIÓN CUMPLIDA!',
        html:
            '<img src="IMG/Check.png" alt="Nivel superado" class="victoria-icono">' +
            '<h2>Nivel superado</h2>' +
            '<p>Protegiste la Tierra de los meteoritos.</p>' +
            '<p>La próxima amenaza se acerca.</p>',
        confirmButtonText: 'CONTINUAR',
        customClass: {
            popup: 'victoria-panel',
            title: 'victoria-titulo',
            confirmButton: 'victoria-boton'
        },
        buttonsStyling: false,
        allowOutsideClick: false,
        allowEscapeKey: false
    });
}

function comprobarImpacto() {
    if (partidaIniciada && !partidaPausada && !partidaTerminada) {
        for (const datos of meteoritos) {
            const elemento = document.getElementById(datos.id);

            if (
                datos.movimiento &&
                datos.movimiento.izquierda === '80%' &&
                elemento.getBoundingClientRect().left -
                    elemento.offsetParent.getBoundingClientRect().left > 630
            ) {
                perder(
                    'YA ES DEMASIADO TARDE. LOS METEORITOS LLEGARON A LA TIERRA.'
                );
                break;
            }
        }
    }

    detectorImpacto = requestAnimationFrame(comprobarImpacto);
}

function JUEGO() {
    if (partidaIniciada) return;

    partidaIniciada = true;

    document.getElementById('Puntaje').innerHTML = '0&nbsp;/&nbsp;5';
    document.getElementById('Tiempo').textContent = Tiempo;

    for (const datos of meteoritos) {
        document.getElementById(datos.id)
            .addEventListener('mouseover', () => {
                if (
                    partidaPausada ||
                    partidaTerminada ||
                    !datos.movimiento ||
                    datos.movimiento.izquierda !== '80%'
                ) {
                    return;
                }

                document.getElementById(datos.sonido).play();

                moverMeteorito(
                    datos,
                    '-500px',
                    alturaAleatoriaMeteorito(datos.id) + 'px',
                    1800
                );

                Puntaje++;
                document.getElementById('Puntaje').innerHTML =
                    Puntaje + '&nbsp;/&nbsp;5';

                if (Puntaje >= 5) {
                    ganar();
                }
            });

        programarMeteorito(datos, datos.inicio);
    }

    relojJuego = setInterval(() => {
        Tiempo--;
        document.getElementById('Tiempo').textContent = Tiempo;

        if (Tiempo <= 0) {
            perder('Lo lamento, perdiste');
        }
    }, 1000);

    detectorImpacto = requestAnimationFrame(comprobarImpacto);
}

document.getElementById('Play').addEventListener('click', PLAY);

let Conteo = 4;

function PLAY() {
    document.getElementById('Fondo_Ciberpunk').play();
    document.getElementById('Texo').style.left = '-900px';
    document.getElementById('Contenedor_Mensaje_Star').style.left = '-100%';

    setTimeout(JUEGO, 4100);

    setTimeout(() => {
        const cuenta = setInterval(() => {
            Conteo--;
            document.getElementById('RGB').textContent = Conteo;

            if (Conteo === -1) {
                clearInterval(cuenta);

                document.getElementById('Contenedor_contador')
                    .style.display = 'none';

                setTimeout(() => {
                    document.getElementById('Start').style.display = 'none';
                    DETENER_JUEGO();
                }, 500);
            }
        }, 1000);
    }, 350);
}

function DETENER_JUEGO() {
    document.getElementById('Pause').addEventListener('click', () => {
        if (!partidaIniciada || partidaTerminada) return;

        partidaPausada = !partidaPausada;

        document.getElementById('Pausa_Pantalla').style.display =
            partidaPausada ? 'table' : 'none';

        if (partidaPausada) {
            document.getElementById('Fondo_Ciberpunk').pause();
            clearInterval(relojJuego);

            for (const datos of meteoritos) {
                congelarMeteorito(datos);
            }
        } else {
            document.getElementById('Fondo_Ciberpunk').play();

            for (const datos of meteoritos) {
                reanudarMeteorito(datos);
            }

            relojJuego = setInterval(() => {
                Tiempo--;
                document.getElementById('Tiempo').textContent = Tiempo;

                if (Tiempo <= 0) {
                    perder('Lo lamento, perdiste');
                }
            }, 1000);
        }
    });
}

function Mover() {
    var contenedor = document.getElementById("Seccion_01");

    contenedor.style.top = "-100%";
    contenedor.style.transition = "2s";

    function Desaparecer() {
        var Reglas = document.getElementById("Reglas");

        Reglas.style.top = "3%";
        Reglas.style.transition = "1s";
        contenedor.style.display = "none";
    }

    setTimeout(Desaparecer, 1090);
}

function Mover_2() {
    var Reglas_Sacar = document.getElementById("Reglas");

    Reglas_Sacar.style.top = "-100%";
    Reglas_Sacar.style.transition = "1.4s";

    function Desaparecer2() {
        var contenedor_2 = document.getElementById("Seccion_2");
        var imagen = document.getElementById("Imagen");
        var mensaje = document.getElementById("Mensaje");
        var titulo = document.getElementById("Titulo_historia");

        Reglas_Sacar.style.display = "none";
        contenedor_2.style.top = "0%";

        imagen.style.left = "2%";
        imagen.style.transition = "2s";

        mensaje.style.right = "2%";
        mensaje.style.transition = "2s";

        titulo.style.left = "2%";
        titulo.style.transition = "1s";
    }

    setTimeout(Desaparecer2, 1260);
}

function Mover_3() {
    var contenedor_2 = document.getElementById("Seccion_2");
    var Supremo = document.getElementById("Seccion_suprema");

    document.getElementById("narracion").pause();

    contenedor_2.style.top = "-100%";
    contenedor_2.style.transition = "1.4s";

    Supremo.style.height = "160vh";

    function Desaparaceer3() {
        var Seccion_Juego = document.getElementById("Seccion_Juego");
        var juego = document.getElementById("Registraar");
        var Titulo_jugar = document.getElementById("Titulo_jugar");
        var Contenedor_juego = document.getElementById("Contenedor_Juego");
        var Cabezara = document.getElementById("Cabezera");

        Seccion_Juego.style.left = "0%";
        contenedor_2.style.display = "none";

        juego.style.top = "0%";
        juego.style.transition = "0s";

        Titulo_jugar.style.left = "0%";
        Titulo_jugar.style.transition = "0.8s";

        Contenedor_juego.style.left = "0%";
        Contenedor_juego.style.transition = "1.2s";

        Cabezara.style.left = "0%";
        Cabezara.style.transition = "1.2s";
    }

    setTimeout(Desaparaceer3, 900);
}

function Reloj_Tiempo() {
    var actualizar_Hora = function () {
        var Fecha = new Date(),
            Horas = Fecha.getHours(),
            ampm,
            Minutos = Fecha.getMinutes(),
            Segundos = Fecha.getSeconds(),
            diaSemana = Fecha.getDay(),
            dia = Fecha.getDate(),
            mes = Fecha.getMonth(),
            Año = Fecha.getFullYear();

        var pHoras = document.getElementById("Hora"),
            pAMPM = document.getElementById("AMPM"),
            pMinutos = document.getElementById("Minutos"),
            pSegundos = document.getElementById("Segundos"),
            pDia_Semana = document.getElementById("Dia_Semana"),
            pDia = document.getElementById("dia"),
            pMes = document.getElementById("mes"),
            pAño = document.getElementById("año");

        var semana = [
            "Domingo", "Lunes", "Martes", "Miércoles",
            "Jueves", "Viernes", "Sábado"
        ];

        pDia_Semana.textContent = semana[diaSemana];
        pDia.textContent = dia;

        var Mes_Actual = [
            "Enero", "Febrero", "Marzo", "Abril",
            "Mayo", "Junio", "Julio", "Agosto",
            "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        pMes.textContent = Mes_Actual[mes];
        pAño.textContent = Año;

        if (Horas >= 12) {
            Horas = Horas - 12;
            ampm = "PM";
        } else {
            ampm = "AM";
        }

        if (Horas == 0) Horas = 12;
        if (Horas < 10) Horas = "0" + Horas;

        pHoras.textContent = Horas;
        pAMPM.textContent = ampm;

        if (Minutos < 10) Minutos = "0" + Minutos;
        pMinutos.textContent = Minutos;

        if (Segundos < 10) Segundos = "0" + Segundos;
        pSegundos.textContent = Segundos;
    };

    actualizar_Hora();
}

Reloj_Tiempo();
setInterval(Reloj_Tiempo, 1000);