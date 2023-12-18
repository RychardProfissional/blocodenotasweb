import style from './layout.module.css'

export default function Layout({children}){

    // É necessário uma atualização na forma que o content organiza o seu conteúdo
    return(
        <main className={style.main}>
            <div className={style.content}>
                {children}
            </div>
        </main>
    )
}
