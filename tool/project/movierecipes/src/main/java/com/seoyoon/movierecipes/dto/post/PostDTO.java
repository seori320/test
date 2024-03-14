package com.seoyoon.movierecipes.dto.post;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@ToString
public class PostDTO {
    private Long id;
    private String postWriter;
    private String postPass;
    private String postTitle;
    private String postContents;
    private int postHits;
    private String createdAt;
    private int fileAttached;
    private List<MultipartFile> postFile;
}
