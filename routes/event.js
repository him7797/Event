const express=require('express');
const Router=express.Router();
const multer=require('multer');
const Event=require('../models/events');

//multer upload storage setup
const entityStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const name = file.originalname;
      cb(null,  name);
    }
  });
  
  const upload = multer({storage: entityStorage});



//Route to get all the events details
Router.get('/',async(req,res)=>{
    try{
            let events=await Event.find().sort({updatedAt:-1});
            if(!events) return  res.status(404).json({
                status: "Failed",
                data: "No Event Found"
            });
            res.status(200).json({
                status: "Success",
                data: events
            });
    }
    catch(e)
    {
        next(e);
    }
});


//Route for creating event
Router.post('/',upload.any(),async(req,res,next)=>{
    try{
        
            
            let files=req.files;
            let title=req.body.title;
            let link=req.body.link;
            let dateOfEvent=req.body.dateOfEvent;
            let startTime=req.body.startTime;
            let endTime=req.body.endTime;
            let description=req.body.description;
            let speakersName=req.body.speakers.name;
            let speakersInfo=req.body.speakers.info;
            let moderatorsName=req.body.moderators.name;
            let moderatorsInfo=req.body.moderators.info;
            let otherInfo=req.body.otherInfo;
            let organiserInfos=req.body.organiserInfos;
            let tags=req.body.tags;
            let speakersPhotos=[];
            let moderatorsPhotos=[];
            let mediaFiles=[];
            let speakersObj=[];
            let moderatorObj=[];
            let mediaObj=[];
            for(let i in files)
            {
                if(files[i].fieldname=='speakersPhotos')
                {
                    speakersPhotos.push(files[i].originalname);
                }
                else if (files[i].fieldname=='moderatorsPhotos') {

                    moderatorsPhotos.push(files[i].originalname);
                } 
                else if(files[i].fieldname=='mediaFiles')
                {
                    mediaFiles.push(files[i].originalname);
                }
            }
            let k=0;
            for(let j in speakersName)
            {
                let localObj={
                    name:speakersName[j],
                    information:speakersInfo[k],
                    photo:'/uploads/'+`${speakersPhotos[k]}`

                }
                k++;
                speakersObj.push(localObj);

                
            }
            k=0;
            
            for(let j in moderatorsName)
            {
                
                let localObj={
                    name:moderatorsName[j],
                    information:moderatorsInfo[k],
                    photo:'/uploads/'+`${moderatorsPhotos[k]}`
                }
                k++;
                moderatorObj.push(localObj);
            }

            for(let i in mediaFiles)
            {
                    let localObj={
                        path:'/uploads/'+`${mediaFiles[i]}`
                    }
                    mediaObj.push(localObj);
            }
            let finalObj;
            finalObj={
                title:title,
                link:link,
                eventDate:dateOfEvent,
                starTime:startTime,
                endTime:endTime,
                description:description,
                speakers:speakersObj,
                moderator:moderatorObj,
                extraInfo:otherInfo,
                tags:tags,
                organiserInfos:organiserInfos,
                mediaInfo:mediaObj
            }
            let result=await Event.insertMany(finalObj);
            res.status(200).json({
                status: "Success",
                data: result
            });
            
    }
    catch(e)
    {
        next(e);
    }
    
});

//Route to update the event details 
Router.put('/',upload.any(),async(req,res,next)=>{
    try{
            let eventId=req.body.id;
            let event=await Event.findOne({_id:eventId});
            if(!event)   return  res.status(404).json({
                status: "Failed",
                data: "No event found with given id"
            });
            let files=req.files;
            let title=req.body.title;
            let link=req.body.link;
            let dateOfEvent=req.body.dateOfEvent;
            let startTime=req.body.startTime;
            let endTime=req.body.endTime;
            let description=req.body.description;
            let speakersName=req.body.speakers.name;
            let speakersInfo=req.body.speakers.info;
            let moderatorsName=req.body.moderators.name;
            let moderatorsInfo=req.body.moderators.info;
            let otherInfo=req.body.otherInfo;
            let organiserInfos=req.body.organiserInfos;
            let tags=req.body.tags;
            let speakersPhotos=[];
            let moderatorsPhotos=[];
            let mediaFiles=[];
            let speakersObj=[];
            let moderatorObj=[];
            let mediaObj=[];
            for(let i in files)
            {
                if(files[i].fieldname=='speakersPhotos')
                {
                    speakersPhotos.push(files[i].originalname);
                }
                else if (files[i].fieldname=='moderatorsPhotos') {

                    moderatorsPhotos.push(files[i].originalname);
                } 
                else if(files[i].fieldname=='mediaFiles')
                {
                    mediaFiles.push(files[i].originalname);
                }
            }
            let k=0;
            for(let j in speakersName)
            {
                let localObj={
                    name:speakersName[j],
                    information:speakersInfo[k],
                    photo:'/uploads/'+`${speakersPhotos[k]}`

                }
                k++;
                speakersObj.push(localObj);

                
            }
            k=0;
            
            for(let j in moderatorsName)
            {
                
                let localObj={
                    name:moderatorsName[j],
                    information:moderatorsInfo[k],
                    photo:'/uploads/'+`${moderatorsPhotos[k]}`
                }
                k++;
                moderatorObj.push(localObj);
            }

            for(let i in mediaFiles)
            {
                    let localObj={
                        path:'/uploads/'+`${mediaFiles[i]}`
                    }
                    mediaObj.push(localObj);
            }
            let updateObj={
                   $set:{
                    title:title,
                    link:link,
                    eventDate:dateOfEvent,
                    starTime:startTime,
                    endTime:endTime,
                    extraInfo:otherInfo,
                    description:description,

                   },
                   $push:{
                    speakers:speakersObj,
                    moderator:moderatorObj,
                    tags:tags,
                    organiserInfos:organiserInfos,
                    mediaInfo:mediaObj
                   }
            };
            await Event.updateOne({_id:eventId},updateObj);
            res.status(200).json({
                status: "Success",
                message: "Updated Successfully"
            });


           
    }
    catch(e)
    {
        next(e);
    }
});

//Route to delete the event with given id
Router.delete('/',async(req,res,next)=>{
    try{
            let eventId=req.body.id;
            let event=await Event.findOne({_id:eventId});
            if(!event)   return  res.status(404).json({
                status: "Failed",
                data: "No event found with given id"
            });
            await Event.deleteOne({_id:eventId});
            return  res.status(200).json({
                status: "Success",
                data: "Event deleted with given id"
            });
    }
    catch(e)
    {
        next(e);
    }
});






module.exports=Router;