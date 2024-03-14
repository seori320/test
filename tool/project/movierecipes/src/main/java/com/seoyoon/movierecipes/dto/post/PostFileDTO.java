package com.seoyoon.movierecipes.dto.post;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PostFileDTO {
    private Long id;
    private Long postId;
    private String originalFileName;
    private String storedFileName;
}
