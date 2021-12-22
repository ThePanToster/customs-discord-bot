module.exports = {
    name: 'jhin',
    description: "Losowanie jakiego skinka ma Błażej wybrać na Jhinie",
    alias: ["jhin"],
    syntax: "jhin",
    execute(message, args){

        if(message.author.id != '229219961296519169'){
            message.channel.send("Nie jesteś prawdziwym mainem Jhina");
            return;
        }

        // Deklaracja funkcji do losowania liczb z przedziału
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        }

        var los = getRndInteger(1, 5);
        switch (los){
            case 1:
                message.channel.send("Picknij High Noon");
                break;
            case 2:
                message.channel.send("Picknij Blood Moon");
                break;
            case 3:
                message.channel.send("Picknij SKT T1");
                break;
            case 4:
                message.channel.send("Picknij Project");
                break;
            default:
                message.channel.send("Picknij Dark Cosmic");
                break;
        }
    }
}