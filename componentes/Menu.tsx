import React from "react";
import Link from "next/link";
import style from "../styles/Home.module.css"

export const Menu: React.FC = () => {
    return (
        <div className={style.fonte}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link href="/" passHref legacyBehavior>
                                    <a className="nav-link">Home</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/LivroLista" passHref legacyBehavior>
                                    <a className="nav-link">Catálogo</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/LivroDados" passHref legacyBehavior>
                                    <a className="nav-link">Novo</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};