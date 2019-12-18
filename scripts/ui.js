class ChatUI{
    constructor(list){
        this.list = list;
    }
    // clear(){
    //     this.list.innerHTML = '';
    // }
    clear(){
        this.list.innerHTML = '';
    }
    render(data){
        //metodo attenuto tramite script data su pagina index 
        const when = dateFns.distanceInWordsToNow(
            data.createdAt.toDate(),
            {addSuffix:true}
    );
    const html = `
        <li class="list-group-item">
            <span class="username">${data.username}</span>
            <span class="message">${data.message}</span>
            <div class="time">${when}</div>     
    `;
    this.list.innerHTML += html;
    }
}