export default (store)=>(next)=>(action)=>
{
    console.log ("action", action.type);
    next(action);
}