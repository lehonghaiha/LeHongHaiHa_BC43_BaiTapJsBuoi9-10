
var mangNhanVien = [];
var kiemTra = new Validation();

document.querySelector('#btnThemNhanVien').onclick = function () {
    document.querySelector('#btn-cap-nhat').disabled = true;
}
document.querySelector('#btn-dong').onclick = function () {
    document.querySelector('#taiKhoan').disabled = false;
    document.querySelector('#btn-them-nhan-vien').disabled = false;
    document.querySelector('#btn-cap-nhat').disabled = false;
    //Test chức năng đóng modal thì reset hết các lỗi thông báo
    document.getElementById('error-required-taiKhoan').innerHTML = '';
    document.getElementById('error-required-hoTen').innerHTML = '';
    document.getElementById('error-required-email').innerHTML = '';
    document.getElementById('error-required-matKhau').innerHTML = '';
    document.getElementById('error-required-ngayLam').innerHTML = '';
    document.getElementById('error-required-luongCoBan').innerHTML = '';
    document.getElementById('error-required-chucVu').innerHTML = '';
    document.getElementById('error-required-gioLam').innerHTML = '';
}
document.querySelector('#btn-them-nhan-vien').onclick = function () {
    var nv = new NhanVien();
    console.log(nv);
    nv.taiKhoan = document.querySelector('#taiKhoan').value;
    nv.hoTen = document.querySelector('#hoTen').value;
    nv.email = document.querySelector('#email').value;
    nv.matKhau = document.querySelector('#matKhau').value;
    nv.ngayLam = document.querySelector('#datepicker').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.chucVu = document.querySelector('#chucVu').value;
    nv.gioLam = document.querySelector('#gioLam').value;
    nv.tongLuong = nv.tinhLuong();
    nv.xepLoai = nv.xepLoaiNhanVien();
    // Validation
    var valid = true;
    //Kiểm tra rỗng cho tất cả các trường
    valid = kiemTra.kiemTraRong(nv.taiKhoan, 'error-required-taiKhoan', 'Tài khoản') &
        kiemTra.kiemTraRong(nv.hoTen, 'error-required-hoTen', 'Họ tên') &
        kiemTra.kiemTraRong(nv.email, 'error-required-email', 'Email') &
        kiemTra.kiemTraRong(nv.matKhau, 'error-required-matKhau', 'Mật khẩu') &
        kiemTra.kiemTraRong(nv.ngayLam, 'error-required-ngayLam', 'Ngày làm') &
        kiemTra.kiemTraRong(nv.luongCoBan, 'error-required-luongCoBan', 'Lương cơ bản') &
        kiemTra.kiemTraRong(nv.chucVu, 'error-required-chucVu', 'Chức Vụ') &
        kiemTra.kiemTraRong(nv.gioLam, 'error-required-gioLam', 'Giờ làm');

    //Kiểm tra tài khoản 4-6 ký số
    valid = valid & kiemTra.kiemTraKySo(nv.taiKhoan, 'error-required-taiKhoan', 'Tài khoản', 4, 6);
    // Kiểm tra số taiKhoan khi thêm mới không được trùng với tài khoản đã có trong table
    valid = valid & kiemTra.kiemTraTonTai(nv.taiKhoan, mangNhanVien, 'taiKhoan', 'error-required-taiKhoan', 'Tài khoản');
    // Kiểm tra tên nhân viên (phải là chữ, không để trống)
    valid = valid & kiemTra.kiemTraKyTu(nv.hoTen, 'error-required-hoTen', 'Họ tên');
    //Kiểm tra email - đúng định dạng
    valid = valid & kiemTra.kiemTraEmail(nv.email, 'error-required-email', 'Email');
    // Kiểm tra mật khẩu (4-6 ký tự, chứa ít nhất 1 số, 1 in hoa, 1 đặc biệt và không trống)
    valid = valid & kiemTra.kiemTraMatKhau(nv.matKhau, 'error-required-matKhau', 6, 10);
    // kiểm tra ngày làm ( không để trống, định dạng mm/dd/yyyy)
    valid = valid & kiemTra.kiemTraNgayThang(nv.ngayLam,'error-required-ngayLam');
    // Kiểm tra lương cơ bản (1 triệu đến 20 triệu, không để trống)
    valid = valid & kiemTra.kiemTraGiaTri(Number(nv.luongCoBan), 'error-required-luongCoBan', 'lương cơ bản', 1e+6, 20e+6);
    //Kiểm tra chức vụ chọn phải hợp lệ    
    // Kiểm tra số giờ làm (80-200, không để trống)
    valid = valid & kiemTra.kiemTraGiaTri(nv.gioLam, 'error-required-gioLam', 'Giờ làm', 80, 200);
    if (!valid) {
        return;
    };

    mangNhanVien.push(nv);
    console.log(mangNhanVien);
    renderTableNhanVien(mangNhanVien);
    luuLocalStore();
}

// Viết hàm render Xuất dữ liệu mangNhanVien:
function renderTableNhanVien(arrNhanVien) {
    var htmlString = '';
    for (var index = 0; index < arrNhanVien.length; index++) {
        var renderNv = arrNhanVien[index];
        htmlString += `
            <tr>
                <td>${renderNv.taiKhoan}</td>
                <td>${renderNv.hoTen}</td>
                <td>${renderNv.email}</td>
                <td>${renderNv.ngayLam}</td>
                <td>${renderNv.chucVu}</td>
                <td>${renderNv.tongLuong.toLocaleString()}</td>
                <td>${renderNv.xepLoai}</td>
                <td>
                    <button onclick = "layThongTin('${renderNv.taiKhoan}')" class = 'btn btn-warning' data-bs-toggle="modal" data-bs-target="#exampleModal" ><i class="fa fa-wrench"></i></button>
                </td>            
                <td>
                    <button class = 'btn btn-danger' onclick = "xoaNhanVien('${renderNv.taiKhoan}')"><i class="fa fa-times"></i></button>
                </td>
                
            </tr>
        `
    }
    document.querySelector('tbody').innerHTML = htmlString;
    return htmlString;
}
//Hàm lưu dữ liệu người dùng nhập lên Local Store
function luuLocalStore() {
    var stringMangNhanVien = JSON.stringify(mangNhanVien);
    localStorage.setItem('mangNhanVien', stringMangNhanVien);
}
//Hàm xuất dữ liệu đã lưu trong localStore ra Table
function layStorage() {
    if (localStorage.getItem('mangNhanVien')) {
        var stringMangNhanVien = localStorage.getItem('mangNhanVien');
        mangNhanVien = JSON.parse(stringMangNhanVien);
        renderTableNhanVien(mangNhanVien);
    }
}
layStorage();

//Hàm xóa nhân viên:
function xoaNhanVien(taiKhoanCanXoa) {
    var indexDel = -1;
    for (var index = 0; index < mangNhanVien.length; index++) {
        if (mangNhanVien[index].taiKhoan === taiKhoanCanXoa) {
            indexDel = index;
            break;
        }
    }
    mangNhanVien.splice(indexDel, 1);
    renderTableNhanVien(mangNhanVien);
    luuLocalStore();
}

//Hàm Lấy thông tin nhân viên:
function layThongTin(taiKhoanCanSua) {
    document.querySelector('#taiKhoan').disabled = true;
    document.querySelector('#btn-them-nhan-vien').disabled = true;
    // console.log(mangNhanVien[1].gioLam);
    for (var index = 0; index < mangNhanVien.length; index++) {
        if (mangNhanVien[index].taiKhoan === taiKhoanCanSua) {
            console.log('In mảng nhân viên: ', mangNhanVien);
            document.querySelector('#taiKhoan').value = mangNhanVien[index].taiKhoan;
            document.querySelector('#hoTen').value = mangNhanVien[index].hoTen;
            document.querySelector('#email').value = mangNhanVien[index].email;
            document.querySelector('#matKhau').value = mangNhanVien[index].matKhau;
            document.querySelector('#datepicker').value = mangNhanVien[index].ngayLam;
            document.querySelector('#luongCoBan').value = mangNhanVien[index].luongCoBan;
            document.querySelector('#chucVu').value = mangNhanVien[index].chucVu;
            document.querySelector('#gioLam').value = mangNhanVien[index].gioLam;

            break;
        }
    }
};

//Xử lý btn Cập nhật thông tin
document.querySelector('#btn-cap-nhat').onclick = function () {
    //Lấy thông tin chỉnh sửa từ người dùng
    var thongTinEdit = new NhanVien();
    thongTinEdit.taiKhoan = document.querySelector('#taiKhoan').value;
    thongTinEdit.hoTen = document.querySelector('#hoTen').value;
    thongTinEdit.email = document.querySelector('#email').value;
    thongTinEdit.matKhau = document.querySelector('#matKhau').value;
    thongTinEdit.ngayLam = document.querySelector('#datepicker').value;
    thongTinEdit.luongCoBan = document.querySelector('#luongCoBan').value;
    thongTinEdit.chucVu = document.querySelector('#chucVu').value;
    thongTinEdit.gioLam = document.querySelector('#gioLam').value;
    thongTinEdit.tongLuong = thongTinEdit.tinhLuong();
    thongTinEdit.xepLoai = thongTinEdit.xepLoaiNhanVien();


    // Validation
    var valid = true;
    //Kiểm tra rỗng cho tất cả các trường
    valid = kiemTra.kiemTraRong(thongTinEdit.taiKhoan, 'error-required-taiKhoan', 'Tài khoản') &
        kiemTra.kiemTraRong(thongTinEdit.hoTen, 'error-required-hoTen', 'Họ tên') &
        kiemTra.kiemTraRong(thongTinEdit.email, 'error-required-email', 'Email') &
        kiemTra.kiemTraRong(thongTinEdit.matKhau, 'error-required-matKhau', 'Mật khẩu') &
        kiemTra.kiemTraRong(thongTinEdit.ngayLam, 'error-required-ngayLam', 'Ngày làm') &
        kiemTra.kiemTraRong(thongTinEdit.luongCoBan, 'error-required-luongCoBan', 'Lương cơ bản') &
        kiemTra.kiemTraRong(thongTinEdit.chucVu, 'error-required-chucVu', 'Chức Vụ') &
        kiemTra.kiemTraRong(thongTinEdit.gioLam, 'error-required-gioLam', 'Giờ làm');

    //Kiểm tra tài khoản 4-6 ký số
    valid = valid & kiemTra.kiemTraKySo(thongTinEdit.taiKhoan, 'error-required-taiKhoan', 'Tài khoản', 4, 6);
    // Kiểm tra tên nhân viên (phải là chữ, không để trống)
    valid = valid & kiemTra.kiemTraKyTu(thongTinEdit.hoTen, 'error-required-hoTen', 'Họ tên');
    //Kiểm tra email - đúng định dạng
    valid = valid & kiemTra.kiemTraEmail(thongTinEdit.email, 'error-required-email', 'Email');
    // Kiểm tra mật khẩu (4-6 ký tự, chứa ít nhất 1 số, 1 in hoa, 1 đặc biệt và không trống)
    valid = valid & kiemTra.kiemTraMatKhau(thongTinEdit.matKhau, 'error-required-matKhau', 6, 10);
    // kiểm tra ngày làm ( không để trống, định dạng mm/dd/yyyy)
    valid = valid & kiemTra.kiemTraNgayThang(thongTinEdit.ngayLam,'error-required-ngayLam');
    // Kiểm tra lương cơ bản (1 triệu đến 20 triệu, không để trống)
    valid = valid & kiemTra.kiemTraGiaTri(Number(thongTinEdit.luongCoBan), 'error-required-luongCoBan', 'lương cơ bản', 1e+6, 20e+6);
    //Kiểm tra chức vụ chọn phải hợp lệ    
    // Kiểm tra số giờ làm (80-200, không để trống)
    valid = valid & kiemTra.kiemTraGiaTri(thongTinEdit.gioLam, 'error-required-gioLam', 'Giờ làm', 80, 200);
    if (!valid) {
        return;
    }

    //Dùng thông tin đã lấy render ra Table nhân viên mới
    for (var index = 0; index < mangNhanVien.length; index++) {
        //So sánh giá trị #taiKhoan để dán lên vị trí chỉnh sửa
        if (mangNhanVien[index].taiKhoan === thongTinEdit.taiKhoan) {
            mangNhanVien[index].hoTen = thongTinEdit.hoTen;
            mangNhanVien[index].email = thongTinEdit.email;
            mangNhanVien[index].matKhau = thongTinEdit.matKhau;
            mangNhanVien[index].ngayLam = thongTinEdit.ngayLam;
            mangNhanVien[index].luongCoBan = thongTinEdit.luongCoBan;
            mangNhanVien[index].chucVu = thongTinEdit.chucVu;
            mangNhanVien[index].gioLam = thongTinEdit.gioLam;

            mangNhanVien[index].tongLuong = thongTinEdit.tongLuong;
            mangNhanVien[index].xepLoai = thongTinEdit.xepLoai;
            break;
        }
    };

    renderTableNhanVien(mangNhanVien);
    luuLocalStore();


}
//Xử lý phần tìm kiếm
document.querySelector('#txtTuKhoa').oninput = function () {
    // console.log('test thử link chưa');
    var tuKhoa = document.querySelector('#txtTuKhoa').value;
    tuKhoa = stringToSlug(tuKhoa);
    var mangNhanVienTimKiem = [];
    for (var index = 0; index < mangNhanVien.length; index++) {
        var nv = mangNhanVien[index];
        var txtXepLoai = stringToSlug(nv.xepLoai);
        if (txtXepLoai.search(tuKhoa) !== -1) {
            mangNhanVienTimKiem.push(nv);
        }
    }
    renderTableNhanVien(mangNhanVienTimKiem);
};

// Hàm bỏ dấu
function stringToSlug(title) {
    //Đổi chữ hoa thành chữ thường
    slug = title.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
}