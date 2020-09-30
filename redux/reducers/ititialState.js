import transportEmissions from '../../data/transport-emissions.json';

export function getInitialState() {
  return {
    transportEmissions,
    comparisons: ['5f5cacaa4f4593289e1296b9', '5f5cae1f4f4593289e1296ba'],
  };
}
