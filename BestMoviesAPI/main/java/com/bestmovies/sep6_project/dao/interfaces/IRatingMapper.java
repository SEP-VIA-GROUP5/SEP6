package com.bestmovies.sep6_project.dao.interfaces;

import com.bestmovies.sep6_project.model.Rating;

import java.util.List;

public interface IRatingMapper {
    List<Rating> getAll();
}