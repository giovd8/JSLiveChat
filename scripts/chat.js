class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message) {
        //format chat object
        const now = new Date();
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            createdAt:firebase.firestore.Timestamp.fromDate(now)
        };
        //save the chat document
        const response = await this.chats.add(chat);
        return response; 
    }
    getChats(callback){
        this.unsub = this.chats
            .where('room','==', this.room)//aggiungo delle condizioni, filtro i messaggi da visualizzare
            .orderBy('createdAt')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => { //verifico in ogni momento se ci sono stati cambiamenti
                    if(change.type === 'added'){
                        //update UI
                        callback(change.doc.data());        
                    }
                });
            });   
    }
    updateName(username){
        this.username = username;
        localStorage.setItem('username',username);
    }
    updateRoom(room){
        this.room = room;
        if(this.unsub) {
            this.unsub();
        }
    }
}
// chatroom.addChat('hello guy')
// .then(() => console.log('chat added'))
// .catch(err=> console.log(err));
