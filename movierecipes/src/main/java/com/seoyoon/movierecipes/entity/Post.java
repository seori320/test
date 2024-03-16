package com.seoyoon.movierecipes.entity;

import com.seoyoon.movierecipes.common.BaseTimeEntity;

import jakarta.persistence.*;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Post extends BaseTimeEntity {

    @Id @GeneratedValue
    @Column(name = "post_id")
    private Long id;

    @Column(nullable = false)
    private String title;

    private String content;

    @Column(name = "view_count")
    private int viewCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    public Member member;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @BatchSize(size = 10)
    public List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @BatchSize(size = 10)
    public List<FileEntity> files = new ArrayList<>();

    @Builder
    public Post(Long id, String title, String content, int viewCount, Member member) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.viewCount = viewCount;
        this.member = member;
    }

    //== 조회수 증가 ==//
    public void upViewCount() {
        this.viewCount++;
    }

    //== 수정 Dirty Checking ==//
    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }

    //== Member & Post 연관관계 편의 메소드 ==//
    public void setMappingMember(Member member) {
        this.member = member;
        member.getPosts().add(this);
    }
}
