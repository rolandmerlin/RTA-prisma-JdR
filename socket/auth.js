const md5 = require('md5')

const md5_password = (pass) => md5(process.env.PasswdKey+''+pass)

const verif_login = ( l ) => /[A-Za-z][A-Za-z0-9]{3,255}/.test(l)
const verif_password = ( l ) => /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,32}$/.test(l)
const verif_email = ( l ) => /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(l)

const Auth = async(msg,wss,ws,crud,prisma) => {
    const { login, password } = msg.params
    let U = []
    try {
        U = await prisma.user.findMany({ where:{ pseudo:login, passwd:md5_password(password) } })
    } catch (e){
        console.log('Error auth find user = ',e)
    }
    if (U.length>0){ /// Authentification success
        U=U[0]
        let token = md5(process.env.TokenKey+''+Date.now()+''+U.id)
        try {
            U = await prisma.user.update({ where:{ id:U.id }, data:{ token } })
        } catch (e){
            console.log('Erreur auth update user',e)
            return
        }
        
        ws.user = U
        ws.acl = await prisma.aCL.findMany({ where:{ userId:U.id } })
        console.log(ws.acl)
        ws.json({
            action:'success',
            params:{
                success:'auth:accept',
                user:{ id:U.id, pseudo:U.pseudo, token }
            }
        })
    } else {    /// Authentification fail
        ws.user = false
        ws.SendAction('error',{error:'failAuth'})
    }
}

const Register = async(msg,wss,ws,crud,prisma) => {
    const { pseudo, email, password } = msg.params
    console.log('Register')
    if (!verif_login(pseudo))       return ws.SendAction('error',{error:'verif:login'})
    if (!verif_email(email))        return ws.SendAction('error',{error:'verif:email'})
    if (!verif_password(password))  return ws.SendAction('error',{error:'verif:password'})
    try {
        let u = await prisma.user.create({ data:{ pseudo, email, passwd:md5_password(password) } })
    } catch (e){
        return ws.SendAction('error',{error:'RegisterError'})
    }
    return ws.SendAction('success',{msg:'RegisterOK'})
}

const Logout = async(msg,wss,ws,crud,prisma) => {
    console.log(ws.user)
    if (!ws.user){
        console.log('-- WS.USER = undefined --')
        ws.SendAction('success',{success:'Logout'})
        return
    }
    try {
        let u = await prisma.user.findMany({ where:{ id:ws.user?.id||0 } })
        console.log('Result Query = ',u)
        if (u.length>0){
            u=u[0]
            if(u.token==ws.user.token){
                console.log('Query update = ', { where:{ id:ws.user?.id }, data:{ token:'' }})
                prisma.user.update({ where:{ id:ws.user?.id }, data:{ token:'' }})
                ws.user = undefined
                ws.acl  = undefined
                ws.SendAction('success',{success:'Logout'})                
            } else {
                ws.SendAction('error',{error:'logout'})
            }
        }
    } catch (e) {
        console.log(e)
        ws.SendAction('error',{error:'logout'})
    }
}

const ReAuth = async(msg,wss,ws,crud,prisma) => {
    const { token } = msg.params
    console.log('Reauth Token = ', token ,msg.params)
    if (!token){
        ws.user = undefined
        ws.acl  = undefined
        ws.SendAction('error',{error:'NoToken'})
        return
    }
    let u = []
    try {
        u = await prisma.user.findMany({ where:{ token } })
    } catch (e) {
        console.log("Error = ",e)
        ws.SendAction('error',{error:'ReAuthError'})
        return
    }
    if (u.length>0){
        ws.user = u[0]
        const { id, pseudo, token } = u[0]
        ws.SendAction('success',{ success:'ReAuth', user:{id, pseudo, token }})
        return
    }
    ws.SendAction('error',{ error:'ReAuthNotFound' })

}

module.exports = (msg,wss,ws,crud,prisma) => {
    if (typeof msg.action == 'undefined') return 
    switch(msg.action){
        case 'auth:login'      : return Auth(msg,wss,ws,crud,prisma)
        case 'auth:logout'     : return Logout(msg,wss,ws,crud,prisma)
        case 'auth:register'   : return Register(msg,wss,ws,crud,prisma)
        case 'auth:reauth'     : return ReAuth(msg,wss,ws,crud,prisma)
    }
}