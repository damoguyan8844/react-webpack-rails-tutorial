class RBSubscribeService{

    constructor(){
        this._listeners = {};
        socket.on('message',function(message){
            var list = this._listeners['message']?this._listeners[eventType]:[];
            for (var i=0; i<list.length; i++ ){
                list[i](message);
            }
        })
    }
    subscribe(eventType,listener){
        if(listener && typeof(listener) == 'function'){
            var list = this._listeners[eventType]?this._listeners[eventType]:[];
            list.push(listener);
            return function(){
                this.unsubscribe(eventType,listener);
            }
        }
        return null;
    }
    unSubscribe(eventType, listener){
        if(listener){
            var list = this._listeners[eventType]?this._listeners[eventType]:[];
            var index = list.indexOf(listener);
            if(index != -1){
                list.splice(index,1);
                return true;
            }
        }
        return false;
    }
}