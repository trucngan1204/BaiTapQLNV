var staffList =[];
var createStaff = function () {
  var isFormValid = validate();

  if (!isFormValid) return;

    var id = document.getElementById("tknv").value;
    var fullname = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    var date = document.getElementById("datepicker").value;
    var salary = +document.getElementById("luongCB").value;
    var position = document.getElementById("chucvu").value;
    var hour = +document.getElementById("gioLam").value;
    document.getElementById("tknv").disabled = false; 

    var newStaff = new Staff(
      id, fullname, email, pass, date, salary, position, hour
    );
    staffList.push(newStaff);
    renderStaff();
    saveData();
};
var deleteStaff = function (id) {
  var index = findById(id);
  if (index === -1) {
    alert("Nhân viên không tồn tại!");
    return;
  }
  staffList.splice(index, 1);
  renderStaff();
  saveData();
};
var getStaff = function (id) {
  var index = findById(id);

  if (index === -1) {
    alert("Nhân viên không tồn tại!");
    return;
  }

  var foundStaff = staffList[index];

  document.getElementById("tknv").value = foundStaff.id;
  document.getElementById("name").value = foundStaff.fullname;
  document.getElementById("email").value = foundStaff.email;
  document.getElementById("password").value = foundStaff.pass;
  document.getElementById("datepicker").value = formatDate(foundStaff.date);
  document.getElementById("luongCB").value = foundStaff.salary;
  document.getElementById("chucvu").value = foundStaff.position;
  document.getElementById("gioLam").value = foundStaff.hour;
  document.getElementById("tknv").disabled = true;
};

var updateStaff = function () {
  var id = document.getElementById("tknv").value;
  var fullname = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var pass = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var salary = +document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var hour = +document.getElementById("gioLam").value;

  var index = findById(id);
  
  if (index === -1) {
    alert("Nhân viên không tồn tại!");
    return;
  }

  var foundStaff = staffList[index];

  foundStaff.fullname = fullname;
  foundStaff.email = email;
  foundStaff.pass = pass;
  foundStaff.date = date;
  foundStaff.salary = salary;
  foundStaff.position = position;
  foundStaff.hour = hour;

  renderStaff();
  saveData();
};
var renderStaff = function () {
    var dataHTML = "";
    for (var i = 0; i < staffList.length; i++) {
      dataHTML += `<tr>
        <td>${staffList[i].id}</td>
        <td>${staffList[i].fullname}</td>
        <td>${staffList[i].email}</td>
        <td>${formatDate(staffList[i].date)}</td>
        <td>${staffList[i].position}</td>
        <td>${staffList[i].totalSalary()}</td>
        <td>${staffList[i].totalHours()}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteStaff('${
            staffList[i].id
          }')" >Xoá</button>
          <button class="btn btn-success" data-target="#myModal" data-toggle="modal" onclick="getStaff('${
            staffList[i].id
          }')">Cập nhật</button>
        </td>
      </tr>`;
    }
    document.getElementById("tableDanhSach").innerHTML = dataHTML;
};
var findById = function (id) {
  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].id === id) {
      return i;
    }
  }
  return -1;
};
var saveData = function () {
  var staffListJSON = JSON.stringify(staffList);
  localStorage.setItem("list", staffListJSON);
};
var getData = function () {
    var staffListJSON = localStorage.getItem("list");
    if (staffListJSON) {
      staffList = mapData(JSON.parse(staffListJSON));
      renderStaff();
    }
};
var formatNumber = function(num){
  if(num < 10) return "0" + num;
  return num;
};
var formatDate = function (date){
  var dateObj = new Date(date);
  return (formatNumber(dateObj.getDate()) + "/"+ formatNumber(dateObj.getMonth()+ 1)+"/"+dateObj.getFullYear());
};
  
var mapData = function (dataFromLocal) {
    var data = [];
    for (var i = 0; i < dataFromLocal.length; i++) {
      var currentStaff = dataFromLocal[i];
      var mappedStaff = new Staff(
        currentStaff.id,
        currentStaff.fullname,
        currentStaff.email,
        currentStaff.pass,
        currentStaff.date,
        currentStaff.salary,
        currentStaff.position,
        currentStaff.hour
      );
  
      data.push(mappedStaff);
    }
  
    return data;
}; 
getData();




//------VALIDATION-----------

var validate = function () {
  var id = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var pass = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var salary = document.getElementById("luongCB").value;
  var position = document.getElementById("chucvu").value;
  var hour = document.getElementById("gioLam").value;
  
  var textPattern = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
  var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;

  var isValid = true;

  isValid &= require(id, "tbTKNV") && length(id, "tbTKNV", 4, 6);
  isValid &=
     require(name, "tbTen") && pattern(name, "tbTen", textPattern);
  isValid &=
     require(email, "tbEmail") && pattern(email, "tbEmail", emailPattern);
  isValid &=
     require(pass, "tbMatKhau") && length(pass, "tbMatKhau", 6, 10) && pattern(pass, "tbMatKhau", passPattern);
  
  isValid &= require(salary, "tbLuongCB") && checkSalary(id, "tbLuongCB", 10000000, 20000000);
  isValid &= require(hour, "tbGiolam") && checkSalary(id, "tbGiolam", 80, 200);
  
  require(date, "tbNgay");
  require(position, "tbChucVu");

  return isValid;
  
};

var require = function (val, spanId, message) {
  if (!val) {
    document.getElementById(spanId).innerHTML =
      message || "* Trường này bắt buộc nhập";
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
};

var length = function(val, spanId, min, max){
  if (val.length < min || val.length > max) {
    document.getElementById(
      spanId
    ).innerHTML = `* Độ dài phải từ ${min} tới ${max} kí tự.`;
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
};

var checkSalary = function(val, spanId, message){
  if(val < 1000000 || val > 20000000){
    document.getElementById(spanId).innerHTML = message ||"*Lương phải từ 1000000 đến 20000000";
      return false;
  }
    document.getElementById(spanId).innerHTML = "";
    return true;
};

var checkHour = function(val, spanId, message){     
  if(val < 80 || val > 200){
     document.getElementById(spanId).innerHTML = message ||"*Số giờ làm phải từ 80 đến 200 giờ";
      return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
}

var pattern = function(val, spanId, regex, message){
  var valid = regex.test(val);

  if(!valid){
    document.getElementById(spanId).innerHTML =  message ||  "* Không đúng định dạng";
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
};

