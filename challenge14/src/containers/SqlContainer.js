import knex from 'knex';

class SqlContainer {

	constructor(config, table) {
		this.knex = knex(config)
		this.table = table
	}

	async list(id) {
		const elem = await this.knex.from(this.table).select('*').where('id', id);
		return elem;
	}

	async listAll() {
		let elements = []
		try {
			const elementsDB = await this.knex.from(this.table).select('*');
			for(let element of elementsDB) {
				elements.push({...element});
			}
			return elements
		} catch (err) {
			return elements;
		}
	}

	async save(elem) {
		await this.knex(this.table).insert(elem);
	}


	async update(elem, id) {
		await this.knex.from(this.table).where('id', id).update(elem);
	}

	async delete(id) {
		await this.knex.from(this.table).where('id', id).del();
	}


	async deleteAll() {
		await this.knex.from(this.table).del();
	}

	async disconnect() {
		await this.knex.destroy();
	}
}

export default SqlContainer;