import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

import { Modal, Button } from "react-bootstrap";

import "../../css/postwrite.css";

function PostWrite() {
  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]); // 추가: 파일 목록 상태 추가

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseModal = () => setShowModal(false);

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeContent = (event) => {
    setContent(event.target.value);
  };

  const handleChangeFile = (event) => {
    // 총 5개까지만 허용
    const selectedFiles = Array.from(event.target.files).slice(0, 5);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  /* 파일 업로드 */
  const fileUpload = async (postId) => {
	console.log("업로드할 파일 목록:", files);
    // 파일 데이터 저장
    const fd = new FormData();
    files.forEach((file) => fd.append("file", file));

    await axios
      .post(`http://localhost:8080/post/${postId}/file/upload`, fd, { headers: headers })
      .then((resp) => {
        console.log("[file.jsx] fileUpload() success :D");
        console.log(resp.data);

        setModalMessage("파일 업로드 성공 :D");
        setShowModal(true);
      })
      .catch((err) => {
        console.log("[FileData.jsx] fileUpload() error :<");
        console.log(err);
      });
  };

  /* [POST /post]: 게시글 작성 */
  const createPost = async () => {
    const req = {
      title: title,
      content: content,
    };

    await axios
      .post("http://localhost:8080/post/write", req, { headers: headers })
      .then((resp) => {
        console.log("[PostWrite.jsx] createPost() success :D");
        console.log(resp.data);
        const postId = resp.data.postId;
        console.log("postId:", postId);
        fileUpload(postId);

        setModalMessage("새로운 게시글을 성공적으로 등록했습니다 :D");
        setShowModal(true);
        navigate(`/postdetail/${resp.data.postId}`); // 새롭게 등록한 글 상세로 이동
      })
      .catch((err) => {
        console.log("[PostWrite.jsx] createPost() error :<");
        console.log(err);
      });
  };

  useEffect(() => {
    // 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
    setHeaders({
      Authorization: `Bearer ${localStorage.getItem("post_access_token")}`,
    });

    // 로그인한 사용자인지 체크
    if (!auth) {
      setModalMessage("로그인 한 사용자만 게시글을 작성할 수 있습니다 !");
      setShowModal(true);
      navigate(-1);
    }
  }, []);

  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <th className="table-primary">작성자</th>
            <td>
              <input type="text" className="form-control" value={localStorage.getItem("id")} size="50px" readOnly />
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
              <textarea className="form-control" value={content} onChange={changeContent} rows="10"></textarea>
            </td>
          </tr>
          <tr>
            <th className="table-primary">파일</th>
            <td>
              {files.map((file, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center" }}>
                  <p>
                    <strong>FileName:</strong> {file.name}
                  </p>
                  <button className="delete-button" type="button" onClick={() => handleRemoveFile(index)}>
                    x
                  </button>
                </div>
              ))}
              {files.length < 5 && (
                <div>
                  <input type="file" name="file" onChange={handleChangeFile} multiple="multiple" />
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="my-5 d-flex justify-content-center">
        <button className="btn btn-outline-secondary" onClick={createPost}>
          <i className="fas fa-pen"></i> 등록하기
        </button>
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

export default PostWrite;
