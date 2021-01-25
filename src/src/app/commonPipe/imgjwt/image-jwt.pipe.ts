import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Pipe({
  name: 'imageJwt'
})
export class ImageJwtPipe implements PipeTransform {

  constructor(
    private http: HttpClient
  ) { }

  async transform(src: string): Promise<string> {
    try {
      const imageBlob = await this.http.get(src, {responseType: 'blob' }).toPromise();

      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve((reader.result as string).replace('data:application/octet-stream', 'data:image/jpeg'));
        };
        reader.readAsDataURL(imageBlob);
      });
    } catch {
      // handle error
      return '';
    }
  }

}
