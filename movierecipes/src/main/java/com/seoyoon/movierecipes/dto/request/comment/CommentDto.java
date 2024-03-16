package com.seoyoon.movierecipes.dto.request.comment;

import com.seoyoon.movierecipes.entity.Comment;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * -Request-
 * 댓글 등록, 수정 요청, <br>
 * -Member, Post는 URI Resource로 받음
 */

@Getter
@Setter
@NoArgsConstructor
public class CommentDto {

    private String content;

    @Builder
    public CommentDto(String content) {
        this.content = content;
    }

    public static Comment ofEntity(CommentDto dto) {
        return Comment.builder()
                .content(dto.getContent())
                .build();
    }
}
