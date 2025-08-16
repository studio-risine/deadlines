import dayjs from 'dayjs'

export const formatDate = (date: Date | undefined) => {
	return dayjs(date).format('DD/MM/YYYY')
}

export const formatDateTime = (date: Date | string) => {
	return dayjs(date).format('DD/MM/YYYY HH:mm')
}

export const addDays = (date: Date | string, days: number) => {
	return dayjs(date).add(days, 'day')
}

export const getDaysFromNow = (date: Date | string) => {
	return dayjs(date).diff(dayjs(), 'day')
}

export const isWeekday = (date: Date | string) => {
	const day = dayjs(date).day()
	return day >= 1 && day <= 5
}
