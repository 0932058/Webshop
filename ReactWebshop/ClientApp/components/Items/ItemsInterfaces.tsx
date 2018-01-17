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
    groupId : number
}

export interface JoinedBestelling {
    BestellingId : number
    productId : Product
    bestellingDatum : Date 
    verstuurDatum : Date 
    status : string
    klantId : Klant
    groupId: number
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
    straatnummer: string,
    postcode: string,
    email: string,
    username: string   
}
export interface KlantEnBestelling{
    klant: Klant,
    bestellingen: any[] //bestelling
}

// export interface DataForPieChart{
//     key: string,
//     value: number
// }
export interface DataForGraph{
    key: string,
    value: number
}

export interface Review{
    reviewId: number,
    productId: number,
    klantId: number,
    rating: number,
    comment: string
}
