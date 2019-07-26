const buildUrl = require('../../helpers/url_builder');

describe('Test the output of the urlBuilder helper', () => {
    const baseUrl = 'http://baseUrl.com/resource';

    test('it should return only the basic url when params are empty', () => {
        const url = buildUrl(baseUrl);

        expect(url).toBe(baseUrl);
    });

    test('it should return the complete url with the right parameter and value', () => {
        const params = [
            {
                key: 'name',
                value: "assassin's creed odyssey",
            },
        ];

        const url = buildUrl(baseUrl, params);

        expect(url).toBe(baseUrl + "?name=assassin's%20creed%20odyssey");
    });

    test('it should return the complete url with the right parameters and values', () => {
        const params = [
            {
                key: 'key1',
                value: 'value1',
            },
            {
                key: 'key2',
                value: 'value2',
            },
        ];

        const url = buildUrl(baseUrl, params);

        expect(url).toBe(baseUrl + '?key1=value1&key2=value2');
    });

    test('it should return complete url if params is a string', () => {
        const params = '?key=value';

        const url = buildUrl(baseUrl, params);

        expect(url).toBe(baseUrl + '?key=value');
    });
});
