<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

include "conexao.php";

ob_start(); // Inicia o buffer de saída

header('Content-Type: application/json; charset=utf-8');

// verifica se a ação foi passada
if(!isset($_REQUEST['action'])){
    echo json_encode(['status' => 'error', 'message' => 'Nenhuma ação especificada']);
    exit; // encerra a execução do script
}

var_dump($_POST);  // Verifique os dados recebidos pelo POST

$action = $_REQUEST['action'];

try{

    switch($action){
    
        case 'create':
    
            $nome = $_POST['name'];
            $telefone = $_POST['phone'];
            $email = $_POST['email'];
            $endereco = $_POST['address'];
            $data_nascimento = $_POST['birthday'];
            $notas = $_POST['notes'];
            $favorito = isset($_POST['favorite']) ? 1 : 0;
            
            $data_nascimento = empty($data_nascimento) ? NULL :    
            $data_nascimento = date('Y-m-d', strtotime($data_aniversario)); // Converte para o formato MySQL


            if(empty($nome) || empty($telefone)){
                echo json_encode(['status' => 'error', 'message' => 'Nome e telefone são obrigatórios']);
                exit;
            }

            try{

                $sql = $conn->prepare(
                    'INSERT INTO contatos (nome, telefone, email, endereco, data_nascimento, favorito, notas) VALUES (?, ?, ?, ?, ?, ?, ?)'
                );
    
                if (!$sql) {
                    echo json_encode(['status' => 'error', 'message' => 'Erro na preparação da consulta: ' . $conn->error]);
                    exit;
                }
    
                $sql->bind_param('sssssis', $nome, $telefone, $email, $endereco, $data_nascimento, $favorito, $notas);
                
                if($sql->execute()){
                    echo json_encode(
                        ['status' =>'success', 'message' => 'Contato criado com sucesso!']);
                }else{
                    echo json_encode(['status' => 'error', 'message' => 'Ocorreu um erro ao tentar criar o contato.']);
                }            
                
            }catch(Exception $e){
                echo json_encode(['status' => 'error', 'message' => 'Erro: ' . $e->getMessage()]);
            }

            
            break;
        default: 
            echo json_encode(['status' => 'error', 'message' => 'Ação inválida']);
            break;
            
    }
}catch (Exception $e){
    echo json_encode(['status' => 'error', 'message' => 'Erro' . $e->getMessage()]);
}
ob_end_clean(); // Limpa qualquer saída extra