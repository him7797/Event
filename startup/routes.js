const event=require('../routes/event');



module.exports=function(app){
    app.use('/api/event',event);
    
}











