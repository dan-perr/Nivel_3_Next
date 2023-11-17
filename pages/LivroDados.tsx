import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Menu } from "../componentes/Menu";
import '../styles/Home.module.css';
import styles from "../styles/Home.module.css";
import { ControleEditora } from "../classes/controle/ControleEditora";
import { Livro } from "../classes/modelo/Livro";
import "bootstrap/dist/css/bootstrap.css";

const controleEditora = new ControleEditora();
const baseURL: string = 'http://localhost:3000/api/livros';

const LivroDados: React.FC = () => {
    const [opcoes, setOpcoes] = useState<{ value: number; text: string }[]>([]);
    const [titulo, setTitulo] = useState<string>("");
    const [resumo, setResumo] = useState<string>("");
    const [autores, setAutores] = useState<string>("");
    const [codEditora, setCodEditora] = useState<number>();
    const router = useRouter();

    useEffect(() => {
        const carregarOpcoes = async () => {
            try {
                const editoras = await controleEditora.getEditoras();

                const opcoesMapeadas = editoras.map(editora => ({
                    value: editora.codEditora,
                    text: editora.nome,
                }));

                setOpcoes(opcoesMapeadas);
            } catch (error) {
                console.error('Erro ao carregar opções:', error);
            }
        };

        carregarOpcoes();
    }, []);

    const incluirLivro = async (livro: Livro): Promise<boolean> => {
        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(livro),
            });

            const resultado = await response.json();

            console.log('Resposta do servidor ao incluir livro:', resultado);

            if (response.ok) {
                console.log('Livro incluído com sucesso:', resultado);
            } else {
                console.error('Erro ao incluir o livro:', resultado);
            }

            return response.ok;
        } catch (error) {
            console.error('Erro durante a inclusão do livro:', error);
            return false;
        }
    };

    const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const novoCodEditora = Number(event.target.value);
        console.log('Novo código de editora:', novoCodEditora);
        setCodEditora(novoCodEditora);
    };

    const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const novoLivro: Livro = {
            codigo: 0,
            titulo,
            resumo,
            autores: autores.split('\n'),
            codEditora,
        };

        const sucesso = await incluirLivro(novoLivro);

        if (sucesso) {
            router.push('/LivroLista');
        }
    };

    return (
        <div className={styles.fonte}>
            <div className="container">
                <Head>
                    <title>Loja Next</title>
                </Head>

                <Menu />
                <div className={styles.container}>
                    <main>
                        <h1>Dados do Livro</h1>

                        <form onSubmit={incluir}>
                            <div className="row" id="1">
                                <label>
                                    Título:
                                    <div>
                                        <input
                                            className="form-control col-12"
                                            type="text"
                                            value={titulo}
                                            onChange={(e) => setTitulo(e.target.value)}
                                        />
                                    </div>
                                </label>
                            </div>

                            <div className="row" id="2">
                                <label>
                                    Resumo:
                                    <div>
                                        <textarea
                                            className="form-control"
                                            value={resumo}
                                            onChange={(e) => setResumo(e.target.value)}
                                        />
                                    </div>
                                </label>
                            </div>

                            <div className="row" id="3">
                                <label>
                                    Autores (um por linha):
                                    <textarea
                                        className="form-control"
                                        value={autores}
                                        onChange={(e) => setAutores(e.target.value)}
                                    />
                                </label>
                            </div>

                            <div className="row" id="4">
                                <label>
                                    Editora:
                                    <select className="form-select" value={codEditora} onChange={tratarCombo}>
                                        {opcoes.map((opcao) => (
                                            <option key={opcao.value} value={opcao.value}>
                                                {opcao.text}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <button id={styles.botao1} className="btn btn-primary" type="submit">Incluir Livro</button>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default LivroDados;