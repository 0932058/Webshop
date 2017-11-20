using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace reactTwo.Controllers
{
    [Route("api/[controller]")]
    public class ItemsController : Controller
    {

        [HttpGet("[action]/{cat}")]
        public Game[] Games(string cat)
        {
            Game[] gamesList = new Game[10];

            for(int i = 0; i < 10; i++){
                gamesList[i] = new Game(i);
            }

            return gamesList;
        }

        [HttpGet("[action]")]
        public Game[] Home()
        {
            Game[] gamesList = new Game[10];

            for(int i = 0; i < 10; i++){
                gamesList[i] = new Game(i);
            }

            return gamesList;
        }
    }

    /*
    [Route("api/[controller]")]
    public class ConsoleController : Controller
    {

        [HttpGet("[action]/{cat}")]
        public Console[] Consoles(string cat)
        {
            
        }
    }*/


    /*
    [Route("api/[controller]")]
    public class AccecssoiresController : Controller
    {

        [HttpGet("[action]/{cat}")]
        public Accessoires[] Accessoires(string cat)
        {
            
        }
    }*/

    public class Accessoires {
        public string name {get; set;}
        public string img {get; set;}
        public int price {get; set;}
        public int id {get; set;}

        public Accessoires(int id){
            this.name = "beatiful game";
            this.price  = 50;
            this.id = id;
            this.img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX///8BAQEAAADV1dXz8/MdHR38/Pz5+fnq6urZ2dmYmJjg4OC6urrm5uarq6vOzs6IiIg2NjaxsbFsbGx1dXVVVVXBwcFMTEwnJydBQUFaWlrQ0NCCgoJlZWVGRkZ7e3sODg4zMzOOjo4bGxskJCSkpKQNDQ0tLS2cnJwWFhZHgIkuAAAJo0lEQVR4nO1daVvyOhB9CaLsIigoCKKC6P//gxdKW5plkplkUpab85GH9mSaZDJbkn//EhISEhISEhISEhISEhISEhISEhISEhISEhISEvzQ2S43rQN2y1F/UBPpoD9a7jLWzWTbicnUG/0JCZtRLyZfTtqSSb9Hsb7s+HP/+oaE/Q9P00h0R/R3RtJ+BKrfhkaV063iDdbeG0S63jJTDY1MBV+ML3rA2EYqxoxMvSeYKmPjJDvBImDGyjd4ulamjGzBxVVB0037y0LUtndgztVm4ZJ4MbSru3CiqZvowNUKZ1KwQfGKx1Ae5wgtqF44pKrgBckrApXqBCngnuqdR7Ic72jeMGLkhzwyDbmk+5etTnjiiT/PHC8gr0J1qlEmEQk9eGTiUqgINSozP/vxPNNo9kQbJglRalRi/vKh6VJp2BQqcew0PK0q3DqoMnEoVLQalUQku43UqVAQhStUghqtMv88EHmefGg4/Iy+l4D0GfLlR3MQMcwj9pocR2LS8CGtRypTiMGPNRKNxJTFaufNc2Ca+Rr87ZW/gHviGZ7pN4Ank7FLnfYHPHyFyEfSAXdhTFmI4YMahOs8WwIlWFos2SSQ6Sjj5n3cabfv3Gi3m+OPv2D5GnjTpsfA1ciEpICHEqcBSB6Fi7I26Y58KJuKqQvPAlwnMszC8wEzE/0M0kuBEPdOCb3ttYggTFiE7XaBXSjE87Q36AzfEG0TO5eAfcRL4uhBmK+0AhFmudtRdPnXB6FeRtv+tPPYH3YnrfhCVleAu1e3iB92AR0G216cUVOay4PhU1wZxbxK59aDLtNtbM/2vJrCIZ1lRBnVFW7o7kS7/W0bpLCP2cPoAD9oVoq7E+fGNuZ4sKUklxaXyC+4goCWeXEaJELYXDdYk7qCBAO3DvCC5ri7g5zWOAr4gdwh+/u3KCJqNgpiItqC/NBYEwLh0NIDuQj49KFFmz6CAjbdAnpHIO3NVYfcEmGSwFnTD/PT2ADIw5pfRDXpco+x3GAv8RuQ0GEmlOjwa1Q1RojJpsApd8D3JeToPbI5zuY+kb+hEFAZytYsIKUYoBVBxKWzD7RHoNy+WRmSEgK+WQdre3fFJ0aXTQBmjXkSI/VoAXJyE9Ng8drtT8f4gCq0XpjXCrGiCGg33fEiycLovqjDNQUm1sgsIS27arFsCfJ9rt7MpZDlP3arN0sQGQhIGRdsbJC1RGiobt/sbUa5mMMWVjdbQjpgtY94MzXN7PwSB2nwMBWVJf4RWL3mpa3aAWwMc79Mza/rEiVsB0pYtUcGxvLZyuoBxiSM/oXZZKNXxgVNRHl9N4WexLf0DyCXazTczIs1aB6AmAVlVxUnbaVLqNjIZkvcFFS8AwwaqoD0QqMqnVpzpM1qLagNrHEGRx+YhnQJfcphSjrVxtdmtW5hAcNUn13maL4y6jEIsb41vabZWfoEAyTUNaQ5CHEFEjbMDdfKFgBbpO5RqrZfH6WaUQ01XA3wNKGlkyxhkKZ5VV7mq2n2f1QjS1AI60pXC4M9DX358674BndTrKV/gNVbmlr+g/5Yt9VWbZi/1aYPePCflFKqDIgEpFXCSjwXsrxfTpb3j8XDktf8BRzsJhZwMXhP44yyB/tGuX81+LDMCDVVCsfKz+IBr+azV7sH/DZ/0bdD2hoOq/izRTHUmIXhF/tL5LUVTqsQK6hjpKDIkajjU5IGscXK7RlHBd4lvramkqOJx8ckY6VnTf0S9sJECCZWvQlS2kDKB5hdp+Kf543qf1YJFgQRJWPF3jL0LooomRnZvjSHPM2PVmP79kUMW39/DxlGAVATuoT6Zck8cmhApD7VzeRwaB8XX/0q2bjuPcWISn9EdpYOjyz3qdGnp4wWrvJvZy9GSeM3NP8Ub1JUuwXyIqW/2zPd7c8oAup9SNgpUekVdwWHHG7XESNveKRVF2NCCKFimaJU8F4GqBsHL/GqvkYKF2VBPPm2SP0kxKdJxkMKKJaAmvdGsewrKw26EGYvyvujXH25dTgxoZAnB2k7T8X2pvT8oYL2a/jY6fUW/d/Jdw0VtJU4ygOpKEn8lM/R2lh3EbSYFAO1aY7+wk+WE8mnnfVVvB8KkxeDQa8PJoXBJ4tQqNWzuAT4jpjSu8Ash1eJ0kq5xE0kLCiVFFCSeP0ozYWQTMNFowyPRyrRPj9KDzFC4etloIgwBW9svlgUycbr3nFoQ1EaNbhVAUsvH+HhXytyLz8w43fJyM02lnTRZSI328wF7DeBPFJzs2ZpGdi/WbO0UVRDX/URA3bkqYso0fjLQB5tixOOvwjkzkWcrZEXgTxDf7POUxkxvVnnqXQQb9a1KIvbblnC9c1LKP4vEjK+kAl8DToIeM/0vkPLZqNtf9EMwaK/Hc3YhDxKSMw8wS9bTn3OEjThYUpOwkCNOrzOvB2I/KoZ710eHZ7jUtgk5DrDv4ovDhG5JAw9ltUM++UPyJbds0jIcHy/EQwlLFmdQ7CmiXWBB0cEKZMweLXQSl74EBx+YFnxlW0uvADOIqFKGPSWGNeTnBBYk8til0ZYJ6oI2evHIyHbbQEQwlq3zt4RdrR1nIXihKCcQ14GHxJrY79eRkdI4WoeiQpQyagzwAIRUs+Ux0sJBf7aG5aO5nEg4AixPKrvXxIFH8jECcouErWBx4MC/YeB7/0uRPjX++QegbtSH3o+6mJ/gncavmig96ZI0q62EPjmHcoSak99HOfGPBOADcHuFhYms2eK1HxUURR4dmK5Jc1TmUZx7M3wVIal42rbX2l5/NPaKF74WZanxczraqcau9D39qmyVt/Lbovq+Orw0YaV5drHfq+1C/1mYqWJHvWXNSrSI+jqVNpQRHag4vuFKuhrouQWkIv3avALVZCtU3keET9QHX6hCmpQSvxJjxNr22pyKmQQNb5ysg5N15APxGQBtY1Kro9km4bewesJ0mVpWiSe8oFqtdeqINhuhpOD8DPR40ZMJgBHrhkbaQhUo0uj0AeY8wO9kVs7+O0AbMBHrN1XKsUCNhwBDDNcVJF4+jUzkN0AncGGMf2E3+XCbMAdHQBZXHfw6Wenh6nnt3ED0Q1iA84jxF1DP+dY66twL2tibWmjK3RaT5DbDtftAVYB971oPcrqvFqmgN2PEk+OUXZvOcSjvgCpHRYRBSZXNATK5sQ5XCYzmnATUffFtI23jAVcZMyPtqnqbd/qZ2wTmxO95LMVeqU4L8ZrvYnPlDHWHs7/Wies3uuNrGEwfV9VWvi9HF7OEEtISEhISEhISEhISEhISEhISEhISEhISEhISLhQ/AcKJZwHc796zgAAAABJRU5ErkJggg==";
        }
    }

    public class Console {
        public string name {get; set;}
        public string img {get; set;}
        public int price {get; set;}
        public int id {get; set;}

        public Console(int id){
            this.name = "beatiful game";
            this.price  = 50;
            this.id = id;
            this.img = "data:image/png;base64,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";
        }
    }

    public class Game {
        public string name {get; set;}
        public string img {get; set;}
        public int price {get; set;}
        public int id {get; set;}

        public Game(int id){
            this.name = "beatiful game";
            this.price  = 50;
            this.id = id;
            this.img = "data:image/png;base64,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";
        }
    }
}
