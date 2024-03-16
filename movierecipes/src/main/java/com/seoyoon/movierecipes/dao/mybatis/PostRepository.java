//package com.seoyoon.movierecipes.dao.mybatis;
//
//import com.seoyoon.movierecipes.dto.post.PostDto;
//import com.seoyoon.movierecipes.dto.post.PostFileDto;
//import lombok.RequiredArgsConstructor;
//import org.mybatis.spring.SqlSessionTemplate;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//@RequiredArgsConstructor
//public class PostRepository {
//    private final SqlSessionTemplate sql;
//    public PostDto save(PostDto postDto) {
//        sql.insert("Post.save", postDto);
//        return postDto;
//    }
//
//    public List<PostDto> findAll() {
//        return sql.selectList("Post.findAll");
//    }
//
//    public void updateHits(Long id) {
//        sql.update("Post.updateHits", id);
//    }
//
//    public PostDto findById(Long id) {
//        return sql.selectOne("Post.findById", id);
//    }
//
//    public void update(PostDto postDto) {
//        sql.update("Post.update", postDto);
//    }
//
//    public void delete(Long id) {
//        sql.delete("Post.delete", id);
//    }
//
//    public void saveFile(PostFileDto postFileDto) {
//        sql.insert("Post.saveFile", postFileDto);
//    }
//
//    public List<PostFileDto> findFile(Long id) {
//        return sql.selectList("Post.findFile", id);
//    }
//}
