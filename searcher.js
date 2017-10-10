class ProductLink {
    constructor(n, i, p) {
        this.name = n;
        this.imagelink = i;
        this.pagelink = p;
    }
    makelink() {
        return "<a href= " + this.pagelink + "><img src=" + this.imagelink + " /><h2></br>" + this.name + "</h2> Naar Product</a>";
    }
}
var array1 = [new ProductLink("DOOM", "\"Images/doom-cover-new.jpg\"", "\"ConsoleChoiceDoom.html\"")];
// document.getElementById("searchres").innerHTML = array1[0].makelink();
document.write(array1[0].makelink());
//# sourceMappingURL=searcher.js.map