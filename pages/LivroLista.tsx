import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Menu } from "../componentes/Menu";
import styles from "../styles/Home.module.css";
import { Livro } from "../classes/modelo/Livro";
import "bootstrap/dist/css/bootstrap.css";

const baseURL: string = 'http://localhost:3000/api/livros';

const LivroLista: React.FC = () => {
    const [livros, setLivros] = useState<Array<Livro>>([]);
    const [carregado, setCarregado] = useState<boolean>(false);

    const obterLivros = async () => {
        try {
            const response = await fetch(baseURL);
            const data = await response.json();
            setLivros(data);
        } catch (error) {
            console.error('Erro ao obter livros:', error);
        } finally {
            setCarregado(true);
        }
    };

    const excluirLivro = async (codigo: number): Promise<boolean> => {
        try {
            const response = await fetch(`${baseURL}/${codigo}`, {
                method: 'DELETE',
            });

            return response.ok;
        } catch (error) {
            console.error('Erro ao excluir livro:', error);
            return false;
        }
    };

    const excluir = async (codigo: number) => {
        const sucesso = await excluirLivro(codigo);

        if (sucesso) {
            setLivros((livros) => livros.filter((livro) => livro.codigo !== codigo));
        }
    };

    useEffect(() => {
        if (!carregado) {
            obterLivros();
        }
    }, [carregado]);

    return (
        <div className="container">
            <div className={styles.fonte}>
                <div className={styles.container}>
                    <Head>
                        <title>Loja Next</title>
                    </Head>

                    <Menu />

                    <main className={styles.main}>
                        <h1>Catálogo de Livros</h1>

                        <table>
                            <thead>
                                <tr className={styles.tr}>
                                    <th id={styles.tit}>Título</th>
                                    <th>Resumo</th>
                                    <th>Autores</th>
                                    <th id={styles.editora}>Editora</th>
                                    <th id={styles.acoes}>Ações</th>
                                </tr>
                            </thead>
                            <tbody className={styles.tbody}>
                                {livros.map((livro) => (
                                    <tr key={livro.codigo}>
                                        <td id={styles.titt}>{livro.titulo}</td>
                                        <td>{livro.resumo}</td>
                                        <td>{livro.autores.join(', ')}</td>
                                        <td>{livro.codEditora}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => excluir(livro.codigo)}>
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default LivroLista;