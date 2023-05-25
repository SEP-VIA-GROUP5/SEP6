import {PeopleType} from "src/app/information/people/people-overview/constants/constants";

export class PeopleOverviewFetchInfo {
  static readonly type = 'People Overview - Fetching info';
  constructor(public peopleType: PeopleType,
              public personId: number) {
  }
}

export class PeopleFetchAverageRatingMovies {
  static readonly type = "People - Fetching average ratings on person's movies";
  constructor() {
  }
}

export class PeopleOverviewReset {
  static readonly type = 'People Overview - Reset';
  constructor() {
  }
}
