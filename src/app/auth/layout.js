import style from './layout.module.css'

export default function Layout({children}){

    return(
        <main className={style.main}>
            <div className={style.content}>
                {children}
            </div>
        </main>
    )
}
