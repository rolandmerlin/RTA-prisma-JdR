const GetTerrain = async(msg,wss,ws,crud,prisma) => {
    ws.SendAction('terrain:get', {'terrain': await prisma.terrain.findMany()})
}

module.exports = (msg,wss,ws,crud,prisma) => {
    if (typeof msg.action == 'undefined') return 
    switch(msg.action){
        case 'terrain:get' :return GetTerrain(msg,wss,ws,crud,prisma)
    }
}