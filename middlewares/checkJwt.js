const jwt = require('jsonwebtoken');

const checkJwt = function (req, res, next) {
    try {
        const token = req.headers['authorization'];
        console.log('Middleware checkJwt called / Token généré : ', token);

       const payload=  jwt.verify(token, process.env.SECRET, {algorithms:['HS256']})

        //console.log("key->",payload);

       if(!payload.user){
        return res.status(401).send("Vous n'êtes pas authorizé")
       }

       console.log("payload->",payload);


       req.payload = payload.user;
       next()
        
    } catch (error) {
        console.log("Erreur dans la validation du token : ", error);
        res.status(500).json(error.message);
    }
}

module.exports = checkJwt;



// const jwt = require('jsonwebtoken');

// const checkJwt = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(401).send('Unauthorized: No token provided');
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.log(err);
//     return res.status(401).send('Unauthorized: Invalid token');
//   }
// };

module.exports = checkJwt;