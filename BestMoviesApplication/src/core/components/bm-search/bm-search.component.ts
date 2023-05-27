import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'bm-search',
  template: `
      <div class="search-container">
        <input #searchInput
               (keyup.enter)="search(searchInput.value)"
                (blur)="onReset(searchInput.value); searchInput.value = ''"
               [placeholder]="placeHolder"
        nbInput
        >
        <button
          *ngIf="isFiltered"
          nbButton
          outline
          status="basic"
          shape="round"
          class="reset-button"
          (click)="onReset(searchInput.value)"
        >
          <nb-icon
            icon="refresh-outline"
            pack="eva"
          >
          </nb-icon>
          Reset search
        </button>
      </div>
  `,
  styleUrls: ['./bm-search.component.scss']
})
export class BmSearchComponent {

  @Output() searchEvent = new EventEmitter<string>();
  @Output() resetSearch = new EventEmitter<void>();
  @Input() isFiltered: boolean;
  @Input() placeHolder: string;

  constructor(
    private nbToastrService: NbToastrService,
  ) {
  }

  onReset(searchInput: string) {
    this.resetSearch.emit();

    this.nbToastrService.show('Search has reseted', 'List is not filtered anymore', {status: "success"});
  }

  search(searchInput: string) {
    if(searchInput.length >= 3) {
      this.searchEvent.emit(searchInput);
    }
  }
}
