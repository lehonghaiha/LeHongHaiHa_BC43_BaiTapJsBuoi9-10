//Khai báo 1 prototype chứa các hàm kiểm tra nhập liệu:
function Validation() {
    this.kiemTraRong = function (value, idError, name) {
        if (value.trim() === '') {
            document.getElementById(idError).innerHTML = `${name} không được bỏ trống!`;
            return false;
        }
        document.getElementById(idError).innerHTML = '';
        return true;
    };
    this.kiemTraKyTu = function (value, idError, name) {
        var regexLetter = /^[A-Z a-z]+$/;
        //Nếu chuỗi định dạng test thành công thì true
        if (regexLetter.test(value)) {
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} tất cả phải là ký tự!`;
        return false;
    };
    this.kiemTraEmail = function (value, idError, name) {
        var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (regexEmail.test(value)) {
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} Email không hợp lệ!`;
        return false;
    };
    this.kiemTraSo = function (value, idError, name) {
        var regexNumber = /^[0-9]+$/;
        if (regexNumber.test(value)) {
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} không hợp lệ`;
        return false;
    };
    this.kiemTraDoDai = function (value, idError, name, minLength, maxLength) {
        if (value.length > maxLength || value.length < minLength){
            document.getElementById(idError).innerHTML = `Độ dài ${name} từ ${minLength} đến ${maxLength}!`;
            return false;
        }
        document.getElementById(idError).innerHTML = '';
        return true;
    };
    this.kiemTraGiaTri = function(value, idError, name,minValue,maxValue){
        var regexNumber = /^[0-9]+$/;
        if (regexNumber.test(value)){
            //Kiểm tra giá trị:
            if(Number(value)<minValue || Number(value)>maxValue){
                document.getElementById(idError).innerHTML = `${name} từ ${minValue} đến ${maxValue}`;
                return false;
            }
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} giá trị không hợp lệ!`;
        return false;

    };
}