import { carregarDadosContato } from "./carregarUmContato.js";
import { salvarEdicao } from "./atualizarContato.js";

document.addEventListener("DOMContentLoaded", async () => {

    const urlParams = new URLSearchParams(window.location.search);

    const id = urlParams.get("id");
       
    if(id){
        await carregarDadosContato(id);
    }
});