import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './dbConfig.js';
import User from './entities/User.js';
import Bug from './entities/Bug.js';
import Report from './entities/Report.js';
import Status from './entities/Status.js';


let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', router);


sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has benn established successfully");
    })
    .catch(err => {
        console.log("Unable to connect to the database: " , err);
    })

Bug.hasMany(Report, {as: "Reports", foreignKey:"BugId"});
Report.belongsTo(Bug, {foreignKey: "BugId"});

User.hasMany(Report, {as: "Reports", foreignKey:"UserId"});
Report.belongsTo(User, {foreignKey: "UserId"});

Bug.hasMany(Status, {as: "Statuses", foreignKey:"BugId"});
Status.belongsTo(Bug, {foreignKey: "BugId"});


//USER
async function createUser(user){
    return await User.create(user, {
        include: [
            {model: Report, as: "Reports"} 
        ]});
}  
    
async function getByIdUser(id){
    return await User.findByPk(id);
}
    
async function getUser(){
    return await User.findAll(
        {              
            include: [
          {
              model: Report,
              as: "Reports"
          }
        ]
      });
}

async function updateUser(id, user){
    if (parseInt(id) !== user.UserID){
        console.log("Entity id diff");
        return;
    }

    let updateEntity = await getByIdUser(id);

    if (!updateEntity)
    {
        console.log("There isn't an user with this id");
        return;
    }

    return await updateEntity.update(user);
}

async function deleteUser(id){
    
    let deleteEntity = await getByIdUser(id);

    if (!deleteEntity)
    {
        console.log("There isn't an user with this id");
        return;
    }

    try{
        return await deleteEntity.destroy();
    }catch(e){
      let message = "This entity is already in use, so it cannot be deleted any more"
        if (e.message.includes("FK_Report_User")){            
        console.log(message);
        return message;
    }
    else
        throw(e);  
    }
}

router.route('/user').get( async (req, res) => {
    res.json(await getUser()); 
})

router.route('/user/:id').get( async (req, res) => {
    res.json(await getByIdUser(req.params.id));
})

router.route('/user').post( async (req, res) => {
    res.json(await createUser(req.body))
})

router.route('/user/:id').put( async (req, res) => {
    res.json(await updateUser(req.params.id, req.body));
})

router.route('/user/:id').delete( async (req, res) => {
    res.json(await deleteUser(req.params.id));
})

//BUG
async function createBug(bug){
    return await Bug.create(bug, {
        include: [
            {model: Report, as: "Reports"},

            {model: Status, as: "Statuses"} 
        ]});
}  

async function getBug(){
    return await User.findAll(
        {              
            include: [
          {
              model: Report,
              as: "Reports"
          },

          {
            model: Status,
            as: "Statuses"
          }

        ]
      });
}

async function getByIdBug(id){
    return await Bug.findByPk(id);
}

async function updateBug(id, bug){
    if (parseInt(id) !== bug.BugId){
        console.log("Entity id diff");
        return;
    }

    let updateEntity = await getByIdBug(id);

    if (!updateEntity)
    {
        console.log("There isn't a bug with this id");
        return;
    }

    return await updateEntity.update(bug);
}

async function deleteBug(id){
    
    let deleteEntity = await getByIdBug(id);

    if (!deleteEntity)
    {
        console.log("There isn't a bug with this id");
        return;
    }

    try{
        return await deleteEntity.destroy();
    }catch(e){
      let message = "This entity is already in use, so it cannot be deleted any more"
        if (e.message.includes("FK_Report_Bug" || "FK_Status_Bug")){            
        console.log(message);
        return message;
    }
    else
        throw(e);  
    }
}

router.route('/bug').post( async (req, res) => {
    res.json(await createBug(req.body))
})

router.route('/bug').get( async (req, res) => {
    res.json(await getBug()); 
})

router.route('/bug/:id').get( async (req, res) => {
    res.json(await getByIdBug(req.params.id));
})

router.route('/bug/:id').put( async (req, res) => {
    res.json(await updateBug(req.params.id, req.body));
})

router.route('/bug/:id').delete( async (req, res) => {
    res.json(await deleteBug(req.params.id));
})

//REPORT

async function createReport(report){
    await Report.create(report);
}  

async function getByIdReport(id){
    return await Report.findByPk(id);
}

async function getReport(){
    return await Report.findAll();
}

async function updateReport(id, report){
    if (parseInt(id) !== report.ReportId){
        console.log("Entity id diff");
        return;
    }

    let updateEntity = await getByIdReport(id);

    if (!updateEntity)
    {
        console.log("There isn't a report with this id");
        return;
    }

    return await updateEntity.update(report);
}

async function deleteReport(id){
    
    let deleteEntity = await getByIdReport(id);

    if (!deleteEntity)
    {
        console.log("There isn't a report with this id");
        return;
    }

    return await deleteEntity.destroy();
}


router.route('/report').post( async (req, res) => {
    res.json(await createReport(req.body))
})

router.route('/report/:id').get( async (req, res) => {
    res.json(await getByIdReport(req.params.id));
})

router.route('/report').get( async (req, res) => {
    res.json(await getReport());
})

router.route('/report/:id').put( async (req, res) => {
    res.json(await updateReport(req.params.id, req.body));
})

router.route('/report/:id').delete( async (req, res) => {
    res.json(await deleteReport(req.params.id));
})


//STATUS

async function createStatus(status){
    await Status.create(status);
}  

async function getByIdStatus(id){
    return await Status.findByPk(id);
}

async function getStatus(){
    return await Status.findAll();
}

async function updateStatus(id, status){
    if (parseInt(id) !== status.StatusId){
        console.log("Entity id diff");
        return;
    }

    let updateEntity = await getByIdStatus(id);

    if (!updateEntity)
    {
        console.log("There isn't a status with this id");
        return;
    }

    return await updateEntity.update(status);
}

async function deleteStatus(id){
    
    let deleteEntity = await getByIdStatus(id);

    if (!deleteEntity)
    {
        console.log("There isn't a status with this id");
        return;
    }

    return await deleteEntity.destroy();
}


router.route('/status').post( async (req, res) => {
    res.json(await createStatus(req.body))
})

router.route('/status/:id').get( async (req, res) => {
    res.json(await getByIdStatus(req.params.id));
})
   
router.route('/status').get( async (req, res) => {
    res.json(await getStatus());
})

router.route('/status/:id').put( async (req, res) => {
    res.json(await updateStatus(req.params.id, req.body));
})

router.route('/status/:id').delete( async (req, res) => {
    res.json(await deleteStatus(req.params.id));
})

let port = process.env.PORT || 8000;
app.listen(port);
console.log("API is running at " + port);