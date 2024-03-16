package com.seoyoon.movierecipes.service;

import com.seoyoon.movierecipes.common.exception.ResourceNotFoundException;
import com.seoyoon.movierecipes.dao.PostRepository;
import com.seoyoon.movierecipes.dao.CommentRepository;
import com.seoyoon.movierecipes.dao.MemberRepository;
import com.seoyoon.movierecipes.dto.request.comment.CommentDto;
import com.seoyoon.movierecipes.dto.response.comment.ResCommentDto;
import com.seoyoon.movierecipes.entity.Post;
import com.seoyoon.movierecipes.entity.Comment;
import com.seoyoon.movierecipes.entity.Member;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    public Page<ResCommentDto> getAllComments(Pageable pageable, Long postId) {
        Page<Comment> comments = commentRepository.findAllWithMemberAndPost(pageable, postId);
        List<ResCommentDto> commentList = comments.getContent().stream()
                .map(ResCommentDto::fromEntity)
                .collect(Collectors.toList());
        return new PageImpl<>(commentList, pageable, comments.getTotalElements());
    }

    public ResCommentDto write(Long postId, Member member, CommentDto writeDto) {
        // post 정보 검색
        Post post = postRepository.findById(postId).orElseThrow(
                () -> new ResourceNotFoundException("Post", "Post id", String.valueOf(postId))
        );
        // member(댓글 작성자) 정보 검색
        Member commentWriter = memberRepository.findById(member.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Member", "Member id", String.valueOf(member.getId()))
        );
        // Entity 변환, 연관관계 매핑
        Comment comment = CommentDto.ofEntity(writeDto);
        comment.setPost(post);
        comment.setMember(commentWriter);

        Comment saveComment = commentRepository.save(comment);
        return ResCommentDto.fromEntity(saveComment);
    }

    public ResCommentDto update(Long commentId, CommentDto commentDto) {
        Comment comment = commentRepository.findByIdWithMemberAndPost(commentId).orElseThrow(
                () -> new ResourceNotFoundException("Comment", "Comment Id", String.valueOf(commentId))
        );
        comment.update(commentDto.getContent());
        return ResCommentDto.fromEntity(comment);
    }

    public void delete(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
