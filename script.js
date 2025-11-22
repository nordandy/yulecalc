const itemDB = {
    7: { names: ["BOK", "TIDNING", "ROMAN"], couplets: ["Här får du en chans att drömma dig bort,\ntill en annan värld av en annan sort.", "Nu får du koppla av och bara vara,\noch låta tankarna i texten fara."] },
    3: { names: ["CHOKLAD", "GODIS", "PRALINER"], couplets: ["Något sött till kaffetåren,\nsätter guldkant på julespåren.", "Livet ska njutas i fulla drag,\nhär får du något för ditt välbehag."] },
    1: { names: ["STRUMPOR", "SOCKOR", "TOFFLOR"], couplets: ["När kylan tränger på och biter,\nbehöver man värme i kubik och liter.", "Mjuka paket är de bästa man kan få,\nsärskilt när de ska sitta på tå."] },
    8: { names: ["LURAR", "GADGET", "LADDARE"], couplets: ["Teknikens under i din hand,\nkopplar upp dig mot fjärran land."] },
    9: { names: ["TRISS", "BIO", "LOTT"], couplets: ["Plötsligt händer det, vem vet när?\nKanske vinsten ligger just här."] },
    4: { names: ["TVÅL", "PARFYM", "LOTION"], couplets: ["Lite lyx i vardagens stress,\nhär får du doft med finess."] },
    5: { names: ["LJUS", "VAS", "INREDNING"], couplets: ["Något vackert att vila ögonen på,\nsom får hemmet att stråla och må."] },
    6: { names: ["MUGG", "SKÅL", "KÖKSPRYL"], couplets: ["Till köket där magin sker,\nhär får du utrustning och lite mer."] },
    2: { names: ["KALSONG", "TROSOR", "PYJAMAS"], couplets: ["Det närmaste kroppen ska vara mjukt,\nallt annat vore ju helt sjukt."] },
    0: { names: ["TRÖJA", "MÖSSA", "HALSDUK"], couplets: ["Kläder efter väder säger man ju,\nmen snygg ska man vara, just nu."] }
};

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

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
let inputBuffer = ""; // För påskägg

const resultContent = document.getElementById("result-content"); 
const resultArea = document.getElementById("result-area");
const historyLine = document.getElementById("history-line");
const leverKnob = document.getElementById("lever-knob");
const snowLayer = document.getElementById("snow-layer");
const wrapper = document.getElementById("calculator");
const marqueeWrapper = document.getElementById("marquee");
const topDisplay = document.getElementById("top-display-container");
const muteLight = document.getElementById("mute-light");
const santaSprite = document.getElementById("santa-sprite");

// --- MARQUEE LOGIK ---
let marqueeTimer = null;

function startMarqueeSequence() {
    clearTimeout(marqueeTimer);
    marqueeWrapper.classList.remove('marquee-moving');
    marqueeWrapper.style.opacity = '0';
    setTimeout(() => { initMarquee(); }, 100);
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

// --- MUSIK DATA ---
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

// --- MUSIKSPELARE ---
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

// --- UI UPPDATERING ---
function updateScreen(mainText, historyText = null) {
    resultContent.innerHTML = mainText.replace(/\n/g, '<br>');
    // Återställ eventuell påskäggs-styling
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
    sfxSuccess();
    historyStack = [];
    updateHistory();
    
    resultContent.textContent = "GOD JUL OCH GOTT NYTT ÅR\nÖNSKAR ALLA VI PÅ\nTENGBOM!";
    resultContent.classList.add('easter-egg');
    
    // Starta Bjällerklang för effekt
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
            if(!isRhymeDisplayed && !resultContent.classList.contains('easter-egg')) 
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
        
        updateScreen("SYSTEMCHECK...");
        setTimeout(() => updateScreen("SYSTEMCHECK...<br>LADDAR RIM-MODUL..."), 1000);
        setTimeout(() => updateScreen("SYSTEMCHECK...<br>LADDAR RIM-MODUL...<br>MATAR RENARNA..."), 2500);
        setTimeout(() => updateScreen("VÄLJ GÅVA..."), 4000);
        
        startMarqueeSequence();

    } else {
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
        updateLever(); 
        renderSnow(0);
    }
}

function adjustKnob() {
    if(!isPowered) return;
    
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

// --- TOMTE LOGIK ---
let santaTimer = null;
let santaAnimTimer = null;
let santaActive = false;

function startSantaCycle() {
    if(santaTimer) return;
    santaTimer = setInterval(() => {
        if(knobState === 5 && !santaActive && Math.random() > 0.6) { // Chans 40%
            spawnSanta();
        }
    }, 2000);
}

function stopSanta() {
    clearInterval(santaTimer);
    santaTimer = null;
    cancelAnimationFrame(santaAnimTimer);
    santaActive = false;
    santaSprite.style.display = 'none';
}

function spawnSanta() {
    santaActive = true;
    santaSprite.style.display = 'block';
    
    const dir = Math.random() > 0.5 ? 1 : -1;
    
    // Skala (Djup)
    const scale = 0.4 + Math.random() * 0.6;
    const baseW = 80;
    const baseH = 40;
    santaSprite.setAttribute('width', baseW * scale);
    santaSprite.setAttribute('height', baseH * scale);
    
    // Höjdposition (Säkert område Y=110 till 155)
    const startY = 110 + Math.random() * 45; 
    
    const startX = dir === 1 ? -100 : 300;
    const endX = dir === 1 ? 300 : -100;
    
    let currentX = startX;
    let frame = 0;
    const frames = ['santa_frame_1.png', 'santa_frame_2.png', 'santa_frame_3.png', 'santa_frame_2.png'];
    let frameIndex = 0;
    let speed = (0.5 + Math.random() * 0.5) * dir; 
    
    function animate() {
        if(!isPowered || knobState !== 5) {
            stopSanta();
            return;
        }

        currentX += speed;
        const wave = Math.sin(currentX / 20) * 10;
        
        // SVG transform med spegelvändning
        const flip = dir === -1 ? 'scale(-1, 1)' : '';
        // Notera: SVG transform-origin är default 0,0 vilket kan göra flippen konstig.
        // Enklast är att använda CSS transform här för img-taggen inuti SVG.
        santaSprite.style.transform = `translate(${currentX}px, ${startY + wave}px) ${dir === -1 ? 'scaleX(-1)' : ''}`; 
        
        if(frame % 10 === 0) {
            frameIndex = (frameIndex + 1) % frames.length;
            santaSprite.setAttribute('href', frames[frameIndex]);
        }
        frame++;

        if ((dir === 1 && currentX > endX) || (dir === -1 && currentX < endX)) {
            santaActive = false;
            santaSprite.style.display = 'none';
            cancelAnimationFrame(santaAnimTimer);
        } else {
            santaAnimTimer = requestAnimationFrame(animate);
        }
    }
    
    animate();
}

function renderSnow(lvl) {
    const counts = [0, 16, 40, 40, 40, 80];
    
    if(lvl === 5) startSantaCycle();
    else stopSanta();

    let svg = "";
    if(lvl > 0 && counts[lvl] > 0){
        const startY = 96.4; 
        const endY = 205; 
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
    if(!isPowered) return;
    resetIfRhymeDisplayed();
    sfxDigit();
    
    // Påskäggs-logik
    inputBuffer += key.toString();
    if (inputBuffer.endsWith("463585")) {
        triggerEasterEgg();
        inputBuffer = ""; // Reset
        return; 
    }
    if (inputBuffer.length > 10) inputBuffer = inputBuffer.slice(-10); // Håll buffern kort

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
    if (type === 'ADD') {
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
        sfxDelete();
        historyStack = [];
        currentSelection = null;
        activeKey = null;
        isRhymeDisplayed = false;
        updateHistory();
        updateScreen("RENSAT");
        setTimeout(()=>updateScreen("VÄLJ GÅVA..."), 1000);
    }
    else if (type === 'BACK') {
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
        historyStack = [
            {key:1, name: itemDB[1].names[0]},
            {key:3, name: itemDB[3].names[0]}
        ];
        updateHistory();
        generateRhyme();
    }
}

function generateRhyme() {
    if(!isPowered) return;
    sfxSuccess();
    if (currentSelection) {
        historyStack.push(currentSelection);
        currentSelection = null;
    }
    if (historyStack.length === 0) {
        updateScreen("INGEN GÅVA?");
        return;
    }
    updateHistory(); 
    
    let finalPoem = "";
    const intros = ["God Jul önskar vi med detta paket,\nvad som är i är en hemlighet.", "Snön ligger vit på taken,\nhär kommer klappen för smaken."];
    finalPoem += intros[Math.floor(Math.random() * intros.length)] + "\n\n";
    historyStack.forEach(item => {
        const dbEntry = itemDB[item.key];
        const randomCouplet = dbEntry.couplets[Math.floor(Math.random() * dbEntry.couplets.length)];
        finalPoem += randomCouplet + "\n";
    });
    finalPoem += "\nGod Jul & Gott Nytt År\nönskar Tengboms";
    
    isRhymeDisplayed = true;
    activeKey = null;
    updateScreen(finalPoem);
}

function connectNorthPole() {
    if(!isPowered) return;
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
    if(!isPowered) return;
    resetIfRhymeDisplayed();
    sfxRound();
    updateScreen("=== GUIDE ===\n\n1. VÄLJ GÅVA\nAnvänd 0-9. Tryck flera gånger för att bläddra.\n\n2. LÄGG TILL\nTryck på + för att kombinera flera gåvor.\n\n3. RIMMA\nTryck ENTER när du är klar.\n\n4. JULSTÄMNING\nVrid på spaken för snö & musik.");
}

window.addEventListener('load', () => {
    togglePower(); 
    masterSoundEnabled = false; 
    updateMuteLight();
});

// --- TANGENTBORDSSTÖD ---
window.addEventListener('keydown', (e) => {
    // Om avstängd, tillåt bara 'p' för att starta
    if (!isPowered && e.key.toLowerCase() !== 'p') return;

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