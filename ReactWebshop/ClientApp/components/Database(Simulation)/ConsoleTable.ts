import {category} from './TableTypes'
import {console} from "./TableTypes";

//The consoles table

export enum consoleType{
    xboxOne = "Xbox One",
    playstation4 = "Playstation 4",
    xbox360 = "Xbox 360",
    playstation3 = "Playstation 3"
}

export let console1: console = {
    pk: 1,
    name: "Playstation 3 super slim",
    consoleType: consoleType.playstation3,
    description: "The playstation 3 is very verstatile console with lots of memory",
    memory: "500GB",
    image: "https://resources.budgetgaming.nl/boxarts/108594ps3ss500.jpg"
}
export let console2: console = {
    pk: 2,
    name: "Playstation 4 1TB",
    consoleType: consoleType.playstation4,
    description: "The playstation 4",
    memory: "1TB",
    image: "https://s.s-bol.com/imgbase0/imagebase3/large/FC/3/5/4/7/9200000051707453.jpg"
}
export let console3: console = {
    pk: 3,
    name: "Xbox 360 Slim",
    consoleType: consoleType.xbox360,
    description: "This version of the xbox 360 has a lot of memory. 500GB!",
    memory: "500GB",
    image: "https://static.raru.co.za/cover/2014/10/20/2136356-l.jpg?v=1413789188"
}
export let console4: console = {
    pk: 4,
    name: "Xbox one",
    consoleType: consoleType.xboxOne,
    description: "The xbox one in it's full glory",
    memory: "500GB",
    image: "https://i5.walmartimages.com/asr/ba224f43-000b-4966-b542-826bbb79f110_1.9e96259ce0161ada5f9ce7d14e0db4f2.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF"
}

