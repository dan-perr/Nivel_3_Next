import React from "react";
import { ControleEditora } from "../classes/controle/ControleEditora";

interface Livro {
    codigo: number;
    titulo: string;
    resumo: string;
    codEditora: number;
    autores: string[];
}

interface LinhaLivroProps {
    livro: Livro;
    excluir: (codigo: number) => void;
    getNomeEditora: (codEditora: number) => string;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
    const nomeEditora = props.getNomeEditora(props.livro.codEditora);

    return (
        <tr>
            <td>{props.livro.titulo}</td>
            <td>
                <button className="btn btn-danger" onClick={() => props.excluir(props.livro.codigo)}>
                    Excluir
                </button>
            </td>
            <td>{props.livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td>
                <ul>
                    {props.livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};

export default LinhaLivro;