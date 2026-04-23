export default ({ isOk = true, message = '', data = null, ...another }) => ({
    isOk,
    message,
    data,
    ...another
})