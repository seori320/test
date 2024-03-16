/* 회원가입 컴포넌트 */

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function Join() {

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [pwd, setPwd] = useState("");
	const [checkPwd, setCheckPwd] = useState("");

	const navigate = useNavigate();

	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const changeEmail = (event) => {
		setEmail(event.target.value);
	}

	const changeName = (event) => {
		setName(event.target.value);
	}

	const changePwd = (event) => {
		setPwd(event.target.value);
	}

	const changeCheckPwd = (event) => {
		setCheckPwd(event.target.value);
	}

	const handleCloseModal = () => {
		setShowModal(false);
	};

	/* 아이디 중복 체크 */
	const checkEmailDuplicate = async () => {

		await axios.get("http://localhost:8080/user/checkId", { params: { email: email } })
			.then((resp) => {
				console.log("[Join.jsx] checkEmailDuplicate() success :D");
				console.log(resp.data);

				if (resp.status === 200) {
					setModalMessage("사용 가능한 이메일입니다.");
					setShowModal(true);
				}
			})
			.catch((err) => {
				console.log("[Join.jsx] checkEmailDuplicate() error :<");
				console.log(err);

				const resp = err.response;
				if (resp.status === 400) {
					setModalMessage(resp.data);
					setShowModal(true);
				}
			});

	}

	/* 회원가입 */
	const join = async () => {

		const req = {
			email: email,
			password: pwd,
			passwordCheck: checkPwd,
			username: name,
		}

		await axios.post("http://localhost:8080/user/register", req)
			.then((resp) => {
				console.log("[Join.jsx] join() success :D");
				console.log(resp.data);

				setModalMessage(resp.data.username + "님 회원가입을 축하드립니다 🎊");
				setShowModal(true);
				navigate("/login");

			}).catch((err) => {
				console.log("[Join.jsx] join() error :<");
				console.log(err);

				const resp = err.response;
				if (resp.status === 400) {
					setModalMessage(resp.data);
					setShowModal(true);
				}
			});
	}

	return (
		<div>
			<Form>
				<Form.Group as={Row} className="mb-3" controlId="formEmail">
					<Form.Label column sm="2">
						이메일
					</Form.Label>
					<Col sm="10">
						<Form.Control type="text" placeholder="이메일을 입력하세요" value={email} onChange={changeEmail}/>
						<Button variant="outline-danger" className="mt-2" onClick={checkEmailDuplicate}>
							<i className="fas fa-check"></i> 이메일 중복 확인
						</Button>
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3" controlId="formName">
					<Form.Label column sm="2">
						이름
					</Form.Label>
					<Col sm="10">
						<Form.Control type="text" placeholder="이름을 입력하세요" value={name} onChange={changeName}/>
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3" controlId="formPassword">
					<Form.Label column sm="2">
						비밀번호
					</Form.Label>
					<Col sm="10">
						<Form.Control type="password" placeholder="비밀번호를 입력하세요" value={pwd} onChange={changePwd}/>
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mb-3" controlId="formCheckPassword">
					<Form.Label column sm="2">
						비밀번호 확인
					</Form.Label>
					<Col sm="10">
						<Form.Control type="password" placeholder="비밀번호를 다시 입력하세요" value={checkPwd}
									  onChange={changeCheckPwd}/>
					</Col>
				</Form.Group>
			</Form>

			<div className="my-3 d-flex justify-content-center">
				<Button variant="outline-secondary" onClick={join}>
					<i className="fas fa-user-plus"></i> 회원가입
				</Button>
			</div>

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
		</div>
	);
}

export default Join;
