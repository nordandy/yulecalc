// --- CONFIG & DATA ---

// Inledningar (Slumpas fram, 1 av 10)
const INTROS = [
    "God Jul önskar vi med detta paket,\nvad som är i är en hemlighet.",
    "Snön ligger vit på taken,\nhär kommer klappen för smaken.",
    "Tomten har varit här och vänt,\nhär får du något vi hoppas känns känt.",
    "Utanför fönstret dansar en flinga,\nnu ska du få höra julklockor klinga.",
    "Vi har tänkt och vi har klurat,\nhoppas vi rätt med denna har skurat.",
    "En klapp fylld av värme och hopp,\nfrån botten och ända upp till topp.",
    "Nu är det jul i varje vrå,\nhär är en klapp du ska få.",
    "Det lackar mot jul, tiden är inne,\nhär får du något för ditt sinne.",
    "Midnatt råder, tyst det är i husen,\nmen detta paket tänder juleljusen.",
    "Här kommer en gåva med önskan om frid,\noch en riktigt härlig juletid."
];

// Avslutning (Alltid samma)
const ENDING = "God Jul & Gott Nytt År!";

// Fraser för laddningssekvensen
const LOADING_PHRASES = [
    "SÖKER NÖDRIM...", "SPÅNAR FEBRILT...", "KONSULTERAR TOMTEN...",
    "KALIBRERAR JULSTÄMNING...", "LEXIKAL ANALYS PÅGÅR...",
    "SKANNAR RIMLEXIKON...", "LADDAR GLÖGG...", "BERÄKNAR STAVELSER...",
    "KOKAR IHOP NÅGOT...", "ANALYSERAR SNÄLLHET...",
    "RIMMOTOR 1.0 STARTAR...", "HÄMTARJULKÄNSLA.EXE...",
    "KONKRETISERAR...", "POETISK KALIBRERING...", "RIMMAR PÅ GRÖT...",
    "LETAR EFTER RIMORD...", "MAXIMERARJULMYS...", "FÖRHÖJER STÄMNINGEN...",
    "GENOMSÖKER NORDPOLEN...", "LADDAR RIM-ALGORITM..."
];

// Databas med produkter och 10 generella rim per kategori
const itemDB = {
    // 1: Fötter & Mjuka paket
    1: { 
        names: ["STRUMPOR", "SOCKOR", "TOFFLOR", "SKOR", "SANDALER"], 
        couplets: [
            "När kylan tränger på och biter,\nbehöver man värme i kubik och liter.",
            "Mjuka paket är de bästa man kan få,\nsärskilt när de ska sitta på tå.",
            "För kalla golv och dragiga hus,\nhär får du värme och mysigt bus.",
            "Dessa ska värma när nordanvinden drar,\nde skönaste paren som tomten har.",
            "Något mjukt för din fot,\när kylan står vid din rot.",
            "Vandra tryggt och varmt i dessa,\nom du så är kung eller prinsessa.",
            "Sätt dem på fötterna och må så gott,\ndet är det bästa paketet du fått.",
            "Inga fler kalla tår här inte,\ndetta värmer även i den kallaste vinte'.",
            "En klassiker i julens säck,\nhåller kylan helt väck.",
            "Att frysa om fötterna är inget kul,\ndärför får du dessa till jul."
        ] 
    },
    // 2: Underkläder & Sovplagg
    2: { 
        names: ["KALSONGER", "TROSOR", "PYJAMAS", "NATTMÖSSA", "NÄSVÄRMARE"], 
        couplets: [
            "Det närmaste kroppen ska vara mjukt,\nallt annat vore ju helt sjukt.",
            "När du ska sova eller bara vara,\npassar denna mjuka vara.",
            "Något för natten eller dagen under,\nför livets alla sköna stunder.",
            "Här får du något som sitter nära,\ntill dig min kära.",
            "En mjuk start på varje dag,\nför ditt eget välbehag.",
            "För sköna drömmar och lugna nätter,\neller för dagar utan måsten och ätter.",
            "Detta är en privat liten sak,\nsom sitter bra både fram och bak.",
            "När John Blund strör sitt grus,\när detta skönt i ditt hus.",
            "Komfort är ordet för dagen,\nhär får du något mjukt mot magen.",
            "Svep in dig i mjukhet och ro,\ndet är skönare än du kan tro."
        ] 
    },
    // 3: Vinterkläder
    3: { 
        names: ["TRÖJA", "MÖSSA", "HALSDUK", "VANTAR", "LÅNGKALSONGER"], 
        couplets: [
            "Kläder efter väder säger man ju,\nmen snygg ska man vara, just nu.",
            "När frosten nyper i kind och näsa,\nkan du i denna värme läsa.",
            "En värmande kram i textila mått,\ndet är vad du just har fått.",
            "För promenader i snö och is,\nhåller denna dig varm på alla vis.",
            "Nu behöver du inte frysa mer,\nförrän solen åter ler.",
            "Mjukt och varmt mot kylan där ute,\nnu kan du njuta varje minute.",
            "Vinterkylan har ingen chans,\nmot denna mjuka elegans.",
            "Bylta på dig och ge dig ut,\nnu är frysandet slut.",
            "Stil och värme i kombination,\nen riktigt bra jultradition.",
            "Håll värmen när stormen yr,\nså slipper du bli yr."
        ] 
    },
    // 4: Hygien & Doft
    4: { 
        names: ["PARFYM", "TVÅL", "LOTION", "SCHAMPO", "SCRUB"], 
        couplets: [
            "Lite lyx i vardagens stress,\nhär får du doft med finess.",
            "För en stund i badrummets vrå,\ndär du kan koppla av och må.",
            "Dofta gott och känn dig fräsch,\ninget gammalt groll och bjäfs.",
            "En doft av flärd och renlighet,\när du använder denna hemlighet.",
            "Skäm bort dig själv en liten stund,\nmed dofter från en vacker lund.",
            "För kropp och knopp och välbehag,\ngör dig redo för en ny dag.",
            "Ren och fin ska man vara,\ndet fixar denna vara.",
            "Sätt guldkant på din morgonstund,\nmed doft som gör dig sund.",
            "Spa-känsla hemma hos dig,\nen riktigt härlig grej.",
            "Något som piggar upp och gör gott,\ndet är vad du just har fått."
        ] 
    },
    // 5: Inredning
    5: { 
        names: ["LJUS", "VAS", "INREDNING", "KRUKVÄXT", "KONST"], 
        couplets: [
            "Något vackert att vila ögonen på,\nsom får hemmet att stråla och må.",
            "För att skapa stämning och frid,\ni denna mörka vintertid.",
            "En detalj som lyfter ditt rum,\noch gör stilen mindre skum.",
            "Hemma är bäst, så sägs det ju,\noch ännu finare blir det nu.",
            "Låt hemmet skina och vara grant,\nmed denna vackra variant.",
            "Något att ställa, hänga eller tända,\nsom får trivseln att återvända.",
            "En fröjd för ögat i hemmets vrå,\nhoppas du gillar att titta på.",
            "För att göra ditt hem komplett,\nhar vi valt detta, rätt och slätt.",
            "Design och form i skön förening,\nger hemmamyset ny mening.",
            "Skapa en atmosfär av ro,\ndär du allra helst vill bo."
        ] 
    },
    // 6: Kök & Matlagning
    6: { 
        names: ["MUGG", "SKÅL", "KÖKSPRYL", "SERVIS", "BESTICK"], 
        couplets: [
            "Till köket där magin sker,\nhär får du utrustning och lite mer.",
            "För stunder vid bordet och spisen,\nhär har du den rätta expertisen.",
            "När maten ska lagas eller ätas,\nska denna gåva mätas.",
            "En hjälpande hand i kulinariska bestyr,\neller för en fika när dagen gryr.",
            "För goda smaker och trevliga stunder,\nkanske du skapar kulinariska under?",
            "Något praktiskt för ditt kök,\nså du slipper onödigt stök.",
            "Duka fram och bjud till fest,\nmed denna blir du en mäst.",
            "För den som gillar mat och dryck,\nhär är en riktigt bra manick.",
            "Gör vardagen lite mer elegant,\nmed denna köksvariant.",
            "Servera, laga eller drick,\nmed stil och skick."
        ] 
    },
    // 7: Läsning & Avkoppling
    7: { 
        names: ["BOK", "TIDNING", "ROMAN", "MAGASIN", "DIKTSAMLING"], 
        couplets: [
            "Här får du en chans att drömma dig bort,\ntill en annan värld av en annan sort.",
            "Nu får du koppla av och bara vara,\noch låta tankarna i texten fara.",
            "Sjunka ner i fåtöljen och njut,\ntills berättelsen tar slut.",
            "Ord på papper, tankar och drömmar,\nsom genom ditt medvetande strömmar.",
            "Kunskap, spänning eller romantik,\nhär finns en hel butik.",
            "Stäng av skärmen och öppna din vy,\nför en värld som är helt ny.",
            "En resa utan att flytta din fot,\nbästa sortens bot.",
            "Låt fantasin få vingar och flyga,\ni hemmets vrå, den trygga.",
            "Bläddra, läs och fascineras,\nlåt ditt sinne inspireras.",
            "Tystnad, lugn och en god historia,\nger dig en egen gloria."
        ] 
    },
    // 8: Teknik
    8: { 
        names: ["LURAR", "GADGET", "LADDARE", "MOBIL", "SPELKONSOL"], 
        couplets: [
            "Teknikens under i din hand,\nkopplar upp dig mot fjärran land.",
            "En pryl som blinkar, låter eller minns,\ndet bästa som finns.",
            "För den moderna människan av idag,\när detta ett bra drag.",
            "Ström och data i en väldig fart,\ndetta är riktigt smart.",
            "För nöje, nytta eller spel,\nmed denna blir inget fel.",
            "Här får du något digitalt,\nsom funkar fenomenalt.",
            "Knappar, skärm eller sladd,\nkanske en digital platta för kladd?",
            "Uppkopplad, påkopplad och med,\nhär är teknikens senaste led.",
            "En pryl som gör livet lite lättare,\neller kanske bara mättare.",
            "Framtiden är här i ett paket,\nprecis som du vet."
        ] 
    },
    // 9: Tur, Kul & Spel
    9: { 
        names: ["TRISS", "BIO", "LOTT", "PRESENTKORT", "UPPLEVELSE"], 
        couplets: [
            "Plötsligt händer det, vem vet när?\nKanske vinsten ligger just här.",
            "En upplevelse utöver det vanliga,\nför stunder som är behagliga.",
            "Spänning, tur eller en stund av skratt,\nhoppas du får en trevlig natt.",
            "Drömmar om storvinst eller bara kul,\nhär får du en spännande jul.",
            "Kanske blir du miljonär idag,\neller bara glad och svag.",
            "En biljett till något stort,\när du öppnar detta kort.",
            "Tur i spel eller tur i kärlek,\ndetta är ingen lek.",
            "Något att göra, se eller skrapa,\nså du slipper sitta och gapa.",
            "Förväntan är halva nöjet, sägs det,\nnu får du testa just det.",
            "En chansning eller ett säkert kort,\ngör att tiden går fort."
        ] 
    },
    // 0: Godis & Ätbart
    0: { 
        names: ["CHOKLAD", "GODIS", "PRALINER", "DELI", "DRICKBART"], 
        couplets: [
            "Något sött till kaffetåren,\nsätter guldkant på julespåren.",
            "Livet ska njutas i fulla drag,\nhär får du något för ditt välbehag.",
            "En smakupplevelse för din gom,\nnu blir magen inte tom.",
            "Detta är gott och gör dig glad,\nsom en solig promenad.",
            "Socker, kryddor och allt som är gott,\när vad du har fått.",
            "Njut av varje liten bit,\ndet är värt all din flit.",
            "När suget sätter in och kurrar,\när det bra att denna i munnen snurrar.",
            "En fröjd för smaklökarna dina,\nhoppas de smakar fina.",
            "Detta varar inte länge nog,\nmen ger dig ett leende som du tog.",
            "Unna dig något riktigt läckert,\ninslaget så vackert."
        ] 
    }
};

// --- AUDIO SETUP ---
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// --- STATE VARIABLES ---
let isPowered = false;
let masterSoundEnabled = false;
let sequencerInterval = null;
let knobState = 0; 
let currentSongName = null;
let historyStack = [];
let currentSelection = null;
let activeKey = null; 
let tapIndex = 0;
let tapTimer = null;
let isRhymeDisplayed = false;
let isConnected = false;
let inputBuffer = ""; 
let bootTimers = [];
let waitingForGameStart = false;
let isGenerating = false; 

// --- FLAPPY SANTA VARIABLES ---
let isGaming = false;
let gameState = 'MENU'; 
let gameTimer = null;
let santaY = 150;
let santaVel = 0;
let pipes = [];
let score = 0;
let gameSpeed = 1.2;
let gameFrame = 0;

// --- DOM ELEMENTS ---
const resultContent = document.getElementById("result-content"); 
const resultArea = document.getElementById("result-area");
const historyLine = document.getElementById("history-line");
const leverKnob = document.getElementById("lever-knob");
const snowLayer = document.getElementById("snow-layer");
const wrapper = document.getElementById("calculator");
const marqueeWrapper = document.getElementById("marquee");
const topDisplay = document.getElementById("top-display-container");
const muteLight = document.getElementById("mute-light");
const santaGroup = document.getElementById("santa-group");
const santaSprite = document.getElementById("santa-sprite");
const santaBannerGroup = document.getElementById("santa-banner-group");
const gameOverlay = document.getElementById("game-overlay");

// --- MARQUEE ---
let marqueeTimer = null;

function startMarqueeSequence() {
    clearTimeout(marqueeTimer);
    marqueeWrapper.style.transition = ''; 
    marqueeWrapper.classList.remove('marquee-moving');
    marqueeWrapper.style.opacity = '0';
    setTimeout(() => { initMarquee(); }, 50);
}

function initMarquee() {
    if (!isPowered) return;
    const logo1 = marqueeWrapper.children[0];
    const logo2 = marqueeWrapper.children[2];
    if(!logo1 || !logo2) return;

    const containerW = topDisplay.getBoundingClientRect().width;
    const logoW = logo1.getBoundingClientRect().width;
    const startX = (containerW / 2) - (logoW / 2);
    const distance = logo2.getBoundingClientRect().left - logo1.getBoundingClientRect().left;

    marqueeWrapper.style.transform = `translateX(${startX}px)`;
    setTimeout(() => { marqueeWrapper.style.opacity = '1'; }, 50);
    marqueeTimer = setTimeout(() => { runMarqueeCycle(startX, distance); }, 2000);
}

function runMarqueeCycle(startX, distance) {
    if (!isPowered) return;
    marqueeWrapper.classList.add('marquee-moving');
    const duration = distance / 60; 
    marqueeWrapper.style.transitionDuration = `${duration}s`;
    marqueeWrapper.style.transform = `translateX(${startX - distance}px)`;

    marqueeTimer = setTimeout(() => {
        marqueeWrapper.classList.remove('marquee-moving');
        marqueeWrapper.style.transitionDuration = '0s';
        marqueeWrapper.style.transform = `translateX(${startX}px)`;
        marqueeTimer = setTimeout(() => { runMarqueeCycle(startX, distance); }, 2500);
    }, duration * 1000);
}

// --- MUSIC ---
const N = {
    "C3": 130.81, "D3": 146.83, "E3": 164.81, "F3": 174.61, "G3": 196.00, "A3": 220.00, "B3": 246.94,
    "C4": 261.63, "D4": 293.66, "E4": 329.63, "F4": 349.23, "F#4": 369.99,
    "G4": 392.00, "G#4": 415.30, "A4": 440.00, "Bb4": 466.16, "B4": 493.88, 
    "C5": 523.25, "D5": 587.33, "E5": 659.25, "F5": 698.46
};

const SONGS = {
    stilla: {
        tempo: 900,
        melody: [
            {n:'G4',d:0.75}, {n:'A4',d:0.25}, {n:'G4',d:0.5}, {n:'E4',d:1.5},
            {n:'G4',d:0.75}, {n:'A4',d:0.25}, {n:'G4',d:0.5}, {n:'E4',d:1.5},
            {n:'D5',d:1.0}, {n:'D5',d:0.5}, {n:'B4',d:1.5},
            {n:'C5',d:1.0}, {n:'C5',d:0.5}, {n:'G4',d:1.5},
            {n:'A4',d:1.0}, {n:'A4',d:0.5}, {n:'C5',d:0.75}, {n:'B4',d:0.25}, {n:'A4',d:0.5},
            {n:'G4',d:0.75}, {n:'A4',d:0.25}, {n:'G4',d:0.5}, {n:'E4',d:1.5},
            {n:'A4',d:1.0}, {n:'A4',d:0.5}, {n:'C5',d:0.75}, {n:'B4',d:0.25}, {n:'A4',d:0.5},
            {n:'G4',d:0.75}, {n:'A4',d:0.25}, {n:'G4',d:0.5}, {n:'E4',d:1.5},
            {n:'D5',d:1.0}, {n:'D5',d:0.5}, {n:'F5',d:0.75}, {n:'D5',d:0.25}, {n:'B4',d:0.5},
            {n:'C5',d:1.5}, {n:'E5',d:1.5},
            {n:'C5',d:0.5}, {n:'G4',d:0.5}, {n:'E4',d:0.5}, {n:'G4',d:0.75}, {n:'F4',d:0.25}, {n:'D4',d:0.5},
            {n:'C4',d:2.5}, {n:null,d:0.5}
        ]
    },
    wish: {
        tempo: 750,
        melody: [
            {n:'D4',d:0.5}, 
            {n:'G4',d:0.5}, {n:'G4',d:0.25}, {n:'A4',d:0.25}, {n:'G4',d:0.25}, {n:'F#4',d:0.25}, {n:'E4',d:0.5}, {n:'E4',d:0.5}, 
            {n:'E4',d:0.5}, 
            {n:'A4',d:0.5}, {n:'A4',d:0.25}, {n:'B4',d:0.25}, {n:'A4',d:0.25}, {n:'G4',d:0.25}, {n:'F#4',d:0.5}, {n:'D4',d:0.5},
            {n:'D4',d:0.5},
            {n:'B4',d:0.5}, {n:'B4',d:0.25}, {n:'C5',d:0.25}, {n:'B4',d:0.25}, {n:'A4',d:0.25}, {n:'G4',d:0.5}, {n:'E4',d:0.5},
            {n:'D4',d:0.25}, {n:'D4',d:0.25}, 
            {n:'E4',d:0.5}, {n:'A4',d:0.5}, {n:'F#4',d:0.5}, {n:'G4',d:1.0},
            {n:null,d:0.5}
        ]
    },
    bjaller: {
        tempo: 780,
        melody: [
            {n:'B4',d:0.25}, {n:'B4',d:0.25}, {n:'B4',d:0.5},
            {n:'B4',d:0.25}, {n:'B4',d:0.25}, {n:'B4',d:0.5},
            {n:'B4',d:0.25}, {n:'D5',d:0.25}, {n:'G4',d:0.375}, {n:'A4',d:0.125}, {n:'B4',d:1},
            {n:'C5',d:0.25}, {n:'C5',d:0.25}, {n:'C5',d:0.375}, {n:'C5',d:0.125},
            {n:'C5',d:0.25}, {n:'B4',d:0.25}, {n:'B4',d:0.25}, {n:'B4',d:0.125}, {n:'B4',d:0.125},
            {n:'B4',d:0.25}, {n:'A4',d:0.25}, {n:'A4',d:0.25}, {n:'B4',d:0.25}, {n:'A4',d:0.5}, {n:'D5',d:0.5},
            {n:'B4',d:0.25}, {n:'B4',d:0.25}, {n:'B4',d:0.5},
            {n:'B4',d:0.25}, {n:'B4',d:0.25}, {n:'B4',d:0.5},
            {n:'B4',d:0.25}, {n:'D5',d:0.25}, {n:'G4',d:0.375}, {n:'A4',d:0.125}, {n:'B4',d:1},
            {n:'C5',d:0.25}, {n:'C5',d:0.25}, {n:'C5',d:0.375}, {n:'C5',d:0.125},
            {n:'C5',d:0.25}, {n:'B4',d:0.25}, {n:'B4',d:0.25}, {n:'B4',d:0.125}, {n:'B4',d:0.125},
            {n:'D5',d:0.25}, {n:'D5',d:0.25}, {n:'C5',d:0.25}, {n:'A4',d:0.25}, {n:'G4',d:1.5}, {n:null,d:0.5}
        ]
    }
};

function getBassNote(note) {
    if(!note) return null;
    if(['G4','B4','D5','G3'].includes(note)) return 'G3';
    if(['C5','C4','E4','E3'].includes(note)) return 'C4'; 
    if(['A4','F4','F5','D4'].includes(note)) return 'D4'; 
    if(['F#4'].includes(note)) return 'D3';
    return 'G3'; 
}

function synth(freq, type, duration, vol = 0.1) {
    if (!isPowered || !masterSoundEnabled || !freq) return;
    if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(e => console.log("Audio start prevented"));
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.stop(audioCtx.currentTime + duration);
}

function sfxRound() { synth(1200, 'sine', 0.1, 0.1); }
function sfxDigit() { synth(400, 'square', 0.06, 0.05); }

function sfxDelete() {
    if (!isPowered || !masterSoundEnabled) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.15);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.15); osc.stop(audioCtx.currentTime + 0.15);
}

function sfxPlus() {
    if (!masterSoundEnabled) return;
    synth(523.25, 'sine', 0.1, 0.1); setTimeout(() => synth(659.25, 'sine', 0.2, 0.1), 80);
}
function sfxSuccess() {
    if (!masterSoundEnabled) return;
    synth(523.25, 'triangle', 0.15, 0.1); setTimeout(() => synth(659.25, 'triangle', 0.15, 0.1), 100); setTimeout(() => synth(783.99, 'triangle', 0.4, 0.15), 200);
}
function sfxBoot(){
    if(masterSoundEnabled) {
        synth(220,'square',0.1); setTimeout(()=>synth(440,'square',0.1),150); setTimeout(()=>synth(880,'square',0.4),300);
    }
}

let currentSongStep = 0;

function startSequencer() {
    if (sequencerInterval) return;
    currentSongStep = 0; 
    playStep();
}

function playStep() {
    if (knobState < 2) { stopSequencer(); return; }

    let activeSong;
    if (knobState === 2) activeSong = SONGS.stilla;
    else if (knobState === 3) activeSong = SONGS.wish;
    else if (knobState >= 4) activeSong = SONGS.bjaller; 

    if (!activeSong) return;

    const melody = activeSong.melody;
    const timeScale = activeSong.tempo;

    if(currentSongStep >= melody.length) currentSongStep = 0;

    const current = melody[currentSongStep];
    if (current.n) {
        const melFreq = N[current.n];
        const bassFreq = N[getBassNote(current.n)];
        const dur = current.d * timeScale;

        if (melFreq) synth(melFreq, 'square', dur/1000 * 0.8, 0.08);
        if (bassFreq) synth(bassFreq, 'triangle', dur/1000 * 1.0, 0.12);
    }

    const nextDur = current.d * timeScale;
    currentSongStep++;
    
    sequencerInterval = setTimeout(playStep, nextDur);
}

function stopSequencer() {
    if (sequencerInterval) clearTimeout(sequencerInterval);
    sequencerInterval = null;
}

function updateScreen(mainText, historyText = null) {
    resultContent.innerHTML = mainText.replace(/\n/g, '<br>');
    resultContent.classList.remove('easter-egg');
    
    if (historyText !== null) {
        historyLine.textContent = historyText;
        
        if(historyText && historyText.length > 0) {
            historyLine.classList.add('visible');
        } else {
            historyLine.classList.remove('visible');
        }
    }
}

function triggerEasterEgg() {
    if(masterSoundEnabled) sfxSuccess();
    historyStack = [];
    updateHistory();
    
    resultContent.textContent = "GOD JUL OCH GOTT NYTT ÅR\nÖNSKAR ALLA VI PÅ\nTENGBOM!";
    resultContent.classList.add('easter-egg');
    
    if(masterSoundEnabled) {
        knobState = 4; 
        updateLever();
        renderSnow(4);
        startSequencer();
    }
}

function updateHistory() {
    if (historyStack.length === 0) {
        historyLine.textContent = "";
        historyLine.classList.remove('visible');
    } else {
        const names = historyStack.map(item => item.name);
        historyLine.textContent = names.join(" + ");
        historyLine.classList.add('visible');
    }
}

function updateMuteLight() {
    if (!isPowered) {
        muteLight.classList.remove('lit'); 
    } else {
        if (!masterSoundEnabled) {
            muteLight.classList.add('lit'); 
        } else {
            muteLight.classList.remove('lit'); 
        }
    }
}

function toggleSound() {
    masterSoundEnabled = !masterSoundEnabled;
    updateMuteLight();

    if(isPowered) {
        sfxRound();
        updateScreen(masterSoundEnabled ? "LJUD: PÅ" : "LJUD: AV");
        setTimeout(() => { 
            if(!isRhymeDisplayed && !resultContent.classList.contains('easter-egg') && !isGaming && !isGenerating) 
                updateScreen(currentSelection ? currentSelection.name : ""); 
        }, 1000);
        
        if (masterSoundEnabled && knobState >= 2) startSequencer();
        else if (!masterSoundEnabled) stopSequencer();
    }
}

function togglePower() {
    isPowered = !isPowered;
    updateMuteLight();

    if(isPowered) {
        wrapper.classList.remove('off');
        sfxBoot();
        
        marqueeWrapper.style.opacity = '0'; 
        
        updateScreen("SYSTEMCHECK...");
        bootTimers.push(setTimeout(() => updateScreen("SYSTEMCHECK...<br>LADDAR RIM-MODUL..."), 1000));
        bootTimers.push(setTimeout(() => updateScreen("SYSTEMCHECK...<br>LADDAR RIM-MODUL...<br>MATAR RENARNA..."), 2500));
        bootTimers.push(setTimeout(() => {
            if(isPowered){
                updateScreen("VÄLJ GÅVA...");
                startMarqueeSequence();
            }
        }, 4000));

    } else {
        bootTimers.forEach(t => clearTimeout(t));
        bootTimers = [];

        exitGame();

        wrapper.classList.add('off');
        stopSequencer();
        
        clearTimeout(marqueeTimer);
        marqueeWrapper.classList.remove('marquee-moving');
        marqueeWrapper.style.transition = 'none'; 
        marqueeWrapper.style.opacity = '0';
        
        stopSanta();

        resultContent.textContent = "";
        historyLine.textContent = "";
        historyLine.classList.remove('visible');
        resultContent.classList.remove('easter-egg');
        
        historyStack=[]; 
        currentSelection=null;
        isConnected=false; 
        knobState=0; 
        inputBuffer = "";
        isGenerating = false;
        updateLever(); 
        renderSnow(0);
        waitingForGameStart = false;
    }
}

function adjustKnob() {
    if(!isPowered || isGaming) return; 
    
    knobState = (knobState + 1) % 6;
    
    updateLever();
    renderSnow(knobState);
    
    let newSongName = null;
    if (knobState === 2) newSongName = 'stilla';
    else if (knobState === 3) newSongName = 'wish';
    else if (knobState >= 4) newSongName = 'bjaller';

    if (newSongName !== currentSongName) {
        stopSequencer(); 
        currentSongName = newSongName;
        
        if (currentSongName && masterSoundEnabled) {
            startSequencer();
        }
    } 
}

function updateLever(){
    const stepSize = 12.8;
    const x = 18.5 + (knobState * stepSize); 
    leverKnob.setAttribute("cx", x);
}

// --- TOMTE LOGIK (IDLE) ---
let santaTimer = null;
let santaAnimTimer = null;
let santaActive = false;
let lastSantaDir = -1; 

function startSantaCycle() {
    if(santaTimer) return;
    santaTimer = setInterval(() => {
        if(knobState === 5 && !santaActive && Math.random() > 0.6 && !isGaming) { 
            spawnSanta();
        }
    }, 2000);
}

function stopSanta() {
    clearInterval(santaTimer);
    santaTimer = null;
    cancelAnimationFrame(santaAnimTimer);
    santaActive = false;
    if(!isGaming) {
        santaGroup.style.display = 'none';
        santaSprite.style.display = 'none';
        santaBannerGroup.innerHTML = ''; 
    }
}

function spawnSanta() {
    santaActive = true;
    santaGroup.style.display = 'block';
    santaSprite.style.display = 'block';
    
    const dir = lastSantaDir === 1 ? -1 : 1;
    lastSantaDir = dir;
    
    const scale = 0.6 + Math.random() * 0.4; 
    
    santaSprite.setAttribute('width', '80');
    santaSprite.setAttribute('height', '40');
    santaSprite.style.transform = ''; 
    
    const showBanner = Math.random() > 0.7; 
    santaBannerGroup.innerHTML = ''; 
    let bannerChars = [];
    
    if(showBanner) {
        const text = "GOD JUL!";
        for(let i=0; i<text.length; i++) {
            let t = document.createElementNS("http://www.w3.org/2000/svg", "text");
            t.textContent = text[i];
            t.setAttribute("class", "banner-char");
            
            let xPos;
            if (dir === 1) {
                // Flyger höger: Släden 0 till 80. Text vänster om 0.
                // Start -10, går åt vänster.
                xPos = -10 - (text.length - i) * 12; 
            } else {
                // Flyger vänster: Släden spegelvänd (scaleX -1).
                // Bilden ritas -80 till 0 visuellt med transformen.
                // Texten ska vara till HÖGER om 0 (bakom släden).
                // Sprite width är 80. Gap 10. Start 90.
                xPos = 90 + i * 12; 
            }
            
            t.setAttribute("x", xPos);
            t.setAttribute("y", 25);
            santaBannerGroup.appendChild(t);
            bannerChars.push(t);
        }
    }
    
    const startY = 110 + Math.random() * 45; 
    const startX = dir === 1 ? -100 : 300;
    const endX = dir === 1 ? 300 : -100;
    
    let currentX = startX;
    let frame = 0;
    const frames = ['assets/santa_frame_1.png', 'assets/santa_frame_2.png', 'assets/santa_frame_3.png', 'assets/santa_frame_2.png'];
    let frameIndex = 0;
    let speed = (0.5 + Math.random() * 0.5) * dir; 
    let time = 0;
    
    function animate() {
        if(!isPowered || knobState !== 5 || isGaming) {
            stopSanta();
            return;
        }

        currentX += speed;
        const wave = Math.sin(currentX / 20) * 10;
        
        santaGroup.setAttribute('transform', `translate(${currentX}, ${startY + wave}) scale(${scale}, ${scale})`);
        
        if (dir === -1) {
            santaSprite.setAttribute('transform', 'scale(-1, 1) translate(-80, 0)');
        } else {
            santaSprite.setAttribute('transform', '');
        }
        
        if(showBanner) {
            time += 0.1; 
            for(let i=0; i<bannerChars.length; i++) {
                let yOff = Math.sin(time + i * 0.5) * 4;
                bannerChars[i].setAttribute('y', 25 + yOff);
            }
        }
        
        if(frame % 10 === 0) {
            frameIndex = (frameIndex + 1) % frames.length;
            santaSprite.setAttribute('href', frames[frameIndex]);
        }
        frame++;

        if ((dir === 1 && currentX > endX) || (dir === -1 && currentX < endX)) {
            santaActive = false;
            santaGroup.style.display = 'none';
            cancelAnimationFrame(santaAnimTimer);
        } else {
            santaAnimTimer = requestAnimationFrame(animate);
        }
    }
    animate();
}

function renderSnow(lvl) {
    if(isGaming) return; 

    const counts = [0, 16, 40, 40, 40, 80];
    if(lvl === 5) startSantaCycle();
    else stopSanta();

    let svg = "";
    if(lvl > 0 && counts[lvl] > 0){
        const startY = 100; 
        const endY = 200;   
        const count = counts[lvl];
        
        for(let i=0; i<count; i++){
            let cx = 10 + Math.random() * 215;
            let cy = startY + Math.random()*(endY - startY); 
            let d = 2 + Math.random()*3;
            let opacity = 0.5 + Math.random()*0.5;
            
            if (Math.random() > 0.7) {
                let s = 1.5 + Math.random();
                let pathD = `M${cx},${cy-s} v${2*s} M${cx-s},${cy} h${2*s}`;
                svg += `<path d="${pathD}" class="snow-cross" style="opacity:${opacity}">
                    <animate attributeName="d" values="M${cx},${startY-s} v${2*s} M${cx-s},${startY} h${2*s}; M${cx},${endY-s} v${2*s} M${cx-s},${endY} h${2*s}" dur="${d}s" repeatCount="indefinite"/>
                </path>`;
            } else {
                let s = 1.0 + Math.random() * 1.5;
                svg += `<rect x="${cx}" y="${cy}" width="${s}" height="${s}" class="snow-pixel" style="opacity:${opacity}">
                    <animate attributeName="y" from="${startY}" to="${endY}" dur="${d}s" repeatCount="indefinite"/>
                </rect>`;
            }
        }
    }
    snowLayer.innerHTML = svg;
}

function resetIfRhymeDisplayed() {
    if (isRhymeDisplayed || resultContent.classList.contains('easter-egg')) {
        historyStack = [];
        currentSelection = null;
        isRhymeDisplayed = false;
        updateHistory();
        updateScreen("");
    }
}

function input(key) {
    if(!isPowered || isGaming || isGenerating) return; 
    resetIfRhymeDisplayed();
    sfxDigit();
    
    waitingForGameStart = false;
    
    inputBuffer += key.toString();
    
    if (inputBuffer.endsWith("463585")) {
        triggerEasterEgg();
        inputBuffer = ""; 
        return; 
    }

    if (inputBuffer.length > 10) inputBuffer = inputBuffer.slice(-10);

    const data = itemDB[key];
    if (!data) return;
    if (activeKey === key) {
        tapIndex = (tapIndex + 1) % data.names.length;
    } else {
        activeKey = key;
        tapIndex = 0;
    }
    currentSelection = { key: key, name: data.names[tapIndex] };
    updateScreen(currentSelection.name);
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => { activeKey = null; }, 2000);
}

function action(type) {
    if(!isPowered) return;

    if(isGaming) {
        if(type === 'ADD' && (gameState === 'TITLE' || gameState === 'READY')) {
            if(gameState === 'TITLE') initFlappyLevel();
            else if(gameState === 'READY') startGameplay();
        }
        else if(type === 'ADD' && gameState === 'PLAYING') {
            gameJump();
        }
        return;
    }

    if (type === 'ADD') {
        if(isGenerating) return;
        sfxPlus();
        resetIfRhymeDisplayed();
        if (currentSelection) {
            historyStack.push(currentSelection);
            currentSelection = null;
            activeKey = null;
            updateHistory();
            updateScreen(""); 
        } else {
            const old = resultContent.textContent;
            updateScreen("VÄLJ FÖRST");
            setTimeout(() => updateScreen(old === "VÄLJ FÖRST" ? "" : old), 800);
        }
    }
    else if (type === 'CLEAR') {
        if(isGenerating) return;
        sfxDelete();
        historyStack = [];
        currentSelection = null;
        activeKey = null;
        isRhymeDisplayed = false;
        waitingForGameStart = false;
        updateHistory();
        updateScreen("RENSAT");
        setTimeout(()=>updateScreen("VÄLJ GÅVA..."), 1000);
    }
    else if (type === 'BACK') {
        if(isGenerating) return;
        sfxDelete();
        resetIfRhymeDisplayed();
        if (currentSelection) {
            currentSelection = null;
            activeKey = null;
            updateScreen("");
        } else if (historyStack.length > 0) {
            historyStack.pop();
            updateHistory();
            updateScreen("");
        }
    }
    else if (type === 'RANDOM') {
        if(isGenerating) return;
        // Ny slumpfunktion: Välj 2-5 produkter från hela databasen
        historyStack = [];
        const count = Math.floor(Math.random() * 4) + 2; // 2 till 5 produkter
        
        for(let i = 0; i < count; i++) {
            const randomKey = Math.floor(Math.random() * 10); // 0-9
            const dbEntry = itemDB[randomKey];
            const randomItemIndex = Math.floor(Math.random() * dbEntry.names.length);
            historyStack.push({
                key: randomKey,
                name: dbEntry.names[randomItemIndex]
            });
        }
        
        updateHistory();
        generateRhyme();
    }
}

function generateRhyme() {
    if(!isPowered || isGaming || isGenerating) return;

    if(waitingForGameStart) {
        initFlappyTitle();
        waitingForGameStart = false;
        inputBuffer = "";
        return;
    }

    if(inputBuffer.endsWith("1224")) {
        sfxSuccess();
        let poem = "Den 24e smäller det,\nhär får du en hemlighet!\nTryck ENTER igen...";
        updateScreen(poem);
        waitingForGameStart = true;
        historyLine.textContent = "JULAFTON?";
        historyLine.classList.add('visible');
        return;
    }
    
    if (currentSelection) {
        historyStack.push(currentSelection);
        currentSelection = null;
    }
    if (historyStack.length === 0) {
        updateScreen("INGEN GÅVA?");
        return;
    }
    updateHistory(); 
    
    // STARTA LADDSEKVENS
    isGenerating = true;
    let step = 0;
    const maxSteps = 3; 

    function nextLoadingStep() {
        if(step < maxSteps) {
            const phrase = LOADING_PHRASES[Math.floor(Math.random() * LOADING_PHRASES.length)];
            updateScreen(phrase);
            sfxDigit(); 
            step++;
            setTimeout(nextLoadingStep, 1500); // Långsammare, som WiFi
        } else {
            finalizeRhyme();
            isGenerating = false;
        }
    }

    nextLoadingStep();
}

function finalizeRhyme() {
    sfxSuccess();
    
    let finalPoem = "";
    
    // Slumpa intro
    finalPoem += INTROS[Math.floor(Math.random() * INTROS.length)] + "\n\n";
    
    // Logik för att undvika dubbla rim
    let usedIndices = {}; // Key: categoryId, Value: Set of used indices

    historyStack.forEach(item => {
        if (!usedIndices[item.key]) usedIndices[item.key] = new Set();
        
        const dbEntry = itemDB[item.key];
        
        // Hitta index som INTE använts än för denna kategori
        let availableIndices = dbEntry.couplets.map((_, i) => i)
                               .filter(i => !usedIndices[item.key].has(i));

        // Säkerhet: Om alla 10 rim använts (mycket ovanligt), nollställ för denna kategori
        if (availableIndices.length === 0) {
             availableIndices = dbEntry.couplets.map((_, i) => i);
             usedIndices[item.key].clear();
        }

        // Välj ett slumpmässigt index från de tillgängliga
        const randIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        
        // Markera som använt
        usedIndices[item.key].add(randIndex);
        
        finalPoem += dbEntry.couplets[randIndex] + "\n\n";
    });
    
    // Lägg till fast avslutning
    finalPoem += ENDING;
    
    isRhymeDisplayed = true;
    activeKey = null;
    updateScreen(finalPoem);
}

function connectNorthPole() {
    if(!isPowered || isGaming) return;
    resetIfRhymeDisplayed();
    sfxRound();
    if (isConnected) {
        sfxSuccess();
        updateScreen("KONTAKT ETABLERAD!\nNORDPOLEN ONLINE.");
        return;
    }
    synth(1200, 'square', 0.1);
    updateScreen("SÖKER...");
    setTimeout(() => {
        synth(1200, 'square', 0.1);
        updateScreen("SÖKER...\nRADAR...");
    }, 1500);
    setTimeout(() => {
        synth(1200, 'square', 0.1);
        updateScreen("SÖKER...\nRADAR...\nPEILAR...");
    }, 3000);
    setTimeout(() => {
        sfxSuccess();
        isConnected = true;
        updateScreen("KONTAKT ETABLERAD!\nNORDPOLEN ONLINE.");
    }, 4500);
}

function showHelp() {
    if(!isPowered || isGaming) return;
    resetIfRhymeDisplayed();
    sfxRound();
    
    // Ny Info-text layout
    const helpText = "GOD JUL OCH GOTT NYTT ÅR\nÖNSKAR ALLA VI PÅ TENGBOM!\n\n" +
                     "=== INFO ===\n" +
                     "Julrimskalkylatorn är framtagen för att rädda din uppesittarkväll. " +
                     "Låt tekniken göra jobbet medan du tar en glögg.\n\n" +
                     "=== GUIDE ===\n" +
                     "1. VÄLJ GÅVA\nAnvänd 0-9. Tryck flera gånger för att bläddra.\n\n" +
                     "2. LÄGG TILL\nTryck på + för att kombinera flera gåvor.\n\n" +
                     "3. RIMMA\nTryck ENTER när du är klar.\n\n" +
                     "4. JULSTÄMNING\nVrid på spaken för snö & musik.";
                     
    updateScreen(helpText);
}

// --- FLAPPY SANTA ENGINE ---

function initFlappyTitle() {
    isGaming = true;
    stopSanta(); 
    gameState = 'TITLE';
    gameOverlay.style.display = 'block'; 
    snowLayer.innerHTML = ""; 
    historyLine.classList.add('hidden-border'); 
    historyLine.textContent = "LADDAR...";
    historyLine.classList.add('visible');
    updateScreen("");
}

function initFlappyLevel() {
    gameState = 'READY';
    gameOverlay.style.display = 'none'; 
    
    santaY = 150;
    santaVel = 0;
    score = 0;
    pipes = [];
    gameFrame = 0;
    
    historyLine.classList.remove('hidden-border');
    historyLine.textContent = "SCORE: 0";
    historyLine.classList.add('visible');
    updateScreen("");
    
    santaSprite.style.display = 'block';
    santaSprite.setAttribute('width', '50'); 
    santaSprite.setAttribute('height', '25');
    santaSprite.setAttribute('href', 'assets/santa_frame_1.png');
    
    santaGroup.style.display = 'block';
    santaBannerGroup.innerHTML = ''; 
    santaSprite.setAttribute('transform', ''); 
    
    updateSantaPos(40, 150, 0);
    
    gameLoop();
}

function startGameplay() {
    gameState = 'PLAYING';
    gameJump();
}

function gameJump() {
    santaVel = -3.0; 
    sfxPlus();
}

function updateSantaPos(x, y, rot) {
    santaGroup.setAttribute('transform', `translate(${x}, ${y}) rotate(${rot})`);
    if(gameFrame % 5 === 0) {
        const frames = ['assets/santa_frame_1.png', 'assets/santa_frame_2.png', 'assets/santa_frame_3.png', 'assets/santa_frame_2.png'];
        const frameIndex = Math.floor(gameFrame / 5) % 4;
        santaSprite.setAttribute('href', frames[frameIndex]);
    }
}

function drawPipes(svgContent) {
    let pipeW = 25;
    for(let i = 0; i < pipes.length; i++) {
        let p = pipes[i];
        svgContent += `<rect x="${p.x}" y="96" width="${pipeW}" height="${Math.max(0, p.y - 96 - 35)}" class="pipe" />`;
        svgContent += `<rect x="${p.x}" y="${p.y + 35}" width="${pipeW}" height="${Math.max(0, 205 - (p.y + 35))}" class="pipe" />`;
    }
    return svgContent;
}

function gameLoop() {
    if(!isGaming || gameState === 'GAMEOVER') return;

    gameFrame++;
    
    if(gameState === 'READY') {
        let hoverY = 150 + Math.sin(gameFrame / 10) * 5;
        updateSantaPos(40, hoverY, 0);
        requestAnimationFrame(gameLoop);
        return;
    }

    santaVel += 0.15; 
    santaY += santaVel;
    
    if(santaY < 96) {
        santaY = 96;
        santaVel = 0;
    }
    
    if(santaY > 200) {
        gameOver();
        return;
    }

    if(gameFrame % 90 === 0) { 
        let minPipe = 120;
        let maxPipe = 180;
        let gapPos = Math.floor(Math.random() * (maxPipe - minPipe + 1)) + minPipe;
        pipes.push({x: 240, y: gapPos, passed: false});
    }

    let svgContent = "";
    
    let rot = Math.min(Math.max(santaVel * 4, -25), 25);
    updateSantaPos(40, santaY, rot);

    let santaRect = {x: 40 + 5, y: santaY + 5, w: 40, h: 15}; 

    for(let i = 0; i < pipes.length; i++) {
        let p = pipes[i];
        p.x -= gameSpeed;
        
        let pipeW = 25;
        
        if (santaRect.x + santaRect.w > p.x && santaRect.x < p.x + pipeW) {
            if (santaRect.y < p.y - 35 || santaRect.y + santaRect.h > p.y + 35) {
                gameOver();
                return;
            }
        }

        if(p.x + pipeW < 40 && !p.passed) {
            score++;
            p.passed = true;
            historyLine.textContent = "SCORE: " + score;
            sfxDigit();
        }
    }
    
    svgContent = drawPipes(svgContent);
    pipes = pipes.filter(p => p.x > -50);
    snowLayer.innerHTML = svgContent;

    gameTimer = requestAnimationFrame(gameLoop);
}

function gameOver() {
    gameState = 'GAMEOVER';
    cancelAnimationFrame(gameTimer);
    sfxDelete(); 
    updateScreen(`GAME OVER\n\nPOÄNG: ${score}`);
    
    setTimeout(() => {
        exitGame();
        updateScreen("VÄLJ GÅVA...");
        historyLine.textContent = "";
        historyLine.classList.remove('visible');
        historyLine.classList.remove('hidden-border');
    }, 3000);
}

function exitGame() {
    isGaming = false;
    gameState = 'MENU';
    if(gameTimer) cancelAnimationFrame(gameTimer);
    
    santaSprite.style.display = 'none';
    santaGroup.style.display = 'none';
    gameOverlay.style.display = 'none';
    snowLayer.innerHTML = "";
    santaBannerGroup.innerHTML = '';
}

// --- EVENTS ---

window.addEventListener('load', () => {
    togglePower(); 
    masterSoundEnabled = false; 
    updateMuteLight();
});

window.addEventListener('keydown', (e) => {
    if (!isPowered && e.key.toLowerCase() !== 'p') return;

    if (isGaming) {
        if (e.key === '+' || e.key === ' ') {
            if(gameState === 'TITLE') initFlappyLevel();
            else if(gameState === 'READY') startGameplay();
            else if(gameState === 'PLAYING') gameJump();
        }
        if (e.key.toLowerCase() === 'p') togglePower(); 
        return;
    }

    if (e.key >= '0' && e.key <= '9') input(parseInt(e.key));
    if (e.key === 'Backspace') action('BACK');
    if (e.key === 'Enter') generateRhyme();
    if (e.key === '+') action('ADD');
    if (e.key.toLowerCase() === 'c') action('CLEAR');
    if (e.key.toLowerCase() === 'r') action('RANDOM');
    
    if (e.key.toLowerCase() === 's') toggleSound(); 
    if (e.key.toLowerCase() === 'w') connectNorthPole(); 
    if (e.key.toLowerCase() === 'h') showHelp(); 
    
    if (e.key.toLowerCase() === 'p') togglePower(); 
});