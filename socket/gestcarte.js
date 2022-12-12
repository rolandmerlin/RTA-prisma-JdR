const GetTerrain = async(msg,wss,ws,crud,prisma) => {
    ws.SendAction('carte:get', {'terrain': await prisma.terrain.findMany({orderBy:{ name:'asc' }})})
}
const PostTerrain = async(msg,wss,ws,crud,prisma) => {
    
}
const PutTerrain = async(msg,wss,ws,crud,prisma) => {

}

const Delete = async (msg,wss,ws,crud,prisma) => {

}

module.exports = (msg,wss,ws,crud,prisma) => {
    if (typeof msg.action == 'undefined') return 
    switch(msg.action){
        case 'carte:get'   : return GetTerrain(msg,wss,ws,crud,prisma)
        case 'carte:post'  : return PostTerrain(msg,wss,ws,crud,prisma)
        case 'carte:put'   : return PutTerrain(msg,wss,ws,crud,prisma)
        case 'carte:delete': return DeleteTerrain(msg,wss,ws,crud,prisma)
    }
}