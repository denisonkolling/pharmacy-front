import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Label,
	LabelError,
	Content,
	Strong,
	LabelSignup,
	Container,
} from './styles';
import { AuthContext } from '../../context/AuthContext';
import { faCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Input } from '../../components';

const Signup = () => {
	const { addUser, checkEmail, checkPassword } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [emailConf, setEmailConf] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [success, setSuccess] = useState('');
	const [modalOpened, setModalOpened] = useState(false);
	const navigate = useNavigate();

	const handleSignup = () => {
		if (!email | !emailConf | !password) {
			setMessage('Preencha todos os campos');
			return;
		} else if (email !== emailConf) {
			setMessage('Os e-mails não são iguais');
			return;
		} else if (!checkEmail(email)) {
			setMessage('Preencha email corretamente');
			return;
		} else if (!checkPassword(password)) {
			setMessage('Senha deve conter no mínimo 8 números e letras!');
			return;
		}
		addUser(email, password);
		setSuccess('Conta de usuário criada com sucesso!');
		setModalOpened(true);
		cleanForm();

		setTimeout(() => {
			navigate('/login');
		}, 1300);
	};

	const cleanForm = () => {
		setEmail('');
		setEmailConf('');
		setPassword('');
	};

	return (
		<Container height="100vh">
			<Content>
				<Label style={{ fontSize: '30px' }}>
					<FontAwesomeIcon icon={faUser} style={{ color: '#9775e5' }} /> Conta
					de Usuário
				</Label>
				<LabelSignup> Preencha seus dados para registrar-se</LabelSignup>
				<Input
					type="email"
					placeholder="Digite com seu email..."
					value={email}
					onChange={(e) => [setEmail(e.target.value), setMessage('')]}
				/>
				<Input
					type="email"
					placeholder="Confirme seu email..."
					value={emailConf}
					onChange={(e) => [setEmailConf(e.target.value), setMessage('')]}
				/>
				<Input
					type="password"
					placeholder="Escolha sua senha..."
					value={password}
					onChange={(e) => [setPassword(e.target.value), setMessage('')]}
				/>
				<LabelError>{message}</LabelError>
				<Button Text="Criar Conta" onClick={handleSignup} />
				<LabelSignup>
					Já tem uma conta?
					<Strong>
						<Link to="/login">&nbsp;Entre</Link>
					</Strong>
				</LabelSignup>
				<Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)}>
					<LabelSignup>
						<FontAwesomeIcon icon={faCheck} style={{ color: '#4daf23' }} />
						&nbsp; {success} &nbsp;
					</LabelSignup>
				</Modal>
			</Content>
		</Container>
	);
};

export default Signup;
