export async function carregarContatos() {
    
    const url = "../../php/crud_contatos.php?action=read";

    try {
        // Chama a função fetch para fazer a requisição HTTP
        const response = await fetch(url);
        const contatos = await response.json();
        
        
        // verifica se a resposta foi bem-sucedida
        if (contatos.status === 'success') {
            
            const contatosList = contatos.data;            

            const lista = document.getElementById("contacts");

            // Limpa a lista anterior
            lista.innerHTML = "";

            // Itera sobre os contatos e adiciona uma entrada na lista
            contatosList.forEach(contato => {
                const li = document.createElement("li");
                li.innerHTML = `
                    ${contato.nome} - ${contato.telefone}
                    <button onclick="editarContato(${contato.id})">Editar</button>
                    <button onclick="apagarContato(${contato.id})">Apagar</button>
                `;
                lista.appendChild(li);
            });
        }else{
            console.error("Ocorreu um erro ao buscar os contatos");            
        }
    }catch(e){
        console.error("Ocorreu um erro ao carregar os contatos: ", e);        
    }
}

// chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", carregarContatos);