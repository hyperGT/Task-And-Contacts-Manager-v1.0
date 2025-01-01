export async function buscarContato(id) {

    try{
        
        // Chama a função fetch para fazer a requisição HTTP
    const response = await fetch(`../../php/crud_contatos.php?action=get&id=${id}`);
    const result = await response.json();


    // verifica se a resposta foi bem-sucedida
    if (result.status === 'success') {
                
        // Retorna o contato encontrado
        console.log("Dados do contato encontrados: ", result.data);

        // Chama a função editPage para preencher os dados do contato na página de edição
        editPage(result.data);
        
    }else{
        console.error("O contato não foi encontrado");
        return null;
    }
    

    }catch(e){
        console.error("Ocorreu um erro ao buscar o contato: ", e);
        return null;
    }
    
}
