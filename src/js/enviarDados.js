async function enviarContato(event){
    
    event.preventDefault();
    
    const form = document.querySelector("#contactsForm");
    const url = "../../php/crud_contatos.php?action=create";

    // Cria um objeto FormData com os dados do formulário
    const formData = new FormData(form);
    console.log("Dados enviados:", Object.fromEntries(formData.entries()));


    // Envia os dados pro back
    try{
        
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        
        const result = await response.json();
        console.log('Resultado da requisição:', result);      

    } catch(error){

        // Mostra a mensagem de erro no console
        console.error("Erro ao enviar o formulário: ", error);
        alert("Ocorreu um erro ao enviar o formulário.");
    }
}

async function cadastrarTarefa(event) {

    event.preventDefault();

    const form = document.querySelector("#taskForm");
}