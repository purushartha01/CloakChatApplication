const dotenv=require('dotenv');

dotenv.config();

const port=process.env.PORT || 3000 ;

const db_uname=process.env.MONGO_Uname;
const db_pwd=process.env.MONGO_Pwd;

const uri=`mongodb+srv://${db_uname}:${db_pwd}@maincluster.wqqw6hg.mongodb.net/cloakchatFinal?retryWrites=true&w=majority&appName=MainCluster`

const jwt_options_access={
    algorithm: 'HS256',
    expiresIn:'10m'
}

const jwt_options_refresh={
    algorithm: 'HS256',
    expiresIn:'1d'
}

const ACCESS_TOKEN=process.env.ACESSS_TOKEN;
const REFRESH_TOKEN=process.env.REFRESH_TOKEN;


const nodeEnv=process.env.NODE_ENV;

module.exports={
    port,uri,ACCESS_TOKEN,REFRESH_TOKEN,nodeEnv,jwt_options_access,jwt_options_refresh
}