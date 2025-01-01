<?php
include "conexao.php";

header('Content-Type: application/json; charset=utf-8');

ob_start(); // Inicia o buffer de saída

// verifica se a ação foi passada
if(!isset($_REQUEST['action'])){
    echo json_encode([
        'status' => 'error',
        'message' => 'Nenhuma ação especificada'
    ]);
    exit; 
}

$action = $_REQUEST['action'];

try{

    switch($action){
    
        case 'create':
    
            $nome = $_POST['name'] ?? null;
            $telefone = $_POST['phone'] ?? null;
            $email = $_POST['email'] ?? '';
            $endereco = $_POST['address'] ?? '';
            $data_nascimento = $_POST['birthday'] ?? '';
            $notas = $_POST['notes'] ?? '';
            $favorito = isset($_POST['favorite']) ? 1 : 0;
            
            $data_nascimento = empty($data_nascimento) ? NULL :    
            $data_nascimento = date('Y-m-d', strtotime($data_nascimento)); // Converte para o formato MySQL


            if(empty($nome) || empty($telefone)){
                echo json_encode([
                    'status' => 'error', 
                    'message' => 'Nome e telefone são obrigatórios'
                ]);
                exit;
            }

            // Prepara a query de inserção de dados no banco de dados
            $sql = $conn->prepare(
                'INSERT INTO contatos (nome, telefone, email, endereco, data_nascimento, favorito, notas) VALUES (?, ?, ?, ?, ?, ?, ?)'
            );

            if (!$sql) {
                echo json_encode([
                    'status' => 'error',
                     'message' => 'Erro na preparação da consulta: ' . $conn->error
                    ]);
                exit;
            }

            $sql->bind_param('sssssis', $nome, $telefone, $email, $endereco, $data_nascimento, $favorito, $notas);
            
            if($sql->execute()){
                echo json_encode([
                    'status' =>'success',
                    'message' => 'Contato salvo com sucesso!'
                ]);
            }else{
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Ocorreu um erro ao tentar criar o contato.'
                ]);
            }            
        
            break;

        case 'read': 

            $resultado = $conn->query("SELECT * FROM contatos");   // guarda todos os itens da tabela do banco de dados 
            $contatos = []; 

            while($row = $resultado->fetch_assoc()){
                $contatos[] = $row;
            }
            
            echo json_encode([
                'status' => 'success',
                'data' => $contatos
            ]);
            break;
        
        case 'get':
            
            if(isset($_GET['id'])){

                $id = intval($_GET['id']);

                $sql = $conn->prepare("SELECT * FROM contatos WHERE id = ?");
                $sql->bind_param('i', $id);
                $sql->execute();

                $result = $sql->get_result();

                if($result->num_rows > 0){
                    $contato = $result->fetch_assoc();
                    echo json_encode([
                        'status' => 'success',
                         'data' => $contato
                    ]);
                }else{
                    echo json_encode([
                        'status' => 'error',
                         'message' => 'Contato não encontrado'
                    ]);
                }
            }
            
            $sql->close();
            
            break;

        default: 
            echo json_encode([
                'status' => 'error',
                 'message' => 'Ação inválida'
            ]);
            break;
            
    }
}catch (Exception $e){
    echo json_encode([
        'status' => 'error',
         'message' => 'Erro' . $e->getMessage()
        ]);
}
ob_end_flush(); 