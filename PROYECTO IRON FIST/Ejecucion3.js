let Tiempolvl3 = 50;
let Puntajelvl3 = 0;

function alturaAleatoriaMeteoritolvl3(id) {
    const meteorito = document.getElementById(id);
    const tablero = meteorito.parentElement;
    const alturaMaxima = Math.max(
        0,
        tablero.clientHeight - meteorito.offsetHeight
    );

    return Math.floor(Math.random() * (alturaMaxima + 1));
}

const meteoritoslvl3 = [
    {
        id: 'Meteoritolvl3',
        sonido: 'Puntos_sound',
        periodo: 2100,
        inicio: 1700
    },
    {
        id: 'Meteorito2lvl3',
        sonido: 'Punto2',
        periodo: 2250,
        inicio: 2200
    },
    {
        id: 'Meteorito3lvl3',
        sonido: 'Punto3',
        periodo: 2400,
        inicio: 2700
    },
    {
        id: 'Meteorito4lvl3',
        sonido: 'Punto4',
        periodo: 2550,
        inicio: 3200
    }
];

let partidaIniciadalvl3 = false;
let partidaPausadalvl3 = false;
let partidaTerminadalvl3 = false;
let relojJuegolvl3 = null;
let detectorImpactolvl3 = null;

function programarMeteoritolvl3(datos, espera) {
    clearTimeout(datos.temporizador);

    datos.restanteAparicion = espera;
    datos.proximaAparicion = performance.now() + espera;

    datos.temporizador = setTimeout(() => {
        if (partidaPausadalvl3 || partidaTerminadalvl3) return;

        moverMeteoritolvl3(
            datos,
            '80%',
            alturaAleatoriaMeteoritolvl3(datos.id) + 'px',
            1600
        );

        programarMeteoritolvl3(datos, datos.periodo);
    }, espera);
}

function moverMeteoritolvl3(datos, izquierda, arriba, duracion) {
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

function congelarMeteoritolvl3(datos) {
    const elemento = document.getElementById(datos.id);
    const estilo = getComputedStyle(elemento);

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

function reanudarMeteoritolvl3(datos) {
    const movimiento = datos.movimiento;

    if (movimiento && movimiento.restante > 0) {
        const elemento = document.getElementById(datos.id);

        void elemento.offsetWidth;

        elemento.style.transition =
            `left ${movimiento.restante}ms linear, ` +
            `top ${movimiento.restante}ms linear`;

        elemento.style.left = movimiento.izquierda;
        elemento.style.top = movimiento.arriba;

        movimiento.duracion = movimiento.restante;
        movimiento.inicio = performance.now();
    }

    programarMeteoritolvl3(datos, datos.restanteAparicion);
}

function sacarMeteoritoslvl3() {
    for (const datos of meteoritoslvl3) {
        clearTimeout(datos.temporizador);
        datos.movimiento = null;

        const elemento = document.getElementById(datos.id);

        elemento.style.transition = 'none';
        elemento.style.left = '-70%';
    }
}

function reiniciarPartidalvl3() {
    sacarMeteoritoslvl3();

    Puntajelvl3 = 0;
    Tiempolvl3 = 50;

    document.getElementById('Puntajelvl3').innerHTML = '0&nbsp;/&nbsp;5';
    document.getElementById('Tiempolvl3').textContent = Tiempolvl3;

    for (const datos of meteoritoslvl3) {
        programarMeteoritolvl3(datos, datos.inicio);
    }
}

function perderlvl3(mensaje) {
    if (partidaTerminadalvl3 || partidaPausadalvl3) return;

    document.getElementById('Perdiste_sound').play();

    reiniciarPartidalvl3();
    alert(mensaje);
}

function ganarlvl3() {
    partidaTerminadalvl3 = true;
    clearInterval(relojJuegolvl3);
    sacarMeteoritoslvl3();

    Puntajelvl3 = 5;
    document.getElementById('Puntajelvl3').innerHTML = '5&nbsp;/&nbsp;5';

    document.getElementById('Fondo_Ciberpunk').pause();
    document.getElementById('Puntos_sound').pause();
    document.getElementById('Punto2').pause();
    document.getElementById('Punto3').pause();
    document.getElementById('Punto4').pause();
    document.getElementById('Triunfo').play();
    document.getElementById('Musica_Final').play();

    document.getElementById('Pantalla_Ovnislvl3').style.left = '7%';
    document.getElementById('Pantalla_Ovnislvl3').style.transition = '6s';

    document.getElementById('Pantalla_Nodrizalvl3').style.left = '10%';
    document.getElementById('Pantalla_Nodrizalvl3').style.transition = '5s';

    document.getElementById('Pantalla_Ovnis2lvl3').style.left = '7%';
    document.getElementById('Pantalla_Ovnis2lvl3').style.transition = '6s';

    setTimeout(() => {
        document.getElementById('Pantalla_creditoslvl3')
            .style.background = 'black';

        document.getElementById('Creditoslvl3').style.top = '-15%';
        document.getElementById('Creditoslvl3').style.transition = '10s';

        document.getElementById('Proximolvl3').style.bottom = '-34%';
        document.getElementById('Proximolvl3').style.transition = '15s';
    }, 5000);

    setTimeout(() => {
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
    }, 15000);
}

function comprobarImpactolvl3() {
    if (
        partidaIniciadalvl3 &&
        !partidaPausadalvl3 &&
        !partidaTerminadalvl3
    ) {
        for (const datos of meteoritoslvl3) {
            const elemento = document.getElementById(datos.id);

            if (
                datos.movimiento &&
                datos.movimiento.izquierda === '80%' &&
                elemento.getBoundingClientRect().left -
                    elemento.offsetParent.getBoundingClientRect().left > 630
            ) {
                perderlvl3(
                    'YA ES DEMASIADO TARDE. LOS METEORITOS LLEGARON A LA TIERRA.'
                );
                break;
            }
        }
    }

    detectorImpactolvl3 = requestAnimationFrame(comprobarImpactolvl3);
}

function JUEGOlvl3() {
    if (partidaIniciadalvl3) return;

    partidaIniciadalvl3 = true;

    document.getElementById('Puntajelvl3').innerHTML = '0&nbsp;/&nbsp;5';
    document.getElementById('Tiempolvl3').textContent = Tiempolvl3;

    for (const datos of meteoritoslvl3) {
        document.getElementById(datos.id)
            .addEventListener('mouseover', () => {
                if (
                    partidaPausadalvl3 ||
                    partidaTerminadalvl3 ||
                    !datos.movimiento ||
                    datos.movimiento.izquierda !== '80%'
                ) {
                    return;
                }

                document.getElementById(datos.sonido).play();

                moverMeteoritolvl3(
                    datos,
                    '-500px',
                    alturaAleatoriaMeteoritolvl3(datos.id) + 'px',
                    1800
                );

                Puntajelvl3++;

                document.getElementById('Puntajelvl3').innerHTML =
                    Puntajelvl3 + '&nbsp;/&nbsp;5';

                if (Puntajelvl3 >= 5) {
                    ganarlvl3();
                }
            });

        programarMeteoritolvl3(datos, datos.inicio);
    }

    relojJuegolvl3 = setInterval(() => {
        Tiempolvl3--;

        document.getElementById('Tiempolvl3').textContent = Tiempolvl3;

        if (Tiempolvl3 <= 0) {
            perderlvl3('Lo lamento, perdiste');
        }
    }, 1000);

    detectorImpactolvl3 = requestAnimationFrame(comprobarImpactolvl3);
}

document.getElementById('Playlvl3')
    .addEventListener('click', PLAYlvl3);

let Conteolvl3 = 4;

function PLAYlvl3() {
    document.getElementById('Fondo_Ciberpunk').play();

    document.getElementById('Textolvl3').style.left = '-900px';
    document.getElementById('Playlvl3').style.left = '-900px';
    document.getElementById('Dificultadlvl3').style.left = '-900px';

    setTimeout(JUEGOlvl3, 4100);

    setTimeout(() => {
        const cuenta = setInterval(() => {
            Conteolvl3--;

            document.getElementById('RGBlvl3').textContent = Conteolvl3;

            if (Conteolvl3 === -1) {
                clearInterval(cuenta);

                document.getElementById('Contenedor_contadorlvl3')
                    .style.display = 'none';

                setTimeout(() => {
                    document.getElementById('Startlvl3').style.display = 'none';
                    DETENER_JUEGOlvl3();
                }, 500);
            }
        }, 1000);
    }, 350);
}

function DETENER_JUEGOlvl3() {
    document.getElementById('Pauselvl3')
        .addEventListener('click', () => {
            if (!partidaIniciadalvl3 || partidaTerminadalvl3) return;

            partidaPausadalvl3 = !partidaPausadalvl3;

            document.getElementById('Pausa_Pantallalvl3').style.display =
                partidaPausadalvl3 ? 'table' : 'none';

            if (partidaPausadalvl3) {
                document.getElementById('Fondo_Ciberpunk').pause();
                clearInterval(relojJuegolvl3);

                for (const datos of meteoritoslvl3) {
                    congelarMeteoritolvl3(datos);
                }
            } else {
                document.getElementById('Fondo_Ciberpunk').play();

                for (const datos of meteoritoslvl3) {
                    reanudarMeteoritolvl3(datos);
                }

                relojJuegolvl3 = setInterval(() => {
                    Tiempolvl3--;

                    document.getElementById('Tiempolvl3')
                        .textContent = Tiempolvl3;

                    if (Tiempolvl3 <= 0) {
                        perderlvl3('Lo lamento, perdiste');
                    }
                }, 1000);
            }
        });
};

