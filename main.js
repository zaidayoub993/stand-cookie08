
let Store = function(location, open, close, minCust, maxCust, avgCookies, dailySales) {
    this.location = location;
    this.open = open; 
    this.close = close; 
    this.minCust = parseInt(minCust);
    this.maxCust = parseInt(maxCust);
    this.avgCust = [];
    this.avgCookies = avgCookies;
    this.dailySales = dailySales;
    }

let storeArray = []

let hoursArray = ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "Daily Total"];


let storeOne = new Store("Bethesda", 6, 20, 23, 65, 6.3, 0)
let storeTwo = new Store("Silver Spring", 6, 20, 3, 24, 1.2, 0)
let storeThree = new Store("Dupont Circle", 6, 20, 11, 38, 3.7, 0)
let storeFour = new Store("Adams Morgan", 6, 20, 20, 38, 2.3, 0)
let storeFive = new Store("K Street", 6, 20, 2, 16, 4.6, 0)

storeArray.push(storeOne, storeTwo, storeThree, storeFour, storeFive)

Store.prototype.createAvgArray = function() {
    for (let i = this.open; i < this.close; i++){
        averageSales = Math.round((Math.floor(Math.random() * (this.maxCust - this.minCust + 1) ) + this.minCust) * this.avgCookies) ;
        this.avgCust.push(averageSales) ;
    }
}

storeOne.createAvgArray()
storeTwo.createAvgArray()
storeThree.createAvgArray()
storeFour.createAvgArray()
storeFive.createAvgArray()

Store.prototype.createDailySales = function() {
    for (i = 0; i < (this.close - this.open); i++) {
         this.dailySales += this.avgCust[i]
    }
}

storeOne.createDailySales()
storeTwo.createDailySales()
storeThree.createDailySales()
storeFour.createDailySales()
storeFive.createDailySales()


let elBody = document.getElementById('salesTable')
let elTable = document.createElement('table')

elTable.setAttribute('id', 'id-table')

elBody.appendChild(elTable)

    let elRow = document.createElement('tr')
    elTable.appendChild(elRow) ;

    let elHourHeader = document.createElement('th') ;
        elRow.appendChild(elHourHeader) ;
        console.log(elHourHeader.innerText)
        elRow.appendChild(elHourHeader);

    
        for (let h = 0; h <= 14; h++) {
            let newText = document.createElement('th') ;
            newText.setAttribute('id', 'hoursRow') ;
            newText.innerText = hoursArray[h] ;
            elRow.appendChild(newText)
        }

for (i = 0; i <= storeArray.length - 1; i++) {
    let elRow = document.createElement('tr') ;
    elTable.appendChild(elRow) ; 
    
    let elTh = document.createElement('th') ; 
        elTh.innerText = storeArray[i].location ; 
        elRow.appendChild(elTh)

    for (let j = 0; j < 14; j++) {
            let newText = document.createElement('td') ;
            newText.innerText = storeArray[i].avgCust[j] ;
            elRow.appendChild(newText)
    }
        let newText = document.createElement('td') ;
        newText.innerText = storeArray[i].dailySales ;
        elRow.appendChild(newText)
}

let form = document.getElementById('storeForm') 

let storeLocation = form.inputLocation ;
let storeMinCust = form.inputMinCust ;
let storeMaxCust = form.inputMaxCust ; 
let storeAvgCookies = form.inputAvgCookies ;

form.addEventListener('submit', function(event) {
    event.preventDefault() ;
    let newStore = new Store(storeLocation.value, 6, 20, storeMinCust.value, storeMaxCust.value, storeAvgCookies.value, 0) ;
    storeArray.push(newStore) ;

    newStore.createAvgArray() ;
    newStore.createDailySales() ;
    
    let elRow = document.createElement('tr') ;
    elTable.appendChild(elRow) ; 
        
    let elTh = document.createElement('th') ; 
    elTh.innerText = newStore.location ; 
    elRow.appendChild(elTh)

    for (let j = 0; j < 14; j++) {
        let newText = document.createElement('td') ;
        newText.innerText = newStore.avgCust[j] ;
        elRow.appendChild(newText)
    }
    
    let newText = document.createElement('td') ;
    newText.innerText = newStore.dailySales ;
    elRow.appendChild(newText)

    let footer = document.createElement('tr')
    let total = document.createElement('th')
    footer.appendChild(total)

    function addTotals(j) {
    let total = 0
       for (let q = 0; q < storeArray.length; q++) {
        total += parseInt(storeArray[q].avgCust[j]) ;
        }   
        return total
    }
     
    function createFooter() {
        let footerRow = document.createElement('tr') ;
        elTable.appendChild(footerRow) ;
        footerRow.innerText = "Projected sales" ;
        
        let dailyTotal = 0 ;
        for (let j = 0; j < 14; j++) {
            let newText = document.createElement('td') ;
            hourlyTotal = addTotals(j);
            dailyTotal += hourlyTotal ;
            newText.innerText = hourlyTotal ;
            footerRow.appendChild(newText) ; 
        }

        newText.innerText = dailyTotal ;
        footerRow.appendChild(newText) ;

        let newDailyTotal = document.createElement('td') ;
        console.log(storeArray[storeArray.length - 1].dailySales) ; 
        newDailyTotal.innerText = storeArray[storeArray.length - 1].dailySales ;
        footerRow.appendChild(newDailyTotal) ;
    }

    createFooter()
})