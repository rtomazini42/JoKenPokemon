const state ={
    score:{
        playerScore: 0,
        computerScore:0,
        scoreBox: document.getElementById("score_points"),
    },
    cardsSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards:{
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    playerSides:{
        player1: "player-cards",
        player1BOX: document.querySelector("#player-cards"),
        computerBOX: document.querySelector("#computer-cards"),
        computer: "computer-cards",
    },
    button: document.getElementById("next-duel"),
};

;

const pathImages = "./assets/images/Pokemons/"
const cardData =[
    {
        id: 0,
        name: "Bulbassauro",
        type: "Paper",
        img: pathImages + "bulbassauro.png",
        WinOf: "Rock",
        LoseOf: "Scissors",
    },
    {
        id: 1,
        name: "Charmander",
        type: "Scissors",
        img: pathImages + "charmander.png",
        WinOf: "Paper",
        LoseOf: "Rock",
    },
    {
        id: 2,
        name: "Squirtle",
        type: "Rock",
        img: pathImages + "squirtle.png",
        WinOf: "Scissors",
        LoseOf: "Paper",
    },
    {
        id: 3,
        name: "Diglett",
        type: "Paper",
        img: pathImages + "dig.png",
        WinOf: "Rock",
        LoseOf: "Scissors",
    },
    {
        id: 4,
        name: "Enkas",
        type: "Scissors",
        img: pathImages + "enkas.png",
        WinOf: "Paper",
        LoseOf: "Rock",
    },
    {
        id: 5,
        name: "Evee",
        type: "Rock",
        img: pathImages + "evee.png",
        WinOf: "Scissors",
        LoseOf: "Paper",
    },
    {
        id: 6,
        name: "Pidgey",
        type: "Paper",
        img: pathImages + "pidgey.png",
        WinOf: "Rock",
        LoseOf: "Scissors",
    },
    {
        id: 7,
        name: "Pikachu",
        type: "Scissors",
        img: pathImages + "pikachu.png",
        WinOf: "Paper",
        LoseOf: "Rock",
    },
    {
        id: 8,
        name: "Slowpoke",
        type: "Rock",
        img: pathImages + "slowpoke.png",
        WinOf: "Scissors",
        LoseOf: "Paper",
    },
    {
        id: 9,
        name: "Vulpix",
        type: "Paper",
        img: pathImages + "vulpix.png",
        WinOf: "Rock",
        LoseOf: "Scissors",
    },
    {
        id: 10,
        name: "Zubat",
        type: "Scissors",
        img: pathImages + "zubat.png",
        WinOf: "Paper",
        LoseOf: "Rock",
    },
    
]

async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(idCard, fieldSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height","100px");
    cardImage.setAttribute("src","assets/images/Pokemons/backCard.png");
    cardImage.setAttribute("data-id",idCard);
    cardImage.classList.add("card");

    if(fieldSide === state.playerSides.player1){
        cardImage.addEventListener("click",()=>{
            setCardsField(cardImage.getAttribute("data-id"))
        });
        cardImage.addEventListener("mouseover", ()=>{
            drawSelectCard(idCard);
           
        });
    }


    return cardImage;
}

async function setCardsField(cardId){
    await removeAllCardsImage();
    let computerCardId = await getRandomCardId();

    state.fieldCards.player.style.display ="block";
    state.fieldCards.computer.style.display ="block";

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
    console.log(cardData[computerCardId].img);
    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);

}

async function resetDuel(){
    state.cardsSprites.avatar.src = "";
    state.button.style.display = "none";
    state.fieldCards.player.style.display = "none"
    state.fieldCards.computer.style.display = "none"
     init();
}


async function updateScore(){
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`
}

async function checkDuelResults(playerCardId, computerCardId){
    let duelResults = "Empate";
    let playerCard = cardData[playerCardId];
    let computerCard = cardData[computerCardId];
    if(playerCard.WinOf.includes(computerCard.type)){
        duelResults= "Ganhou";
        state.score.playerScore++;
        await playAudio("win");
    }
    if(playerCard.LoseOf.includes(computerCard.type)){
        duelResults = "Perdeu";
        state.score.computerScore++;
        await playAudio("lose");
    }
    if (duelResults == "Empate"){
        playAudio("draw");
    }
    return duelResults;
}

async function drawButton(text){
    state.button.innerText = text;
    state.button.style.display = "block";
}

async function removeAllCardsImage(){
    let cards = state.playerSides.computerBOX;
    let imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    cards = state.playerSides.player1BOX;
    imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());


}

async function drawSelectCard(index){
    state.cardsSprites.avatar.src = cardData[index].img;
    state.cardsSprites.name.innerText = cardData[index].name;
    state.cardsSprites.type.innerText = "Atributo: " + cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide){
    for(let i = 0; i<cardNumbers;i++){
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard,fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage); 
    }
}


async function playAudio(status){
    const audio = new Audio(`/assets/audio/${status}.mp3`);
    audio.play();
}


function init(){
    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.computer);

}


function audioFundo(){
    const bgm = document.getElementById("bgm");
    bgm.play();

}
audioFundo();
init();