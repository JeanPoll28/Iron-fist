let Tiempolvl2 = 60;
let Puntajelvl2 = 0;

function alturaAleatoriaMeteoritolvl2(id) {
    const meteorito = document.getElementById(id);
    const tablero = meteorito.parentElement;
    const alturaMaxima = Math.max(
        0,
        tablero.clientHeight - meteorito.offsetHeight
    );

    return Math.floor(Math.random() * (alturaMaxima + 1));
}

const meteoritoslvl2 = [
    {
        id: 'Meteioritolvl2',
        sonido: 'Puntos_sound',
        periodo: 2450,
        inicio: 1800
    },
    {
        id: 'Meteiorito2lvl2',
        sonido: 'Punto2',
        periodo: 2650,
        inicio: 2500
    },
    {
        id: 'Meteiorito3lvl2',
        sonido: 'Punto3',
        periodo: 2850,
        inicio: 3100
    }
];

let partidaIniciadalvl2 = false;
let partidaPausadalvl2 = false;
let partidaTerminadalvl2 = false;
let relojJuegolvl2 = null;
let detectorImpactolvl2 = null;

function programarMeteoritolvl2(datos, espera) {
    clearTimeout(datos.temporizador);

    datos.restanteAparicion = espera;
    datos.proximaAparicion = performance.now() + espera;

    datos.temporizador = setTimeout(() => {
        if (partidaPausadalvl2 || partidaTerminadalvl2) return;

        moverMeteoritolvl2(
            datos,
            '80%',
            alturaAleatoriaMeteoritolvl2(datos.id) + 'px',
            2000
        );

        programarMeteoritolvl2(datos, datos.periodo);
    }, espera);
}

function moverMeteoritolvl2(datos, izquierda, arriba, duracion) {
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

function congelarMeteoritolvl2(datos) {
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

function reanudarMeteoritolvl2(datos) {
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

    programarMeteoritolvl2(datos, datos.restanteAparicion);
}

function sacarMeteoritoslvl2() {
    for (const datos of meteoritoslvl2) {
        clearTimeout(datos.temporizador);
        datos.movimiento = null;

        const elemento = document.getElementById(datos.id);

        elemento.style.transition = 'none';
        elemento.style.left = '-70%';
    }
}

function reiniciarPartidalvl2() {
    sacarMeteoritoslvl2();

    Puntajelvl2 = 0;
    Tiempolvl2 = 60;

    document.getElementById('Puntajelvl2').innerHTML = '0&nbsp;/&nbsp;4';
    document.getElementById('Tiempolvl2').textContent = Tiempolvl2;

    for (const datos of meteoritoslvl2) {
        programarMeteoritolvl2(datos, datos.inicio);
    }
}

function perderlvl2(mensaje) {
    if (partidaTerminadalvl2 || partidaPausadalvl2) return;

    document.getElementById('Perdiste_sound').play();

    reiniciarPartidalvl2();
    alert(mensaje);
}

function ganarlvl2() {
    partidaTerminadalvl2 = true;
    clearInterval(relojJuegolvl2);
    sacarMeteoritoslvl2();

    Puntajelvl2 = 4;

    document.getElementById('Puntajelvl2').innerHTML = '4&nbsp;/&nbsp;4';
    document.getElementById('GanastePantallaLvL2').style.display = 'flex';

    document.getElementById('Fondo_Ciberpunk').pause();
    document.getElementById('Puntos_sound').pause();
    document.getElementById('Punto2').pause();
    document.getElementById('Punto3').pause();
    document.getElementById('Triunfo').play();

    document.getElementById('NEXT').addEventListener(
        'click',
        () => {
            document.getElementById('NIVEL_01').style.display = 'none';
            document.getElementById('NIVEL_02').style.display = 'none';
            document.getElementById('NIVEL3').style.display = 'block';
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

function comprobarImpactolvl2() {
    if (
        partidaIniciadalvl2 &&
        !partidaPausadalvl2 &&
        !partidaTerminadalvl2
    ) {
        for (const datos of meteoritoslvl2) {
            const elemento = document.getElementById(datos.id);

            if (
                datos.movimiento &&
                datos.movimiento.izquierda === '80%' &&
                elemento.getBoundingClientRect().left -
                    elemento.offsetParent.getBoundingClientRect().left > 630
            ) {
                perderlvl2(
                    'YA ES DEMASIADO TARDE. LOS METEORITOS LLEGARON A LA TIERRA.'
                );
                break;
            }
        }
    }

    detectorImpactolvl2 = requestAnimationFrame(comprobarImpactolvl2);
}

function JUEGOlvl2() {
    if (partidaIniciadalvl2) return;

    partidaIniciadalvl2 = true;

    document.getElementById('Puntajelvl2').innerHTML = '0&nbsp;/&nbsp;4';
    document.getElementById('Tiempolvl2').textContent = Tiempolvl2;

    for (const datos of meteoritoslvl2) {
        document.getElementById(datos.id)
            .addEventListener('mouseover', () => {
                if (
                    partidaPausadalvl2 ||
                    partidaTerminadalvl2 ||
                    !datos.movimiento ||
                    datos.movimiento.izquierda !== '80%'
                ) {
                    return;
                }

                document.getElementById(datos.sonido).play();

                moverMeteoritolvl2(
                    datos,
                    '-500px',
                    alturaAleatoriaMeteoritolvl2(datos.id) + 'px',
                    1800
                );

                Puntajelvl2++;

                document.getElementById('Puntajelvl2').innerHTML =
                    Puntajelvl2 + '&nbsp;/&nbsp;4';

                if (Puntajelvl2 >= 4) {
                    ganarlvl2();
                }
            });

        programarMeteoritolvl2(datos, datos.inicio);
    }

    relojJuegolvl2 = setInterval(() => {
        Tiempolvl2--;

        document.getElementById('Tiempolvl2').textContent = Tiempolvl2;

        if (Tiempolvl2 <= 0) {
            perderlvl2('Lo lamento, perdiste');
        }
    }, 1000);

    detectorImpactolvl2 = requestAnimationFrame(comprobarImpactolvl2);
}

document.getElementById('Playlvl2')
    .addEventListener('click', PLAYlvl2);

let Conteolvl2 = 4;

function PLAYlvl2() {
    document.getElementById('Fondo_Ciberpunk').play();

    document.getElementById('Texolvl2').style.left = '-900px';
    document.getElementById('Playlvl2').style.left = '-900px';
    document.getElementById('Dificultad').style.left = '-900px';

    setTimeout(JUEGOlvl2, 4100);

    setTimeout(() => {
        const cuenta = setInterval(() => {
            Conteolvl2--;

            document.getElementById('RGBlvl2').textContent = Conteolvl2;

            if (Conteolvl2 === -1) {
                clearInterval(cuenta);

                document.getElementById('Contenedor_contadorlvl2')
                    .style.display = 'none';

                setTimeout(() => {
                    document.getElementById('Startlvl2').style.display = 'none';
                    DETENER_JUEGOlvl2();
                }, 500);
            }
        }, 1000);
    }, 350);
}

function DETENER_JUEGOlvl2() {
    document.getElementById('Pauselvl2')
        .addEventListener('click', () => {
            if (!partidaIniciadalvl2 || partidaTerminadalvl2) return;

            partidaPausadalvl2 = !partidaPausadalvl2;

            document.getElementById('Pausa_Pantallalvl2').style.display =
                partidaPausadalvl2 ? 'table' : 'none';

            if (partidaPausadalvl2) {
                document.getElementById('Fondo_Ciberpunk').pause();
                clearInterval(relojJuegolvl2);

                for (const datos of meteoritoslvl2) {
                    congelarMeteoritolvl2(datos);
                }
            } else {
                document.getElementById('Fondo_Ciberpunk').play();

                for (const datos of meteoritoslvl2) {
                    reanudarMeteoritolvl2(datos);
                }

                relojJuegolvl2 = setInterval(() => {
                    Tiempolvl2--;

                    document.getElementById('Tiempolvl2')
                        .textContent = Tiempolvl2;

                    if (Tiempolvl2 <= 0) {
                        perderlvl2('Lo lamento, perdiste');
                    }
                }, 1000);
            }
        });
}