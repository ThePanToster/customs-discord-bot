module.exports = {
    name: 'champ',
    description: "Losowanie postaci / buildu / summonerów",
    alias: ["champ", "champion", "c", "postac", "postać"],
    syntax: "champ [rola] [-b] [-s]", /* [-all] */
    execute(message, args){

        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        }

        var postac;
        var plik;

        if(args==''){
            var rola = getRndInteger(0, 4);
            switch(rola){
                case 0:
                    plik = require(`../champions/top.json`);
                break;
                case 1:
                    plik = require(`../champions/jungle.json`);
                break;
                case 2:
                    plik = require(`../champions/mid.json`);
                break;
                case 3:
                    plik = require(`../champions/adc.json`);
                break;
                default:
                    plik = require(`../champions/support.json`);
                break;
            }
            postac = getRndInteger(0, plik.champ.length-1);
            message.channel.send("Twój pick: "+`**${plik.champ[postac]}**`);
        }
        else{
            // var all = false;
            var role = 0;
            var b = false;
            var s = false;
            var summoner1;
            var summoner2;
            var build;

            for (var x of args){
                switch(x){
                    case 'top':
                        if (!role){
                            plik = require(`../champions/top.json`);
                            postac = getRndInteger(0, plik.champ.length-1);
                            role = 1;
                        }
                    break;
                    case 'jungle':
                        if (!role){
                            plik = require(`../champions/jungle.json`);
                            postac = getRndInteger(0, plik.champ.length-1);
                            role = 2;
                        }
                    break;
                    case 'jg':
                        if (!role){
                            plik = require(`../champions/jungle.json`);
                            postac = getRndInteger(0, plik.champ.length-1);
                            role = 2;
                        }
                    break;
                    case 'mid':
                        if (!role){
                            plik = require(`../champions/mid.json`);
                            postac = getRndInteger(0, plik.champ.length-1);
                            role = 3;
                        }
                    break;
                    case 'adc':
                        if (!role){
                            plik = require(`../champions/adc.json`);
                            postac = getRndInteger(0, plik.champ.length-1);
                            role = 4;
                        }
                    break;
                    case 'support':
                        if (!role){
                            plik = require(`../champions/support.json`);
                            postac = getRndInteger(0, plik.champ.length-1);
                            role = 5;
                        }
                    break;
                    case 'sup':
                        if (!role){
                            plik = require(`../champions/support.json`);
                            postac = getRndInteger(0, plik.champ.length-1);
                            role = 5;
                        }
                    break;
                    case '-b':
                        if (!b){
                            build = getRndInteger(0, 7);
                            b = true;
                        }
                    break;
                    case '-s':
                        if (!s){
                            summoner1 = getRndInteger(0, 8);
                            do{
                                summoner2 = getRndInteger(0, 8);
                            } while(summoner2==summoner1);
                            s = true;
                        }
                    break;
                    // case '-all':
                    //     if (!all){
                    //         all = true;
                    //     }
                    // break;
                }
            }
            /* Buildy:
            0 - AD
            1 - AP
            2 - armor
            3 - attack speed
            4 - magic resist
            5 - movement speed
            6 - life steal
            7 - lethality          */

            /* Summonery:
            0 - ghost'em
            1 - heal'em
            2 - barrier'ą
            3 - exhaust'em
            4 - flash'em
            5 - teleport'em
            6 - cleanse'm
            7 - ignite'm
            8 - smite'm            */

            var wiadomosc;
// Jeśli nie ma ani jednego prawdiłowego parametru
            if(!role && !b && !s){
                wiadomosc = "Nie ogarniam co to za parametr/y";
            }
// Jest jakiś dobry parametr, ale nie ustalona rola
            else if(!role){
// Losowanie roli
                var rola = getRndInteger(0, 4);
                switch(rola){
                    case 0:
                        plik = require(`../champions/top.json`);
                    break;
                    case 1:
                        plik = require(`../champions/jungle.json`);
                    break;
                    case 2:
                        plik = require(`../champions/mid.json`);
                    break;
                    case 3:
                        plik = require(`../champions/adc.json`);
                    break;
                    default:
                        plik = require(`../champions/support.json`);
                    break;
                }
                postac = getRndInteger(0, plik.champ.length-1); // Wylosowana rola to ${plik.champ[postac]}
                wiadomosc = "Twój pick: "+`**${plik.champ[postac]}**`;
                if(b){
                    wiadomosc += " pod **full ";
                    switch(build){
                        case 0:
                            wiadomosc += "AD**";
                        break;
                        case 1:
                            wiadomosc += "AP**";
                        break;
                        case 2:
                            wiadomosc += "armor**";
                        break;
                        case 3:
                            wiadomosc += "attack speed**";
                        break;
                        case 4:
                            wiadomosc += "magic resist**";
                        break;
                        case 5:
                            wiadomosc += "movement speed**";
                        break;
                        case 6:
                            wiadomosc += "life steal**";
                        break;
                        case 7:
                            wiadomosc += "lethality**";
                        break;
                    }
                }
                if(s){
                    wiadomosc += " z **";
                    switch(summoner1){
                        case 0:
                            wiadomosc += "ghost'em";
                        break;
                        case 1:
                            wiadomosc += "heal'em";
                        break;
                        case 2:
                            wiadomosc += "barrier'ą";
                        break;
                        case 3:
                            wiadomosc += "exhaust'em";
                        break;
                        case 4:
                            wiadomosc += "flash'em";
                        break;
                        case 5:
                            wiadomosc += "teleport'em";
                        break;
                        case 6:
                            wiadomosc += "cleanse'm";
                        break;
                        case 7:
                            wiadomosc += "ignite'm";
                        break;
                        case 8:
                            wiadomosc += "smite'm";
                        break;
                    }
                    wiadomosc += " i ";
                    switch(summoner2){
                        case 0:
                            wiadomosc += "ghost'em**";
                        break;
                        case 1:
                            wiadomosc += "heal'em**";
                        break;
                        case 2:
                            wiadomosc += "barrier'ą**";
                        break;
                        case 3:
                            wiadomosc += "exhaust'em**";
                        break;
                        case 4:
                            wiadomosc += "flash'em**";
                        break;
                        case 5:
                            wiadomosc += "teleport'em**";
                        break;
                        case 6:
                            wiadomosc += "cleanse'm**";
                        break;
                        case 7:
                            wiadomosc += "ignite'm**";
                        break;
                        case 8:
                            wiadomosc += "smite'm**";
                        break;
                    }
                }
            }
            else{
                wiadomosc = "Twój pick na ";
                switch(role){
                    case 1:
                        wiadomosc += "topa: ";
                    break;
                    case 2:
                        wiadomosc += "jungle: ";
                    break;
                    case 3:
                        wiadomosc += "mida: ";
                    break;
                    case 4:
                        wiadomosc += "adc: ";
                    break;
                    case 5:
                        wiadomosc += "supporta: ";
                    break;
                }
                wiadomosc += `**${plik.champ[postac]}**`;

                if(b){
                    wiadomosc += " pod **full ";
                    switch(build){
                        case 0:
                            wiadomosc += "AD**";
                        break;
                        case 1:
                            wiadomosc += "AP**";
                        break;
                        case 2:
                            wiadomosc += "armor**";
                        break;
                        case 3:
                            wiadomosc += "attack speed**";
                        break;
                        case 4:
                            wiadomosc += "magic resist**";
                        break;
                        case 5:
                            wiadomosc += "movement speed**";
                        break;
                        case 6:
                            wiadomosc += "life steal**";
                        break;
                        case 7:
                            wiadomosc += "lethality**";
                        break;
                    }
                }
                if(s){
                    wiadomosc += " z **";
                    switch(summoner1){
                        case 0:
                            wiadomosc += "ghost'em";
                        break;
                        case 1:
                            wiadomosc += "heal'em";
                        break;
                        case 2:
                            wiadomosc += "barrier'ą";
                        break;
                        case 3:
                            wiadomosc += "exhaust'em";
                        break;
                        case 4:
                            wiadomosc += "flash'em";
                        break;
                        case 5:
                            wiadomosc += "teleport'em";
                        break;
                        case 6:
                            wiadomosc += "cleanse'm";
                        break;
                        case 7:
                            wiadomosc += "ignite'm";
                        break;
                        case 8:
                            wiadomosc += "smite'm";
                        break;
                    }
                    wiadomosc += " i ";
                    switch(summoner2){
                        case 0:
                            wiadomosc += "ghost'em**";
                        break;
                        case 1:
                            wiadomosc += "heal'em**";
                        break;
                        case 2:
                            wiadomosc += "barrier'ą**";
                        break;
                        case 3:
                            wiadomosc += "exhaust'em**";
                        break;
                        case 4:
                            wiadomosc += "flash'em**";
                        break;
                        case 5:
                            wiadomosc += "teleport'em**";
                        break;
                        case 6:
                            wiadomosc += "cleanse'm**";
                        break;
                        case 7:
                            wiadomosc += "ignite'm**";
                        break;
                        case 8:
                            wiadomosc += "smite'm**";
                        break;
                    }
                }
            }
            message.channel.send(`${wiadomosc}`);
        }
    }
}