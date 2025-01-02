export async function salvarEdicao(event){

    event.preventDefaut();
    
    const url = "../../php/crud_contatos.php?action=update";
    const form = document.getElementById("editForm");
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // incluindo o id no objeto data
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    data.id = id;

    try{
        
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(result.status === 'success'){
            alert("Contato editado com sucesso!");
            window.location.href = "./home.html";
        }else{
            alert("Erro ao editar o contato.");         
        }

    }catch(e){
        console.error("Erro ao salvar a edição: ", e);
    }
    
}