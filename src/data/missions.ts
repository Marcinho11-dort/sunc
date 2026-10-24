import type { Mission } from '@/types'

export const missions: Mission[] = [
  { id: 'sputnik', name: 'Спутник-1', agency: 'СССР', year: 1957, target: 'Земля', status: 'success', summary: 'Первый искусственный спутник Земли открыл космическую эру.' },
  { id: 'gagarin', name: 'Восток-1', agency: 'СССР', year: 1961, target: 'Земля', status: 'success', summary: 'Юрий Гагарин стал первым человеком в космосе.' },
  { id: 'apollo11', name: 'Аполлон-11', agency: 'NASA', year: 1969, target: 'Луна', status: 'success', summary: 'Первая высадка людей на Луну.' },
  { id: 'venera7', name: 'Венера-7', agency: 'СССР', year: 1970, target: 'Венера', status: 'success', summary: 'Первая мягкая посадка на другую планету.' },
  { id: 'viking1', name: 'Викинг-1', agency: 'NASA', year: 1976, target: 'Марс', status: 'success', summary: 'Первый успешный посадочный аппарат на Марсе с поиском жизни.' },
  { id: 'voyager1', name: 'Вояджер-1', agency: 'NASA', year: 1977, target: 'Межзвёздное пространство', status: 'ongoing', summary: 'Самый далёкий рукотворный объект, покинул гелиосферу в 2012 году.' },
  { id: 'hubble', name: 'Хаббл', agency: 'NASA / ESA', year: 1990, target: 'Орбита Земли', status: 'ongoing', summary: 'Космический телескоп, изменивший астрономию.' },
  { id: 'cassini', name: 'Кассини–Гюйгенс', agency: 'NASA / ESA', year: 1997, target: 'Сатурн', status: 'success', summary: 'Тринадцать лет исследования Сатурна и посадка на Титан.' },
  { id: 'curiosity', name: 'Curiosity', agency: 'NASA', year: 2011, target: 'Марс', status: 'ongoing', summary: 'Марсоход, нашедший условия, пригодные для древней жизни.' },
  { id: 'newhorizons', name: 'New Horizons', agency: 'NASA', year: 2006, target: 'Плутон', status: 'success', summary: 'Первый пролёт мимо Плутона в 2015 году.' },
  { id: 'juno', name: 'Juno', agency: 'NASA', year: 2011, target: 'Юпитер', status: 'ongoing', summary: 'Изучает магнитное поле и недра Юпитера с полярной орбиты.' },
  { id: 'jwst', name: 'James Webb', agency: 'NASA / ESA / CSA', year: 2021, target: 'Точка L2', status: 'ongoing', summary: 'Инфракрасный телескоп заглядывает в раннюю Вселенную.' },
  { id: 'mars96', name: 'Марс-96', agency: 'Россия', year: 1996, target: 'Марс', status: 'lost', summary: 'Аппарат не вышел на траекторию к Марсу после запуска.' },
]
