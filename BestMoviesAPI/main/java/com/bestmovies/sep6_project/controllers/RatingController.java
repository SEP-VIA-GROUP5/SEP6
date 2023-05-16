package com.bestmovies.sep6_project.controllers;

import com.bestmovies.sep6_project.model.Movie;
import com.bestmovies.sep6_project.model.Rating;
import com.bestmovies.sep6_project.services.MovieService;
import com.bestmovies.sep6_project.services.RatingService;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rating")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @RequestMapping(value = "/save", method = RequestMethod.POST, consumes="application/json")
    public void addMovie(@RequestBody Rating rating, HttpServletResponse response){
        setResponse(response, ratingService.createRating(rating.getRating(), rating.getMovie(), rating.getVotes()));
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    List<Rating> getAllRatings(){
        return ratingService.getAllRatings();
    }

    @RequestMapping(value = "/ratingId/{ratingId}", method = RequestMethod.PUT, consumes="application/json")
    public void updateRating(@RequestBody Rating updatedRating, @PathVariable int ratingId, HttpServletResponse response){
        setResponse(response, ratingService.editRating(updatedRating ,ratingId));
    }

    @RequestMapping(value = "/ratingId/{ratingId}", method = RequestMethod.DELETE)
    public void deleteRating(@PathVariable int ratingId, HttpServletResponse response){
        setResponse(response, ratingService.deleteRating(ratingId));
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    Movie getRatingById(@PathVariable int id){
        return ratingService.getRatingById(id);
    }

    public void setResponse(HttpServletResponse response, boolean success){
        if(success){
            response.setStatus(HttpStatus.SC_OK);
        }
        else {
            response.setStatus(HttpStatus.SC_BAD_REQUEST);
        }
    }
}
