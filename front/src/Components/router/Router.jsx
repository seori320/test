import { Routes, Route } from "react-router-dom";

import Home from "../app/Home"
import PostList from "../post/PostList"
import PostWrite from "../post/PostWrite"
import PostDetail from "../post/PostDetail"
import PostUpdate from "../post/PostUpdate"
import PostAnswer from "../post/PostAnswer"
import Join from "../member/Join"
import Login from "../member/Login"
import Logout from "../member/Logout"
import Update from "../member/MemberUpdate"
import MemberUpdate from "../member/MemberUpdate";
import CheckPwd from "../member/CheckPwd";


function Router() {

	return (
			<Routes>
				<Route path="/" element={<Home />}></Route>

				<Route path="/postlist" element={<PostList />}></Route>
				<Route path="/postwrite" element={<PostWrite />}></Route>
				<Route path="/postdetail/:postId" element={<PostDetail />}></Route>
				<Route path="/postupdate" element={<PostUpdate />}></Route>
				<Route path="/postanswer/:parentSeq" element={<PostAnswer />}></Route>

				<Route path="/login" element={<Login />}></Route>
				<Route path="/join" element={<Join />}></Route>
				<Route path="/checkpwd" element={<CheckPwd />}></Route>
				<Route path="/update" element={<MemberUpdate />}></Route>
				<Route path="/logout" element={<Logout />}></Route>
			</Routes>
	);
}

export default Router;