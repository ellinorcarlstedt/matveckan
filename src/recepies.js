// Mock-data. Will later be fetched from database

const recepies = [

    {
        index: 101,
        mealName: "Spaghetti med köttfärssås",
        mealCategory: 1,
        ingredients: ["köttfärs", "gul lök", "vitlök", "morötter", "tomatpuré", "salt", "peppar"],
        description: [
                    "Sätt på en stor kastrull med vatten till spaghettin.", 
                    "Skala och riv morötterna på ett rivjärn.",
                    "Bryn färsen i olivoljan i en stor kastrull eller stekpanna med höga kanter. Pressa i vitlöken.", 
                    "Blanda i morötterna och låt det fräsa ca 3 minuter.", 
                    "Tillsätt timjan, krossade tomater, balsamvinäger och smulad buljongtärning.", 
                    "Sänk värmen och låt såsen sjuda ca 10 minuter under lock. Smaka av med salt och peppar.", 
                    "Koka spaghettin enligt anvisningen på förpackningen.", 
                    "Hacka persiljan. Skär tomaterna i bitar och blanda med persilja, olivolja och rödvinsvinäger. Krydda med salt och peppar.",
                    "Servera köttfärssåsen med spaghetti och tomater."
                    ]
    },

    {
        index: 102,
        mealName: "Grönsakssoppa",
        mealCategory: 4,
        ingredients: ["morötter", "vitkål", "potatis", "vitlök", "röda linser"],
        description: [
                    "Skala och tvätta alla grönsaker.", 
                    "Skär grönsakerna i lämpliga bitar. Fräs i en kastrull eller gryta i olja.", 
                    "Häll över vatten och lägg i buljongtärning samt valfria örtkryddor och örtsalt. Låt koka tills grönsakerna precis mjuknat. Smaka av med salt och peppar.", 
                    "Servera gärna med ett gott surdegsknäcke med ost eller skinka."
                    ] 
    },

    {
        index: 103,
        mealName: "Kyckling med basilikasås och rostad potatis",
        mealCategory: 2,
        ingredients: ["kycklingfilé", "basilika", "citron", "creme fraiche", "potatis", "salt", "peppar", "granatäppelkärnor"], 
        description: [
                    "Sätt ugnen på 200°.", 
                    "Skär varje kycklingfilé i tre avlånga bitar. Lägg i en ugnsform och krydda med salt och peppar.", 
                    "Finhacka basilikan och rör ihop med crème fraiche, citron och vitlök.", 
                    "Häll såsen över kycklingen och gratinera mitt i ugnen ca 20 min.", 
                    "Strö över granatäppelkärnor och ev mer basilikablad. Dra ett varv med pepparkvarnen.", 
                    "Servera med ugnsrostad potatis eller tagliatelle."
                    ] 
    },

    {
        index: 104,
        mealName: "Pankopanerad rödspätta",
        mealCategory: 3,
        ingredients: ["rödspättafilé", "panko", "vetemjöl", "ägg", "potatis", "broccoli", "citron", "salt", "peppar"],
        description: [
                    "Vispa ägget. Vänd varje rödspätta först i mjölet, sedan i ägg, sist i panko.", 
                    "Stek filéerna gyllenbruna i lite smör.", 
                    "Skala och koka potatis. Dela och koka broccoli.", 
                    "Servera rödspättan med pressad citron."
                    ] 
    },

    {
        index: 105,
        mealName: "Tacos",
        mealCategory: 1,
        ingredients: ["köttfärs", "riven ost", "majs", "paprika", "tomater", "avokado", "tortillasskal"],
        description: [
                    "Stek köttfärsen och krydda med kryddmixen.", 
                    "Blanda i ca 1 dl vatten och låt det koka ihop en stund.", 
                    "Under tiden så skär du alla grönsakerna.", 
                    "Servera med tacoskal, grönsaker, tacosås, gräddfil och riven ost."
                    ] 
    },

    {
        index: 106,
        mealName: "Quornpasta",
        mealCategory: 4,
        ingredients: ["quornbitar", "broccoli", "champinjoner", "pasta", "pesto", "parmesanost"],
        description: [
                    "Skär broccolin i tunna skivor och stek tills de blir mjuka.", 
                    "Lägg i quorn och skivade champinjoner och stek gyllenbruna. Se till att all vätska kokar bort.",
                    "Koka pastan och häll av vattnet. Blanda i en stor klick pesto och rör ihop.",
                    "Ta stekpannan från plattan och blanda ner pastan och rör ihop.",
                    "Servera med nyriven parmesanost."
                    ] 
    },

    {
        index: 107,
        mealName: "Fisk i ugn",
        mealCategory: 3,
        ingredients: ["panerade torskfiléer", "citron", "potatis", "sparris", "remouladsås"],
        description: [
                    "Sätt ugnen på 225 grader.",
                    "Skala potatisen och skär den i klyftor. Lägg den på en plåt med bakplåtspapper. Häll över olja, salt och timjan, blanda och ställ in högst upp i ugnen i 30 min.",
                    "Lägg de frysta panerade torskfiléerna i en ugnssäker form. Ställ in dem i nedre delen av ugnen när det är ca 20 minuter kvar för potatisen.",
                    "Under tiden steker eller kokar du sparrisen.",
                    "Servera med pressad citron och remouladsås."
                    ] 
    },

    {
        index: 108,
        mealName: "Havregrynsgröt",
        mealCategory: 4,
        ingredients: ["havregryn", "vatten", "mjölk", "grädde", "äppelmos"],
        description: [
                    "Blanda 1 dl havregryn med 2 dl vatten.", 
                    "Koka upp och låt koka på svag värme tills gröten uppnått önskad konsistens.", 
                    "Servera med äppelmos, mjölk och en skvätt grädde."
                    ]      
    },

    {
        index: 109,
        mealName: "Boullabaisse",
        mealCategory: 3,
        ingredients: ["citron", "morötter", "laxfilé", "torskfilé", "vitlök", "gul lök", "grädde", "saffran", "vitt vin"],
        description: [
                    "Skala och finhacka lök och vitlök.", 
                    "Skölj och grovhacka purjolök.", 
                    "Skala och tärna potatis och morötter och skölj och grovhacka fänkål.", 
                    "Hetta upp olja och smör i en kastrull och fräs lök, vitlök, purjolök, fänkål, potatis och morötter tillsammans med saffran och chiliflakes under omrörning i ca 2-3 min.", 
                    "Tillsätt tomatpuré och fräs 30 sek under omrörning.", 
                    "Tillsätt vitt vin och låt puttra i ca 4-5 min.", 
                    "Tillsätt vatten, grädde och fond och låt soppan sjuda under lock i ca 20 min.", 
                    "Tärna laxen och torsken och krydda med lite salt.", 
                    "Sila av räkorna.", 
                    "Borsta musslorna väl och ta bort skägget. Skölj dem noga och släng musslor som är trasiga och som inte stänger sig när man knackar på skalet.", 
                    "Repa av timjanblad så att du får ca ½ msk.", 
                    "Lägg ner lax, torsk och musslor i soppan och låt sjuda i ca 5 min.", 
                    "Lägg ner räkor och timjan och smaka av soppan med citronsaft, salt och peppar.", 
                    "Lägg upp soppan i skålar och servera med ett gott bröd och ev en klick aioli."
                    ] 
    },

    {
        index: 110,
        mealName: "Pannkakor",
        mealCategory: 4,
        ingredients: ["ägg", "mjölk", "vetemjöl", "salt", "smör"],
        description: [
                    "Vispa ihop ägg och hälften av mjölken i en bunke.", 
                    "Tillsätt vetemjöl och salt lite i taget.", 
                    "Vispa tills smeten är jämn och blanda sedan i resten av mjölken och smör.", 
                    "Bryn lite smör i en pannkakslagg (alternativt plättlagg för plättar).",
                    "Häll i ca 1 dl smet och vicka lätt på laggen så att smeten fördelas till ett jämnt tunt lager.", 
                    "Vänd på pannkakan när smeten har stelnat så att den får färg på båda sidor.",
                    "Lägg de färdiga pannkakorna på ett serveringsfat och servera med sylt, bär och glass eller grädde."
                    ] 
    },

    {
        index: 111,
        mealName: "Köttgryta med ris",
        mealCategory: 1,
        ingredients: ["nötkött", "champinjoner", "gul lök", "morötter", "ris", "smör", "tomatpuré", "smör"],
        description: [
                    "Tärna köttet och bryn det snabbt i smör- och rapsoljan.", 
                    "Häll champinjonerna i grytan, spara vätskan och ställ åt sidan.", 
                    "Hacka löken grovt, skär morötterna i skivor och häll även detta i grytan. Låt fräsa 2-3 minuter.", 
                    "Tillsätt vatten, buljongtärningarna, hälften av champinjonspadet och tomatpuré. Koka upp, dra ner värmen och låt puttra tills köttet är mjukt.", 
                    "Tärna under tiden zucchini och paprika och häll ner i grytan.", 
                    "Krydda efter smak och låt allt koka ihop.", 
                    "Blanda majsstärkelse med resten av champinjonspadet och red av grytan. Koka 3-4 minuter.", 
                    "Servera med ris."
                    ] 
    },

    {
        index: 112,
        mealName: "Flygande Jacob",
        mealCategory: 2,
        ingredients: ["grädde", "kyckling", "jordnötter", "bacon", "chilisås", "bananer"],
        description: [
                    "Sätt ugnen på 225 grader.", 
                    "Ta bort skinn och ben från din grillade kyckling. Skär kycklingköttet i mindre bitar.", 
                    "Skala och dela bananerna på längden.", 
                    "Lägg kyckling1et i en ugnssäker form. Lägg banan ovanpå.", 
                    "Vispa grädden. Rör ihop grädde och chilisås och bred det över.", 
                    "Grädda i nedre delen av ugnen i 20 minuter.", 
                    "Strimla under tiden bacon och stek det knaprigt i en stekpanna. Lägg upp på hushållspapper för att rinna av.", 
                    "Tag ut kycklingen och strö över bacon och jordnötter.", 
                    "Matsortera dina bananskal och renset från kycklingen till återvinning och njut av din Flygande Jacob!"
                    ] 
    },

    {
        index: 113,
        mealName: "Ärtsoppa",
        mealCategory: 4,
        ingredients: ["gula ärtor", "sidfläsk", "gul lök", "morot", "timjan"],
        description: [
                    "Lägg ärtorna i blöt över natten övertäckta i en stor kastrull eller skål.", 
                    "Häll av och lägg i en stor kastrull, tillsätt vatten och börja koka.", 
                    "Skiva eller hacka lök och tillsätt den.", 
                    "Skala och tärna morot och tillsätt.", 
                    "Lägg i fläsk, lagerblad och kryddpeppar.", 
                    "Koka ärtsoppan under lock i 1,5 timmar på medelvärme - rör om då och då.", 
                    "När soppan kokat så mosa till ärtorna med en potatisstöt eller slev och smaka på ärtorna så att de är mjuka och som du vill ha dem.", 
                    "Tjocknar soppan inte så koka på låg värme med lock - upp till 3,5 timmar funkar - låt den stå och puttra bara. Rör då och då.", 
                    "Blir ärtsoppan för tjock tillsätter du lite mer vatten.", 
                    "Ta upp fläsk och skär i kuber och lägg tillbaks.", 
                    "Smaka av och koka upp ärtsoppan med kryddor som timjan, vitpeppar, mejram och salt. Köttbuljong eller grönsaksbuljong kan man också smaksätta med - dock sparsamt.", 
                    "Servera ärtsoppan med senap."
                    ] 
    },

    {
        index: 114,
        mealName: "Adaspolo",
        mealCategory: 1,
        ingredients: ["gröna linser", "köttfärs", "ris", "saffran", "potatis"],
        description: [] 
    },

    {
        index: 115,
        mealName: "Caesarsallad",
        mealCategory: 2,
        ingredients: ["isbergssallad", "kyckling", "caesardressing", "krutonger", "tomater", "paprika"],
        description: [
                    "Skiva grillad kyckling. Tärna grönsakerna.", 
                    "Rör ihop sallad, kyckling, krutonger, tomater, paprika och dressing till en god sallad."
                    ] 
    },

    {
        index: 116,
        mealName: "Korvgryta",
        mealCategory: 5,
        ingredients: ["falukorv", "gul lök", "krossade tomater", "grädde", "ris"],
        description: [
                    "Koka riset enligt anvisning på förpackningen.",
                    "Skär korven i strimlor. Skala och riv löken. Stek korven i smör-&rapsolja i en stekpanna. Rör i lök, tomatkross och grädde.",
                    "Smaka av med salt och peppar. Låt koka ca 1 min. Servera grytan med riset."
                    ] 
    },

    {
        index: 117,
        mealName: "Fläskkotlett med svamp",
        mealCategory: 5,
        ingredients: ["fläskotletter", "svamp", "vitlök", "citron", "vispgrädde", "persilja"],
        description: [
                    "Sätt ugnen på 100°.",
                    "Bryn fläskkotletterna hastigt i olivolja och smör i en stekpanna, tills de fått fin färg.",
                    "Salta och peppra.",
                    "Lägg över i en ugnsfast form.",
                    "Stek kotletterna klara i ugnen 20 minuter.",
                    "Stek svampen i olivolja på hög värme i en stekpanna någon minut.",
                    "Tillsätt vitlök och citronskal, stek ytterligare 1 minut.",
                    "Häll på grädde och låt koka ihop något.",
                    "Smaka av med salt och peppar.",
                    "Vänd ner persiljan i såsen och servera den till kotletterna."
                    ] 
    }
];

export default recepies;