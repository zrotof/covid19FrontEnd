import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-outdated-content-advice',
  templateUrl: './outdated-content-advice.component.html',
  styleUrls: ['./outdated-content-advice.component.css']
})
export class OutdatedContentAdviceComponent{

  @Output() closeOutdateModal = new EventEmitter<boolean>();

  onCloseModal(){
    this.closeOutdateModal.emit(true);
  }
}
