sequelize model:generate --name Session \
--attributes expire:date,data:string

sequelize model:generate --name user \
--attributes username:string,password:string,email:string