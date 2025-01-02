export async function adicionarContato(form){   
    
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

        if(!response.ok){
            return false;
            // throw new Error('Erro na requisição. Status:', response.status);
        }else{

            const result = await response.json();
            console.log('Resultado da requisição:', result);                      
            return true;
        }

    } catch(error){

        // Mostra a mensagem de erro no console
        console.error("Erro ao enviar o formulário: ", error);
        return false;
    }
}
