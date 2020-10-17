import express from 'express'
const app = express();

app.get('/',(req,res)=> {
    res.send('<h1>sd</h1>')
})

app.listen(9093, ()=> {
    console.log('node app start 9093')
})
