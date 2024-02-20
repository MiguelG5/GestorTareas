require ('./DataBase')
const app= require('./app')

app.listen(app.get('port'));
console.log('Back-End en puerto', app.get('port'));