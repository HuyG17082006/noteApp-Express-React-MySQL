export default (res, { resStatus = 200, message = '', data = null, ...another } = {}) => {

    return res.status(resStatus).json({ 
        message, 
        ...(data && {data}), 
        ...another 
    })   
}