const buildQuery = params => {
    if (!params.length) return '';
    if (typeof params === 'string') return params;
    return (
        '?' +
        params
            .map(({ key, value }, index) => {
                return `${key}=${encodeURI(value)}`;
            })
            .join('&')
    );
};

module.exports = (baseUrl, params = []) => {
    return baseUrl + buildQuery(params);
};
