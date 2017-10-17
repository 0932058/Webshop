import {accessoires,category} from "./TableTypes";

export enum accessoiresType{
    headsets = "Headsets",
    racewheels = "Racewheels",
}
export let accessoire: accessoires = {
    pk: 1,
    name: "Logitech G433",
    description: "Zo rood als rood",
    price: 59,
    image: "https://gaming.logitech.com/assets/65178/30/g433-surround-gaming-headset.png",
    category: category.accessoires,
    subCategory: accessoiresType.headsets
}
export let accessoire1: accessoires = {
    pk: 2,
    name: "Razer Man O'War",
    description: "Een monster koptelefoon",
    price: 99,
    image: "https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/105/10529/10529012.jpg",
    category: category.accessoires,
    subCategory: accessoiresType.headsets
}
export let accessoire2: accessoires = {
    pk: 3,
    name: "Wireless Headset H600",
    description: "Een simpele koptelefoon",
    price: 99,
    image: "https://assets.logitech.com/assets/54876/h600-gallery.png",
    category: category.accessoires,
    subCategory: accessoiresType.headsets
}
export let accessoire3: accessoires = {
    pk: 4,
    name: "Thrustmaster Racing Wheel",
    description: "Ferrari racing wheel, deze moet iedereen hebben",
    price: 50,
    image: "https://images-na.ssl-images-amazon.com/images/I/61zSNzmmcYL._SX522_.jpg",
    category: category.accessoires,
    subCategory: accessoiresType.racewheels
}
export let accessoire4: accessoires = {
    pk: 5,
    name: "Logitech G G920 ",
    description: "Een simpel racewheel",
    price: 40,
    image: "https://gaming.logitech.com/assets/53687/5/logitech-g920-racing-wheel.png",
    category: category.accessoires,
    subCategory: accessoiresType.racewheels
}