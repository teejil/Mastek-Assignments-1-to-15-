function ViewModel(){
    this.hobby=ko.observable("Enter your hobby");
    this.hobbies=ko.observableArray(["Reading","Writing"]);
    this.addHobbyToList=function(){
        console.log(this.hobby());
        this.hobbies.push(this.hobby());
    }
}

const viewModel=new ViewModel();
ko.applyBindings(viewModel);