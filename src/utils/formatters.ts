import moment from 'moment'

export function formatDate(value: string | undefined) {
    if (!value) return ''
    return moment(value).format('YYYY-MM-DD HH:mm')
}