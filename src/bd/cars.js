class CarsRaw {
    constructor() {
      this.user = "willians";
      this.pass = "123456";
  
      this.cars = [
        {
          key: '1',
          brand: "ferrari",
          year: "1950",
          madein: "italia",
          maxspeed: "150",
          status: true
        },
        {
          key: '2',
          brand: "porche",
          year: "1988",
          madein: "alemania",
          maxspeed: "154",
          status: true
        },
        {
          key: '3',
          brand: "subaru",
          year: "1977",
          madein: "japon",
          maxspeed: "120",
          status: true
        }
      ];
  
      
    }
  
    getCars() {
      return this.cars;
    }
  
    insertCar(newcar) {
      return this.cars.push(newcar);
    }
  
  }
  
  export const Cars = new CarsRaw();