import { NextApiRequest, NextApiResponse } from "next";
import { ControleLivro } from "../../../classes/controle/ControleLivros";
import { Livro } from "../../../classes/modelo/Livro";

export const controleLivro = new ControleLivro();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const listaLivros = await controleLivro.obterLivros();

            res.status(200).json(listaLivros);
        } catch (error) {
            console.error('Erro: ', error);
            res.status(500).json({ erro: 'Excessão ocorrida no servidor' });
        }
    } else if (req.method === 'POST') {
        try {
            const { titulo, autores, resumo } = req.body;

            const novoLivro = new Livro(0, 0, titulo, resumo, autores);
            await controleLivro.incluir(novoLivro);

            res.status(200).json({ mensagem: 'Livro incluído com sucesso' });
        } catch (error) {
            console.error('Erro:', error);
            res.status(500).json({ erro: 'Exceção ocorrida no servidor' });
        }
    } else {
        res.status(405).json({ erro: 'Método não permitido' });
    }
};