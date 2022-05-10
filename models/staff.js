function Staff(id, fullname, email, pass, date, salary, position, hour) {
    this.id = id;
    this.fullname = fullname;
    this.email = email;
    this.password = pass;
    this.date = date;
    this.salary = salary;
    this.position = position;
    this.hour = hour;
    this.calcSalary = 0;
    this.rank = 0;
  
    this.totalSalary = function () {
      switch (this.position) {
        case "boss": {
            this.calcSalary = this.salary * 3;
            break;
        }

        case "manager": {
            this.calcSalary = this.salary * 2;
            break;
        }

        case "staff": {
            this.calcSalary = this.salary ;
            break;
        }

        default: {
            this.calcSalary = -1;
        }
      } 
    return this.calcSalary;

    }
    this.totalHours = function(){
        if (this.hour >= 0 && this.hour < 160) {
            this.rank = "Trung Bình";
        } else if (this.hour >= 160 && this.hour < 176) {
            this.rank = "khá";
        } else if (this.hour >= 176 && this.hour < 192) {
            this.rank = "Giỏi";

        } else if (this.hour >= 192) {
            this.rank = "Xuất Sắc";
        } else {
            console.log("Nhập lại")
        }
        return this.rank;    
    }
};
  