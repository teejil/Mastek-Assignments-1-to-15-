function StudentVM() {
    this.firstName = ko.observable().extend({
        required: true,
        minLength: 2,
        maxLength: 30
    }),
    this.middleName = ko.observable().extend({
        required: true,
        minLength: 2,
        maxLength: 30
    }),
        this.lastName = ko.observable().extend({
            required: true,
            minLength: 2,
            maxLength: 30
        }),
        this.selectedDate = ko.observable(),
        this.availableDates = ko.observableArray(
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
        ),
        this.selectedMonth = ko.observable(),
        this.availableMonths = ko.observableArray(
            ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"]
        ),
        this.selectedYear = ko.observable(),
        this.availableYears = ko.observableArray(
            [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005]
        ),
        this.email = ko.observable().extend(
            {
                required: true
            }
        ),
        this.mobile = ko.observable().extend(
            {
                required: true
            }
        ),
        this.checkGender = ko.observable("Male"),
        this.address1 = ko.observable().extend(
            {
                required: true
            }
        ),
        this.address2 = ko.observable().extend(
            {
                required: true
            }
        ),
        this.city = ko.observable().extend(
            {
                required: true
            }
        ),
        this.zipCode = ko.observable().extend(
            {
                required: true
            }
        ),
        this.selectedState = ko.observable(),
        this.availableStates = ko.observableArray(
            ["Maharastra", "Rajasthan", "Uttar Pradesh", "Punjab", "Kerla", "Tamilnadu", "Gujrat"]
        ),
        this.selectedCountry = ko.observable(),
        this.availableCountries = ko.observableArray(
            ["India", "America", "Japan", "Nepal", "Srilanka", "China"]
        ),

        this.singing = ko.observable(true),
        this.dancing = ko.observable(true),
        this.drawing = ko.observable(),
        this.others = ko.observable(),
        this.otherHobby = ko.observable(),
        this.selectedYear1 = ko.observable(),
        this.availableYears1 = ko.observableArray(
            [2010, 2011, 2012, 2013, 2014, 2015]
        ),
        this.english1 = ko.observable().extend({ required: true, min: 33, max: 100 }),
        this.hindi1 = ko.observable().extend({ required: true, min: 33, max: 100 }),
        this.maths1 = ko.observable().extend({ required: true, min: 33, max: 100 }),
        this.science1 = ko.observable().extend({ required: true, min: 33, max: 100 }),
        this.social1 = ko.observable().extend({ required: true, min: 33, max: 100 }),

        this.checkCourse = ko.observable("BSC"),

        this.tnc = ko.observable(false),

        this.dob = ko.computed(function () {
            return (
                this.selectedDate() + "/" + this.selectedMonth() + "/" + this.selectedYear()
            )
        }, this),
        this.year1 = ko.computed(function () {
            return (
                this.selectedYear1()
            )
        }, this),
        this.address = ko.computed(function () {
            return (
                this.address1() + ", " + this.address2() + ", " + this.city() + ", " + this.selectedState() + " - " + this.zipCode() + ", " + this.selectedCountry()
            )
        }, this),

        this.totalAvg = ko.computed(function() {

            if(typeof(this.english1()) !== "number" || typeof(this.hindi1()) !== "number" || typeof(this.maths1()) !== "number"
            || typeof(this.science1()) !== "number" || typeof(this.social1()) !== "number" 
            
            ) {
               this.english1(Number(this.english1()));   //convert string to Number
               this.hindi1(Number(this.hindi1()));   //convert string to Number
               this.maths1(Number(this.maths1()));
               this.science1(Number(this.science1()));
               this.social1(Number(this.social1()));
            }

            total = (this.english1() + this.hindi1() + this.maths1() +this.science1()+this.social1())/5;
            return total;
         },this);


        this.grade = ko.computed(function () {
            this.myscore=this.totalAvg();
            console.log(this.myscore)

            if(this.myscore > 90){
                return "A";
                console.log("grade A")
            }
            if(this.myscore > 80){
                return "A-";
                console.log("grade A-")
            }
            if(this.myscore > 60){
                return "B";
                console.log("grade B")
            }
            if(this.myscore > 40){
                return "B-";
                console.log("grade B-")
            }
            if(this.myscore < 35){
                return "Fail";
                console.log("Fail")
            }
            else{
                return ""
            }
        },this);


        this.hobbies = ko.observableArray(),
        this.students = ko.observableArray(),
        this.showResult = ko.observable(false);
}

this.saveData = function () {

    var errors = ko.validation.group(this);
    // console.log(" Outside : " + errors().length);

    this.showResult(true);

    if (errors().length > 0) {
        alert("Please fill correct data before preceding !");
        console.log("Inside if cond.");
        errors.showAllMessages(true);
        return false;
    }
    else {
        this.hobbies.removeAll();
        if (this.singing())
            this.hobbies.push("Singing");
        if (this.dancing())
            this.hobbies.push("Dancing");
        if (this.drawing())
            this.hobbies.push("Drawing");
        if (this.otherHobby()) {
            var hobby = this.otherHobby().toString().split(" ");
            this.hobbies.push.apply(this.hobbies, hobby);
        }

        // getting students details in array
        var existingEntries = JSON.parse(localStorage.getItem("all"));
        if (existingEntries == null) {
            existingEntries = [];
        }

        // adding new student in array
        existingEntries.push(this);
        // setting new student in local storage
        localStorage.setItem("students", ko.toJSON(existingEntries));
        alert("Details has been saved!");

        var tempList = JSON.parse(localStorage.getItem("students"));
        if (tempList != null) {
            this.students.removeAll();
            this.students.push.apply(this.students, tempList);
        }
    }
};

this.removeData = function (student) {
    console.log("this.students().length : " + this.students().length);
    console.log("student : " + student);
    this.students.remove(student);
    console.log(this.students().length);
    localStorage.setItem("students", ko.toJSON(this.students));
};

this.editData = function () {

};
//window.localStorage.clear();
// Activates knockout.js
ko.applyBindings(new StudentVM());

