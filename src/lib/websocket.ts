import { Tmessage } from '../type'

type FnMessage = {
    key:string
    fn:(o:Tmessage)=>void
}
type WsMessage = {
    action:string
    params:Tmessage
}

export type TSocket = {
    init:(v:boolean)=>void
    OnMessage:(def:string,fn:(msg:Tmessage)=>void)=>void
    OnDisconnect:(fn:()=>void)=>void
    OnError:(fb:()=>void)=>void
    SendAction:(action:string,params:Tmessage)=>void
}

class Socket {
    private sck:WebSocket
    private autoreconnect = true
    private fn_message:FnMessage[] = []
    private fn_reconnect = ():void =>{}
    private fn_disconnect = ():void => {}
    private fn_error = (event:Event):void => {}
    private firstInit:boolean = true
    constructor(){
        this.sck = new WebSocket('ws://localhost:3001')
        this.init(false)
    }
    init(init:boolean=true){
        if (init) this.sck = new WebSocket('ws://localhost:3001')
        this.sck.onopen = () => {
            this.SendJson({action:'Hello',params:{ date:Date.now() }})
            if (!this.firstInit) this.fn_reconnect()
            this.firstInit = false
        }
        this.sck.onmessage = (event:MessageEvent) => {
            let data:WsMessage
            try { data = JSON.parse(event.data) } catch { data = { action:'commun', params: event.data} }
            console.log("WebSocket ",data)
            this.fn_message.find((FN:FnMessage) => (new RegExp(data.action)).test(FN.key))?.fn(data.params)
        }
        this.sck.onclose = (event:Event) => {
            if (this.autoreconnect){
                this.fn_disconnect()
                this.init()
                this.fn_reconnect()
            }
        }
        this.sck.onerror = (event:Event) => { this.fn_error(event) }
    }
    OnMessage(definition:string,fn:(message:Tmessage)=>void){ this.fn_message.push( { key:definition, fn } ) }
    WaitForConnection(fn:()=>{},interval:number=100){
        if (this.sck.readyState === 1){
            fn()
        } else {
            let that = this
            setTimeout(()=>{ that.WaitForConnection(fn,interval) },interval)
        }
    }
    SendJson(data:object){
        this.WaitForConnection(()=>{
            this.sck.send(JSON.stringify(data))
        },100)
    }
    OnReconnect(fn:()=>void){ this.fn_reconnect = fn }
    OnDisconnect(fn:()=>void){ this.fn_disconnect = fn }
    OnError(fn:()=>void){ this.fn_error = fn }
    SendAction(action:string,params:object){ this.SendJson({ action, params, time:Date.now() }) }
}

export default Socket