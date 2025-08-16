import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)

dayjs.locale('pt-br')

export { dayjs }
