var animal = function (name, age)
{
    this.name = name;
    this.age = age;

    this.say1 = function(){
        console.log(this.name + '1')
    }
    animal.prototype.say2 = function () {
        console.log(this.name + '2')
    }
}

var cat = new animal('xiaomao',3);
cat.say1();
cat.say2();