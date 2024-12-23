async function enviarContato(event){
    
    event.preventDefault();
    
    const form = document.querySelector("#contactsForm");
    const url = "../../php/crud_contatos.php?action=create";

    // Cria um objeto FormData com os dados do formulário
    const formData = new FormData(form);

    // processando os dados coletados
    const data = {};
    formData.forEach((value, key) =>{
        data[key] = value;
    });

    console.log("Dados do formulário:", data);
    
    // Envia os dados pro back
    try{
        
        const response = await fetch('../../php/crud_contatos.php?action=create', {
            method: 'POST',
            body: formData,
        });
        
        const text = await response.text();
        console.log('Resposta bruta:', text);  // Exibe a resposta antes de tentar analisar

        try {

            const result = JSON.parse(text);
            console.log('Resultado da requisição:', result);
            alert(result.message); // Mostrar a mensagem do PHP
            form.reset(); // Limpa o formulário

        } catch (error) {
            console.error('Erro ao processar JSON:', error);
            console.log('Texto da resposta:', text);  // Exibe o texto para ajudar na depuração
            alert('Erro ao processar a resposta do servidor.');
        }
        

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