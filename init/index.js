const mongoose=require("mongoose");

const data=require("./data.js");
const initData=require("/Users/malharkarkhanis/Desktop/Major/init/data.js");

const Listing=require("/Users/malharkarkhanis/Desktop/Major/models/listing.js");




main().then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/ventura")
}

const initDB=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");


}

initDB();

