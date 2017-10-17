import {category} from './TableTypes'
import {console} from "./TableTypes";

//The consoles table

export enum consoleType{
    xboxone = "Xbox One",
    playstation4 = "Playstation 4",
    xbox360 = "Xbox 360",
    playstation3 = "Playstation 3"
}

export let console1: console = {
    pk: 1,
    name: "Playstation 3 super slim",
    console: consoleType.playstation3,
    description: "The playstation 3 is very verstatile console with lots of memory",
    memory: "500GB",
    image: "https://resources.budgetgaming.nl/boxarts/108594ps3ss500.jpg",
    ammountAvailable: 50,
    category: category.consoles,
    price: 500
}
export let console2: console = {
    pk: 2,
    name: "Playstation 4 1TB",
    console: consoleType.playstation4,
    description: "The playstation 4",
    memory: "1TB",
    image: "https://s.s-bol.com/imgbase0/imagebase3/large/FC/3/5/4/7/9200000051707453.jpg",
    ammountAvailable: 100,
    category: category.consoles,
    price: 500
}
export let console3: console = {
    pk: 3,
    name: "Xbox 360 Slim",
    console: consoleType.xbox360,
    description: "This version of the xbox 360 has a lot of memory. 500GB!",
    memory: "500GB",
    image: "https://static.raru.co.za/cover/2014/10/20/2136356-l.jpg?v=1413789188",
    ammountAvailable: 10,
    category: category.consoles,
    price: 600
}
export let console4: console = {
    pk: 4,
    name: "Xbox one",
    console: consoleType.xboxone,
    description: "The xbox one in it's full glory",
    memory: "500GB",
    image: "https://i5.walmartimages.com/asr/ba224f43-000b-4966-b542-826bbb79f110_1.9e96259ce0161ada5f9ce7d14e0db4f2.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
    ammountAvailable: 15,
    category: category.consoles,
    price: 700
}

