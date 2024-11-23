const express=require("express");
const router=express.Router({mergeParams: true});
const wrapAsync=require("/Users/malharkarkhanis/Desktop/Major/utils/wrapAsync.js");

const ExpressError=require("/Users/malharkarkhanis/Desktop/Major/utils/ExpressError.js");
const {reviewSchema}=require("/Users/malharkarkhanis/Desktop/Major/schema.js");


const Listing=require("/Users/malharkarkhanis/Desktop/Major/models/listing.js");
const Review=require("/Users/malharkarkhanis/Desktop/Major/models/reviews.js");




const validateReview=(req,res,next)=>{




    let {error}= reviewSchema.validate(req.body);
  
      if(error){
  
        let errMsg=error.details.map((el)=>el.message).join(",");
  
        throw new ExpressError(400,errMsg);
      }else{ 
        next();
      }
  
  
  
  
  

   };


router.post("/",validateReview,wrapAsync(async(req,res)=>{

    console.log(req.params.id);

    let listing=await  Listing.findById(req.params.id);
 
    let newReview=new Review(req.body.review);
 
    listing.reviews.push(newReview);
 
    await newReview.save();
 
    await listing.save();
    req.flash("success","New Review  created successfully");
 
 
    res.redirect(`/listings/${listing._id}`);

 
    }));
 
 
 router.get("/",(req,res)=>{
     console.log("Hi i am root");
 });
 
 //Delete Review Route
 router.delete("/:reviewId",wrapAsync (async(req,res)=>{
 
   let{id,reviewId}=req.params;
 
   await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
 
   await Review.findByIdAndDelete(reviewId);

   req.flash("success","New Review  deleted successfully");
 
   res.redirect(`/listings/${id}`);
 
 
 
 
 }));

 module.exports=router;

