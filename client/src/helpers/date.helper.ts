import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export const formatDate = (dateString: string) => {
	const date = new Date(dateString)
	return format(date, 'dd.MM.yyyy HH:mm:ss',
		{ locale: ru }
	)
}