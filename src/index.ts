import express from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function init(){
    const app = express()
    const PORT = Number(process.env.PORT) || 8000 
 

    const server = new ApolloServer({
        typeDefs : `
        type Query {
            hello: String
            say(name:String):String
        }
        `,
        resolvers: {
            Query: {
                hello: ()=> `Hi there`,
                say:(_,{name}:{name:string}) => `hi ${name}`
            }
        }
    });
    await server.start()
    app.use(express.json())
    app.use("/graphql",expressMiddleware(server))
    app.get("/",(req,res)=>{
        res.json({message:"server up and running"})
    })
    app.listen(PORT,()=>console.log(`server started at PORT ${PORT}`))
}
init()