class ProductLink
{
    name: string;
    imagelink: string;
    pagelink: string;
    constructor( n: string, i: string, p: string){
        this.name = n;
        this.imagelink = i;
        this.pagelink = p;
    }
    makelink() {
        return "<a href= " + this.pagelink + " ><img src=" + this.imagelink + " /><h2></br>" + this.name + "</h2>Naar Product</a>";
    }
}

var array1 = [new ProductLink("DOOM", "\"Images/doom-cover-new.jpg\"", "\"ConsoleChoiceDoom.html\""), new ProductLink("Call of Duty: Advanced Warfare", "\"Images/COD-AW-cover.jpg\"", "\"ConsoleChoiceAW.html\""), new ProductLink("PlayerUnknown's Battlegrounds", "\"Images/PUBG-cover.jpg\"", "\"ConsoleChoiceBATTLE.html\""), new ProductLink("Xbox console", "\"Images/Xbox.jpeg\"", "\"XBoX.html\"")]
document.getElementById("search1").innerHTML = array1[0].makelink();

document.getElementById("search2").innerHTML = array1[1].makelink();

document.getElementById("search3").innerHTML = array1[2].makelink();

document.getElementById("search4").innerHTML = array1[3].makelink();