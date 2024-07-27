//middleware used to catch async erros
module.exports = func => (req, res, next)=>
    Promise.resolve(func(req, res, next)).catch(next)