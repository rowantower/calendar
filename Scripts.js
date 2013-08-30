/**
 * Created with JetBrains WebStorm.
 * User: Reflection
 * Date: 23.08.13
 * Time: 21:50
 * To change this template use File | Settings | File Templates.
 */
var today = new Date();
var currentDate = today;
var month = new Array(12);
month[0] = "Январь";
month[1] = "Февраль";
month[2] = "Март";
month[3] = "Апрель";
month[4] = "Май";
month[5] = "Июнь";
month[6] = "Июль";
month[7] = "Август";
month[8] = "Сентябрь";
month[9] = "Октябрь";
month[10] = "Ноябрь";
month[11] = "Декабрь";

var weekday = new Array(7);
weekday[0] = "Воскресенье";
weekday[1] = "Понедельник";
weekday[2] = "Вторник";
weekday[3] = "Среда";
weekday[4] = "четверг";
weekday[5] = "Пятница";
weekday[6] = "Суббота";

var events = [];
events[0] = new CalendarEvent(new Date(2013, 7, 9), 'Напиться!', 'Витя Костин, Петр Михайлов');
events[1] = new CalendarEvent(new Date(2013, 7, 22), 'ДР!', 'Дима Молодцов');

function CalendarEvent(date, header, description) {
    this.date = date;
    this.header = header;
    this.description = description;
}

function fillSelectedDate(date) {
    var selectedDateElement = document.getElementById('selected-date');
    selectedDateElement.innerHTML = month[date.getMonth()] + ' ' + date.getFullYear();
}

window.onload = function () {
    selectMonth(today);
};


var reload = function () {
    document.location.reload()
};

function incrementMonth(value) {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + value, currentDate.getDate());
}

var selectPreviousMonth = function () {
    currentDate = incrementMonth(-1);
    selectMonth(currentDate);
};


var selectNextMonth = function () {
    currentDate = incrementMonth(1);
    selectMonth(currentDate);
};

var selectCurrentMonth = function () {
    currentDate = today;
    selectMonth(currentDate);
};

var selectMonth = function (date) {
    fillSelectedDate(date);
    fillCalendarCells(date);
};

var tempDate;
var decrementTempDate = function () {
    while (tempDate.getDay() != 1) {
        tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() - 1);
    }
};
var fillCalendarCells = function (date) {
    tempDate = new Date(date.getFullYear(), date.getMonth(), 1);
    decrementTempDate();

    for (var i = 1; i < 6; i++) {
        var cellsRow = document.getElementsByClassName('row' + i);
        fillCalendarRow(cellsRow, i === 1);//First row fills with day of week values
    }
};

/**
 * Returns true if today date is equal to tempDate date
 * and the difference in hours is less then 24
 * @return {boolean}
 */
function IsDateEquals(dateOne, dateTwo) {
    return dateOne.getDate() === dateTwo.getDate() &&
        Math.abs(dateOne - dateTwo) < 24 * 60 * 60 * 1000 - 1;
}
function markTodayIfApplicable(element) {
    if (IsDateEquals(today, tempDate))
        element.classList.add('today');
    else
        element.classList.remove('today');
}
function clearElement(element) {
    element.innerHTML = '';
}
function addDateElement(element, dateString) {
    var dateElement = document.createElement('div');
    dateElement.classList.add('date');
    dateElement.innerHTML = dateString;
    element.appendChild(dateElement);
}

function createDiv(className, innerHtml) {
    var headerElement = document.createElement('div');
    headerElement.classList.add(className);
    headerElement.innerHTML = innerHtml;
    return headerElement;
}
function addEvents(element) {
    element.classList.remove('filled');
    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        if (IsDateEquals(tempDate, event.date)) {
            element.classList.add('filled');
            var headerElement = createDiv('event', event.header);
            var textElement = createDiv('event-text', event.description);
            element.appendChild(headerElement);
            element.appendChild(textElement);
        }
    }
}
var fillCalendarRow = function (row, isFirstRow) {
    for (var i = 0; i < 7; i++) {
        var element = row[i];
        var dateString = isFirstRow ? weekday[tempDate.getDay()] + ', ' : '';
        dateString += tempDate.getDate();
        markTodayIfApplicable(element);
        clearElement(element);
        addDateElement(element, dateString);
        addEvents(element);
        tempDate.setDate(tempDate.getDate() + 1);
    }
};

var headerButtonClick = function (event) {
    var button = event.target || event.srcElement;
    toggle(button, 'pressed');
    var popup = document.getElementById('add-dialog-popup');
    toggle(popup, 'hidden');
};

/**
 *  Adds or removes className class to specified element
 *  @param {HTMLElement} elem element of document markup to which className will be added/removed
 *  @param {string} className name of class to append
 **/
function toggle(elem, className) {
    var classList = elem.classList;
    if (classList.contains(className))
        classList.remove(className);
    else
        classList.add(className);
}
