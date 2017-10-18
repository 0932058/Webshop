import {accessoires,category} from "./TableTypes";

//The accessoires entites

/*An accessoire is either a headset or a racewheel
The accesoire entity has an attribute called: subCategory. That has the type */
export enum accessoiresType{
    headsets = "Headsets",
    racewheels = "Racewheels",
}
/* 
PK = Primary key of the product
Category = The category can either be: Games, consoles or accessoire. This is for distinguising the products
SubCategory: the accessoiresType
*/

export let accessoire: accessoires = {
    pk: 1,
    name: "Logitech G433",
    description: "Zo rood als rood",
    price: 59,
    image: "https://gaming.logitech.com/assets/65178/30/g433-surround-gaming-headset.png",
    category: category.accessoires,
    subCategory: accessoiresType.headsets,
    dateAddedToDatabase: new Date(2017,10,5)
}
export let accessoire1: accessoires = {
    pk: 2,
    name: "Razer Man O'War",
    description: "Een monster koptelefoon",
    price: 99,
    image: "https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/105/10529/10529012.jpg",
    category: category.accessoires,
    subCategory: accessoiresType.headsets,
    dateAddedToDatabase: new Date(2017,5,5)
}
export let accessoire2: accessoires = {
    pk: 3,
    name: "Wireless Headset H600",
    description: "Een simpele koptelefoon",
    price: 99,
    image: "https://assets.logitech.com/assets/54876/h600-gallery.png",
    category: category.accessoires,
    subCategory: accessoiresType.headsets,
    dateAddedToDatabase: new Date(2016,10,5)
}
export let accessoire3: accessoires = {
    pk: 4,
    name: "Thrustmaster Racing Wheel",
    description: "Ferrari racing wheel, deze moet iedereen hebben",
    price: 50,
    image: "https://images-na.ssl-images-amazon.com/images/I/61zSNzmmcYL._SX522_.jpg",
    category: category.accessoires,
    subCategory: accessoiresType.racewheels,
    dateAddedToDatabase: new Date(2015,5,5)
}
export let accessoire4: accessoires = {
    pk: 5,
    name: "Logitech G G920 ",
    description: "Een simpel racewheel",
    price: 40,
    image: "https://gaming.logitech.com/assets/53687/5/logitech-g920-racing-wheel.png",
    category: category.accessoires,
    subCategory: accessoiresType.racewheels,
    dateAddedToDatabase: new Date(2017,10,16)
}