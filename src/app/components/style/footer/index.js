import { BsGithub, BsLinkedin, BsEnvelope } from "react-icons/bs"
import styled from "styled-components"

export function Footer() {
  return (
    <Container>
      <Name>Rychard Antony</Name>
      <SocialMedia>
        <div>
          <a href="#">
            <BsGithub className="media_icon github_icon" />
          </a>
        </div>
        <div>
          <a href="#">
            <BsLinkedin className="media_icon linkedin_icon" />
          </a>
        </div>
        <div>
          <a href="#">
            <BsEnvelope className="media_icon gmail_icon" />
          </a>
        </div>
      </SocialMedia>
      <Licence>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 980" height={13} fill="#949494">
          <circle cx="490" cy="490" r="440" fill="none" stroke="#949494" strokeWidth="100" />
          <path d="M219,428H350a150,150 0 1 1 0,125H219a275,275 0 1 0 0-125z" />
        </svg>
        <span>Diretos de uso da MIT</span>
        <span>
          <a href="#">politicas de privacidade</a>
          {/* tenho que avisar sobre a utilização de cookies para o login */}
        </span>
      </Licence>
    </Container>
  )
}

const Container = styled.footer`
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 185px;
  width: 100%;

  justify-content: center;
  background-color: rgb(var(--color-strong-1));
`

const Name = styled.span`
  font: 1.2em var(--font-2);
  color: rgb(var(--color-white-4));
`

const SocialMedia = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  width: 20%;

  & div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
  }

  & .media_icon {
    height: 37px;
    width: 37px;
    transition: 0.5s;
    color: rgb(var(--color-secondary-1));

    &:hover {
      height: 39px;
      width: 39px;
    }

    &.github_icon:hover {
      fill: #6e5494;
    }
    &.linkedin_icon:hover {
      fill: #0077b5;
    }
    &.gmail_icon:hover {
      fill: #ff0000;
    }
  }
`

const Licence = styled.div`
  & span {
    font: 0.95em var(--font-2);
    color: rgb(var(--color-white-4));

    margin-left: 3px;
    vertical-align: center;
  }
`

export default Footer
