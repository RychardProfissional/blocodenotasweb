import { BsGithub, BsLinkedin, BsEnvelope } from "react-icons/bs"
import styled from "styled-components"

export function Footer() {
  return (
    <Container>
      <Content>
        <Section>
          <Name>Rychard Antony</Name>
          <Description>Desenvolvedor Full Stack</Description>
        </Section>

        <SocialMedia>
          <SocialLink href="https://github.com/RychardProfissional/blocodenotasweb" title="GitHub">
            <BsGithub />
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/rychardprofissional/" title="LinkedIn">
            <BsLinkedin />
          </SocialLink>
        </SocialMedia>

        <Licence>
          <LicenceIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 980">
            <circle cx="490" cy="490" r="440" fill="none" stroke="currentColor" strokeWidth="100" />
            <path d="M219,428H350a150,150 0 1 1 0,125H219a275,275 0 1 0 0-125z" />
          </LicenceIcon>
          <LicenceText>Licença MIT</LicenceText>
        </Licence>
      </Content>

      <BottomBar>
        <PolicyLink href="#">Políticas de Privacidade</PolicyLink>
        <Divider>•</Divider>
        <Copyright>© 2025 Bloco Web. Todos os direitos reservados.</Copyright>
      </BottomBar>
    </Container>
  )
}

const Container = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-text-main);
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  gap: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;
    gap: 2rem;
  }
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`

const Name = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-main);
  background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const Description = styled.span`
  font-size: 0.95rem;
  color: var(--color-text-muted);
  font-weight: 500;
`

const SocialMedia = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const SocialLink = styled.a`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 8px;
  color: var(--color-accent);
  transition: all 0.3s ease;
  font-size: 1.2rem;
  text-decoration: none;

  &:hover {
    background-color: rgba(56, 189, 248, 0.2);
    border-color: var(--color-accent);
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(56, 189, 248, 0.2);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`

const Licence = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background-color: rgba(56, 189, 248, 0.05);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 8px;
  flex: 1;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const LicenceIcon = styled.svg`
  width: 20px;
  height: 20px;
  color: var(--color-accent);
`

const LicenceText = styled.span`
  font-size: 0.95rem;
  color: var(--color-text-muted);
  font-weight: 500;
`

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background-color: rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`

const PolicyLink = styled.a`
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-accent);
  }
`

const Divider = styled.span`
  color: var(--color-text-muted);
  font-size: 0.8rem;

  @media (max-width: 768px) {
    display: none;
  }
`

const Copyright = styled.span`
  font-size: 0.9rem;
  color: var(--color-text-muted);
`

export default Footer
