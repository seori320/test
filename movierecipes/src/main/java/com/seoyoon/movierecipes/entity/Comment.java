package com.seoyoon.movierecipes.entity;

import jakarta.persistence.*;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "postcomment")
public class Comment extends BaseTimeEntity {

    @Id
    @GeneratedValue
    @Column(name = "postcomment_id")
    private Long id;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    public Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    public Post post;

    @Builder
    public Comment(Long id, String content, Member member, Post post) {
        this.id = id;
        this.content = content;
        this.member = member;
        this.post = post;
    }

    // Post와의 다대일(N:1) 관계를 설정하는 메소드
    public void setPost(Post post) {
        this.post = post;
        post.getComments().add(this); // Post 엔티티에도 Comment를 추가합니다.
    }

    // Member와의 다대일(N:1) 관계를 설정하는 메소드
    public void setMember(Member member) {
        this.member = member;
        member.getComments().add(this); // Member 엔티티에도 Comment를 추가합니다.
    }

    // update
    public void update(String content) {
        this.content = content;
    }
}
