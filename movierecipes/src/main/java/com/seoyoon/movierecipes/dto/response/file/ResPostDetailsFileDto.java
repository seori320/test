package com.seoyoon.movierecipes.dto.response.file;

import com.seoyoon.movierecipes.entity.FileEntity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * -Response-
 *  게시글 상세 정보에 포함될 file 정보 dto
 */

@Getter
@Setter
@NoArgsConstructor
public class ResPostDetailsFileDto {

    private Long fileId;
    private String originFileName;
    private String fileType;

    @Builder
    public ResPostDetailsFileDto(Long fileId, String originFileName, String fileType) {
        this.fileId = fileId;
        this.originFileName = originFileName;
        this.fileType = fileType;
    }

    public static ResPostDetailsFileDto fromEntity(FileEntity file) {
        return ResPostDetailsFileDto.builder()
                .fileId(file.getId())
                .originFileName(file.getOriginFileName())
                .fileType(file.getFileType())
                .build();
    }
}
