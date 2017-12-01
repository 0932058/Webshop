interface Wenslijst {
    WenslijstId : number 
    productNmr : number 
    toevoegDatum : Date 
    KlantId : number 
}    
interface Product {
    ProductId : number 
    productNaam : string
    productUitgever : string
    productOmschr : string
    aantalInVooraad : number 
    productPrijs : number
    productType : string
    productOntwikkelaar : string
    productImg : string
    productGenre : string
    consoleType : string
}

interface Admin {
    AdminId : number
    voorNaam : string
    achterNaam : string
    tussenVoegsel : string
    mail : string
    functie : string
}

interface Bestelling {
    BestellingId : number
    productId : number
    bestellingDatum : Date 
    verstuurDatum : Date 
    status : string
    klantId : number
}

interface Betaling {
    BetalingId : number
    betalingsDatum : Date 
    bedrag : number
}