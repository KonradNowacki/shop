import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[shopUploadBox]',
  standalone: true,
})
export class UploadDirective {
  @Output() readonly fileDropped = new EventEmitter<File>();
  @HostBinding('class.fileover') fileOver = false;
  @HostBinding('class.file-loaded') fileLoaded = false;

  @HostListener('dragover', ['$event'])
  protected onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
    console.log('drag over');
  }

  @HostListener('dragleave', ['$event'])
  protected onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  protected onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer?.files[0];

    if (file) {
      this.fileLoaded = true;
      this.fileOver = false;
      this.fileDropped.emit(file);
    }
  }
}
