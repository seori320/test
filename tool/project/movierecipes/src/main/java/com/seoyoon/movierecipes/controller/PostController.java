package com.seoyoon.movierecipes.controller;

import com.seoyoon.movierecipes.dto.post.PostDTO;
import com.seoyoon.movierecipes.dto.post.PostFileDTO;
import com.seoyoon.movierecipes.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.IOException;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @GetMapping("/save")
    public String save() {
        return "save";
    }

    @PostMapping("/save")
    public String save(PostDTO postDTO) throws IOException {
        System.out.println("postDTO = " + postDTO);
        postService.save(postDTO);
        return "redirect:/list";
    }

    @GetMapping("/list")
    public String findAll(Model model) {
        List<PostDTO> postDTOList = postService.findAll();
        model.addAttribute("postList", postDTOList);
        System.out.println("postDTOList = " + postDTOList);
        return "list";
    }

    // /10, /1
    @GetMapping("/{id}")
    public String findById(@PathVariable("id") Long id, Model model) {
        // 조회수 처리
        postService.updateHits(id);
        // 상세내용 가져옴
        PostDTO postDTO = postService.findById(id);
        model.addAttribute("post", postDTO);
        System.out.println("postDTO = " + postDTO);
        if (postDTO.getFileAttached() == 1) {
            List<PostFileDTO> postFileDTOList = postService.findFile(id);
            model.addAttribute("postFileList", postFileDTOList);
        }
        return "detail";
    }

    @GetMapping("/update/{id}")
    public String update(@PathVariable("id") Long id, Model model) {
        PostDTO postDTO = postService.findById(id);
        model.addAttribute("post", postDTO);
        return "update";
    }

    @PostMapping("/update/{id}")
    public String update(PostDTO postDTO, Model model) {
        postService.update(postDTO);
        PostDTO dto = postService.findById(postDTO.getId());
        model.addAttribute("post", dto);
        return "detail";
    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable("id") Long id) {
        postService.delete(id);
        return "redirect:/list";
    }
}
