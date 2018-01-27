

export default ((wsUrl)=>
{
    let ws;
    ws= new WebSocket(wsUrl);
    ws.onopen=()=>
    {
        console.log("WS Opened!")
    }
return ws;
})("ws://localhost:3000")