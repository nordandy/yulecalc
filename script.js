/**
 * CHRISTMAS RHYME CALCULATOR (v3.0)
 * ---------------------------------------------------
 * Copyright (c) 2025 Tengbom Arkitekter AB
 * Developed by: Andreas Nordström aka HandyMan
 * 
 * 1. CODE LICENSE (MIT):
 * The underlying JavaScript engine, game mechanics, and logic are 
 * released under the MIT License. You are free to use, copy, and modify 
 * the code for any purpose.
 * 
 * 2. ASSETS LICENSE (CC BY 4.0):
 * The graphical user interface (calculator shell), game sprites, and 
 * general visual design are licensed under Creative Commons Attribution 4.0.
 * You are free to reuse and adapt these assets (e.g. recolor).
 * 
 * 3. TRADEMARK EXCLUSION:
 * The "Tengbom" logo, company name, and specific brand-related texts 
 * remain the exclusive property of Tengbom Arkitekter AB and are NOT 
 * included in the open licenses above.
 * ---------------------------------------------------
 */

// --- CONFIG & DATA ---

// Intros (Randomly selected)
const INTROS = [
    "Merry Christmas we wish you with this gift,\nwe hope it gives your spirits a lift.",
    "Snow is falling on the roof so white,\nhere is a gift to make your Christmas bright.",
    "Santa has visited and left a treat,\nsomething we hope you'll think is sweet.",
    "Outside the window snowflakes dance,\nopen this gift, take a chance.",
    "We have pondered and we have thought,\nuntil this rhyme for you we caught.",
    "A package filled with warmth and cheer,\nto celebrate the end of the year.",
    "Christmas is here in every corner,\nthis gift makes the winter a little warmer.",
    "The time is now, the tree is lit,\nhere is a gift intended to fit.",
    "Silent night, holy night,\nthis package brings a pure delight.",
    "Here comes a gift with a wish for peace,\nmay your holiday joy never cease.",
    "Open the package and take a look,\nwe didn't buy this by the book.",
    "From all of us to you today,\na special thing coming your way.",
    "Christmas is here with light and song,\nopen it now, don't wait too long.",
    "Hard or soft, big or small?\nSoon you will uncover it all.",
    "Rhyming is hard but giving is fun,\nthat's why you're the lucky one.",
    "Santa whispers in the winter night,\nmaybe this gift is shining bright.",
    "The tree is glimmering, candles aglow,\nwhat is inside? You soon shall know.",
    "A little box with paper and string,\nhope you enjoy the joy we bring.",
    "Something you wished for, or a surprise?\nWe hope it lights up your eyes.",
    "Waiting for Santa and holiday food,\nwe hope this puts you in a good mood.",
    "Stars are twinkling in the sky so clear,\nhere is the best gift intended for here.",
    "Lean back and enjoy a moment of rest,\nthis gift comes from the very best.",
    "No one knows what the paper hides,\nuntil you look at what's insides.",
    "Christmas spirit in house and hall,\nhere is something for you to call.",
    "Now it is time to present this prize,\nto someone special in our eyes."
];

// Outro (Always the same)
const ENDING = "Merry Christmas & Happy New Year!";

// Loading phrases (Rhymes/Tech jargon)
const LOADING_PHRASES = [
    "SEARCHING RHYMES...", "BRAINSTORMING...", "CONSULTING SANTA...",
    "CALIBRATING SPIRIT...", "LEXICAL ANALYSIS...",
    "SCANNING DICTIONARY...", "LOADING EGGNOG...", "COUNTING SYLLABLES...",
    "COOKING UP WORDS...", "CHECKING NAUGHTY LIST...",
    "RHYME ENGINE 1.0...", "FETCHING_JOY.EXE...",
    "CONCRETIZING...", "POETIC CALIBRATION...", "RHYMING WITH SNOW...",
    "LOCATING NOUNS...", "MAXIMIZING COZY...", "ENHANCING MOOD...",
    "SCANNING NORTH POLE...", "LOADING ALGORITHM..."
];

// WIFI phrases (Fixed sequence)
const WIFI_SEQUENCE = [
    "SEARCHING NORTH POLE...", 
    "ENCRYPTING WISH LIST...", 
    "LOADING SLEIGH..."
];

// Database with products and rhymes per category
const itemDB = {
    // 1: Feet & Soft packages
    1: { 
        names: ["SOCKS", "SLIPPERS", "SHOES", "SANDALS", "BOOTS"], 
        couplets: [
            "When floors are cold and drafts are near,\nthis is the best thing to wear this year.",
            "For toes that freeze and turn quite blue,\nhere is something warm for you.",
            "Walk through life with comfort my friend,\non these soles you can depend.",
            "No more cold feet in our house,\nquiet steps, just like a mouse.",
            "These shall sit upon your feet,\nto make your outfit look complete.",
            "Soft packages are the best to get,\nespecially for your feet, you bet.",
            "Jump and dance around the tree,\nin the comfiest footwear there can be.",
            "Freezing toes are never fun,\nso put these on and go for a run.",
            "Step softly and walk with style,\nthese will last you for a while.",
            "A classic gift in Santa's sack,\nto keep the winter chill firmly back.",
            "For everyday use or party time,\nthese on your feet are simply prime.",
            "Put your foot down and feel secure,\nthese are good for posture, for sure.",
            "When winter bites your little toes,\nwarm them up in one of those.",
            "Walk on clouds or walk on ground,\nthe best footwear that can be found.",
            "Put them on and feel the heat,\na warming hug for your two feet.",
            "Knitted and warm in wool or yarn,\nkeeps you cozy in house or barn.",
            "Out for a walk in woods and land,\nthese will help you firmly stand.",
            "No more slipping and sliding around,\nfeet stay firmly on the ground.",
            "An ergonomic choice for your ease,\npackaged with love, aiming to please.",
            "When shoes come off in the hall,\nthese protect you from the cold floor and all.",
            "Elegant below is a detail key,\nthese deserve a trophy, you see.",
            "They warm, they protect, they fit so tight,\nexactly what makes your feet feel right.",
            "From heel to toe a warming embrace,\nputting a smile upon your face.",
            "A basic item, but oh so vital,\nworthy of a noble title.",
            "Throw away the old with holes in the toe,\nhere are new ones, ready to go."
        ] 
    },
    // 2: Underwear & Sleepwear
    2: { 
        names: ["BOXERS", "PANTIES", "PAJAMAS", "NIGHTCAP", "THERMALS"], 
        couplets: [
            "Closest to the body should be soft,\nsomething to wear in the loft.",
            "When you sleep and dream so sweet,\nthis makes your bedtime feel complete.",
            "Something for night or the day underneath,\nsoft as a whisper, light as a breath.",
            "Something that sits incredibly near,\nto you my darling, mostly dear.",
            "A soft start to every day,\nin a very comfortable way.",
            "For sweet dreams and a quiet night,\nsoft and cozy, fits just right.",
            "This is a private little thing,\njoy and comfort it will bring.",
            "When the Sandman throws his sand,\nthis feels lovely in dreamland.",
            "Comfort is the word of the day,\nsoft against skin in every way.",
            "Wrap yourself in softness and peace,\nmay your relaxation never cease.",
            "Nothing that itches, nothing that binds,\nthe softest fabric that one finds.",
            "For lazy days and mornings late,\nthis garment is simply great.",
            "Next to the skin the feeling is key,\nthis gift is quality, you will see.",
            "Sleep so well in this attire,\nby the radiator or the fire.",
            "A textile so light, a textile so small,\nwe hope the size fits you after all.",
            "First thing on, last thing off,\nsoft material, nothing rough.",
            "In bed, on the couch, or under your dress,\nthis removes all daily stress.",
            "For those who like to lounge around,\nthe perfect gift that we have found.",
            "Cotton or silk, lace or not,\na personal gift that you have got.",
            "When the moon shines and stars are bright,\nnothing shall disturb your sleep tonight.",
            "Dressed for success where no one can see,\nit makes you smile secretly.",
            "A hug from fabric that breathes and warms,\nkeeping you safe from winter storms.",
            "Replace the old, the worn and gray,\nwith this new one for Christmas day.",
            "The comfiest garment in the house,\nquiet and soft as a little mouse.",
            "Soft packages are the Christmas song,\nwith this on you can't go wrong."
        ] 
    },
    // 3: Winter Clothes
    3: { 
        names: ["SWEATER", "BEANIE", "SCARF", "MITTENS", "BASE LAYER"], 
        couplets: [
            "Dress for the weather, so they say,\nbut look good doing it every day.",
            "When frost nips at your nose and cheek,\nthis will keep you warm all week.",
            "A warming hug in textile form,\nto keep you safe within the storm.",
            "For walks in snow and ice so cold,\nthis keeps you warm, truth be told.",
            "Now you never have to freeze,\nwalk outside with total ease.",
            "Soft and warm against the chill,\nkeeps you cozy, standing still.",
            "Winter cold stands no chance,\nagainst this soft elegance.",
            "Bundle up and head outside,\nnowhere for the cold to hide.",
            "Style and warmth combined in one,\nmakes the winter much more fun.",
            "Keep the heat when storms blow by,\na gift on which you can rely.",
            "Knitted comfort for body and head,\nbetter than staying in your bed.",
            "When northern winds howl round the door,\nyou'll be warm forevermore.",
            "Match with jacket, match with shoe,\nwarmth and peace it brings to you.",
            "No one wants to shiver and shake,\nwarmth all the way for goodness sake.",
            "Wear it with pride in winter time,\nit fits perfectly with this rhyme.",
            "Around your neck or on your top,\nthe freezing cold will surely stop.",
            "For snowball fights and sledding hills,\nprotects against the winter chills.",
            "Warm as a fire, soft as a cat,\nperfect for winter, imagine that.",
            "Fashion and function in a single piece,\nmay your shivering finally cease.",
            "When the thermometer shows blue,\nthis is the best gift for you.",
            "Layer on layer is good advice,\nthis gift makes the weather nice.",
            "Protect yourself from weather's power,\nin every cold and snowy hour.",
            "A softie that warms, we promise you this,\na thoughtful gift you wouldn't want to miss.",
            "Stylish cut and fabric fine,\nan excellent choice for wintertime.",
            "Now you can meet winter's embrace,\nwithout the cold upon your face."
        ] 
    },
    // 4: Hygiene & Scent
    4: { 
        names: ["PERFUME", "SOAP", "LOTION", "SHAMPOO", "SCRUB"], 
        couplets: [
            "A little luxury in daily stress,\na scent full of finesse.",
            "For a moment in the bathroom space,\nto relax and slow down the pace.",
            "Smell so good and feel so fresh,\ncleaning up the daily mesh.",
            "A scent of class and purity,\na little secret just for thee.",
            "Spoil yourself a little while,\nwith scents that make you smile.",
            "For body and soul and feeling well,\nready for a new day to tell.",
            "Clean and fine you want to be,\nthis fixes that effectively.",
            "Gold-plate your morning hour,\nwith a scent of fresh flower.",
            "Spa feeling right at home for you,\na lovely thing for you to do.",
            "Something that perks you up a lot,\nthat is exactly what you got.",
            "Bubbles and scent in a holy mix,\ngives your mood a rapid fix.",
            "Grease and wash and smell so great,\nluxury at a rapid rate.",
            "A bottle of magic for your skin,\nmakes you feel brand new within.",
            "Take care of yourself, you deserve it so,\non your daily way to go.",
            "Fresh as a rose or cool as breeze,\napply it anywhere you please.",
            "A fragrance lingering in the air,\nthe finest gift beyond compare.",
            "Relaxation when the week is done,\nbreathe in, breathe out, have some fun.",
            "Scrub away the old year's dust,\na shiny new you is a must.",
            "Softening, soothing, lovely and fat,\na jar of vitality, imagine that.",
            "Spray a mist and feel so fine,\nbetter than medicine or wine.",
            "Here is something for shower and bath,\nto guide you on a cleaner path.",
            "Aromas that calm and give you peace,\nmaking the holiday stress cease.",
            "Smooth as velvet skin will be,\nwith this cream of magic glee.",
            "A scent symphony for your mind,\nleaving the winter gray behind.",
            "Clean it shall be, from top to toe,\nthis is the gift to make you glow."
        ] 
    },
    // 5: Decor
    5: { 
        names: ["CANDLE", "VASE", "DECOR", "PLANT", "ART"], 
        couplets: [
            "Something beautiful for the eye,\nto make your home reach for the sky.",
            "To create a mood of peace and light,\nin this dark and winter night.",
            "A detail lifting up your room,\nchasing away the winter gloom.",
            "Home is best, so people say,\nand even nicer starting today.",
            "Let the home shine and be grand,\nwith this beauty in your hand.",
            "Something to stand, hang or ignite,\nto make the cozy feeling right.",
            "A joy for the eye in your nook,\nwe hope you like the way it looks.",
            "To make your home feel complete,\nwe chose this, neat and sweet.",
            "Design and form in union sweet,\ngives home comfort a new beat.",
            "Create an atmosphere of rest,\nwhere you like to live the best.",
            "Put it in the window or on the table,\na decor piece solid and stable.",
            "Light up the dark with a flame so clear,\na mood that is clean and dear.",
            "Soft for the couch or nice for the shelf,\na little treat for your home and yourself.",
            "A form that appeals to eye and mind,\nthe finest decor one can find.",
            "Make it homey, warm and snug,\nlike a visual little hug.",
            "A splash of color or stylish white,\nmaking your home shine so bright.",
            "Something to fill with flowers and green,\nthe nicest thing you've ever seen.",
            "Artistically made with thought and hand,\nperhaps from a distant land?",
            "Renew, change and spruce it up,\ndecor joy in a full cup.",
            "Soft to lean your head against,\nor beautiful by the bed, commenced.",
            "Living candles burn in the night,\nmaking everything feel alright.",
            "An ornament sparking questions anew,\nor glowing like little flames so true.",
            "Give your home a personal touch,\nwithout costing way too much.",
            "Style and taste in a package neat,\nwhat it is? A secret sweet!",
            "Let your home shine and be bright,\nwith this lovely decor light."
        ] 
    },
    // 6: Kitchen & Cooking
    6: { 
        names: ["MUG", "BOWL", "GADGET", "PLATES", "CUTLERY"], 
        couplets: [
            "To the kitchen where magic occurs,\nhere is gear that purrs and stirs.",
            "For moments at the table and stove,\na treasure from the kitchen trove.",
            "When food is cooked or eaten with glee,\nthis gift will be key, you see.",
            "A helping hand in culinary quests,\nor for fika with your guests.",
            "For tasty flavors and pleasant times,\ncelebrated with these rhymes.",
            "Something practical for your cuisine,\nto keep your cooking area clean.",
            "Set the table and invite a guest,\nyou will surely be the best.",
            "For food and drink and moments good,\na marvel made of steel or wood.",
            "Make everyday life more elegant,\nwith this kitchen element.",
            "Serve, cook or simply drink,\nwith style and flair, don't you think?",
            "Bake a cake or fry a steak,\nuse this tool for goodness sake.",
            "For the coffee sip or tea time break,\na gift given for your sake.",
            "Sharp it should be, or maybe round,\neating well makes you sound.",
            "Mix and stir and whisk and shake,\nsoon we'll taste the things you make.",
            "Nice on the table when friends drop by,\nfor porridge or for pizza pie.",
            "A gadget easing your daily toil,\nso your temper doesn't boil.",
            "Pour the drink into your cup,\nand feel the warmth filling up.",
            "Food art needs the proper tool,\nhere is something really cool.",
            "Chop, slice, dice and shred,\nuntil everyone is fed.",
            "A bowl for candy or for soup,\nthe favorite of the group.",
            "The kitchen hero in shiny steel,\nmakes every meal a better deal.",
            "Make breakfast a feast to see,\nwith this gadget full of glee.",
            "For the master chef in the home,\nno need to let your cooking roam.",
            "Serve with love and serve with style,\nthis will bring a happy smile.",
            "Order among pots and plates,\nnow cooking fun surely awaits."
        ] 
    },
    // 7: Reading & Relaxation
    7: { 
        names: ["BOOK", "PAPER", "NOVEL", "MAGAZINE", "POETRY"], 
        couplets: [
            "Here is a chance to dream away,\nto another world, another day.",
            "Now you can relax and just be,\nletting thoughts run wild and free.",
            "Sink into the chair and enjoy,\nthis literary little toy.",
            "Words on paper, thoughts and dreams,\nflowing in unending streams.",
            "Knowledge, thrills or romance sweet,\na whole world at your feet.",
            "Turn off the screen and open your view,\nto a world entirely new.",
            "A journey without moving a feet,\nthe very best kind of retreat.",
            "Let your fantasy take wing,\nhear the stories softly sing.",
            "Browse, read and be fascinated,\nlet your mind be stimulated.",
            "Silence, calm and a story good,\nunderstood as best one could.",
            "Suspense that makes you shiver and shake,\nperfect for a cozy break.",
            "Facts and knowledge, wisdom and wit,\nall gathered in a single kit.",
            "An adventure between pages soft,\nlifting your spirits up aloft.",
            "Forget the daily grind a while,\nand enjoy a literary smile.",
            "Page up and page down to read,\nmore is what you'll surely need.",
            "A magazine for what you like best,\nputting your boredom to the test.",
            "Read about the world outside,\nthings you didn't know, far and wide.",
            "Mystery, drama or poetry,\nhere is a world for you to see.",
            "A moment of silence, a cup of tea,\nthe best thing you can get from me.",
            "Follow the twists, turn the page,\nwisdom for every single age.",
            "Words that rhyme or explain a lot,\na lasting gift that you have got.",
            "For the bookworm wanting to know it all,\nanswering every curious call.",
            "Travel to places you've never seen,\nin a way that is serene.",
            "Laughter and tears and thoughts so deep,\na book to read before you sleep.",
            "Your own time in a hectic world,\na story waiting to be unfurled."
        ] 
    },
    // 8: Technology
    8: { 
        names: ["HEADPHONES", "GADGET", "CHARGER", "PHONE", "CONSOLE"], 
        couplets: [
            "Wonder of tech in your hand,\nconnecting you to distant land.",
            "A thing that blinks, sounds or recalls,\nthe best thing within these walls.",
            "For the modern human of today,\nthis is the only proper way.",
            "Power and data in speedy flight,\nthis is something really bright.",
            "For fun, utility or game,\nwith this life won't be the same.",
            "Here is something digital,\nworking quite phenomenal.",
            "Buttons, screen or cable wire,\nsetting your tech heart on fire.",
            "Connected, online, always there,\nthe latest tech beyond compare.",
            "A gadget making life a breeze,\nor just giving you some ease.",
            "The future is here in a box,\nfilled with quality that rocks.",
            "Charge it up and turn it on,\nnow boredom is completely gone.",
            "Sound in ear or image on screen,\nshielding you from the worldly din.",
            "Press start and see what will unfold,\nmaybe contacts with worlds untold?",
            "A device that fixes everything,\nmaking you want to dance and sing.",
            "Wireless or not, doesn't matter a bit,\nwith this gadget you're a hit.",
            "Battery full and signal clear,\nthe best gadget of the year.",
            "For gaming, work or just for fun,\na tech gift second to none.",
            "Stream, surf, scroll and click,\na truly nifty little trick.",
            "Small chip but function great,\na true innovation on your plate.",
            "Keep track of time, pulse and stride,\non your daily techy ride.",
            "Music in quality divine,\nis what you get in this design.",
            "Connect and sync and link it all,\nthis is really cool and ball.",
            "Smarter than you maybe think,\nis the tech that makes us link.",
            "For those who like buttons and light,\nthis makes Christmas Eve feel bright.",
            "High-tech gift for a high-tech friend,\nuse it for hours on end."
        ] 
    },
    // 9: Luck, Fun & Games
    9: { 
        names: ["LOTTERY", "CINEMA", "TICKET", "GIFTCARD", "EVENT"], 
        couplets: [
            "Suddenly it happens, who knows when?\nMaybe the win lies in this pen.",
            "An experience out of the norm,\nto keep your memories warm.",
            "Excitement, luck or a laugh or two,\nhope a pleasant night awaits you.",
            "Not a thing collecting dust,\nbut a memory you can trust.",
            "Something to do, see and recall,\nthe best gift of them all.",
            "A ticket to something grand,\nwhen you hold this in your hand.",
            "Lucky in games or lucky in love,\nlife fits you like a glove.",
            "Experience something new and fun,\na truly exciting run.",
            "Anticipation is half the fun,\nhope you become the lucky one.",
            "A gamble or a safe bet,\nmakes time fly, don't forget.",
            "Cinema, theater or a show,\na gift with the perfect flow.",
            "Choose yourself what you desire,\nthat will set your heart on fire.",
            "Do what you want for this sum,\nit will surely be awesome.",
            "A memory for life, we hope,\nexpanding your daily scope.",
            "Freedom to choose, freedom to do,\nthis is a gift strictly for you.",
            "Maybe a trip, dinner or movie night,\nchoose your trio, make it right.",
            "Excitement rises when you see,\nwhat this experience can be.",
            "A night on the town or bank account win,\nthat was the thought within.",
            "Skip choosing color and skip the size,\nfreedom of choice is the prize.",
            "Luck comes and luck goes away,\nmaybe it stays with you today.",
            "Book a date and go away,\nexperience something new today.",
            "A piece of paper with value on,\nwonder where you will have gone.",
            "For the moment coming and memories staying,\nthe best gift that we are conveying.",
            "Take a chance, win or lose,\nhope luck is what you choose.",
            "Dreams can be bought for money sometimes,\nhold tight to this with rhymes."
        ] 
    },
    // 0: Candy & Edible
    0: { 
        names: ["CHOCOLATE", "CANDY", "PRALINES", "DELI", "DRINK"], 
        couplets: [
            "Something sweet with your coffee cup,\nwarms you when you drink it up.",
            "Life should be enjoyed to the max,\nhere is something for your snacks.",
            "A taste experience for your tongue,\nnow hunger will not be prolongued.",
            "This is tasty and makes you glad,\nthe best treat you ever had.",
            "Sugar, spice and everything nice,\nthat is the condensed advice.",
            "Enjoy every little bite,\nit makes the Christmas feel just right.",
            "When cravings start to rumble,\nlet this in your mouth crumble.",
            "A delight for your taste buds dear,\nsweet, salty and crystal clear.",
            "Pleasure lasts a little while,\ngiving you a happy smile.",
            "Treat yourself to something yummy,\nwrapped beautifully for your tummy.",
            "Melts in the mouth, smooth and sweet,\nbetter than Santa's porridge treat.",
            "A basket of luxury and tasty stuff,\nyou can never get enough.",
            "Salty or sour, bitter or sweet,\nhere is a unique little treat.",
            "Share with friends or eat alone,\npleasure in the flavor zone.",
            "For Friday coziness or Saturday feast,\nthis tastes better than the least.",
            "A flavor journey round the earth,\ngiving Christmas extra worth.",
            "Chocolate is love in solid form,\nmaking happiness the norm.",
            "Crunchy, chewy or soft inside,\nhope you enjoy the flavor ride.",
            "Drink that warms a frozen frame,\ndrink it all, enjoy the game.",
            "Delicacies of highest class,\nenjoy them now, don't let them pass.",
            "Temptations hard to resist,\njust taste it, don't desist.",
            "Calories don't count in December,\nsomething you must remember.",
            "A present vanishing in haste,\nhold the box around the waist.",
            "Old school candy or flavors new,\nhere are tasty things for you.",
            "Eat, enjoy and be quite glad,\ntake a chocolate, don't be sad."
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
let waitingForGameStart = false; // Används ej längre för rim, nu för spelet
let isGenerating = false; 
let waitingForGameLaunch = false; // Väntar på ENTER för att starta spelet

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
let bgX = 0; 

// --- DOM ELEMENTS ---
const resultContent = document.getElementById("result-content"); 
const resultArea = document.getElementById("result-area");
const historyLine = document.getElementById("history-line");
const leverKnob = document.getElementById("lever-knob");
const snowLayer = document.getElementById("snow-layer");
const pipeLayer = document.getElementById("pipe-layer"); 
const wrapper = document.getElementById("calculator");
const marqueeWrapper = document.getElementById("marquee");
const topDisplay = document.getElementById("top-display-container");
const muteLight = document.getElementById("mute-light");
const santaGroup = document.getElementById("santa-group");
const santaSprite = document.getElementById("santa-sprite");
const santaBannerGroup = document.getElementById("santa-banner-group");
const gameOverlay = document.getElementById("game-overlay");
const gameOverlayContent = document.getElementById("game-overlay-content");
const bg1 = document.getElementById("bg-1");
const bg2 = document.getElementById("bg-2");


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
function sfxGameOver() {
    if (!masterSoundEnabled) return;
    let now = audioCtx.currentTime;
    let notes = [659, 523, 392, 261];
    notes.forEach((f, i) => {
        let osc = audioCtx.createOscillator();
        let gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.value = f;
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.08);
        gain.gain.setValueAtTime(0.1, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.06);
        osc.stop(now + i * 0.08 + 0.06);
    });
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
        
        // Uppdatera bara texten om vi INTE spelar spel
        if (!isGaming) {
            updateScreen(masterSoundEnabled ? "SOUND: ON" : "SOUND: OFF");
            setTimeout(() => { 
                if(!isRhymeDisplayed && !resultContent.classList.contains('easter-egg') && !isGaming && !isGenerating && !waitingForGameLaunch) 
                    updateScreen(currentSelection ? currentSelection.name : ""); 
            }, 1000);
        }
        
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
        
        updateScreen("SYSTEM CHECK...");
        bootTimers.push(setTimeout(() => updateScreen("SYSTEM CHECK...<br>LOADING RHYME MODULE..."), 1000));
        bootTimers.push(setTimeout(() => updateScreen("SYSTEM CHECK...<br>LOADING RHYME MODULE...<br>FEEDING REINDEER..."), 2500));
        bootTimers.push(setTimeout(() => {
            if(isPowered){
                updateScreen("SELECT GIFT...");
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
        waitingForGameLaunch = false;
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
        const text = "MERRY XMAS!";
        for(let i=0; i<text.length; i++) {
            let t = document.createElementNS("http://www.w3.org/2000/svg", "text");
            t.textContent = text[i];
            t.setAttribute("class", "banner-char");
            
            let xPos;
            if (dir === 1) {
                xPos = -10 - (text.length - i) * 12; 
            } else {
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
    if(isGaming && lvl === 0) {
        return; 
    }

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
    if (isRhymeDisplayed || resultContent.classList.contains('easter-egg') || waitingForGameLaunch) {
        historyStack = [];
        currentSelection = null;
        isRhymeDisplayed = false;
        waitingForGameLaunch = false; 
        updateHistory();
        updateScreen("");
    }
}

function input(key) {
    if(!isPowered || isGenerating) return; 

    if (isGaming && gameState === 'GAMEOVER_MENU') {
        return; 
    }
    
    if(isGaming) return;

    resetIfRhymeDisplayed();
    sfxDigit();
    
    waitingForGameStart = false;
    
    inputBuffer += key.toString();
    
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
        if (type === 'CLEAR' || type === 'BACK') {
            // "Panic button" - avsluta spelet direkt
            exitGame();
            updateScreen("SELECT GIFT...");
            historyLine.textContent = "";
            historyLine.classList.remove('visible');
            historyLine.classList.remove('hidden-border');
            return;
        }

        if(gameState === 'GAMEOVER_MENU') {
            return;
        }

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
            updateScreen("SELECT FIRST");
            setTimeout(() => updateScreen(old === "SELECT FIRST" ? "" : old), 800);
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
        waitingForGameLaunch = false;
        updateHistory();
        updateScreen("CLEARED");
        setTimeout(()=>updateScreen("SELECT GIFT..."), 1000);
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
        historyStack = [];
        const count = Math.floor(Math.random() * 4) + 2; 
        
        for(let i = 0; i < count; i++) {
            const randomKey = Math.floor(Math.random() * 10);
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
    if(!isPowered || isGenerating) return;

    if(waitingForGameLaunch) {
        initFlappyTitle();
        waitingForGameLaunch = false;
        inputBuffer = "";
        return;
    }

    if (isGaming && gameState === 'GAMEOVER_MENU') {
        initFlappyLevel();
        return;
    }

    if(isGaming) return;
    
    if (currentSelection) {
        historyStack.push(currentSelection);
        currentSelection = null;
    }
    if (historyStack.length === 0) {
        updateScreen("NO GIFT?");
        return;
    }
    updateHistory(); 
    
    isGenerating = true;
    let step = 0;
    const maxSteps = 3; 

    function nextLoadingStep() {
        if(step < maxSteps) {
            const phrase = LOADING_PHRASES[Math.floor(Math.random() * LOADING_PHRASES.length)];
            updateScreen(phrase);
            sfxDigit(); 
            step++;
            setTimeout(nextLoadingStep, 1500); 
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
    finalPoem += INTROS[Math.floor(Math.random() * INTROS.length)] + "\n\n";
    let usedIndices = {}; 

    historyStack.forEach(item => {
        if (!usedIndices[item.key]) usedIndices[item.key] = new Set();
        const dbEntry = itemDB[item.key];
        let availableIndices = dbEntry.couplets.map((_, i) => i)
                               .filter(i => !usedIndices[item.key].has(i));

        if (availableIndices.length === 0) {
             availableIndices = dbEntry.couplets.map((_, i) => i);
             usedIndices[item.key].clear();
        }

        const randIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        usedIndices[item.key].add(randIndex);
        finalPoem += dbEntry.couplets[randIndex] + "\n\n";
    });
    
    finalPoem += ENDING;
    isRhymeDisplayed = true;
    activeKey = null;
    updateScreen(finalPoem);
}

function connectNorthPole() {
    if(!isPowered || isGaming || isGenerating) return;
    resetIfRhymeDisplayed();

// Om vi redan har kontakt, hoppa direkt till slutet
    if (isConnected) {
        sfxSuccess();
        updateScreen("CONTACT ESTABLISHED!\nNORTH POLE ONLINE.\n\nDELIVER PACKAGES?\nPRESS [ENTER]");
        waitingForGameLaunch = true;
        return;
    }
    
    isGenerating = true; 
    sfxRound();
    updateScreen("SEARCHING NORTH POLE...");
    
    let step = 1;
    const maxSteps = 3; 

    function nextWifiStep() {
        if(step < maxSteps) {
            const phrase = WIFI_SEQUENCE[step]; 
            updateScreen(phrase);
            synth(1200, 'square', 0.05); 
            step++;
            setTimeout(nextWifiStep, 1000);
        } else {
            sfxSuccess();
            isConnected = true;
            updateScreen("CONTACT ESTABLISHED!\nNORTH POLE ONLINE.");
            setTimeout(() => {
                updateScreen("CONTACT ESTABLISHED!\nNORTH POLE ONLINE.\n\nDELIVER PACKAGES?\nPRESS [ENTER]");
                waitingForGameLaunch = true;
                isGenerating = false;
            }, 2000);
        }
    }
    
    setTimeout(nextWifiStep, 1000);
}

function showHelp() {
    if(!isPowered || isGaming) return;
    resetIfRhymeDisplayed();
    sfxRound();
    
    const helpText = "MERRY CHRISTMAS & HAPPY NEW YEAR\nWISHING YOU ALL THE BEST FROM TENGBOM!\n\n" +
                     "=== INFO ===\n\n" +
                     "The Christmas Rhyme Calculator is designed to save your holiday evening. " +
                     "Let technology do the work while you sit back and enjoy your eggnog.\n\n" +
                     "=== GUIDE ===\n\n" +
                     "SELECT GIFT (0-9)\n" +
                     "Press a symbol button to select a category. Press repeatedly to toggle specific items (e.g. press the sock symbol multiple times to switch between Socks, Slippers, Shoes etc.).\n\n" +
                     "ADD (+)\n" +
                     "Combine multiple gifts in one rhyme by pressing plus.\n\n" +
                     "RHYME (ENTER)\n" +
                     "When happy with your choices, press Enter to generate the rhyme.\n\n" +
                     "=== BUTTONS & LEVERS ===\n\n" +
                     "[WIFI]: Establish direct contact for special services.\n" +
                     "[SPEAKER]: Toggle sound on/off.\n" +
                     "[C] CLEAR: Clears memory and resets.\n" +
                     "[<-] UNDO: Removes the last selected gift.\n" +
                     "[!] RANDOM: Let the machine pick gifts for you.\n" +
                     "[LEVER]: Pull the lever to adjust Christmas spirit.\n\n" +
                     "=== TIPS ===\n\n" +
                     "Not happy with the rhyme? Just press ENTER again for a new attempt. The machine has many combinations in store.\n\n" +
                     "=== DISCLAIMER ===\n\n" +
                     "This machine runs on experimental holiday magic (v1.0). Tengbom AB is not responsible for rhyme quality, grammar glitches, or recipient disappointment.\n\n" +
                     "The system may contain traces of nuts and bugs. Technical errors should be reported directly to Santa via the nearest chimney.\n\n" +
                     "=== CREDITS & INSPIRATION ===\n\n" +
                     "Code Engine: MIT License (Open Source).\n" +
                     "Graphics: CC BY 4.0.\n" +
                     "The code is free to use and build upon. See source code for details.\n\n" +
                     "The design is a humble tribute to Teenage Engineering (TE) and their fantastic design language.\n" +
                     "(NOTE: This is an independent project with no official connection to TE).";
                     
    updateScreen(helpText);
}

// --- FLAPPY SANTA ENGINE ---

function initFlappyTitle() {
    isGaming = true;
    stopSanta(); 
    gameState = 'TITLE';
    gameOverlay.style.display = 'block'; 
    
    gameOverlayContent.innerHTML = `
        <text x="117" y="145" text-anchor="middle" fill="#ECB328" font-family="VT323" font-size="24">FLAPPY SANTA</text>
        <text x="117" y="165" text-anchor="middle" fill="#ECB328" font-family="VT323" font-size="14">PRESS [+] TO START</text>
    `;

    snowLayer.innerHTML = ""; 
    renderSnow(2); 
    pipeLayer.innerHTML = "";
    historyLine.classList.add('hidden-border'); 
    historyLine.textContent = "LOADING...";
    historyLine.classList.add('visible');
    updateScreen("");
    
    bg1.style.display = 'block';
    bg2.style.display = 'block';
    bgX = 0;
    updateBackgroundPos();
}

function initFlappyLevel() {
    gameState = 'READY';
    gameOverlay.style.display = 'none'; 
    
    santaY = 150;
    santaVel = 0;
    score = 0;
    pipes = [];
    gameFrame = 0;
    
    historyLine.classList.add('hidden-border');
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
    pipeLayer.innerHTML = "";
    
    // STARTA MUSIK
    if (masterSoundEnabled) {
        knobState = 4; // Tvinga till Bjällerklang
        currentSongName = 'bjaller';
        startSequencer();
    }
    
    renderSnow(2);

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

function updateBackgroundPos() {
    bg1.setAttribute('x', bgX);
    bg2.setAttribute('x', bgX + 235.3);
}

function drawPipes(svgContent) {
    let pipeW = 25;
    // GAP: 60px (30+30) - Enkelt
    let gapRadius = 30; 

    for(let i = 0; i < pipes.length; i++) {
        let p = pipes[i];
        
        let topHeight = Math.max(0, p.y - 96 - gapRadius);
        let bottomY = p.y + gapRadius;
        let bottomHeight = Math.max(0, 205 - bottomY);

        if(topHeight > 0) {
            svgContent += `<image href="assets/chimney_top.png" x="${p.x}" y="96" width="${pipeW}" height="${topHeight}" preserveAspectRatio="xMidYMax slice" />`;
        }

        if(bottomHeight > 0) {
            svgContent += `<image href="assets/chimney_bottom.png" x="${p.x}" y="${bottomY}" width="${pipeW}" height="${bottomHeight}" preserveAspectRatio="xMidYMin slice" />`;
        }
    }
    return svgContent;
}

// --- HIGH SCORE LOGIK ---
function getHighScores() {
    try {
        const stored = localStorage.getItem('tengbomFlappyScores');
        return stored ? JSON.parse(stored) : [];
    } catch(e) { return []; }
}

function saveHighScore(newScore) {
    let scores = getHighScores();
    scores.push(newScore);
    scores.sort((a,b) => b - a); 
    scores = scores.slice(0, 5); 
    try {
        localStorage.setItem('tengbomFlappyScores', JSON.stringify(scores));
    } catch(e) {}
    return scores;
}

function gameLoop() {
    if(!isGaming || gameState === 'GAMEOVER_MENU') return;

    gameFrame++;
    
    bgX -= (gameSpeed * 0.5);
    if (bgX <= -235.3) bgX = 0;
    updateBackgroundPos();

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
        // Skärmhöjd: 109px (96 till 205).
        // Gap = 60px. Pipes = 49px kvar.
        // Minst 10px synligt av varje rör -> Gap Center mellan 136 och 165.
        // Vi ökar marginalen lite för att garantera spelbarhet.
        let minPipe = 132;
        let maxPipe = 169;
        let gapPos = Math.floor(Math.random() * (maxPipe - minPipe + 1)) + minPipe;
        pipes.push({x: 240, y: gapPos, passed: false});
    }

    let rot = Math.min(Math.max(santaVel * 4, -25), 25);
    updateSantaPos(40, santaY, rot);

    let santaRect = {x: 40 + 5, y: santaY + 5, w: 40, h: 15}; 
    let gapRadius = 30; // Måste matcha drawPipes (60px gap totalt)

    for(let i = 0; i < pipes.length; i++) {
        let p = pipes[i];
        p.x -= gameSpeed;
        
        let pipeW = 25;
        
        if (santaRect.x + santaRect.w > p.x && santaRect.x < p.x + pipeW) {
            // Kolla kollision med övre eller nedre rör
            if (santaRect.y < p.y - gapRadius || santaRect.y + santaRect.h > p.y + gapRadius) {
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
    
    let svgContent = "";
    svgContent = drawPipes(svgContent);
    pipeLayer.innerHTML = svgContent;
    
    pipes = pipes.filter(p => p.x > -50);

    gameTimer = requestAnimationFrame(gameLoop);
}

function gameOver() {
    // 1. Stoppa musiken direkt
    stopSequencer();
    
    // 2. Spela Game Over-ljudet
    sfxGameOver();

    gameState = 'GAMEOVER_MENU';
    cancelAnimationFrame(gameTimer);
    
    const highScores = saveHighScore(score);

    let hsHtml = highScores.map((s, i) => 
        `<text x="117" y="${140 + (i*12)}" text-anchor="middle" fill="#ECB328" font-family="VT323" font-size="12">${i+1}. ${s} P</text>`
    ).join('');

    gameOverlay.style.display = 'block';
    gameOverlayContent.innerHTML = `
        <text x="117" y="115" text-anchor="middle" fill="#ECB328" font-family="VT323" font-size="20">GAME OVER</text>
        <text x="117" y="128" text-anchor="middle" fill="#ECB328" font-family="VT323" font-size="12">YOUR SCORE: ${score}</text>
        ${hsHtml}
        <text x="117" y="200" text-anchor="middle" fill="#ECB328" font-family="VT323" font-size="12">[ENTER] PLAY AGAIN  |  [C] EXIT</text>
    `;
    
    updateScreen(""); 
}

function exitGame() {
    isGaming = false;
    gameState = 'MENU';
    if(gameTimer) cancelAnimationFrame(gameTimer);
    
    santaSprite.style.display = 'none';
    santaGroup.style.display = 'none';
    gameOverlay.style.display = 'none';
    bg1.style.display = 'none';
    bg2.style.display = 'none';
    pipeLayer.innerHTML = "";
    santaBannerGroup.innerHTML = '';
    
    // Återställ snön baserat på reglaget
    renderSnow(knobState);
    stopSequencer(); // Stäng av musiken när spelet stängs
}

// --- EVENTS ---

window.addEventListener('load', () => {
    // Easter Egg: Credits i konsolen
    console.log("%c Christmas Rhyme Calculator built by Andreas Nordström aka HandyMan ", "background: #222; color: #ECB328; font-size: 12px; padding: 4px; border-radius: 4px;");
    
    togglePower(); 
    masterSoundEnabled = false; 
    updateMuteLight();
});

window.addEventListener('keydown', (e) => {
    if (!isPowered && e.key.toLowerCase() !== 'p') return;

    if (isGaming) {
        if (e.key.toLowerCase() === 'c' || e.key.toLowerCase() === 'p') {
             // C eller P (Power) dödar spelet omedelbart
             action('CLEAR');
             return;
        }

        if(gameState === 'GAMEOVER_MENU') {
            if (e.key === 'Enter') { 
                 initFlappyLevel();
            }
            return;
        }

        if (e.key === '+' || e.key === ' ') {
            if(gameState === 'TITLE') initFlappyLevel();
            else if(gameState === 'READY') startGameplay();
            else if(gameState === 'PLAYING') gameJump();
        }
        
        // Tillåt toggle sound in-game
        if (e.key.toLowerCase() === 's') toggleSound(); 

        return;
    }

    if (e.key >= '0' && e.key <= '9') input(parseInt(e.key));
    if (e.key === 'Backspace') action('BACK');
    
    if (e.key === 'Enter') {
        if (waitingForGameLaunch) {
            generateRhyme(); 
        } else {
            generateRhyme();
        }
    }
    
    if (e.key === '+') action('ADD');
    if (e.key.toLowerCase() === 'c') action('CLEAR');
    if (e.key.toLowerCase() === 'r') action('RANDOM');
    
    if (e.key.toLowerCase() === 's') toggleSound(); 
    if (e.key.toLowerCase() === 'w') connectNorthPole(); 
    if (e.key.toLowerCase() === 'h') showHelp(); 
    
    if (e.key.toLowerCase() === 'p') togglePower(); 
});