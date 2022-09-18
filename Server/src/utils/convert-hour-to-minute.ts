

export function convertHourToMinute( hourString: String){
    const [hour, minutes] = hourString.split(':').map(Number)

    const minutesConvertion = (hour * 60) + minutes

    return minutesConvertion
}