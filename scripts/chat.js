class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }
    async addChat(message) {
        //format chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            createdAt:firebase.firestore.Timestamp.fromDate(now)
        };
        //save the chat document
        const response = await this.chats.add(chat);
        return response; 
    }
    getChats(){
        this.chats.onSnapshot(snapshot = > {
            
        })   
    }
}

const chatroom = new Chatroom('general', 'Jolly');

chatroom.addChat('hello guy')
.then(() => console.log('chat added'))
.catch(err=> console.log(err));