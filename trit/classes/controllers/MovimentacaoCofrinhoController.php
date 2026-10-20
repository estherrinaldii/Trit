<?php
class MovimentacaoCofrinhoController
{
    public static function Guardar($email, $codigoCofrinho, $valor)
    {
        return MovimentacaoCofrinho::Guardar($email, $codigoCofrinho, $valor);
    }

    public static function Resgatar($email, $codigoCofrinho, $valor)
    {
        return MovimentacaoCofrinho::Guardar($email, $codigoCofrinho, $valor);
    }
}
