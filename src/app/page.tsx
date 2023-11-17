import Image from 'next/image';
import Head from 'next/head';
import { Menu } from '../../componentes/Menu';

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>Loja Next</title>
      </Head>


      <Menu />


      <div className="styles.main titulo-container">
        <h1 className="styles.title titulo">Página Inicial</h1>
      </div>
    </main>
  );
};