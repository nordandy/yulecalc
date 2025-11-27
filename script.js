/**
 * JULRIMSKALKYLATOR (v3.0)
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

// Inledningar (Slumpas fram, 1 av 25)
const INTROS = [
    "God Jul önskar vi med detta paket,\nvad som är i är en hemlighet.",
    "Snön ligger vit på taken,\nhär kommer klappen för smaken.",
    "Tomten har varit här och vänt,\nhär får du något vi hoppas känns känt.",
    "Utanför fönstret dansar en flinga,\nnu ska du få höra julklockor klinga.",
    "Vi har tänkt och vi har klurat,\ntills vi detta rim har lurat.",
    "En klapp fylld av värme och hopp,\nfrån botten och ända upp till topp.",
    "Nu är det jul i varje vrå,\nhär är en klapp du ska få.",
    "Det lackar mot jul, tiden är inne,\nhär får du något för ditt sinne.",
    "Midnatt råder, tyst det är i husen,\nmen detta paket tänder juleljusen.",
    "Här kommer en gåva med önskan om frid,\noch en riktigt härlig juletid.",
    "Öppna paketet och se vad du fått,\nvi hoppas att innehållet smakar gott.",
    "Från oss alla till dig,\nen alldeles särskild liten grej.",
    "Julen är här med ljus och med sång,\nöppna nu klappen, vänta inte en gång.",
    "Kanske hårt, kanske mjukt, vem vet?\nSnart får du veta din hemlighet.",
    "Rimma är svårt men ge bort är kul,\ndärför får du denna till jul.",
    "Tomten viskar i vinternatten,\nkanske får du den största skatten.",
    "Granen glimmar och ljusen är tända,\nnu ska vi se vad som här kan hända.",
    "En liten låda med papper och snöre,\nhoppas du gillar vad vi gör för 'e.",
    "Något du önskat, eller en chansning?\nHär kommer en riktig glädjesatsning.",
    "I väntan på tomten och julmatens fröjd,\nhoppas vi göra dig riktigt nöjd.",
    "Stjärnorna gnistrar på himlen så klar,\nhär är den bästa klappen vi har.",
    "Luta dig bakåt och njut en stund,\nav gåvan som kommer från hjärtats grund.",
    "Ingen vet vad papperet döljer,\nförrän du öppnar och ser vad som följer.",
    "Julstämning råder i stuga och slott,\nhär får du något vi hoppas känns flott.",
    "Nu är det dags att paketet förära,\ntill er som vi håller så oerhört kära."
];

// Avslutning (Alltid samma)
const ENDING = "God Jul & Gott Nytt År!";

// Fraser för laddningssekvensen (Rim)
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

// Fraser för WIFI-uppkoppling (Fast sekvens)
const WIFI_SEQUENCE = [
    "SÖKER NORDPOLEN...", 
    "KRYPTERAR ÖNSKELISTA...", 
    "LADDAR SLÄDEN..."
];

// Databas med produkter och 25 generella rim per kategori
const itemDB = {
    // 1: Fötter & Mjuka paket
    1: { 
        names: ["STRUMPOR", "SOCKOR", "TOFFLOR", "SKOR", "SANDALER"], 
        couplets: [
            "När golven är kalla och vinden drar,\när detta det skönaste som finns kvar.",
            "För tår som lätt blir frusna och blå,\nhär är något varmt att sätta på.",
            "Vandra tryggt genom livet min vän,\nmed dessa på fötterna känns det bra sen.",
            "Inga fler kalla fötter i vårt hus,\nbara värme och hemtrevligt bus.",
            "Dessa ska sitta på din fot,\nmot kylan är de ett väldigt bra bot.",
            "Mjuka paket är de bästa man kan få,\nsärskilt när de ska sitta på tå.",
            "Hoppa och dansa kring granen så grann,\ni de skönaste skodon vi fann.",
            "Att frysa om fötterna är inget kul,\ndärför får du dessa till jul.",
            "Trampa mjukt och gå med stil,\ndessa håller mil efter mil.",
            "En klassiker i julens säck,\nhåller kylan helt väck.",
            "Både till vardags och till fest,\nsitter dessa på foten bäst.",
            "Sätt ner foten och känn dig trygg,\ndessa är bra för både hållning och rygg.",
            "När vintern biter i tårna dina,\nvärmer du dem i dessa fina.",
            "Gå på moln eller gå på mark,\nmed dessa känner du dig stark.",
            "Sätt dem på fötterna och känn hur de mår,\nde skönaste paren du får i år.",
            "Stickat och varmt i ull eller garn,\npassar lika bra till vuxna som barn.",
            "Ut och gå i skog och mark,\ni dessa känner du dig stark.",
            "Nu slipper du halka och slira runt,\natt använda dessa är ganska sunt.",
            "Ett fotriktigt val för din bekvämlighet,\npaketerat med kärlek och hemlighet.",
            "När du tar av dig skorna i hallen,\nskyddar dessa mot en kall en.",
            "Elegant nertill är en viktig detalj,\ndessa förtjänar en egen medalj.",
            "De värmer, de skyddar, de sitter så bra,\nexakt vad dina fötter vill ha.",
            "Från hälen till tån en värmande kram,\ngör att du slipper känna dig stram.",
            "En basvara kanske, men ack så viktig,\ndenna julklapp är ändå riktig.",
            "Släng dina gamla med hål i tå,\nhär är nya som du ska få."
        ] 
    },
    // 2: Underkläder & Sovplagg
    2: { 
        names: ["KALSONGER", "TROSOR", "PYJAMAS", "NATTMÖSSA", "NÄSVÄRMARE"], 
        couplets: [
            "Det närmaste kroppen ska vara mjukt,\nallt annat vore ju tokigt och sjukt.",
            "När du ska sova och drömma sött,\npassar detta när du är trött.",
            "Något för natten eller dagen under,\npassar för alla dina stunder.",
            "Här får du något som sitter nära,\ntill dig min allra käraste kära.",
            "En mjuk start på varje dag,\nför ditt eget välbehag.",
            "För skön dröm och lugn natt,\nmjuka och sköna, nästan som en katt.",
            "Detta är en privat liten sak,\nsom sitter bra både fram och bak.",
            "När John Blund strör sitt grus,\när detta skönt i ditt hus.",
            "Komfort är ordet för dagen,\nhär får du något mjukt mot magen.",
            "Svep in dig i mjukhet och ro,\ndet är skönare än du kan tro.",
            "Inget som kliar och inget som stramar,\nkänns som tusen mjuka kramar.",
            "För lata dagar och sena morgnar,\nnär du inte vill ha något som förborgar.",
            "Närmast huden är känslan viktig,\ndenna gåva är faktiskt riktig.",
            "Sov så gott i detta plagg,\nutan bekymmer och utan agg.",
            "En liten textil, så mjuk och så lätt,\nvi hoppas storleken blev rätt.",
            "Det första du tar på, det sista du tar av,\nen gåva med mycket höga krav.",
            "I sängen, i soffan eller under din dress,\ntar denna bort all vardagsstress.",
            "För dig som gillar att mysa omkring,\när detta en väldigt passande ting.",
            "Bomull eller silke, spets eller ej,\nhär är en riktigt personlig grej.",
            "När månen lyser och stjärnorna tindra,\nska inget din skönhetssömn få hindra.",
            "Klädd för succé, fast ingen det ser,\ndet gör att du i hemlighet ler.",
            "En kram från tyg som andas och värmer,\nkänn hur julkänslan sig närmer.",
            "Byt ut det gamla, slitna och grå,\nmot detta nya du nu ska få.",
            "Skönaste plagget i hela huset,\ninnan du tänder morgonljuset.",
            "Mjuka paket är julens melodi,\ndetta är något du trivs bäst i."
        ] 
    },
    // 3: Vinterkläder
    3: { 
        names: ["TRÖJA", "MÖSSA", "HALSDUK", "VANTAR", "LÅNGKALSONGER"], 
        couplets: [
            "Kläder efter väder säger man ju,\nmen snygg ska man vara, även nu.",
            "När frosten nyper i kind och näsa,\nkan du i denna värme läsa.",
            "En värmande kram i textila mått,\ndet är vad du just har fått.",
            "För promenader i snö och is,\nhåller denna dig varm på alla vis.",
            "Nu behöver du inte frysa mer,\nförrän vårsolen åter ler.",
            "Mjukt och varmt mot kylan där ute,\nnu blir du skyddad som en gute.",
            "Vinterkylan har ingen chans,\nmot denna mjuka elegans.",
            "Bylta på dig och ge dig ut,\nnu är frysandet äntligen slut.",
            "Stil och värme i kombination,\nen riktigt härlig jultradition.",
            "Håll värmen när stormen yr,\nen klapp som är värd sitt bestyr.",
            "Stickat och skönt mot kropp och knopp,\nhåller humöret på topp.",
            "När nordanvinden viner runt knuten,\när du i denna väl omsluten.",
            "Matcha med jacka och matcha med sko,\ni denna får du värme och ro.",
            "Ingen vill frysa och huttra och skaka,\nvärmen når ända ner till din haka.",
            "Bär den med stolthet i vintertid,\nså sprider du både värme och frid.",
            "Runt din hals eller på din knopp,\nhåller denna värmen opp.",
            "För snöbollskrig och pulkabacke,\nskyddar den både bröst och nacke.",
            "Varm som en brasa, mjuk som en katt,\npassar perfekt en vinternatt.",
            "Mode och funktion i ett enda stycke,\nhoppas du fattar för denna tycke.",
            "När termometern visar blått,\när detta det bästa du har fått.",
            "Lager på lager är bra, har vi hört,\nmed denna gåva blir inget förstört.",
            "Skydda dig mot vädrets makter,\ni alla dina vintertrakter.",
            "En mjukis som värmer, det lovar vi dig,\nen riktigt omtänksam liten grej.",
            "Snyggt snitt och härligt material,\nett alldeles utmärkt vinterval.",
            "Nu kan du möta vinterns famn,\nutan att frysa i din hamn."
        ] 
    },
    // 4: Hygien & Doft
    4: { 
        names: ["PARFYM", "TVÅL", "LOTION", "SCHAMPO", "SCRUB"], 
        couplets: [
            "Lite lyx i vardagens stress,\nhär får du doft med finess.",
            "För en stund i badrummets vrå,\ndär du kan koppla av och må.",
            "Dofta gott och känn dig fräsch,\nbort med gammalt groll och äsch.",
            "En doft av flärd och renlighet,\när denna lilla hemlighet.",
            "Skäm bort dig själv en liten stund,\nmed dofter från en vacker lund.",
            "För kropp och knopp och välbehag,\ngör dig redo för en ny dag.",
            "Ren och fin ska man vara,\ndet fixar denna vara.",
            "Sätt guldkant på din morgonstund,\nmed doft som gör dig sund.",
            "Spa-känsla hemma hos dig,\nen riktigt härlig grej.",
            "Något som piggar upp och gör gott,\ndet är vad du just har fått.",
            "Bubblor och doft i en salig blandning,\nger dig en mjuk och skön landning.",
            "Smörj och tvätta och lukta så gott,\ndetta är lyx i stort och smått.",
            "En flaska med magi för din hy,\ngör att du känner dig som ny.",
            "Ta hand om dig själv, det är du värd,\npå din dagliga levnadsfärd.",
            "Frisk som en ros eller sval som en vind,\npassar fint på din mjuka kind.",
            "En doft som dröjer sig kvar,\ndet finaste som tomten har.",
            "För avkoppling efter veckans slut,\nandas in och andas ut.",
            "Skrubba bort det gamla året,\noch sätt lite glans i håret.",
            "Mjukgörande, lenande, härlig och fet,\nen burk med ren vitalitet.",
            "Spraya en dusch och känn dig fin,\nbättre än dyrbar medicin.",
            "Här får du något för dusch och bad,\nsom gör dig både ren och glad.",
            "Aromer som lugnar och ger dig frid,\nperfekt i denna stressiga tid.",
            "Len som sammet ska huden bli,\nmed denna kräm med magi i.",
            "En doftsymfoni för ditt sinne,\nväcker ett vackert sommarminne.",
            "Rent ska det vara, från topp till tå,\ndetta är klappen du väntat på."
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
            "En fröjd för ögat i hemmets vrå,\nsom vi hoppas du gillar att titta på.",
            "För att göra ditt hem komplett,\nhar vi valt detta, rätt och slätt.",
            "Design och form i skön förening,\nger hemmamyset ny mening.",
            "Skapa en atmosfär av ro,\ndär du allra helst vill bo.",
            "Ställ den i fönstret eller på bordet,\nhär har du sista inredningsordet.",
            "Lys upp mörkret med lågans sken,\nen stämning som är ren och pen.",
            "Mjukt för soffan eller snyggt för hyllan,\nsätter guldkant på den gråa myllan.",
            "En form som tilltalar ögat och sinnet,\nfastnar garanterat på minnet.",
            "Gör det hemtrevligt, varmt och ombonat,\nmed denna sak som vi har donat.",
            "En färgklick eller stilrent vitt,\nnu blir ditt hem ännu mer ditt.",
            "Något att fylla med blommor och blad,\ngör vilken inredare som helst glad.",
            "Konstnärligt skapat med tanke och hand,\nkanske från ett fjärran land?",
            "Förnya, förändra och piffa opp,\ninredningsglädje i full galopp.",
            "Mjukt att luta huvudet mot,\neller vackert vid sängens fot.",
            "Levande ljus i mörkret brinner,\ndå stressen sakta försvinner.",
            "En prydnadssak som väcker frågor,\neller lyser som små lågor.",
            "Ge ditt hem en personlig touch,\nutan att det kostar för much.",
            "Stil och smak i ett fint paket,\nvad det är? En hemlighet!",
            "Låt ditt hem få stråla ikapp,\nmed denna fina inredningsklapp."
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
            "Duka fram och bjud till fest,\ndå blir du allas favoritgäst.",
            "För mat och dryck och goda stunder,\nhär får du ett litet under.",
            "Gör vardagen lite mer elegant,\nmed denna köksvariant.",
            "Servera, laga eller drick,\ngör det med både stil och skick.",
            "Baka en kaka eller stek en bit,\nanvänd denna med flit.",
            "För kaffetåren eller teets stund,\nen gåva från hjärtats grund.",
            "Vasst ska det vara, eller kanske runt,\natt äta bra är ju ganska sunt.",
            "Blanda och rör och vispa och skaka,\nsnart får vi smaka din goda kaka.",
            "Snyggt på bordet när gäster kommer,\noavsett om det serveras gröt eller hummer.",
            "En pryl som underlättar ditt slit,\nger matlagningen extra flit.",
            "Häll upp drycken i din kopp,\noch känn hur värmen fyller din kropp.",
            "Matkonst kräver rätt verktygslåda,\nhär är något för er båda.",
            "Hacka, skiva, tärna och strimla,\nså att smakerna börjar vimla.",
            "En skål för godis eller för soppa,\ni denna kan du allting doppa.",
            "Kökets hjälte i blank metall,\nstår pall för både varm och kall.",
            "Gör frukosten till en festmåltid,\nmed denna grej får du extra frid.",
            "För mästerkocken i hemmets vrå,\nhär är en klapp du väntat på.",
            "Servera med kärlek och servera med stil,\ndetta lockar fram ett smil.",
            "Ordning och reda bland grytor och fat,\nnu blir det roligare att laga mat."
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
            "Låt din fantasi få vingar,\nhör hur berättelsens klockor klingar.",
            "Bläddra, läs och fascineras,\nlåt ditt sinne inspireras.",
            "Tystnad, lugn och en god historia,\nger dig en egen gloria.",
            "Spänning som får dig att rysa,\nperfekt när du inne vill mysa.",
            "Fakta och vetande, klokskap och vett,\nallt samlat på ett och samma sätt.",
            "Ett äventyr mellan mjuka blad,\ngör dig både klok och glad.",
            "Glöm vardagen för en liten stund,\noch ta dig en litterär blund.",
            "Sida upp och sida ner,\ndu kommer bara vilja ha mer.",
            "En tidning för ditt intresseområde,\nvi hoppas det faller dig i nåde.",
            "Läs om världen utanför din dörr,\nsaker du aldrig visste förr.",
            "Deckare, drama eller poesi,\nhär är världen du kan gå in i.",
            "En stund av tystnad, en kopp med te,\ndet bästa du kan få, ska du se.",
            "Häng med i svängarna, vänd på bladet,\nsimma runt i bokstavsbadet.",
            "Ord som rimmar eller ord som förklarar,\nen gåva som länge varar.",
            "För bokmalen som vill veta allt,\nserveras orden varmt och kallt.",
            "Res till platser du aldrig sett,\npå ett väldigt enkelt sätt.",
            "Skratt och gråt och djupa tankar,\nhär är en bok som förankrar.",
            "Din egen tid i en hektisk värld,\nfölj med på en läsevärd färd."
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
            "Uppkopplad, påkopplad, alltid med,\nhär är teknikens senaste led.",
            "En pryl som gör livet lite lättare,\neller kanske bara mättare.",
            "Framtiden är här i ett paket,\nfyllt med teknisk kvalitet.",
            "Ladda upp och koppla på,\nnu ska det undan gå.",
            "Ljud i örat eller bild på skärm,\nskyddar dig från världens larm.",
            "Tryck på start och se vad som händer,\nkanske kontakt med andra länder?",
            "En manick som fixar allt,\ndetta är riktigt ballt.",
            "Utan sladd eller med, spelar ingen roll,\nmed denna pryl har du full kontroll.",
            "Batteriet fullt och signalen klar,\nden bästa gadgeten som tomten har.",
            "För gaming, jobb eller bara kul,\nen teknisk klapp till denna jul.",
            "Streama, surfa, scrolla och klicka,\nfunkar bra för pojk och flicka.",
            "Litet chip men stor funktion,\nen riktig innovation.",
            "Håll koll på tiden, pulsen och stegen,\nför att hitta den rätta vägen.",
            "Musik i ljuvlig kvalitet,\när vad du får i detta paket.",
            "Koppla ihop och synka allt,\ndetta är riktigt häftigt och ballt.",
            "Smartare än du kanske tror,\när tekniken som i lådan bor.",
            "För den som gillar knappar och ljus,\nblir detta julens sus och dus.",
            "High-tech gåva till en high-tech vän,\nanvänd den om och om igen."
        ] 
    },
    // 9: Tur, Kul & Spel
    9: { 
        names: ["TRISS", "BIO", "LOTT", "PRESENTKORT", "UPPLEVELSE"], 
        couplets: [
            "Plötsligt händer det, vem vet när?\nKanske vinsten ligger just här.",
            "En upplevelse utöver det vanliga,\nför stunder som är behagliga.",
            "Spänning, tur eller en stund av skratt,\nhoppas du får en trevlig natt.",
            "Inte en sak som samlar damm,\nutan ett minne att plocka fram.",
            "Något att göra, se och minnas,\nbättre gåva kan knappast finnas.",
            "En biljett till något stort,\nnär du öppnar detta kort.",
            "Tur i spel eller tur i kärlek,\nlivet är en underbar lek.",
            "Upplev något nytt och kul,\nen riktigt spännande jul.",
            "Förväntan är halva nöjet sägs det ju,\nhoppas du blir lycklig nu.",
            "En chansning eller ett säkert kort,\ngör att tiden går fort.",
            "Bio, teater eller show,\ngåvan med det rätta flow.",
            "Välj själv vad du vill ha,\ndå blir det garanterat bra.",
            "Gör vad du vill för denna slant,\ndet blir säkert intressant.",
            "Ett minne för livet, hoppas vi,\nmed denna upplevelse du hamnar i.",
            "Frihet att välja, frihet att göra,\ndetta är en gåva att föra.",
            "Kanske en resa, middag eller bio,\nvälj själv din bästa trio.",
            "Spänningen stiger när du får se,\nvad denna upplevelse kan ge.",
            "En kväll på stan eller vinst på banken,\ndet var i alla fall tanken.",
            "Slipp välja färg och slipp välja storlek,\nvalfrihet är en rolig lek.",
            "Lyckan kommer, lyckan går,\nkanske den stannar hos dig i år.",
            "Boka in ett datum och ge dig av,\nupplev något bortom alla krav.",
            "En papperslapp med värde på,\nundrar vad du ska hitta på.",
            "För stunden som kommer och minnen som består,\nbästa klappen du får i år.",
            "Chansa och vinn, eller försvinn,\nhoppas turen är din.",
            "Drömmar kan köpas för pengar ibland,\nhåll hårt i denna med din hand."
        ] 
    },
    // 0: Godis & Ätbart
    0: { 
        names: ["CHOKLAD", "GODIS", "PRALINER", "DELI", "DRICKBART"], 
        couplets: [
            "Något sött till kaffetåren,\nvärmer gott i vinterspåren.",
            "Livet ska njutas i fulla drag,\nhär får du något för ditt välbehag.",
            "En smakupplevelse för din gom,\nnu blir magen inte tom.",
            "Detta är gott och gör dig glad,\nsom en solig promenad.",
            "Socker, kryddor och allt som är gott,\när vad du har fått.",
            "Njut av varje liten bit,\ndet är värt all din flit.",
            "När suget sätter in och kurrar,\när det bra att denna i munnen snurrar.",
            "En fröjd för smaklökarna dina,\nsöta, salta och fina.",
            "Njutningen varar en liten stund,\ni din muns saliga lund.",
            "Unna dig något riktigt läckert,\ninslaget väldigt vackert.",
            "Smälter i munnen, len och söt,\nbättre än tomtens julegröt.",
            "En korg med lyx och goda grejer,\ntill både killar och tjejer.",
            "Salt eller surt, beskt eller sött,\nhär är något du inte mött.",
            "Dela med vänner eller ät allt själv,\nnjutning strömmar som en älv.",
            "Till fredagsmyset eller lördagsfesten,\ndetta smakar bättre än resten.",
            "En smakresa jorden runt,\natt banta i jul är bara strunt.",
            "Choklad är kärlek i fast form,\ngör glädjen helt enorm.",
            "Knaprigt, segt eller mjukt i mitten,\nhoppas du gillar banana splitten.",
            "Dryck som värmer en frusen kropp,\ndrick ur varenda dropp.",
            "Delikatesser av högsta klass,\nät dem nu i lugn och pass.",
            "Frestelser som är svåra att motstå,\ndet är bara att smaka på.",
            "Kalorier räknas inte i december,\ndet är något du måste remember.",
            "En present som försvinner i en hast,\nhåll i asken riktigt fast.",
            "Gammaldags godis eller nya smaker,\nhär är riktigt goda saker.",
            "Ät, njut och var riktigt glad,\nta dig en chokladrad."
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
            updateScreen(masterSoundEnabled ? "LJUD: PÅ" : "LJUD: AV");
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
        const text = "GOD JUL!";
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
            updateScreen("VÄLJ GÅVA...");
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
        waitingForGameLaunch = false;
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
        updateScreen("INGEN GÅVA?");
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
    
    isGenerating = true; 
    sfxRound();
    updateScreen("SÖKER NORDPOLEN...");
    
    let step = 0;
    const maxSteps = 3; 

    function nextWifiStep() {
        if(step < maxSteps) {
            const phrase = WIFI_SEQUENCE[step]; 
            updateScreen(phrase);
            synth(1200, 'square', 0.05); 
            step++;
            setTimeout(nextWifiStep, 1200);
        } else {
            sfxSuccess();
            isConnected = true;
            updateScreen("KONTAKT ETABLERAD!\nNORDPOLEN ONLINE.");
            setTimeout(() => {
                updateScreen("KONTAKT ETABLERAD!\nNORDPOLEN ONLINE.\n\nDELA UT PAKET?\nTRYCK [ENTER]");
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
    
    const helpText = "GOD JUL OCH GOTT NYTT ÅR\nÖNSKAR ALLA VI PÅ TENGBOM!\n\n" +
                     "=== INFO ===\n\n" +
                     "Julrimskalkylatorn är framtagen för att rädda din uppesittarkväll. " +
                     "Låt tekniken göra jobbet medan du lutar dig tillbaka och dricker glögg.\n\n" +
                     "=== GUIDE ===\n\n" +
                     "VÄLJ GÅVA (0-9)\n" +
                     "Tryck på en siffra för att välja kategori. Tryck upprepade gånger på samma siffra för att bläddra bland specifika gåvor (t.ex. tryck [1] flera gånger för att växla mellan Strumpor, Tofflor, Skor etc.).\n\n" +
                     "LÄGG TILL (+)\n" +
                     "Kombinera flera gåvor i samma rim genom att trycka på plus.\n\n" +
                     "RIMMA (ENTER)\n" +
                     "När du är nöjd med dina val, tryck Enter för att generera rimmet.\n\n" +
                     "=== KNAPPAR & REGLAGE ===\n\n" +
                     "[WIFI]: Etablera direktkontakt för specialtjänster.\n" +
                     "[C] RENSA: Tömmer minnet och nollställer.\n" +
                     "[<-] ÅNGRA: Tar bort den senaste valda gåvan.\n" +
                     "[!] SLUMPA: Låt maskinen välja gåvor åt dig.\n" +
                     "[SPAKEN]: Dra i spaken för att justera julstämning.\n\n" +
                     "=== TIPS ===\n\n" +
                     "Är du missnöjd med rimmet? Tryck bara på ENTER igen så gör motorn ett nytt försök med samma gåvor. Maskinen har många kombinationer på lager.\n\n" +
                     "=== ANSVARSFRISKRIVNING ===\n\n" +
                     "Denna maskin drivs av experimentell julmagi (v1.0). Tengbom AB ansvarar ej för rimmens kvalitet, grammatiska tveksamheter eller mottagarens eventuella besvikelse.\n\n" +
                     "Systemet kan innehålla spår av buggar och nötter. Tekniska fel rapporteras direkt till Tomten via närmaste skorsten.\n\n" +
                     "=== CREDITS & INSPIRATION ===\n\n" +
                     "Kodmotor: MIT License (Open Source).\n" +
                     "Grafik: CC BY 4.0.\n" +
                     "Koden är fri att använda och bygga vidare på. Se källkoden för detaljer.\n\n" +
                     "Designen är en ödmjuk hyllning till Teenage Engineering (TE) och deras fantastiska formspråk.\n" +
                     "(OBS: Detta är ett fristående projekt utan officiell koppling till TE).";
                     
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
        <text x="117" y="165" text-anchor="middle" fill="#ECB328" font-family="VT323" font-size="14">TRYCK [+] FÖR ATT STARTA</text>
    `;

    snowLayer.innerHTML = ""; 
    renderSnow(2); 
    pipeLayer.innerHTML = "";
    historyLine.classList.add('hidden-border'); 
    historyLine.textContent = "LADDAR...";
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
        <text x="117" y="128" text-anchor="middle" fill="#ECB328" font-family="VT323" font-size="12">DIN POÄNG: ${score}</text>
        ${hsHtml}
        <text x="117" y="200" text-anchor="middle" fill="#ECB328" font-family="VT323" font-size="12">[ENTER] SPELA IGEN  |  [C] AVSLUTA</text>
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
    console.log("%c Julrimskalkylatorn byggd av Andreas Nordström aka HandyMan ", "background: #222; color: #ECB328; font-size: 12px; padding: 4px; border-radius: 4px;");
    
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