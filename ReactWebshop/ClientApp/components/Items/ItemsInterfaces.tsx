export interface Wenslijst {
    wenslijstId : number 
    productNmr : number 
    klantId : number 
}    
export interface Product {
    productId : number 
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

export interface Admin {
    AdminId : number
    voorNaam : string
    achterNaam : string
    tussenVoegsel : string
    mail : string
    functie : string
}

export interface Bestelling {
    BestellingId : number
    productId : number
    bestellingDatum : Date 
    verstuurDatum : Date 
    status : string
    klantId : number
}

export interface Betaling {
    BetalingId : number
    betalingsDatum : Date 
    bedrag : number
}
export interface Klant{
    voornaam: string,
    achternaam: string,
    straatnaam: string,
    postcode: string,
    email: string   
}
export interface KlantEnBestelling{
    klant: Klant,
    bestellingen: any[] //bestelling
}