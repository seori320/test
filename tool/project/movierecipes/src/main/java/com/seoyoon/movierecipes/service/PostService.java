package com.seoyoon.movierecipes.service;

import com.seoyoon.movierecipes.dao.PostRepository;
import com.seoyoon.movierecipes.dto.post.PostDTO;
import com.seoyoon.movierecipes.dto.post.PostFileDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    public void save(PostDTO postDTO) throws IOException {
        if (postDTO.getPostFile().get(0).isEmpty()) {
            // 파일 없다.
            postDTO.setFileAttached(0);
            postRepository.save(postDTO);
        } else {
            // 파일 있다.
            postDTO.setFileAttached(1);
            // 게시글 저장 후 id값 활용을 위해 리턴 받음.
            PostDTO savedPost = postRepository.save(postDTO);
            // 파일만 따로 가져오기
            for (MultipartFile postFile: postDTO.getPostFile()) {
                // 파일 이름 가져오기
                String originalFilename = postFile.getOriginalFilename();
                System.out.println("originalFilename = " + originalFilename);
                // 저장용 이름 만들기
                System.out.println(System.currentTimeMillis());
                String storedFileName = System.currentTimeMillis() + "-" + originalFilename;
                System.out.println("storedFileName = " + storedFileName);
                // PostFileDTO 세팅
                PostFileDTO postFileDTO = new PostFileDTO();
                postFileDTO.setOriginalFileName(originalFilename);
                postFileDTO.setStoredFileName(storedFileName);
                postFileDTO.setPostId(savedPost.getId());
                // 파일 저장용 폴더에 파일 저장 처리
                String savePath = "/Users/codingrecipe/development/intellij_community/spring_upload_files/" + storedFileName; // mac
//            String savePath = "C:/development/intellij_community/spring_upload_files/" + storedFileName;
                postFile.transferTo(new File(savePath));
                // post_file_table 저장 처리
                postRepository.saveFile(postFileDTO);
            }
        }
    }

    public List<PostDTO> findAll() {
        return postRepository.findAll();
    }

    public void updateHits(Long id) {
        postRepository.updateHits(id);
    }

    public PostDTO findById(Long id) {
        return postRepository.findById(id);
    }

    public void update(PostDTO postDTO) {
        postRepository.update(postDTO);
    }

    public void delete(Long id) {
        postRepository.delete(id);
    }

    public List<PostFileDTO> findFile(Long id) {
        return postRepository.findFile(id);
    }
}
