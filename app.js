const express = require('express')
const app = express()

app.use(express.static(__dirname+"/public"))

app.use((req, res, next)=>{
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})

app.get('/',(req, res)=>{
    const path = __dirname+'/views/index.html'
    res.sendFile(path)
})

app.get('/api/timestamp', (req, res)=>{
  let newDate = new Date(Date.now())
  res.json({"unix": newDate.getTime(), "utc": newDate.toUTCString()})
})
app.get('/api/timestamp/:date?', (req, res)=>{
    let stamp = req.params.date
    let re = /(\d{4})-(\d{2})-(\d{2}).*/
    try{
        let [_,year, month, day] = stamp.match(re)
        let newDate = new Date(parseInt(year), parseInt(month)-1, parseInt(day))
        res.json({"unix": newDate.getTime(), "utc": newDate.toUTCString()})
    }catch(err){
        let newDate = new Date(parseInt(stamp))
        newDate.getTime() && res.json({"unix": newDate.getTime(), "utc": newDate.toUTCString()}) || res.json({"error": "Invalid Date"})
    }
})

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Listening on port ${port}...`)
})
