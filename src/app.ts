import express, {Application, Request, Response, NextFunction} from "express"
import cors from "cors"
import bodyParser from "body-parser"
import Database from './db'
import { httpLogger } from "./httpLogger";
import { failedResponse } from "./support/http";
import { authRoute } from "./routers/auth";
import { taskRoute } from "./routers/task";

const app:Application = express();

app.use(
    cors({
       origin: "*",
       methods:['GET',"POST","PUT","DELETE"],
       credentials:true,
    })
)

app.use(httpLogger)

app.use(bodyParser.urlencoded({ extended: true , limit: '50mb'}));
app.use(express.static('./uploads'))
app.use(express.json())
app.use("/", authRoute)
app.use("/", taskRoute)


// CONNECT TO DB 
if (process.env.PROJ_ENV === 'DEV' || process.env.PROJ_ENV === 'PRODUCTION') {
    Database.getInstance()
 }

app.get("/", (req: Request, res: Response) => {
   return res.send({message:"welcome to express and typescript"});
});
app.use((req:Request, res:Response, next:NextFunction)=>{
   return failedResponse(res, 404, `Invalid endpoint, inspect url again.`)
})

export default app;