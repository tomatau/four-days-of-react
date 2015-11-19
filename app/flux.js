import createFlux from 'flux/createFlux';
import ApiClient from '../shared/api-client';

const client = new ApiClient();
const flux = createFlux(client);

export default flux;
