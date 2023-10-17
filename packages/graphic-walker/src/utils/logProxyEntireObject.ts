export const logProxyEntireObject = (obj: any) => {
    const entireObject = {};
    for (const prop in obj) {
        entireObject[prop] = obj[prop];
    }
    console.log('LOGGING PROXY', entireObject);
};
