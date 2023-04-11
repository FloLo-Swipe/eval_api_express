const {createClient} = require('redis');

const cacheV1 = {

    // Définir mes article (envoie dans redis)
    setArticles: async(articles) =>{
        const client = createClient()
        client.on('error', (err) => console.log(err));
        await client.connect();
        await client.set('articles:articles', JSON.stringify(articles));
    },

    // Récupération des article (redis)
    getArticles: async() =>{
        const client = createClient()
        client.on('error', (err) => console.log(err));
        await client.connect();
       JSON.parse(await client.get('articles:articles'));
    }

}

module.exports = cacheV1