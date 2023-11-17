import { NextApiRequest, NextApiResponse } from "next";
import { controleLivro } from "./index";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'DELETE') {
        res.status(405).json({ erro: 'Método não permitido' })
        return;
    }

    try {
        const { codigo } = req.query;

        if(!codigo) {
            res.status(400).json({ erro: 'Código do livro não fornecido.' })
            return;
        }

        const codigoNumero = Number(codigo)

        const livroExcluido = await controleLivro.excluir(codigoNumero);

        res.status(200).json({ mensagem: 'Livro excluído com sucesso.' })
    } catch (error) {
        console.error('Erro: ', error);
        res.status(500).json({ mensagem: 'Exceção ocorrida no servidor.' });
    }
};