import Editora from "../modelo/Editora";

const editoras: Editora[] = [
    new Editora(1, 'Alta Books'),
    new Editora(2, 'Bookman'),
    new Editora(3, 'Addison Wesley'),
    new Editora(4, 'Pearson'),
];

export class ControleEditora {
    getNomeEditora(codEditora: number): string {
        const editora = editoras.filter(e => e.codEditora === codEditora);
        return editora.length > 0 ? editora[0].nome : '';
    }

    getEditoras(): Editora[] {
        return editoras;
    }
}