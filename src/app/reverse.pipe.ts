import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse', // Đây là cái tên bạn sẽ dùng trên HTML
  standalone: true // Khai báo nó là một ống độc lập
})
export class ReversePipe implements PipeTransform {
  
  // Hàm transform bắt buộc phải có
  transform(value: string | undefined): string {
    if (!value) return ''; // Nếu không có dữ liệu thì không làm gì cả
    
    // Thuật toán đảo ngược chuỗi
    let chuoiDaoNguoc = '';
    for (let i = value.length - 1; i >= 0; i--) {
      chuoiDaoNguoc += value[i];
    }
    return chuoiDaoNguoc;
  }
}
