package com.seoyoon.movierecipes.dto.response.post;

import com.seoyoon.movierecipes.entity.Post;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * -Response-
 * 게시글 등록 반환 정보
 */

@Getter
@Setter
@NoArgsConstructor
public class ResPostWriteDto {

    private Long postId;
    private String title;
    private String content;
    private String writerName;
    private String createdDate;

    @Builder
    public ResPostWriteDto(Long postId, String title, String content, String writerName, String createdDate) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.writerName = writerName;
        this.createdDate = createdDate;
    }

    public static ResPostWriteDto fromEntity(Post post, String writerName) {
        return ResPostWriteDto.builder()
                .postId(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .writerName(writerName)
                .createdDate(post.getCreatedDate())
                .build();
    }
}
