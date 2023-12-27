import { BsGithub, BsLinkedin, BsEnvelope} from "react-icons/bs"
import style from './footer.module.css'

export function Footer(){
    return (
      <footer className={style.footer}>
        <span className={style.text}>Rychard Antony</span>
        <div className={style.social_media}>
          <div><a href='#'><BsGithub  className={`${style.media_icon} ${style.github_icon}`} /></a></div>
          <div><a href='#'><BsLinkedin  className={`${style.media_icon} ${style.linkedin_icon}`} /></a></div>
          <div><a href='#'><BsEnvelope  className={`${style.media_icon} ${style.gmail_icon}`} /></a></div>
        </div>
        <div className={style.licence}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 980" height={13} fill="#949494">
            <circle cx="490" cy="490" r="440" fill="none" stroke="#949494" strokeWidth="100"/>
            <path d="M219,428H350a150,150 0 1 1 0,125H219a275,275 0 1 0 0-125z"/>
          </svg>
          <span>Diretos de uso da MIT</span>
          </div>
      </footer>
    )
}

export default Footer;