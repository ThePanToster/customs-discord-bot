module.exports = {
    name: 'powiedz',
    description: "Bot mówi co chcesz",
    alias: ["powiedz", "say"],
    syntax: "powiedz <treść wiadomości>",
    execute(message, args){
        var wiadomosc="";
        if(args!=''){
            for (var x of args)
                wiadomosc += x+" ";
            message.channel.send(wiadomosc);
        }
    }
}