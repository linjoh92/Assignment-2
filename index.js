
import chalk from 'chalk';
import fs from 'fs/promises'
import { formatDistanceToNow, isAfter, isBefore, parse, format, isToday, set} from 'date-fns'
import { Command } from 'commander';
import getGitVersion from './src/getGitVersion.js';

const gitVersion = await getGitVersion()
const first = 'Linn'
const last = 'Johansson'
const name = `${first} ${last}`
const todaysDate = format(new Date(), 'PPPP')
const timeNow = format(new Date(), 'H:mm')
const startOfCourse = new Date(2023, 0, 31)
const daysFromStartofCourse = formatDistanceToNow(startOfCourse)
const versions = `${process.env.npm_config_user_agent}`
const titel = 'JavaScript Ramverk - Week 2 – Assignment 2'

const argumentParser = new Command()
argumentParser.option('--date')
argumentParser.parse()

const dateStringSentAsArgument = argumentParser.args[0]
const dateSentAsArgument = parse(dateStringSentAsArgument, 'yyyy-MM-dd', new Date())
const currentDate = set(new Date(), {hours: 0, minutes: 0, seconds: 0, milliseconds: 0})

const chooseDate = `${chalk.green('Write in the Termial')} ${chalk.magenta('node index.js')} ${chalk.green('and choose a date')} ${chalk.magenta('yyyy-MM-dd')}`
const resultCompareDates = `${chalk.green('Your choosen date is')} ${chalk.bgMagenta(compareDates())} ${chalk.green('todays date')}`

function compareDates() {
    let berforeOrAfter
    if (dateSentAsArgument > currentDate) {
        return berforeOrAfter = 'after' 
    } else if (dateSentAsArgument < currentDate) {
        return berforeOrAfter = 'before'
    } else if (dateSentAsArgument === currentDate) {
        return berforeOrAfter = 'same as'
    } else {
        return 'type a date in the terminal'
    }
}

function termialText() {
    let termialData
    if (dateSentAsArgument == 'Invalid Date') {
        return termialData = chooseDate
    } else {
        compareDates();
        return termialData = resultCompareDates
    }
}

const fileData = `
__Titel:__ ${titel}
__Name:__ ${name}
__Time now:__ ${timeNow}
__Today's date:__ ${todaysDate}
__Days since start of course:__ ${daysFromStartofCourse} 
__Npm & node:__ ${versions}
__Git version:__ ${gitVersion}
__Compare date:__ Your choosen date is ${compareDates()} todays date.`
;

const displayData =
    `<head><link rel="stylesheet" href="./index.css"></head>
    <body>
        <header>
            <h4>${titel}</h4>
        </header>
        <main>
            <div class='data-container'>The time is <span class='data'>${timeNow}</span></div>
            <div class='data-container'>Today's date is <span class='data'>${todaysDate}</span></div>
            <div class='data-container'>Your choosen date is <span class='data'>${compareDates()}</span> todays date.</div>
            <div class='data-container'>My name is <span class='data'>${name}</span></div>
            <div class='data-container'>Today is <span class='data'>${daysFromStartofCourse}</span> since I started the Javascript Ramverk course</div>
            <div class='data-container'>My npm and Node version is <span class='data'>${versions}</span></div>
            <div class='data-container'>My Git Version is <span class='data'>${gitVersion}</span></div>
        </main>
        <footer>
            <p class="footer-text">Copyright 2023© ${name}</p>
        </footer>
    <body>`
;

console.log(termialText())
await fs.writeFile("index.md", fileData);
await fs.writeFile("index.html", displayData);
