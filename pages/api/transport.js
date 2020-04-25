import transportEmissions from '../../data/transport-emissions.json';

export default (req, res) => {
  res.status(200).json(transportEmissions);
};
