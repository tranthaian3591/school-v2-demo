import { webConfig } from './web-config';

describe('webConfig', () => {
    it('should work', () => {
        expect(webConfig()).toEqual('web-config');
    });
});
