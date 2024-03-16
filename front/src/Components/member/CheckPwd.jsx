import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import MemberUpdate from "./MemberUpdate";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";

function CheckPwd() {
    const { headers, setHeaders } = useContext(HttpHeadersContext);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [showMemberUpdate, setShowMemberUpdate] = useState(false);

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

    useEffect(() => {
        // 컴포넌트가 렌더링될 때마다 localStorage의 토큰 값으로 headers를 업데이트
        setHeaders({
            "Authorization": `Bearer ${localStorage.getItem("post_access_token")}`
        });
      }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const passwordCheck = async () => {
        const req = {
            password: pwd
        }

        try {
            const resp = await axios.post("http://localhost:8080/user/checkPwd", req, { headers: headers });
            console.log("[MemberUpdate.jsx] checkPwd() success :D");
            console.log(resp.data);
            setEmail(resp.data.email);
            setName(resp.data.username);

            setShowMemberUpdate(true);
        } catch (err) {
            console.log("[MemberUpdate.jsx] checkPwd() error :<");
            console.log(err);

            const resp = err.response;
            if (resp.status === 400) {
                setModalMessage(resp.data);
                setShowModal(true);
            }
        }
    }

    return (
        <Container>
            {showMemberUpdate ? (
                <MemberUpdate email={email} name={name} />
            ) : (
                <>
                    <Row className="justify-content-md-center">
                        <Col xs={12} md={6}>
                            <Form>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>비밀번호</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="비밀번호를 입력하세요"
                                        value={pwd}
                                        onChange={changePwd}
                                    />
                                </Form.Group>
                                <Button variant="outline-secondary" onClick={passwordCheck}>
                                    <i className="fas fa-user-plus"></i> 비밀번호 확인
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
                </>
            )}
        </Container>
    );
}

export default CheckPwd;