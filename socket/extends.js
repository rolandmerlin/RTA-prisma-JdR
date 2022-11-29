module.exports = {
    ws_extends:(ws)=>{
        ws.json=(data)=>{
            console.log("WS_JSON = ",data)
            ws.send(JSON.stringify(data))
        }
        ws.SendAction = (action, params) => { ws.json({ action, params, time:Date.now() }) }
    },
    wss_extends:(wss)=>{
        wss.json=(json)=>{
            let data = JSON.stringify(json)
            wss.clients.forEach(client => {
                if (client.readyState == WebSocket.OPEN)
                    client.send(JSON.stringify(data),{ binary: isBinary })
            })            
        }
        wss.SendAction = (action, params) => { wss.json({ action, params, time:Date.now() }) }
    }
}