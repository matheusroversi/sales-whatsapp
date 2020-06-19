import faker from 'faker'

const getEmployees = x => {
	faker.locale = 'pt_BR'

	var obj = []

	for (var i = x; i > 0; i--) {
		obj.push({
			name: faker.name.findName(),
			email: faker.internet.email(),
			date: faker.date.recent(),
			avatar: faker.image.avatar(),
			color: faker.internet.color(),
		})
	}

	return obj
}

export default getEmployees
