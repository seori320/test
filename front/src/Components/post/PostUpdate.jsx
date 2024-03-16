import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

import { Modal, Button } from "react-bootstrap";

import "../../css/postupdate.css";

function PostUpdate() {
	const { headers, setHeaders } = useContext(HttpHeadersContext);
	const { auth, setAuth } = useContext(AuthContext);
	const navigate = useNavigate();

	const location = useLocation();
	const { post } = location.state;
	
	const postId = post.postId;
	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);
	const [files, setFiles] = useState([]);
	const [severFiles, setSeverFiles ] = useState(post.files || []);

	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = (message) => {
		setModalMessage(message);
		setShowModal(true);
	};

	const changeTitle = (event) => {
		setTitle(event.target.value);
	}

	const changeContent = (event) => {
		setContent(event.target.value);
	}

	const handleChangeFile = (event) => {
		// 총 5개까지만 허용
		const selectedFiles = Array.from(event.target.files).slice(0, 5);
		setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
	};

	const handleRemoveFile = (index) => {
		setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
	};

	const handleRemoveSeverFile = (index, postId, fileId) => {
		setSeverFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
		fileDelete(postId, fileId);
	}

	useEffect(() => {
		setHeaders({
			"Authorization": `Bearer ${localStorage.getItem("post_access_token")}`
		});
	}, []);
	

	/* 파일 업로드 */
	const fileUpload = async (postId) => {
		console.log("업로드할 파일 목록:", files);
		// 파일 데이터 저장
		const fd = new FormData();
		files.forEach((file) => fd.append(`file`, file));

		await axios.post(`http://localhost:8080/post/${postId}/file/upload`, fd, {headers: headers})
			.then((resp) => {
				console.log("[file.jsx] fileUpload() success :D");
				console.log(resp.data);
				handleShowModal("게시물과 파일을 성공적으로 수정했습니다. :D");
				
				// 새롭게 등록한 글 상세로 이동
				navigate(`/postdetail/${postId}`);
			})
			.catch((err) => {
				console.log("[FileData.jsx] fileUpload() error :<");
				console.log(err);
			});
	};

	/* 파일 삭제 */
	const fileDelete = async (postId, fileId) => {
		try {
			await axios.delete(`http://localhost:8080/post/${postId}/file/delete?fileId=${fileId}`, {headers: headers});
				console.log("[PostUpdate.jsx] fileDelete() success :D");
				handleShowModal("파일 삭제 성공 :D");
		} catch (error) {
			console.error("[PostUpdate.jsx] fileDelete() error :<");
			console.error(error);
		}
	};

	/* 게시판 수정 */
	const updatePost = async () => {

		const req = {
			id: auth, 
			title: title, 
			content: content
		}

		await axios.patch(`http://localhost:8080/post/${post.postId}/update`, req, {headers: headers})
		.then((resp) => {
			console.log("[PostUpdate.jsx] updatePost() success :D");
			console.log(resp.data);
			const postId = resp.data.postId;

			if (files.length > 0) {
				fileUpload(postId);
			} else {
				handleShowModal("게시글을 성공적으로 수정했습니다 :D");
				navigate(`/postdetail/${resp.data.postId}`); // 새롭게 등록한 글 상세로 이동
			}
		})
		.catch((err) => {
			console.log("[PostUpdate.jsx] updatePost() error :<");
			console.log(err);
		});

	}


	return (
		<div>
			<table className="table">
				<tbody>
					<tr>
						<th className="table-primary">작성자</th>
						<td>
							<input type="text" className="form-control"  value={post.writerName} size="50px" readOnly />
						</td>
					</tr>

					<tr>
						<th className="table-primary">제목</th>
						<td>
							<input type="text" className="form-control" value={title} onChange={changeTitle} size="50px" />
						</td>
					</tr>

					<tr>
						<th className="table-primary">내용</th>
						<td>
							<textarea className="form-control" value={content} onChange={changeContent} rows="10" ></textarea>
						</td>
					</tr>
					<tr>
					<th className="table-primary">파일</th>
					<td>
					{severFiles.length > 0 || files.length > 0 ? (
						<div className='file-box'>
							<ul>
								{/* 기존의 파일 데이터, 삭제 로직 */}
								{severFiles.map((file, index) => (
									<li key={file.fileId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
										<span>
											<strong>File Name:</strong> {file.originFileName} &nbsp;
											<button className="delete-button" type="button" onClick={() => handleRemoveSeverFile(index, postId, file.fileId)}>
												x
											</button>
										</span>
									</li>
								))}
								{/* 새로운 파일을 저장할 때 */}
								{files.map((file, index) => (
									<li key={file.fileId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
									<span>
										<strong>File Name:</strong> {file.name} &nbsp;
										<button className="delete-button" type="button" onClick={() => handleRemoveFile(index)}>
											x
										</button>
									</span>
								</li>
								))}
							</ul>
						</div>
					) : (
						<div className='file-box'>
							<p>No files</p>
						</div>
					)}
					<div className='file-select-box'>
							<input type='file' name='file' onChange={handleChangeFile} multiple="multiple" />
					</div>
					</td>
				</tr>
				</tbody>
			</table>

			<div className="my-3 d-flex justify-content-center">
				<button className="btn btn-dark" onClick={updatePost}><i className="fas fa-pen"></i> 수정하기</button>
			</div>

			{/* 모달 */}
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

export default PostUpdate;