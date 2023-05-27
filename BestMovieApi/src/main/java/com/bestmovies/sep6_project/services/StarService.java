package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.dao.interfaces.IStarMapper;
import com.bestmovies.sep6_project.model.Star;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StarService {
    @Autowired
    private IStarMapper starMapper;

    @Autowired
    private ServiceUtils utils;

    public List<Star> getAllStars(){
        List<Star> stars = starMapper.getAll();
        utils.setMultipleStarsPictures(stars);
        return stars;
    }

    public Star getStarById(long id) {
        Star star = starMapper.getStarById(id);
        utils.setStarPicture(star);
        return star;
    }

    public boolean createStar(Star star) {
        if (star.getName() != null && star.getBirthYear() > 0){
            starMapper.createStar(star);
            return true;
        }
        return false;
    }

    public boolean editStar(Star updatedStar, long personId) {
        if (updatedStar != null && personId > 0){
            updatedStar.setId(personId);
            starMapper.updateStar(updatedStar);
            return true;
        }
        return false;
    }

    public boolean deleteStar(long personId) {
        if (personId > 0){
            starMapper.deleteStar(personId);
            return true;
        }
        return false;
    }

    public List<Star> getByMovieId(long movieId){
        if(movieId > 0){
            List<Star> stars = starMapper.getByMovieId(movieId);
            utils.setMultipleStarsPictures(stars);
            return stars;
        }
        return null;
    }

    public List<Star> getStarsByBirth(int birth){
        if(birth > 0){
            List<Star> stars = starMapper.getStarsByBirth(birth);
            utils.setMultipleStarsPictures(stars);
            return stars;
        }
        return null;
    }

    public List<Star> getStarsByName(String name){
        if(name != null){
            List<Star> stars = starMapper.getStarsByName(name);
            utils.setMultipleStarsPictures(stars);
            return stars;
        }
        return null;
    }

    public boolean addMovieStar(Star star){
        if(star != null){
            starMapper.addMovieStar(star);
            return true;
        }
        return false;
    }

    public List<Star> getPageOfStars(int pageNr, int n) {
        if(pageNr>0 && n>0){
            List<Star> stars = starMapper.getNStarsByPage(pageNr, n);
            utils.setMultipleStarsPictures(stars);
            return stars;
        }
        return null;
    }
}
