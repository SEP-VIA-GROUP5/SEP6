package com.bestmovies.sep6_project.model;

public class Person {
    private Movie movie;
    private Person person;

    public Person(Movie movie, Person person){
        this.movie = movie;
        this.person = person;
    }

    public Movie getMovie() {
        return movie;
    }

    public Person getPerson() {
        return person;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}