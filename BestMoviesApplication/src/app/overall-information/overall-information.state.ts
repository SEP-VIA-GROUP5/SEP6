import {Movie} from "../../model/movie";
import {Person} from "../../model/person";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {
  OverAllInformationFetchBestMoviesTop,
  OverAllInformationFetchInfo, OverAllInformationFetchMoviesFromSameYear, OverAllInformationFetchSameRatingRange,
  OverAllInformationReset
} from "./overall-information.actions";
import {current, produce} from "immer";
import {moviesMock} from "../../util/mocks/movies_mock";
import {peopleMock} from "../../util/mocks/people_mock";
import {NbToastrService} from "@nebular/theme";
import { MoviesService } from "src/api/movies.service";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

export interface OverAllInformationStateModel {
  isFetching: boolean;
  moviesByYearIsFiltered: boolean;
  movies: Movie[];
  people: Person[];
  topMovies: Movie[];
  topMoviesByRating: Movie[];
  topMoviesByYear: Movie[];
}

export const defaultsState: OverAllInformationStateModel = {
  isFetching: false,
  moviesByYearIsFiltered: false,
  movies: [],
  people: [],
  topMovies: [],
  topMoviesByRating: [],
  topMoviesByYear: [],
}

@State<OverAllInformationStateModel>( {
  name: 'overallInformationPage',
  defaults: defaultsState,
})

@Injectable()
export class OverAllInformationState {
  movies: Movie[] = [];
  people: Person[] = [];

  constructor(
    private nbToastrService: NbToastrService,
    private moviesService: MoviesService,
    //here the services used for getting date from backend are imported
  ) {
  }

  @Action(OverAllInformationFetchBestMoviesTop)
  overAllInformationFetchBestMoviesTop(
    {getState, setState}: StateContext<OverAllInformationStateModel>,
    action: OverAllInformationFetchBestMoviesTop) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    this.moviesService.getNMostPopularMovies(action.top)
    .pipe(
      tap((movies: Movie[]) => {
        newState = produce(getState(), draft => {
          draft.topMovies = movies;
          draft.isFetching = false;
        });
        setState(newState);
      }),
      catchError((error) => {
        newState = produce(getState(), draft => {
          draft.isFetching = false;
        });
        setState(newState);
        return throwError(error);
      })
    )
    .subscribe();
  }


  @Action(OverAllInformationFetchSameRatingRange)
  overAllInformationFetchSameRatingRange(
    {getState, setState}: StateContext<OverAllInformationStateModel>,
    action: OverAllInformationFetchSameRatingRange) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    if (!action.rating) {
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      })

      setState(newState);
      return this.nbToastrService.show(
        "Rating is not found",
        "Couldn't fetch information about movies from same rating",
        {
          status: "warning"
        }
      );
    }

    this.moviesService.getNMoviesByRating(action.rating, action.listSize)
    .pipe(
      tap((movies: Movie[]) => {
        newState = produce(getState(), draft => {
          draft.topMoviesByRating = movies;
          draft.isFetching = false;
        })
        setState(newState);
      }),
      catchError((error) => {
        newState = produce(getState(), draft => {
          draft.isFetching = false;
        });
        setState(newState);
        return throwError(error);
      })
    )
    .subscribe();
  }


  @Action(OverAllInformationFetchMoviesFromSameYear)
  overAllInformationFetchMoviesFromSameYear(
    {getState, setState}: StateContext<OverAllInformationStateModel>,
    action: OverAllInformationFetchMoviesFromSameYear) {

    let newState = produce(getState(), draft => {
      draft.isFetching = true;
    })
    setState(newState);

    if (!action.year) {
      newState = produce(getState(), draft => {
        draft.isFetching = false;
      })
      setState(newState);
      return this.nbToastrService.show(
        "Movie is not found",
        "Couldn't fetch information about movies from same year",
        {
          status: "warning"
        }
      );
    }

    this.moviesService.getNMoviesByYear(action.year, action.listSize)
    .pipe(
      tap((movies: Movie[]) => {
        newState = produce(getState(), draft => {
          draft.topMoviesByYear = movies;
          draft.isFetching = false;
        })
        setState(newState);
      }),
      catchError((error) => {
        newState = produce(getState(), draft => {
          draft.isFetching = false;
        });
        setState(newState);
        return throwError(error);
      })
    )
    .subscribe();
  }


  @Action(OverAllInformationReset)
  async overAllInformationReset(
    { getState, setState }: StateContext<OverAllInformationStateModel>,
    action: OverAllInformationReset) {
    setState(defaultsState);
  }

}
