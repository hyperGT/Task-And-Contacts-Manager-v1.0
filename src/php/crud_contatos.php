<?php

include "conexao.php";

// verifica se a ação foi passada
if(!isset($_REQUEST['action'])){
    die("Nenhuma ação específicada");
}

$action = $_REQUEST['action'];


switch($action){

    case 'create':

        $nome = $_POST['name'];
        $email = $_POST['email'];
        $telefone = $_POST['phone'];
        $endereco = $_POST['address'];
        $data_aniversario = $_POST['birthday'];
        $notas = $_POST['notes'];
        $favorito = isset($_POST['favorite']) ? 1 : 0;

        $sql = $conn->prepare('INSERT INTO contatos (nome, telefone, email, endereco, data_aniversario, favorito, notas) VALUES (?, ?, ?, ?, ?, ?, ?)');
        $sql->bind_param('ssssis', $nome, $telefone, $email, $endereco, $data_aniversario, $favorito, $notas);
        
        $sql->close();
        
        break;
    default: 
        echo "Ação inválida";
        break;

}
