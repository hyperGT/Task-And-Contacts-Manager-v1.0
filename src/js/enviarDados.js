function enviarContato(event){
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
    fetch('../php/crud_contatos.php&action=create', {
        method: "POST",
        body: formData
    })
    .then((data) => {        
        console.log(data);
        alert("Contato enviado com sucesso!");        
    }).catch((err) => {
        alert("Ocorreu um erro ao enviar o formulário.");
    });

}