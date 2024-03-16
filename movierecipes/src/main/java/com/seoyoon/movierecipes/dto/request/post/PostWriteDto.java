package com.seoyoon.movierecipes.dto.request.post;

import com.seoyoon.movierecipes.entity.Post;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * -Request-
 * 게시글 등록 정보 요청, 작성자는 Authentication 받음
 */

@Getter
@Setter
@NoArgsConstructor
public class PostWriteDto {

    private String title;
    private String content;

    public PostWriteDto(String title, String content) {
        this.title = title;
        this.content = content;
    }

    @Builder
    public static Post ofEntity(PostWriteDto dto) {
        return Post.builder()
                .title(dto.title)
                .content(dto.content)
                .build();
    }
}
