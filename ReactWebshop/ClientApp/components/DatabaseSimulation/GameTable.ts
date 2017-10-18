import {category} from './TableTypes'
import {consoleType} from "./ConsoleTable";
import {game} from "./TableTypes";

//The games entities


/* to distinguish between the categories of the game, the genreCategory distinguis between the games */
export enum genreCategory{
    action = "action",
    shooter = "shooter",
    fantasy = "fantasy",
    sport = "sport",
    sandbox = "sandbox",
    fight = "fight"
}

export enum age{
    _3 = "3+",
    _7 = "7+",
    _12 = "12+",
    _16 = "16+",
    _18 = "18+"
}

export let game1: game = {
    pk: 1,
    name: "Call of duty Infinite Warfare", 
    description: "Call of duty is a game where you can shoot..many times",
    console: consoleType.xboxone,
    price: 59, 
    genreCategory: genreCategory.shooter, 
    category: category.games, 
    image: "https://www.gamestop.com/common/images/lbox/125879b.jpg",
    age: age._12,
    ammountAvailable: 100,
    dateAddedToDatabase: new Date(2017,1,1)
}
export let game2: game = { 
    pk: 2,
    name: "Gta 5", 
    description: "The next big gta game, shooting, driving cars and going for a mission",
    console: consoleType.xboxone,
    price: 69, 
    genreCategory: genreCategory.sandbox, 
    category: category.games, 
    image: "https://vignette.wikia.nocookie.net/gtawiki/images/7/76/CoverArt-GTAV.png/revision/latest?cb=20130826184215",
    age: age._18,
    ammountAvailable: 10,
    dateAddedToDatabase: new Date(2017,1,5)
}
export let game3: game = {
    pk: 3,
    name: "Fifa 16", 
    description: "Playing with Christino Ronaldo, that is what you can do in fifa.",
    console: consoleType.xboxone,
    price: 59, 
    genreCategory: genreCategory.sport, 
    category: category.games, 
    image: "https://images-na.ssl-images-amazon.com/images/I/51zIFKpez%2BL._SX342_.jpg",
    age: age._3,
    ammountAvailable: 10,
    dateAddedToDatabase: new Date(2017,9,5)
}
export let game4: game = {
    pk: 4,
    name: "The amazing spiderman 2", 
    description: "Spiderman shoots web things out of his hands",
    console: consoleType.xboxone,
    price: 59, 
    genreCategory: genreCategory.action, 
    category: category.games, 
    image: "https://www.gamestop.com/common/images/lbox/210047b.jpg",
    age: age._16,
    ammountAvailable: 1,
    dateAddedToDatabase: new Date(2017,7,5)
}
export let game5: game = {
    pk: 5,
    name: "Skyrim", 
    description: "Running through the wild",
    console: consoleType.xboxone,
    price: 59, 
    genreCategory: genreCategory.sandbox, 
    category: category.games, 
    image: "http://www.topvaluereviews.net/wp-content/uploads/2016/11/810jMlhPnTL._AC_SL1500_.jpg",
    age: age._18,
    ammountAvailable: 15,
    dateAddedToDatabase: new Date(2017,5,11)
}

export let game6: game = {
    pk: 6,
    name: "Mortal kombat", 
    description: "Fighting with strange people",
    console: consoleType.playstation4,
    price: 59, 
    genreCategory: genreCategory.fight, 
    category: category.games, 
    image: "https://i.pinimg.com/736x/dc/2a/ce/dc2aceb93139ab79d37a8322e0942e0b--xbox-one-games-x-games.jpg",
    age: age._18,
    ammountAvailable: 15,
    dateAddedToDatabase: new Date(2017,2,2)

}
export let game7: game = {
    pk: 7,
    name: "Watch dogs", 
    description: "You are a hacker that hacks",
    console: consoleType.playstation4,
    price: 59, 
    genreCategory: genreCategory.sandbox, 
    category: category.games, 
    image: "http://www.gamesintime.com/wp-content/uploads/2015/09/284614-watch-dogs-ps4-exclusive-edition-playstation-4-front-cover.jpg",
    age: age._18,
    ammountAvailable: 90,
    dateAddedToDatabase: new Date(2017,5,5)
}
export let game8: game = {
    pk: 8,
    name: "Killzone Shadow fall", 
    description: "Killing shadows for fun",
    console: consoleType.playstation4,
    price: 59, 
    genreCategory: genreCategory.shooter, 
    category: category.games, 
    image: "https://i.pinimg.com/736x/fe/9b/f3/fe9bf3288200626f56be758f9e18c36e--playstation-games-ps-games.jpg",
    age: age._18,
    ammountAvailable: 500,
    dateAddedToDatabase: new Date(2017, 10,15)
}
export let game9: game = {
    pk: 9,
    name: "Knack", 
    description: "A child game that is childish",
    console: consoleType.playstation4,
    price: 59, 
    genreCategory: genreCategory.fantasy, 
    category: category.games, 
    image: "http://pusabase.com/blog/wp-content/uploads/2013/09/PlayStation-4__PS4_knack_game_cover_art-818x1024.jpg",
    age: age._3,
    ammountAvailable: 150,
    dateAddedToDatabase: new Date(2017,1,5)

}
export let game10: game = {
    pk: 10,
    name: "Lego marvel super heroes", 
    description: "From hulk to spiderman to wolverine. ",
    console: consoleType.playstation4,
    price: 59, 
    genreCategory: genreCategory.sandbox, 
    category: category.games, 
    image: "http://pusabase.com/blog/wp-content/uploads/2013/11/lego_marvel_super_heroes_playstation_4_ps4_cover_art-837x1024.jpg",
    age: age._16,
    ammountAvailable: 90,
    dateAddedToDatabase: new Date(2017,5,5)
}

