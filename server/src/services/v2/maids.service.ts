import { getPaginatedMaids } from "../../queries/v2/maids.queries"
import { maidFilterGenerator } from "../../utils/maidFilterGenerator/maidFilterGenerator";

export const getPaginatedMaidsService = (page:string, filter: {[key:string]: any}, sort: string | null, user_id: string | null) => {
    return new Promise(async (resolve, reject) => {
        try{
            const pipeline = maidFilterGenerator(filter);
            
            const data = await getPaginatedMaids(page,pipeline, sort, user_id);
            resolve(data)
        }catch(error:any){
            console.log(error);
            reject(error.message)
        }
    })
}