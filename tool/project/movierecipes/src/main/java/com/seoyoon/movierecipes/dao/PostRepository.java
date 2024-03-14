package com.seoyoon.movierecipes.dao;

import com.seoyoon.movierecipes.dto.post.PostDTO;
import com.seoyoon.movierecipes.dto.post.PostFileDTO;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PostRepository {
    private final SqlSessionTemplate sql;
    public PostDTO save(PostDTO postDTO) {
        sql.insert("Post.save", postDTO);
        return postDTO;
    }

    public List<PostDTO> findAll() {
        return sql.selectList("Post.findAll");
    }

    public void updateHits(Long id) {
        sql.update("Post.updateHits", id);
    }

    public PostDTO findById(Long id) {
        return sql.selectOne("Post.findById", id);
    }

    public void update(PostDTO postDTO) {
        sql.update("Post.update", postDTO);
    }

    public void delete(Long id) {
        sql.delete("Post.delete", id);
    }

    public void saveFile(PostFileDTO postFileDTO) {
        sql.insert("Post.saveFile", postFileDTO);
    }

    public List<PostFileDTO> findFile(Long id) {
        return sql.selectList("Post.findFile", id);
    }
}
