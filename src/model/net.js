import brain from 'brain.js';

import katouDatasets from '../datasets/katouDatasets';
import { featurizeData } from '../dataProcessing/featurizeData';

const net = new brain.NeuralNetwork();

net.train(featurizeData(katouDatasets));

export default net;
