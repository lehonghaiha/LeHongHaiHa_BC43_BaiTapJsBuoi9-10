//Định nghĩa prototype nhân viên
function NhanVien() {
    this.taiKhoan = '';
    this.hoTen = '';
    this.email = '';
    this.matKhau = '';
    this.ngayLam = '';
    this.luongCoBan = '';
    this.chucVu = '';
    this.gioLam = '';
    this.tongLuong = '';
    this.loaiNhanVien = '';
    this.xepLoai='';
    this.tongLuong = '';
    this.tinhLuong = function () {
        var tongLuong = 0;
        if (this.chucVu == 'Giám đốc'){
            tongLuong = this.luongCoBan*3;
        } else if (this.chucVu === 'Trưởng phòng') {
            tongLuong = this.luongCoBan*2;
        } else if(this.chucVu==='Nhân viên'){
            tongLuong = this.luongCoBan;
        }
        return tongLuong;
    }
    this.xepLoaiNhanVien = function(){
        var output='';
        var soGio = this.gioLam;
        if (soGio>=192){
            output = 'Xuất sắc';            
        }
        if (soGio<192 && soGio>=176){
            output = 'Giỏi';            
        }
        if (soGio<176 && soGio>=160){
            output = 'Khá';            
        }
        if (soGio<160){
            output = 'Trung Bình';            
        }
        return output;
    }
}   