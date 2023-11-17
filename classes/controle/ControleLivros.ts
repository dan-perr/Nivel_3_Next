import { Livro } from '../modelo/Livro'

const livros: Livro[] = [
    new Livro(1, 2, 'Use a Cabeça: Java', 'Use a Cabeça! Java é uma experiência completa de aprendizado em programação orientada a objetos (OO) e Java.', ['Bert Bates', 'Kathy Sierra']),
    new Livro(2, 3, 'Java, como Programar', 'Milhões de alunos e profissionais aprenderam programação e desenvolvimento de software com os livros Deitel.', ['Paul Deitel', 'Harvey Deitel']),
    new Livro(3, 4, 'Core Java for the Impatient', 'Eaders familiar with Horstmanns original, two-volume "Core Java" books who are looking for a comprehensive, but condensed guide to all of the new features and functions of Java SE 9 will learn how these new features impact the language and core libraries.', ['Cay Horstmann'])
]

export class ControleLivro {
    obterLivros(): Livro[] {
        return livros;
    }

    incluir(novoLivro: Livro): void {
        const maxCodigo = livros.reduce((max, livro) => Math.max(max, livro.codigo), -Infinity);
        const novoCodigo = maxCodigo + 1;
        novoLivro.codigo = novoCodigo;
        livros.push(novoLivro)
    }

    excluir(codigo: number): Livro | undefined {
        const index = livros.findIndex(livro => livro.codigo === codigo);
        if (index !== -1) {
            const livroExcluido = livros[index];
            livros.splice(index, 1);
            return livroExcluido;
        }
        return undefined
    }
}