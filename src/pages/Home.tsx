import imgIllustration from '../assets/images/illustration.svg'
import imgLogo from '../assets/images/logo.svg'
import imgGoogleIcon from '../assets/images/google-icon.svg'

export function Home() {
    return (
        <div>
            <aside>
                <img src={imgIllustration} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div>
                    <img src={imgLogo} alt="Letmeask" />
                    <button>
                        <img src={imgGoogleIcon} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div>ou entre em uma sala como</div>
                    <form action="">
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <button type="submit">
                            Entrar na sala
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}