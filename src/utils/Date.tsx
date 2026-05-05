import { ptBR } from 'date-fns/locale';
import { addDays, differenceInMonths, differenceInSeconds, format, isAfter, parseISO, subDays } from 'date-fns';

const date = new Date()

function getHourFormated() {
    return (format(date, 'HH:mm'))
}

function getDateUTC() {
    return date.toISOString()
}

function getDateFormated() {
    const fullDate: string = format(date, "EEEE, dd 'de' MMMM", { locale: ptBR });
    const formatedDate: string = fullDate.charAt(0).toUpperCase() + fullDate.slice(1)

    return formatedDate;
}

function formatedDate(date: string) {
    return format(date, "dd/MM/yyyy")
}

function calculateDaysFormated(dayInitial: Date, operator: 'more' | 'less') {
    let dateFull: string = ""

    if (operator == 'more') {
        dateFull = format(addDays(dayInitial, 1), "EEEE, dd 'de' MMMM", { locale: ptBR });

        dateFull = dateFull.charAt(0).toUpperCase() + dateFull.slice(1)

    } else if (operator == 'less') {

        dateFull = format(subDays(dayInitial, 1), "EEEE, dd 'de' MMMM", { locale: ptBR });

        dateFull = dateFull.charAt(0).toUpperCase() + dateFull.slice(1)

    }

    return dateFull
}

function subHoursFormated(startTime: string, endTime: string) {
    const startTimeFormated: string = `2026-04-27T${startTime}:00.000Z`
    const endTimeFormated: string = `2026-04-27T${endTime}:00.000Z`

    const dateStart: Date = parseISO(startTimeFormated)
    const dateEnd: Date = parseISO(endTimeFormated)

    if (!isAfter(dateStart, dateEnd)) {

        const totalSeconds: number = Math.abs(differenceInSeconds(dateEnd, dateStart))

        const hours: number = Math.floor(totalSeconds / 3600)
        const minutes: number = Math.floor((totalSeconds % 3600) / 60)

        const totalTime: string = `${hours}h:${minutes}min`

        return totalTime
    }

    return false

}

function subYearsFormated(startDate: string) {
    const months: number = differenceInMonths(date, parseISO(startDate))
    return (months / 12).toFixed(1)
}

export default { getHourFormated, getDateUTC, getDateFormated, formatedDate, calculateDaysFormated, subHoursFormated, subYearsFormated, date }