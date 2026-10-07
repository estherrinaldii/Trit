<?php 
class CategoriaController {
    public static function Listar($email) {
        $resposta = Categoria::Listar($email);
        $categorias = [];

        foreach ($resposta as $linha){
           
            $categoria = new Categoria($linha["cd_categoria_gasto"], $linha["nm_categoria_gasto"], $linha["vl_limite"], $email, $linha["ic_tipo_categoria"]);
            array_push($categorias, $categoria);
        }
        return $categorias;
    }

    public static function Criar($nome, $email, $valorLimite){
        return Categoria::Criar($nome, $email, $valorLimite);
    }
}
?>