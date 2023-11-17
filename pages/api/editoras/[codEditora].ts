import { NextApiRequest, NextApiResponse } from "next";
import { ControleEditora } from "../../../classes/controle/ControleEditora";

const controleEditora = new ControleEditora();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        res.status(405).json({ erro: 'Método não permitido' })
        return;
    }

    try {
        const codEditora: number = Number(req.query.codEditora);

        if (isNaN(codEditora)) {
            res.status(400).json({ erro: 'Parâmetro codEditora inválido' });
            return;
        }
        
        const nomeEditora = await controleEditora.getNomeEditora(codEditora);
        res.status(200).json({ nomeEditora })
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ erro: 'Excessâo ocorrida no servidor' })
    }
}