import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from "@ngxs/store";
import { PROVIDERS } from "../app/app.module";
import { DirectorsService } from "./directors.service";

describe('DirectorsService', () => {
  let service: DirectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [
        ...PROVIDERS,
        Store,
      ],
    });
    service = TestBed.inject(DirectorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
