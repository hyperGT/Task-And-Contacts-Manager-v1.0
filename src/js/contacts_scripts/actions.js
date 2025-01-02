// Função para abrir a página de edição de um contato
function abrirPaginaEdicao(id){
    console.log("Ola");
    window.location.href = `./editar.html?id=${id}`;
}

// Função para preencher o formulário com os dados do contato
function preencherFormulario(contato) {

    document.getElementById(editName).value = contato.nome;
    document.getElementById(editPhone).value = contato.telefone;
    document.getElementById(editEmail).value = contato.email || "";
    document.getElementById(editAddress).value = contato.endereco || "";
    document.getElementById(editBirthday).value = contato.data_nascimento || "";
    document.getElementById(editNotes).value = contato.notas || "";
    document.getElementById(editFavorite).value = contato.favorito;

}