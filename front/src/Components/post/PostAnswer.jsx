import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import { Container, Form, Button, Table, Modal } from "react-bootstrap";

function PostAnswer() {

	const { auth, setAuth } = useContext(AuthContext)
	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const navigate = useNavigate();

	const { parentSeq } = useParams(); // 부모 글 번호

	const location = useLocation();
	const { parentPost } = location.state;

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const changeTitle = (event) => {
		setTitle(event.target.value);
	}

	const changeContent = (event) => {
		setContent(event.target.value);
	}

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleShowModal = (message) => {
		setModalMessage(message);
		setShowModal(true);
	};

	const createPostAnswer = async () => {

		const req = {
			id: localStorage.getItem("id"),
			title: title,
			content: content
		}
		
		await axios.post(`http://localhost:3000/post/${parentSeq}/answer`, req, {headers: headers})
		.then((resp) => {
			console.log("[PostAnswer.jsx] createPostAnswer() success :D");
			console.log(resp.data);

			handleShowModal("답글을 성공적으로 등록했습니다 :D");
			navigate(`/postdetail/${resp.data.seq}`); // 새롭게 등록한 답글 상세로 이동
		})
		.catch((err) => {
			console.log("[PostAnswer.jsx] createPostAnswer() error :<");
			console.log(err);


		});

	}

	useEffect(() => {
		if (!auth) {
			handleShowModal("로그인 한 사용자만 게시글에 대한 답글을 작성할 수 있습니다 !");
			navigate(-1);
		}
	}, []);

	return (
		<Container>
			{/* 부모 게시글 정보 */}
			<Table striped bordered>
				<tbody>
				<tr>
					<th className="table-primary">작성자</th>
					<td>
						<Form.Control
							type="text"
							value={parentPost.id}
							readOnly
						/>
					</td>
				</tr>
				<tr>
					<th className="table-primary">제목</th>
					<td>
						<Form.Control
							type="text"
							value={parentPost.title}
							readOnly
						/>
					</td>
				</tr>
				</tbody>
			</Table>
			
			{/* 답글 작성 */}
			<h3>📌 Reply</h3>
			<Form>
				<Form.Group controlId="formWriter">
					<Form.Label>작성자</Form.Label>
					<Form.Control
						type="text"
						value={localStorage.getItem("id")}
						readOnly
					/>
				</Form.Group>

				<Form.Group controlId="formTitle">
					<Form.Label>제목</Form.Label>
					<Form.Control
						type="text"
						value={title}
						onChange={changeTitle}
						placeholder="답글 제목을 입력하세요"
					/>
				</Form.Group>

				<Form.Group controlId="formContent">
					<Form.Label>내용</Form.Label>
					<Form.Control
						as="textarea"
						value={content}
						onChange={changeContent}
						rows={10}
						placeholder="답글 내용을 입력하세요"
					/>
				</Form.Group>

				<Button
					variant="outline-secondary"
					onClick={createPostAnswer}
				>
					답글 달기
				</Button>
			</Form>

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

export default PostAnswer;