import { carregarContatos } from "./carregarContatos.js";
import { adicionarContato } from "./adicionarContato.js";


document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactsForm");

    // Carrega os dados dos contatos
    carregarContatos();

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submited = await adicionarContato(form);

        console.log(submited);

        if (submited) {
            form.reset(); // Limpa o formulário
            carregarContatos(); // recarrega a lista de contatos
        }
    });
});
