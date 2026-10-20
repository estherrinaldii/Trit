<?php
class MovimentacaoCofrinhoController
{
    public static function Guardar($email, $codigoCofrinho, $valor)
    {
        return MovimentacaoCofrinho::Guardar($email, $codigoCofrinho, $valor);
    }
}
