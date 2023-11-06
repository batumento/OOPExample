'use strict';

///Challange

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const bmw = new Car('BMW', 120);
bmw.accelerate();
const mercedes = new Car('Mercedes', 95);
mercedes.accelerate();

////////

class People {
  constructor(fullName, birtYear) {
    this.fullNameName = fullName;
    this.birtYear = birtYear;
    this.closDeneme = 55;
  }

  get closDeneme() {
    console.log('closDenemeCagirildi');
  }

  set closDeneme(closDenemed) {
    console.log('closDenemeDegistirildi');
  }
  calcAge() {
    console.log(2037 - this.birtYear);
  }
  get fullName() {
    //console.log(`ALL RİGHT`);
  }
  set fullName(name) {
    if (name.includes(' ')) {
      this.fullName = name;
    } else alert(`${name} is not a full name`);
  }
}

const batuhna = new People('Batuhan', 1979);

/// Challenge2

class Vehicle {
  constructor(make, speedUS) {
    this.make = make;
    this.speedUS = speedUS;
  }
  accelerate = function () {
    this._speedUS += 10;
    console.log(this.speedUS);
  };

  brake = function () {
    this._speedUS -= 5;
    console.log(this.speedUS);
  };

  set speedUS(speed) {
    //Converts it to km/h
    this._speedUS = speed * 1.6;
  }
  get speedUS() {
    //Converts it to mil/h
    return this._speedUS / 1.6;
  }
}

const ford = new Vehicle('Ford', 75);

ford.speedUS;
ford.accelerate();
ford.accelerate();
ford.brake();

//////This is a small experiment I did to understand the working logic of inheritance between classes in Javascript.

//Inheritence between classes with constructor functions
//Constructor Function
const Fighter = function (dmg = 0, walk = 0) {
  this.dmg = dmg;
  this.walk = dmg;
};
//Functions
Fighter.prototype.infoWalk = function () {
  console.log(`Your walk speed: ${this.walk}`);
};
Fighter.prototype.hasDamage = function () {
  console.log(`Your have damage ${this.dmg}`);
};

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  return 2037 - this.birthYear;
};
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};
Student.prototype = Object.create(Person.prototype);
Student.prototype.incroduce = function (firstName, course) {
  console.log(`I ${this.firstName} and study ${this.course}`);
};

const batu = new Student('Batuhan', 2001, 'Javascript');
batu.incroduce();

/////Challenge

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo = 1) {
  this.charge += chargeTo;
  if (chargeTo < 0) return;
  console.log(`Charged: ${this.charge}`);
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.chargeBattery(-1);
  console.log(
    `${this.make} going at ${this.speed}, with charge of ${this.charge}%`
  );
};
EV.prototype.brake = function () {
  this.speed -= 10;
};

const tesla = new EV('Tesla', 120, 23);
tesla.accelerate();
tesla.chargeBattery(50);
console.log(tesla);

//Inheritance ES6 Classes
class V8 extends Car {
  constructor(make, speed, cc) {
    super(make, speed);
    this.cc = cc;
  }
}
const merco = new V8('Mercedes', 250, 1800);

console.log(merco.cc, merco.make);

//// Inheritance Object.create()

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const jeys = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

const jay = Object.create(StudentProto);
console.log(jay);

//Example
class Account {
  //Public fields
  locale = navigator.language;

  //Private fields
  #movements = [];
  #pin;
  constructor(owner, pin, currency) {
    this.owner = owner;
    this.#pin = pin;
    this.currency = currency;
  }

  //Public interface
  getMovements() {
    return this.#movements;
  }

  getPin() {
    return this.#pin;
  }
  deposit(value) {
    this.#movements.push(value);
  }

  withdraw(value) {
    this.deposit(-value);
  }

  approveLoan(val) {
    //Allow the loan if it is less than a % of the total amount.
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }
}

const acc1 = new Account('Batuhan', 6179, 'TR');

acc1.deposit(500);
acc1.withdraw(76);
console.log(acc1);

//Challenge
class VehicleCl {
  constructor(make, speedUS) {
    this.make = make;
    this.speedUS = speedUS;
  }
  #speedInfo() {
    console.log(`${this.make} is going at ${this.speedUS} km/h`);
  }
  accelerate() {
    this._speedUS += 10;
    this.#speedInfo();
    return this;
  }

  brake() {
    this._speedUS -= 5;
    this.#speedInfo();
    return this;
  }

  set speedUS(speed) {
    //Converts it to km/h
    this._speedUS = Math.floor(speed * 1.6);
  }
  get speedUS() {
    //Converts it to mil/h
    return Math.floor(this._speedUS / 1.6);
  }
}

class BoatEVCl extends VehicleCl {
  #charge;
  constructor(make, speedUS, charge) {
    super(make, speedUS);
    this.#charge = charge;
  }
  chargeBattery(charge) {
    this.#charge += charge;
    return this;
  }
  accelerate() {
    this.speedUS += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speedUS} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
  brake() {
    this.speedUS -= 10;
    this.#charge++;
    console.log(
      `${this.make} is going at ${this.speedUS} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}
const eBoat = new BoatEVCl('E-Bu', 187, 76);
console.log(eBoat.speedUS);
eBoat.accelerate().accelerate().brake();

//
//Constructor Function
const SwordP = function (dmg, walk, typeSword, attackSpeed) {
  Fighter.call(this, dmg, walk);
  this.typeSword = typeSword;
  this.attackSpeed = attackSpeed;
};
//Functions
//1.After the prototype is set up, I write my custom function (see description).
SwordP.prototype = Object.create(Fighter.prototype);
SwordP.prototype.attackSpeed = function () {
  console.log(`Your have attack speed: ${this.attackSpeed}`);
};
//Created Object (child)
const swordsMan = new SwordP(10, 15, 'DuelSword', 2.5);
const fighter = new Fighter();

SwordP.prototype.constructor = SwordP;
console.log(
  `Object with the same prototype as SwordP constructor function : `,
  swordsMan.__proto__
);
/////

//ES6 Classes

/////
