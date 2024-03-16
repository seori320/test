package com.seoyoon.movierecipes.dto.response.post;

import com.seoyoon.movierecipes.entity.Post;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * -Response-
 * list 요청에 대한 정보를 반환, 양방향 관계로 인해 JSON 직렬화가 반복되는 문제를 해결하기 위한 DTO
 */

@Getter
@Setter
@NoArgsConstructor
public class ResPostListDto {
    // 작성일, 수정일, 작성자, 댓글 개수만 전체 목록에 대한 데이터로 받으면 됨
    // 상세한 댓글 내용 등은 상세보기에서 처리
    private Long postId;
    private String title;
    private String content;
    private int viewCount;
    private String createdDate;
    private String modifiedDate;
    private String writerName;

    @Builder
    public ResPostListDto(Long postId, String title, String content, int viewCount, String createdDate, String modifiedDate, String writerName) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.viewCount = viewCount;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.writerName = writerName;
    }

    // Entity -> DTO
    public static ResPostListDto fromEntity(Post post) {
        return ResPostListDto.builder()
                .postId(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .viewCount(post.getViewCount())
                .createdDate(post.getCreatedDate())
                .modifiedDate(post.getModifiedDate())
                .writerName(post.getMember().getUsername())
                .build();
    }
}
