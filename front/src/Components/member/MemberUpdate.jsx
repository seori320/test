/* 회원 정보 수정 컴포넌트 */
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";


function MemberUpdate(props) {
    const { headers, setHeaders } = useContext(HttpHeadersContext);
	const [name, setName] = useState("");
	const [pwd, setPwd] = useState("");
	const [checkPwd, setCheckPwd] = useState("");

	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

    const email = props.email;

	const navigate = useNavigate();

	const changeName = (event) => {
		setName(event.target.value);
	}

	const changePwd = (event) => {
		setPwd(event.target.value);
	}

	const changeCheckPwd = (event) => {
		setCheckPwd(event.target.value);
	}

    useEffect(() => {
        setHeaders({
            "Authorization": `Bearer ${localStorage.getItem("post_access_token")}`
        });
        setName(props.name);
    }, [props.name]);

	const handleCloseModal = () => {
		setShowModal(false);
	};

	/* 회원 정보 수정 */
	const update = async () => {

		const req = {
			password: pwd,
			passwordCheck: checkPwd,
			username: name,
		}

		await axios.post("http://localhost:8080/user/update", req, {headers: headers})
			.then((resp) => {
				console.log("[MemberUpdate.jsx] update() success :D");
				console.log(resp.data);

				setModalMessage(`${resp.data.username}님의 회원 정보를 수정했습니다`);
				setShowModal(true);
				navigate("/");

			}).catch((err) => {
				console.log("[MemberUpdate.jsx] update() error :<");
				console.log(err);

				const resp = err.response;
				if (resp.status === 400) {
					setModalMessage(resp.data);
					setShowModal(true);
				}
			});
	}

	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col xs={12} md={6}>
					<Form>
						<Form.Group controlId="formEmail">
							<Form.Label>이메일</Form.Label>
							<Form.Control
								type="text"
								value={email}
								size="50px"
								readOnly
							/>
						</Form.Group>

						<Form.Group controlId="formName">
							<Form.Label>이름</Form.Label>
							<Form.Control
								type="text"
								value={name}
								onChange={changeName}
								size="50px"
							/>
						</Form.Group>

						<Form.Group controlId="formPassword">
							<Form.Label>비밀번호</Form.Label>
							<Form.Control
								type="password"
								value={pwd}
								onChange={changePwd}
								size="50px"
							/>
						</Form.Group>

						<Form.Group controlId="formCheckPassword">
							<Form.Label>비밀번호 확인</Form.Label>
							<Form.Control
								type="password"
								value={checkPwd}
								onChange={changeCheckPwd}
								size="50px"
							/>
						</Form.Group>

						<Button
							variant="outline-secondary"
							onClick={update}
						>
							정보 수정
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

export default MemberUpdate;
