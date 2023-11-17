import { NextApiRequest, NextApiResponse } from "next";
import { ControleEditora } from "../../../classes/controle/ControleEditora";

const controleEditora = new ControleEditora();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        res.status(405).json({ erro: 'Método não permitido' });
        return;
    }

    try {
        const editoras = await controleEditora.getEditoras();
        res.status(200).json(editoras);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ erro: 'Exceção ocorrida no servidor' });
    }
};