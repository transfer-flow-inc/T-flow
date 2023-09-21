import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatSizeService {
  formatSize(size: number): string {
    if (size < 1024) {
      return `${size.toFixed(2)} octets`;
    } else if (size >= 1024 && size < 1048576) {
      return `${(size / 1024).toFixed(2)} Ko`;
    } else if (size >= 1048576 && size < 1073741824) {
      return `${(size / 1048576).toFixed(2)} Mo`;
    } else {
      return `${(size / 1073741824).toFixed(2)} Go`;
    }
  }

}
