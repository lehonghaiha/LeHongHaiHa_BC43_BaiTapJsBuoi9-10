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
        var regexLetter = /^[A-Z a-z àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]+$/;       
        
        //Kiểm tra xem có đang hiển thị lỗi bỏ trống hay không
        if (document.getElementById(idError).innerHTML) {
            return;
        }
        if (regexLetter.test(value)) {
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} tất cả phải là ký tự!`;
        return false;
    };
    this.kiemTraEmail = function (value, idError, name) {
        var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        //Kiểm tra xem có đang hiển thị lỗi bỏ trống hay không
        if (document.getElementById(idError).innerHTML) {
            return;
        }

        if (regexEmail.test(value)) {
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} không hợp lệ!`;
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
        if (value.length > maxLength || value.length < minLength) {
            document.getElementById(idError).innerHTML = `Độ dài ${name} từ ${minLength} đến ${maxLength}!`;
            return false;
        }
        document.getElementById(idError).innerHTML = '';
        return true;
    };
    this.kiemTraGiaTri = function (value, idError, name, minValue, maxValue) {
        var regexNumber = /^[0-9]+$/;
        if (document.getElementById(idError).innerHTML) {
            return;
        }
        if (regexNumber.test(value)) {
            //Kiểm tra giá trị:
            if (Number(value) < minValue || Number(value) > maxValue) {
                document.getElementById(idError).innerHTML = `${name} trong khoảng từ ${minValue} đến ${maxValue}`;
                return false;
            }
            document.getElementById(idError).innerHTML = '';
            return true;
        } else {
            document.getElementById(idError).innerHTML = `Giá trị ${name} không hợp lệ!`;
            return false;
        }

    };
    this.kiemTraKySo = function (value, idError, name, minLength, maxLength) {
        var regexNumber = /^[0-9]+$/;
        //Kiểm tra xem có đang hiển thị lỗi bỏ trống hay không
        if (document.getElementById(idError).innerHTML) {
            return;
        }
        if (regexNumber.test(value)) {
            if (value.length > maxLength || value.length < minLength) {
                document.getElementById(idError).innerHTML = `Độ dài ${name} từ ${minLength} đến ${maxLength}!`;
                return false;
            } else {
                document.getElementById(idError).innerHTML = ``
                return true;
            }
        } else {
            document.getElementById(idError).innerHTML = `${name} phải là ký số!`
        }
    };
    this.kiemTraTonTai = function (value,arr,tagName,idError,name){
        var output = true;
        if (document.getElementById(idError).innerHTML) {
            return;
        }
        for (var index = 0; index < arr.length;index++){
            if (value === arr[index][tagName]){
                output = false;
                document.getElementById(idError).innerHTML = `${name} đã tồn tại!`;
                break;
            } else {
                document.getElementById(idError).innerHTML = '';                
            }
        }
        return output;
    }
    this.kiemTraMatKhau = function (value, idError, minLength, maxLength) {        
        var regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[-`!@#$%~^&()*_=+|\./[\]{}'";:?>,<]).{2,}$/;
        //Kiểm tra xem có đang hiển thị lỗi bỏ trống hay không  
        if (document.getElementById(idError).innerHTML) {
            return;
        }

        if (regexPassword.test(value)) {
            if (value.length > maxLength || value.length < minLength) {
                document.getElementById(idError).innerHTML = `Độ dài mật khẩu từ ${minLength} đến ${maxLength}!`;
            } else {
                document.getElementById(idError).innerHTML = '';
                return true ;
            }
        } else {
            document.getElementById(idError).innerHTML = 'Mật khẩu phải chứa ít nhất 1 ký số, 1 ký tự in hoa, 1 ký tự đặc biệt';
            return false;
        }

    };
    this.kiemTraNgayThang = function (value,idError){
        if (document.getElementById(idError).innerHTML) {
            return;
        }
        var regexDate =/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d+$/;
        if (regexDate.test(value)){
            document.getElementById(idError).innerHTML = '';
            return true;
        } else {
            document.getElementById(idError).innerHTML = `Ngày làm phải có định dạng là mm-dd-yyyy`;
        }
    }

}