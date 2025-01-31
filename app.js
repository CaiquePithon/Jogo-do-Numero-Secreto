let listaNumerosSorteados = [];
let numberMax = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


exibirMensagemInicial();

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    // voice
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function verificarChute(){
    let chute = document.querySelector("input").value;
    if(chute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa"
        exibirTextoNaTela("h1","Acertou!");
        exibirTextoNaTela("p",`Você descobriu com ${tentativas} ${palavraTentativa}!`);
        document.getElementById("reiniciar").removeAttribute("disabled");
    }else{
        chute > numeroSecreto ? exibirTextoNaTela("p",`O numero secreto é menor que ${chute}`) : exibirTextoNaTela("p",`O numero secreto é maior que ${chute} `);
    }
    tentativas++;
    limparCampo();
}

function verificarNovoJogo(){
    let novoJogo = document.querySelector("input");
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

function exibirMensagemInicial(){
    exibirTextoNaTela("h1","Jogo do Número Secreto");
    exibirTextoNaTela("p",`Escolha um numero entre 1 e ${numberMax}`);
}

// Função para limpar o campo de ao chutar
function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

// Função para gerar um numero aleatorio, com uma persomnalização de lista, fazendo com que o mesmo numero sorteado não se repita.
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numberMax +1);
    let quantidadeNumerosEscolhidos = listaNumerosSorteados.length;

    if(quantidadeNumerosEscolhidos == numberMax){
        listaNumerosSorteados = [];
    }
    // includes é um metodo para verificar se um elemento está presente em uma lista
    if(listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        // push aloca um elemento em uma lista;
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

/*
let titulo = document.querySelector("h1");
titulo.innerHTML = "Jogo do Buceta Secreta";

let paragrafo = document.querySelector("p");
paragrafo.innerHTML = "Escolha um numero entre 1 e 10";
*/