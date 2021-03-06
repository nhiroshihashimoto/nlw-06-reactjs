import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { database } from '../services/firebase';

import { Button } from '../components/Button';

import imgIllustration from '../assets/images/illustration.svg';
import imgLogo from '../assets/images/logo.svg';
import imgGoogleIcon from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    navigate('/rooms/new');
  }

  async function hadleJoinRoom(event: FormEvent) {
    event.preventDefault();
    if (roomCode.trim() === '') {
      return;
    }
    const roomRef = await database.ref(`rooms/${roomCode.trim()}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    if (roomRef.val().closedAt) {
      alert('Room already closed');
      return;
    }

    navigate(`/rooms/${roomCode.trim()}`);
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
          <form onSubmit={hadleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode.trim()}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>

    </div>
  );
}