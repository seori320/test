package com.seoyoon.movierecipes.dao;

import com.seoyoon.movierecipes.entity.Post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    // 게시글 상세 조회, @BatchSize : Comments와 Files는 필요할 때 in 절로 가져옴
    @Query(value = "SELECT b FROM Post b JOIN FETCH b.member WHERE b.id = :postID")
    Optional<Post> findByIdWithMemberAndCommentsAndFiles(Long postID);

    // 첫 페이징 화면("/")
    @Query(value = "SELECT b FROM Post b JOIN FETCH b.member")
    Page<Post> findAllWithMemberAndComments(Pageable pageable);

    // 제목 검색
    @Query(value = "SELECT b FROM Post b JOIN FETCH b.member WHERE b.title LIKE %:title%")
    Page<Post> findAllTitleContaining(String title, Pageable pageable);

    // 내용 검색
    @Query(value = "SELECT b FROM Post b JOIN FETCH b.member WHERE b.content LIKE %:content%")
    Page<Post> findAllContentContaining(String content, Pageable pageable);

    // 작성자 검색
    @Query(value = "SELECT b FROM Post b JOIN FETCH b.member WHERE b.member.username LIKE %:username%")
    Page<Post> findAllUsernameContaining(String username, Pageable pageable);
}
