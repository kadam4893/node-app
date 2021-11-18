import db from '../config/database';

class CountryService {
  constructor() {}

  add = (countryData) => {
    return db('country').insert(countryData);
  };

  getById = (countryId) => {
    return db('country')
      .where({ id: countryId })
      .select({ name: 'name', code: 'code' });
  };

  update = (countryId, countryData) => {
    return db('country').where({ id: countryId }).update(countryData);
  };

  delete = (countryId) => {
    return db('country').where({ id: countryId }).delete();
  };

  list = async (data) => {
    const query = db('country');
    if (data.keyword) {
      query.where('name', 'like', `%${data.keyword}%`);
    }
    query.orderBy('name', 'desc');
    query.limit(1);

    const result = await query;
    return result;
  };
}

export default new CountryService();
