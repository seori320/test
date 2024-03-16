package com.seoyoon.movierecipes.dao;

import com.seoyoon.movierecipes.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<FileEntity, Long> {

}
