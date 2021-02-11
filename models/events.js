const mongoose = require('mongoose');

const Event = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    eventDate:{
        type:String,
        required:true
    },
    starTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    speakers:[{
        name:{
          type:String,
          required:true
        },
        information:{
            type:String
        },
        photo:{
            type:String
        }
      }],
      moderator:[{
        name:{
          type:String,
          required:true
        },
        information:{
            type:String
        },
        photo:{
            type:String
        }
      }],

      extraInfo:{
          typr:String
      },
      tags:{
        type:Array,
        
    },
    organiserInfos:{
        type:Array,     
    },
    mediaInfo:[{
        path:{
          type:String,
          required:true
        }
      }]
  },{timestamps: true});






module.exports = mongoose.model('Event', Event);