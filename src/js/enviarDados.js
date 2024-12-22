async function enviarContato(event){
    
    event.preventDefault();

    const form = document.querySelector("#contactsForm");

    // Valida se todos os campos estão preenchidos
    if(!form.checkValidity()){
      alert("Todos os campos são obrigatórios!");
      form.reportValidity();    // exibe mensagens de erro específicas para os campos inválidos
      return;
    }

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

        // Envia os dados pro back e guarda a resposta
        const response = await fetch('../php/crud_contatos.php&action=create', {
            method: "POST",
            body: formData
        });

        // Verifica se a resposta foi bem-sucedida
        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.statusText}`);
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