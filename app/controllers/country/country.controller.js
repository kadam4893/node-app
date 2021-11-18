import CountryService from '../../services/country.service';
import { log, info } from '../../log.service';

class CountryController {
  constructor(countryService) {
    this.countryService = countryService;
  }

  add = async (req, res) => {
    const data = req.body;
    try {
      const result = await this.countryService.add(data);
      res.status(200).json({
        success: 1,
        message: 'Working fine',
        data: result,
      });
    } catch (err) {
      log('Err', err);
      // next(err);
      res.status(500).json({
        success: 0,
        message: 'Something went wrong',
        data: {},
      });
    }
  };

  getById = async (req, res) => {
    const countrId = req.params.id;
    try {
      const result = await this.countryService.getById(countrId);
      res.status(200).json({
        success: 1,
        message: 'Country details fetched successfully ',
        data: result,
      });
    } catch (err) {
      log('Err', err);
      // next(err);
      res.status(500).json({
        success: 0,
        message: err.message || 'Something went wrong',
        data: {},
      });
    }
  };

  update = async (req, res) => {
    const countrId = req.params.id;
    const data = req.body;
    try {
      const result = await this.countryService.update(countrId, data);
      res.status(200).json({
        success: 1,
        message: 'Country details updated successfully ',
        data: result,
      });
    } catch (err) {
      log('Err', err);
      // next(err);
      res.status(500).json({
        success: 0,
        message: err.message || 'Something went wrong',
        data: {},
      });
    }
  };

  delete = async (req, res) => {
    const countrId = req.params.id;
    try {
      const result = await this.countryService.delete(countrId);
      res.status(200).json({
        success: 1,
        message: 'Country details deleted successfully ',
        data: result,
      });
    } catch (err) {
      log('Err', err);
      // next(err);
      res.status(500).json({
        success: 0,
        message: err.message || 'Something went wrong',
        data: {},
      });
    }
  };

  list = async (req, res) => {
    const data = req.body;
    try {
      const result = await this.countryService.list(data);
      res.status(200).json({
        success: 1,
        message: 'Country listed successfully ',
        data: result,
      });
    } catch (err) {
      log('Err', err);
      // next(err);
      res.status(500).json({
        success: 0,
        message: err.message || 'Something went wrong',
        data: {},
      });
    }
  };
}
export default new CountryController(CountryService);
