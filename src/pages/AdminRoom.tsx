import { useNavigate, useParams } from 'react-router-dom';

import { useRoom } from '../hooks/useRoom';
//import { useAuth } from '../hooks/useAuth';

import { database } from '../services/firebase';

import imgLogo from '../assets/images/logo.svg';
import imgDelete from '../assets/images/delete.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const navigate = useNavigate();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId!);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date()
    })

    navigate('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={imgLogo} alt="Letmeask" />
          <div>
            <RoomCode code={roomId!} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={imgDelete} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}