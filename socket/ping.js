const Login = (msg,io,socket,crud,prisma) => {

}

const Logout = (msg,io,socket,crud,prisma) => {

}

const AuthToken = (msg,io,socket,crud,prisma) => {

}

module.exports = (msg,io,socket,crud,prisma) => {
    if (typeof msg.action == 'undefined') return 
    switch(msg.action){
        case 'ping' :return ws.SendAction('pong',{})
    }
}