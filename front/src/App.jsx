import React from 'react';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';

import MainPage from "C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/page/MainPage.jsx"
import PostPage from "C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/post/PostPage.jsx"
import PostWrite from "C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/post/PostWrite.jsx"
import PostDetail from "C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/post/PostDetail.jsx"
import PostUpdate from "C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/post/PostUpdate.jsx"
import PostAnswer from "C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/post/PostAnswer.jsx"
import Join from "C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/member/Join.jsx"
import Login from "C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/member/Login.jsx"
import Logout from "C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/member/Logout.jsx"
import MemberUpdate from "C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/member/MemberUpdate.jsx";
import CheckPwd from "C:/Users/seoyo/Desktop/MovieRecipes/tool/project/front/src/components/member/CheckPwd.jsx";
import AuthProvider from "./components/context/AuthProvider";
import HttpHeadersProvider from "./components/context/HttpHeadersProvider";


function App() {
    return (

        <div>
            <BrowserRouter>
                <AuthProvider>
                    <HttpHeadersProvider>

                        <Routes>
                            <Route path="/" element={<MainPage />}></Route>

                            <Route path="/postlist" element={<PostPage />}></Route>
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

                    </HttpHeadersProvider>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;