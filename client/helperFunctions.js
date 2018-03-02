export function formatDate(time){
    let yearMonthDate = time.slice(0, time.indexOf('T'))
    let year = yearMonthDate.slice(0,4)
    let month = yearMonthDate.slice(5, 7)
    let date = yearMonthDate.slice(8)
    let months = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04' : 'Apr', '05': 'May', '06' :'June', 
    '07': 'July','08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'}
    return `Published on ${months[month]} ${date}, ${year}`
 }