package com.seoyoon.movierecipes.entity;

import com.seoyoon.movierecipes.common.BaseTimeEntity;

import jakarta.persistence.*;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "file")
@Getter
@NoArgsConstructor
public class FileEntity extends BaseTimeEntity {

    @Id @GeneratedValue
    @Column(name = "file_id")
    private Long id;

    @Column(name = "origin_file_name")
    private String originFileName;

    @Column(name = "file_type")
    private String fileType;

    @Column(name = "file_path")
    private String filePath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    public Post post;

    @Builder
    public FileEntity(Long id, String originFileName, String filePath, String fileType) {
        this.id = id;
        this.originFileName = originFileName;
        this.filePath = filePath;
        this.fileType = fileType;
    }

    public void setMappingPost(Post post) {
        this.post = post;
    }
}
