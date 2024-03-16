package com.seoyoon.movierecipes.dto.response.post;

import com.seoyoon.movierecipes.dto.response.comment.ResCommentDto;
import com.seoyoon.movierecipes.dto.response.file.ResPostDetailsFileDto;
import com.seoyoon.movierecipes.entity.Post;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

/**
 * -Response-
 * 게시글 상세, 수정 요청에 대한 정보를 반환
 */

@Getter
@Setter
@NoArgsConstructor
public class ResPostDetailsDto {

    // post info
    private Long postId;
    private String title;
    private String content;
    private int viewCount;
    private String writerName;
    private String createdDate;
    private String modifiedDate;

    // comments
    private List<ResCommentDto> comments;

    // file
    private List<ResPostDetailsFileDto> files;

    @Builder
    public ResPostDetailsDto(Long postId, String title, String content, int viewCount, String writerName, String createdDate, String modifiedDate, List<ResCommentDto> comments, List<ResPostDetailsFileDto> files) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.viewCount = viewCount;
        this.writerName = writerName;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.comments = comments;
        this.files = files;
    }

    public static ResPostDetailsDto fromEntity(Post post) {
        return ResPostDetailsDto.builder()
                .postId(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .viewCount(post.getViewCount())
                .writerName(post.getMember().getUsername())
                .createdDate(post.getCreatedDate())
                .modifiedDate(post.getModifiedDate())
                .comments(post.getComments().stream()
                        .map(ResCommentDto::fromEntity)
                        .collect(Collectors.toList()))
                .files(post.getFiles().stream()
                        .map(ResPostDetailsFileDto::fromEntity)
                        .collect(Collectors.toList()))
                .build();
    }
}
