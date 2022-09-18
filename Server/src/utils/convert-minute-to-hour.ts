

export function convertMinuteToHour( minutes: number){

    const hourConvertion = Math.floor(minutes/60);
    const minute = minutes%60

    return `${hourConvertion} : ${minute}`
}