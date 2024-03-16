import React , { useRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import Comment from "./Comment.jsx"
import "../../css/commentList.css"; // 스타일 파일 import

function CommentList(props) {

	const postId = props.postId;

	// Paging
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPages, setTotalPages] = useState(5);
	const [totalCnt, setTotalCnt] = useState(0);
	const [commentList, setCommentList] = useState([]);

	// comment에서 참조
	const getCommentListRef  = useRef(null);

	const changePage = (page) => {
		setPage(page);
		getCommentList(page);
		getCommentListRef.current(page);
	}

	const getCommentList = async (page) => {
		await axios.get(`http://localhost:8080/post/${postId}/comment/list`, { params: {"page": page - 1} })
			.then((resp) => {
				console.log("[PostComment.jsx] getCommentList() success :D");
				console.log(resp.data);

				setPageSize(resp.data.pageSize);
				setTotalPages(resp.data.totalPages);
				setTotalCnt(resp.data.totalElements);
				setCommentList(resp.data.content);
			}).catch((err) => {
				console.log("[PostComment.jsx] getCommentList() error :<");
				console.log(err);

			});
	}

	useEffect(() => {
		getCommentListRef.current = getCommentList;
		getCommentList(1);
	}, [postId]);

	return (
		<>
			<div className="my-1 d-flex justify-content-center">
			</div>

			<Pagination
				activePage={page}
				itemsCountPerPage={5}
				totalItemsCount={totalCnt}
				pageRangeDisplayed={5}
				prevPageText={"‹"}
				nextPageText={"›"}
				onChange={changePage} />
			{
				commentList.map(function (comment, idx) {
					return (
						<div className="my-5" key={idx}>
							<Comment obj={comment} key={idx} page={page} getCommentList={getCommentListRef.current}/>
						</div>
					);
				})
			}

		</>

	);
}


export default CommentList;