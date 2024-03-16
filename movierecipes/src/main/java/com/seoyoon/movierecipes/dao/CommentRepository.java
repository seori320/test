package com.seoyoon.movierecipes.dao;

import com.seoyoon.movierecipes.entity.Comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(value = "SELECT c FROM Comment c JOIN FETCH c.member JOIN FETCH c.post b WHERE b.id = :postId")
    Page<Comment> findAllWithMemberAndPost(Pageable pageable, Long postId);

    @Query(value = "SELECT c FROM Comment c JOIN FETCH c.member m JOIN FETCH c.post b WHERE c.id = :commentId")
    Optional<Comment> findByIdWithMemberAndPost(Long commentId);
}
