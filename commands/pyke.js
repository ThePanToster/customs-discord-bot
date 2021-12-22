module.exports = {
    name: 'pyke',
    description: "Losowanie jakiego skinka ma Rafał wybrać na Pyke'u",
    alias: ["pyke"],
    syntax: "pyke",
    execute(message, args){

        if(message.author.id != '440584458454958091'){
            message.channel.send("Nie jesteś prawdziwym mainem Pyke'a");
            return;
        }

        // Deklaracja funkcji do losowania liczb z przedziału
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        }

        var los = getRndInteger(1, 4);
        switch (los){
            case 1:
                message.channel.send("Picknij Sand Wraith");
                break;
            case 2:
                message.channel.send("Picknij Blood Moon");
                break;
            case 3:
                message.channel.send("Picknij Project");
                break;
            default:
                message.channel.send("Picknij PsyOps");
                break;
        }
    }
}