package com.seoyoon.movierecipes.service;

import com.seoyoon.movierecipes.common.exception.ResourceNotFoundException;
import com.seoyoon.movierecipes.dao.PostRepository;
import com.seoyoon.movierecipes.dao.MemberRepository;
import com.seoyoon.movierecipes.dto.request.post.PostUpdateDto;
import com.seoyoon.movierecipes.dto.request.post.PostWriteDto;
import com.seoyoon.movierecipes.dto.request.post.SearchData;
import com.seoyoon.movierecipes.dto.response.post.ResPostDetailsDto;
import com.seoyoon.movierecipes.dto.response.post.ResPostListDto;
import com.seoyoon.movierecipes.dto.response.post.ResPostWriteDto;
import com.seoyoon.movierecipes.entity.Post;
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
public class PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    // 페이징 리스트
    public Page<ResPostListDto> getAllPosts(Pageable pageable) {
        Page<Post> posts = postRepository.findAllWithMemberAndComments(pageable);
        List<ResPostListDto> list = posts.getContent().stream()
                .map(ResPostListDto::fromEntity)
                .collect(Collectors.toList());
        return new PageImpl<>(list, pageable, posts.getTotalElements());
    }

    // 게시글 검색, isEmpty() == ""
    public Page<ResPostListDto> search(SearchData searchData, Pageable pageable) {
        Page<Post> result = null;
        if (!searchData.getTitle().isEmpty()) {
            result = postRepository.findAllTitleContaining(searchData.getTitle(), pageable);
        } else if (!searchData.getContent().isEmpty()) {
            result = postRepository.findAllContentContaining(searchData.getContent(), pageable);
        } else if (!searchData.getWriterName().isEmpty()) {
            result = postRepository.findAllUsernameContaining(searchData.getWriterName(), pageable);
        }

        // 여기 만약 문제없으면 지우기
        if (result == null) {
            return Page.empty();
        }

        List<ResPostListDto> list = result.getContent().stream()
                .map(ResPostListDto::fromEntity)
                .collect(Collectors.toList());
        return new PageImpl<>(list, pageable, result.getTotalElements());
    }

    // 게시글 등록
    public ResPostWriteDto write(PostWriteDto postDTO, Member member) {

        Post post = PostWriteDto.ofEntity(postDTO);
        Member writerMember = memberRepository.findByEmail(member.getEmail()).orElseThrow(
                () -> new ResourceNotFoundException("Member", "Member Email", member.getEmail())
        );
        post.setMappingMember(writerMember);
        Post savePost = postRepository.save(post);
        return ResPostWriteDto.fromEntity(savePost, writerMember.getUsername());
    }

    // 게시글 상세보기
    public ResPostDetailsDto detail(Long postId) {
        Post findPost = postRepository.findByIdWithMemberAndCommentsAndFiles(postId).orElseThrow(
                () -> new ResourceNotFoundException("Post", "Post Id", String.valueOf(postId))
        );
        // 조회수 증가
        findPost.upViewCount();
        return ResPostDetailsDto.fromEntity(findPost);
    }

    // 게시글 수정
    public ResPostDetailsDto update(Long postId, PostUpdateDto postDTO) {
        Post updatePost = postRepository.findByIdWithMemberAndCommentsAndFiles(postId).orElseThrow(
                () -> new ResourceNotFoundException("Post", "Post Id", String.valueOf(postId))
        );
        updatePost.update(postDTO.getTitle(), postDTO.getContent());
        return ResPostDetailsDto.fromEntity(updatePost);
    }

    // 게시글 삭제
    public void delete(Long postId) {
        postRepository.deleteById(postId);
    }

}
