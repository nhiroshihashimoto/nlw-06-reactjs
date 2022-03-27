import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../App';

import { Button } from '../components/Button';

import imgIllustration from '../assets/images/illustration.svg';
import imgLogo from '../assets/images/logo.svg';
import imgGoogleIcon from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useContext(AuthContext);

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    navigate('/rooms/new');
  }

  return (
    <div className="page-auth">

      <aside>
        <img src={imgIllustration} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={imgLogo} alt="Letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={imgGoogleIcon} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>

    </div>
  )
}