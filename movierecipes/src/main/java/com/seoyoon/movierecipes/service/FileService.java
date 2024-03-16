package com.seoyoon.movierecipes.service;

import com.seoyoon.movierecipes.common.exception.ResourceNotFoundException;
import com.seoyoon.movierecipes.dao.PostRepository;
import com.seoyoon.movierecipes.dao.FileRepository;
import com.seoyoon.movierecipes.dto.response.file.ResFileDownloadDto;
import com.seoyoon.movierecipes.dto.response.file.ResFileUploadDto;
import com.seoyoon.movierecipes.entity.Post;
import com.seoyoon.movierecipes.entity.FileEntity;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class FileService {

    private final PostRepository postRepository;
    private final FileRepository fileRepository;

    @Value("${project.folderPath}")
    private String FOLDER_PATH;

    public List<ResFileUploadDto> upload(Long postId, List<MultipartFile> multipartFiles) throws IOException {
        // 게시글 찾기
        Post post = postRepository.findById(postId).orElseThrow(
                () -> new ResourceNotFoundException("Post", "Post Id", String.valueOf(postId))
        );
        List<FileEntity> fileEntitys = new ArrayList<>();
        for (MultipartFile multipartFile : multipartFiles) {
            // get origin file name
            String fileName = multipartFile.getOriginalFilename();

            // random name generation of image while uploading to store in folder
            String randomId = UUID.randomUUID().toString();

            // create save File name : ex) POST_postID_randomID.확장자
            String filePath =
                    "POST_" + post.getId() + "_" + randomId.concat(fileName.substring(fileName.indexOf(".")));

            // File.separator : OS에 따른 구분자
            String fileResourcePath = FOLDER_PATH + File.separator + filePath;

            // create folder if not created
            File f = new File(FOLDER_PATH);
            if (!f.exists()) {
                f.mkdir();
            }

            // file copy in folder
            Files.copy(multipartFile.getInputStream(), Paths.get(fileResourcePath));

            // create File Entity & 연관관게 매핑
            FileEntity saveFile = FileEntity.builder()
                    .originFileName(multipartFile.getOriginalFilename())
                    .filePath(filePath)
                    .fileType(multipartFile.getContentType())
                    .build();
            saveFile.setMappingPost(post);

            // File Entity 저장 및 DTO로 변환 전송
            fileEntitys.add(fileRepository.save(saveFile));
        }
        List<ResFileUploadDto> dtos = fileEntitys.stream()
                .map(ResFileUploadDto::fromEntity)
                .collect(Collectors.toList());

        return dtos;
    }

    public ResFileDownloadDto download(Long fileId) throws IOException {
        FileEntity file = fileRepository.findById(fileId).orElseThrow(
                FileNotFoundException::new
        );
        String filePath = FOLDER_PATH + file.getFilePath();
        String contentType = determineContentType(file.getFileType());
        byte[] content = Files.readAllBytes(new File(filePath).toPath());
        return ResFileDownloadDto.fromFileResource(file, contentType, content);
    }

    public void delete(Long fileId) {
        FileEntity file = fileRepository.findById(fileId).orElseThrow(
                () -> new ResourceNotFoundException("File", "File Id", String.valueOf(fileId))
        );

        // local 파일을 삭제
        String filePath = FOLDER_PATH + File.separator + file.getFilePath();
        File physicalFile = new File(filePath);
        if (physicalFile.exists()) {
            physicalFile.delete();
        }
        fileRepository.delete(file);
    }

    private String determineContentType(String contentType) {
        // ContentType 에 따라 MediaType 결정
        return switch (contentType) {
            case "image/png" -> MediaType.IMAGE_PNG_VALUE;
            case "image/jpeg" -> MediaType.IMAGE_JPEG_VALUE;
            case "text/plain" -> MediaType.TEXT_PLAIN_VALUE;
            default -> MediaType.APPLICATION_OCTET_STREAM_VALUE;
        };
    }
}
