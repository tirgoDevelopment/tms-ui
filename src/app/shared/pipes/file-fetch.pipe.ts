import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { env } from 'environments/environment';
import { DocumentsService } from 'app/modules/documents/services/documents.service';

@Pipe({
  name: 'fileFetch'
})
export class FileFetchPipe implements PipeTransform {
  constructor(private documentService: DocumentsService) { }

  transform(fileName: string): Observable<string> {
    return this.documentService.getFile(fileName)
  }
}
