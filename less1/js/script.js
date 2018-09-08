task1 = {
    init: function () {
        task1.loop(5, task1.doSomething);
        task1.loop(0, task1.doSomething);
        task1.loop(5);
    },
    loop: function (times = 0, callback = null) {
        while (times > 0 && callback != null) {
            callback(times);
            times--;
        }
    },
    doSomething: function (times) {
        console.log(`Work..${times}..`);
    }
};

task2 = {
    init: function () {
        const ans = [
            task2.calculateArea('rect', 5, 2),
            task2.calculateArea('tria', 5, 2),
            task2.calculateArea('sq', 5, 2)
        ]
        console.log(ans);
    },

    calculateArea: function (figure = undefined, ...args) { //rect, tria, sq 
        let input = args;
        let area;
        switch (figure) {
            case 'sq':
                area = input[0] * input[0];
                break;
            case 'rect':
                area = input[0] * input[1];
                break;
            case 'tria':
                area = input[0] * input[1] * 0.5;
                break;
            default:
                figure = 'can not define figure';
                break;
        }
        return {
            area,
            figure,
            input
        }
    }
};

task3 = {
    init: function () {
        const guys = [
            new Human,
            new Employee,
            new Manager
        ];

        const Bob = new Manager('Bob');
        const Rob = new Manager('Rob');

        Bob.addDev('John');
        Rob.addDev('Becky');

        Bob.developers[0].changeManager(Rob); //bob - 0, rob - 2;

        //console.log(Rob);
        console.log(Bob.displayInfo());
        console.log(Rob.displayInfo());
    }
}
class Human {
    constructor(name = 'Jonh Doe', age = 0, dateOfBirth = 'unknown') {
        this.name = name;
        this.age = age;
        this.dateOfBirth = dateOfBirth;
    }

    displayInfo() {
        return `Name: ${this.name}, Age: ${this.age}, Date of birth: ${this.dateOfBirth}`;
    }
};

class Employee extends Human {
    constructor(name, age, dateOfBirth, salary = 0, department = 'unknown') {
        super(name, age, dateOfBirth)
        this.salary = salary;
        this.department = department;
    }

    displayInfo() {
        return `${super.displayInfo()}, Salary: ${this.salary}, Departament: ${this.department}`;
    }
};

class Developer extends Employee {
    constructor(name, age, dateOfBirth, salary, department, manager = null, id = NaN) {
        super(name, age, dateOfBirth, salary, department);
        this.manager = manager;
        this.id = id
    }

    changeManager(manager) {
        this.manager.delDev(this);
        this.manager = manager;
        this.manager.developers.push(this);
    };

};

class Manager extends Employee {
    constructor(name, age, dateOfBirth, salary, department) {
        super(name, age, dateOfBirth, salary, department);
        this.developers = [];
        this.idCount = 0;
    }

    addDev(name, age, dateOfBirth, salary, department) {
        this.idCount++
        this.developers.push(new Developer(name, age, dateOfBirth, salary, department, this, this.idCount));
    }

    delDev(dev) {
        const val = this.developers.findIndex(emp => emp.id = dev.id);
        this.developers.splice(val, 1);
    }

    displayInfo() {
        const [dev1, dev2, ...rest] = this.developers;
        return `${super.displayInfo()} Developers: ${dev1 ? dev1.name : ''}${dev2 ? ', ' + dev2.name : ''}${this.developers.length > 0 ? ' and ' + rest.length + ' more' : 0}, Departament: ${this.department}`;
    }
};

window.onload = () => {
    //task1.init();
    //task2.init();
    task3.init();
}
