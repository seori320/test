/* 로그인 컴포넌트 */

import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";

function Login() {

	const { auth, setAuth } = useContext(AuthContext);
	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const navigate = useNavigate();

	const [id, setId] = useState("");
	const [pwd, setPwd] = useState("");

	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const changeId = (event) => {
		setId(event.target.value);
	}

	const changePwd = (event) => {
		setPwd(event.target.value);
	}

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const login = async () => {

		const req = {
			email: id,
			password: pwd
		}

		await axios.post("http://localhost:8080/user/login", req)
		.then((resp) => {
			console.log("[Login.jsx] login() success :D");
			console.log(resp.data);

			setModalMessage(`${resp.data.email}님, 성공적으로 로그인 되었습니다 🔐`);
			setShowModal(true);

				// JWT 토큰 저장
				localStorage.setItem("post_access_token", resp.data.token);
				localStorage.setItem("id", resp.data.email);

				setAuth(resp.data.email); // 사용자 인증 정보(아이디 저장)
				setHeaders({"Authorization": `Bearer ${resp.data.toekn}`}); // 헤더 Authorization 필드 저장

				navigate("/postlist");
			

		}).catch((err) => {
			console.log("[Login.jsx] login() error :<");
			console.log(err);

			setModalMessage(`⚠️ ${err.response.data}`);
			setShowModal(true);
		});
	}

	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col xs={12} md={6}>
					<Form>
						<Form.Group controlId="formId">
							<Form.Label>아이디</Form.Label>
							<Form.Control type="text" placeholder="아이디를 입력하세요" value={id} onChange={changeId} />
						</Form.Group>

						<Form.Group controlId="formPassword">
							<Form.Label>비밀번호</Form.Label>
							<Form.Control type="password" placeholder="비밀번호를 입력하세요" value={pwd} onChange={changePwd} />
						</Form.Group>

						<Button variant="outline-secondary" onClick={login}>
							<i className="fas fa-sign-in-alt"></i> 로그인
						</Button>
					</Form>
				</Col>
			</Row>

			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>알림</Modal.Title>
				</Modal.Header>
				<Modal.Body>{modalMessage}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseModal}>
						닫기
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}

export default Login;