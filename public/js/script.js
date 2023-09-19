document.addEventListener('DOMContentLoaded', function () {
    const adnInput = document.getElementById('adnInput');
    const transcripcionOutput = document.getElementById('transcripcionOutput');
    const arnMensajeroOutput = document.getElementById('arnMensajeroOutput');
    const polipeptidoOutput = document.getElementById('polipeptidoOutput');
    const habraMetilacionOutput = document.getElementById('habraMetilacionOutput');
    const secuencias = [
        "TACTACGTACGTACGTACGTAATC",
        "TACGGCTAAGCCTTAGGCTAAATT",
        "TACCGATCGATCGATCGATCGACT",
        "TACGAATTCCGGAATTCCGGAATC",
        "TACTCGCGATATCGCGATATCGATC",
        "TACACTGCACTGCACTGCACTATC",
        "TACGTAGAGTAGAGTAGAGTAGATC",
        "TACAGCTAAGCTAAGCTAAGCATC",
        "TACTACGGTTACGGTTACGGTATC",
        "TACGCATGCATGCATGCATGCATC",
        "TATATATATATATATATATATATA",
        "AGAGAGAGAGAGAGAGAGAGAGAG",
        "ACACACACACACCACACACACACA",
    ];
    const transcripcion = {
        "A": "T", "T": "A", "C": "G", "G": "C"
    };
    const transcripcionArm = {
        "A": "U", "T": "A", "C": "G", "G": "C"
    };
    const Metilacion = {
        "CG": "Sí, habrá metilación.",
        "GC": "No, no habrá metilación.",
        "AC": "No, no habrá metilación.", 
        "CA": "No, no habrá metilación.",  
        "TC": "No, no habrá metilación.",  
        "CT": "No, no habrá metilación.",
        "TA": "No, no habrá metilación.",
        "TG": "No, no habrá metilación."
    };
    
    
    const codonTable = {
        "UAC": "Metionina", "UUU": "Fenilalanina", "UUC": "Fenilalanina", "UUA": "Leucina", "UUG": "Leucina",
        "UCU": "Serina", "UCC": "Serina", "UCA": "Serina", "UCG": "Serina",
        "UAU": "Tirosina", "AUG": "Tirosina", "UAA": "STOP", "UAG": "STOP",
        "UGU": "Cisteína", "UGC": "Cisteína", "UGA": "STOP", "UGG": "Triptófano",
        "CUU": "Leucina", "CUC": "Leucina", "CUA": "Leucina", "CUG": "Leucina",
        "CCU": "Prolina", "CCC": "Prolina", "CCA": "Prolina", "CCG": "Prolina",
        "CAU": "Histidina", "CAC": "Histidina", "CAA": "Glutamina", "CAG": "Glutamina",
        "CGU": "Arginina", "CGC": "Arginina", "CGA": "Arginina", "CGG": "Arginina",
        "AUU": "Isoleucina", "AUC": "Isoleucina", "AUA": "Isoleucina", "AUG": "Metionina",
        "ACU": "Treonina", "ACC": "Treonina", "ACA": "Treonina", "ACG": "Treonina",
        "AAU": "Asparagina", "AAC": "Asparagina", "AAA": "Lisina", "AAG": "Lisina",
        "AGU": "Serina", "AGC": "Serina", "AGA": "Arginina", "AGG": "Arginina",
        "GUU": "Valina", "GUC": "Valina", "GUA": "Valina", "GUG": "Valina",
        "GCU": "Alanina", "GCC": "Alanina", "GCA": "Alanina", "GCG": "Alanina",
        "GAU": "Ácido aspártico", "GAC": "Ácido aspártico", "GAA": "Ácido glutámico", "GAG": "Ácido glutámico",
        "GGU": "Glicina", "GGC": "Glicina", "GGA": "Glicina", "GGG": "Glicina"
    };
    
    const botonGenerar = document.querySelector('.blue-button');
    botonGenerar.addEventListener('click', function () {
        const randomIndex = Math.floor(Math.random() * secuencias.length);
        const dnaSequence = secuencias[randomIndex];
        adnInput.value = dnaSequence;
        transcripcionOutput.value = "";
        arnMensajeroOutput.value = "";
        polipeptidoOutput.value = "";
        habraMetilacionOutput.value = "";
    });

    const botonGenerarTranscripcion = document.getElementById('generarTranscripcion');
    botonGenerarTranscripcion.addEventListener('click', function () {
        const dnaSequence = adnInput.value;
        const transcripcionAdn = generarTranscripcion(dnaSequence);
        transcripcionOutput.value = transcripcionAdn;
        arnMensajeroOutput.value = "";
        polipeptidoOutput.value = "";
        habraMetilacionOutput.value = "";
    });

    const botonGenerarArnMensajero = document.getElementById('generarArnMensajero');
    botonGenerarArnMensajero.addEventListener('click', function () {
        const transcripcionAdn = transcripcionOutput.value;
        const arnMensajeroAdn = generarArnMensajero(transcripcionAdn);
        arnMensajeroOutput.value = arnMensajeroAdn;
        polipeptidoOutput.value = "";
        habraMetilacionOutput.value = "";
    });

    const botonGenerarPolipeptido = document.getElementById('generarPolipeptido');
    botonGenerarPolipeptido.addEventListener('click', function () {
        const arnMensajeroAdn = arnMensajeroOutput.value;
        const polipeptido = generarPolipeptido(arnMensajeroAdn);
        const polipeptidoConStop = polipeptido.endsWith("STOP") ? polipeptido : polipeptido + " STOP";
        polipeptidoOutput.value = polipeptidoConStop;
        habraMetilacionOutput.value = "";
    });
    
    const botonGenerarAdnMetilacion = document.getElementById('generarAdnMetilacion');
botonGenerarAdnMetilacion.addEventListener('click', function () {
    const randomIndex = Math.floor(Math.random() * secuencias.length);
    const dnaSequence = secuencias[randomIndex];
    adnInputMetilacion.value = dnaSequence;
    habraMetilacionOutput.value = "";
    explicacionMetilacion.value = "";
    mecanismoEpigenetico.value = "";
    canceresAsociados.value = "";
});

const botonGenerarMetilacion = document.getElementById('Metilacion');
const explicacionMetilacion = document.getElementById('explicacionMetilacion');
const mecanismoEpigenetico = document.getElementById('mecanismoEpigenetico')
const canceresAsociados = document.getElementById('canceresAsociados')

botonGenerarMetilacion.addEventListener('click', function () {
    const dnaSequence = adnInputMetilacion.value;
    const patronesMetilacion = /CG/g;
    const resultados = dnaSequence.match(patronesMetilacion);  
    if (resultados && resultados.length > 0) {
        habraMetilacionOutput.value = "Sí, habrá metilación.";
        explicacionMetilacion.value = "La funcion de esos genes, estan silenciados";
        mecanismoEpigenetico.textContent = "El mecanismo epigenetico es Hipermetilacion"
        canceresAsociados.textContent = "Los canceres asociados: Pulmon, Riñon, Melanoma, Colon"
    } else {
        habraMetilacionOutput.value = "No, no habrá metilación.";
        explicacionMetilacion.value = "No, no hay metilacion, el gen cumple su funcion normal(es reparar el adn, suprecion de tumores y regulacion del ciclo celular).";
        mecanismoEpigenetico.textContent = "No, no hay ningun mecanismo epigenetico."
        canceresAsociados.textContent = "No tiene canceres asociados"
    }
});


    function generarTranscripcion(secuenciaAdn) {
        return secuenciaAdn.replace(/[ATCG]/g, match => transcripcion[match]);
    }

    function generarArnMensajero(transcripcionAdn) {
        return transcripcionAdn.replace(/[ATCG]/g, match => transcripcionArm[match]);
    }

    function generarPolipeptido(arnMensajero) {
        const codones = arnMensajero.match(/.{1,3}/g);
        const polipeptido = codones.map(codon => codonTable[codon] || "").join(" ");
        return polipeptido;
    }
});


function openNav() {
    document.getElementById("mySidebar").style.width = "330px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}