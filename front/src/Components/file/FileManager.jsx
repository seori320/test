import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

import { Modal, Button } from 'react-bootstrap';

import "../../css/fileDisplay.css"; // 추가: 스타일 파일 import

const FileManager = (props) => {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const boardId = props.boardId;
  const files = props.files;
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleCloseModal = () => setShowModal(false);

  /* 파일 삭제 */
  const fileDelete = async (boardId, fileId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/board/${boardId}/file/delete?fileId=${fileId}`, {headers: headers});
      console.log("[FielManager.jsx] fileDelete() success :D");
      console.log(response.data);

      setModalMessage("파일 삭제 성공 :D");
      setShowModal(true);
      navigate(0);

    } catch (error) {
      console.error("[FielManager.jsx] fileDelete() error :<");
      console.error(error);
    }
  };

  if (!files || files.length === 0) {
    return (
      <div className='file-box'>
        <p>No files</p>
      </div>
    );
  }

  return (
    <div className='file-box'>
      <ul>
        {files.map((file) => (
          <li key={file.fileId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>
              <strong>File Name:</strong> {file.originFileName} &nbsp;
              {/* 파일 다운로드 버튼 */}
              <a href={`http://localhost:8080/board/${boardId}/file/download?fileId=${file.fileId}`} download>
                Download
              </a>
            </span>
            {/* 삭제 버튼을 가장 오른쪽에 배치하기 */}
            <button
              style={{ marginRight: '20px', cursor: 'pointer' }}
              onClick={() => fileDelete(boardId, file.fileId)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

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
};

export default FileManager;
