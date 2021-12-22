module.exports = {
    name: 'ping',
    description: "Testowanie czy bot odpowiada",
    alias: ["ping"],
    syntax: "ping",
    execute(message, args){
        message.channel.send('pong!');
    }
}