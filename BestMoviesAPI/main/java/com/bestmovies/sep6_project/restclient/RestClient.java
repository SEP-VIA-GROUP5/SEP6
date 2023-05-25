package com.bestmovies.sep6_project.restclient;


import com.bestmovies.sep6_project.model.external.PersonResult;
import com.bestmovies.sep6_project.model.external.movies.ExternalMovie;
import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.InputStream;
import java.io.InputStreamReader;

@Component
public class RestClient {
    private Gson gson;
    private RestTemplate template;
    private final String fileName = "/usr/app/BestMoviesAPI/api_key.json";
    private Key apiKey;
    private HttpHeaders headers;
    HttpEntity<String> httpEntity;

    public RestClient(){
        gson = new Gson();
        template = restTemplate();
        InputStream stream = getClass().getResourceAsStream("/api_key.json");
        JsonReader reader = new JsonReader(new InputStreamReader(stream));
        apiKey = gson.fromJson(reader, Key.class);
        headers = new HttpHeaders();
        headers.add("Authorization","Bearer " + apiKey.getApi_bearer());
        headers.add("Content-Type","application/json");

        httpEntity = new HttpEntity<>(headers);
    }

    private RestTemplate restTemplate(){
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(3000);
        factory.setReadTimeout(3000);
        return new RestTemplate(factory);
    }

    public ExternalMovie getAllMoviesByName(long movieId){
        String uri = "https://api.themoviedb.org/3/movie/tt" + movieId + "?language=en-US";
        ResponseEntity<String> result;

        try{
            result = template.exchange(uri, HttpMethod.GET, httpEntity, String.class);
        }
        catch (Exception e){
            result = null;
        }

        if(result != null){
            if(result.getStatusCode() == HttpStatus.OK){
                return gson.fromJson(result.getBody(), ExternalMovie.class);
            }
        }
        return null;
    }

    public PersonResult getAllPersonsByName(String personName){
        String uri = "https://api.themoviedb.org/3/search/person?query=" + "\"" + personName + "\"" + "&include_adult=false&language=en-US&page=1";
        ResponseEntity<String> result;
        try{
            result = template.exchange(uri, HttpMethod.GET, httpEntity, String.class);
        }
        catch (Exception e){
            result = null;
        }
        if(result != null) {
            if (result.getStatusCode() == HttpStatus.OK) {
                return gson.fromJson(result.getBody(), PersonResult.class);
            }
        }
        return null;
    }
}
