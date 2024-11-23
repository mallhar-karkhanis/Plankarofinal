const express=require("express");
const router=express.Router({});

const wrapAsync=require("/Users/malharkarkhanis/Desktop/Major/utils/wrapAsync.js");

const ExpressError=require("/Users/malharkarkhanis/Desktop/Major/utils/ExpressError.js");

const {listingSchema,reviewSchema}=require("/Users/malharkarkhanis/Desktop/Major/schema.js");

const Listing=require("/Users/malharkarkhanis/Desktop/Major/models/listing.js");


const validateListing=(req,res,next)=>{

  


    let {error}= listingSchema.validate(req.body);
  
      if(error){
  
        let errMsg=error.details.map((el)=>el.message).join(",");
  
        throw new ExpressError(400,errMsg);
      }else{
        next();
      }
  
  
  
  
  
   };



router.get("/",wrapAsync(async(req,res)=>{

  console.log(req.body.id);


    const allListings= await Listing.find({});
    res.render("/Users/malharkarkhanis/Desktop/Major/views/listings/index.ejs",{allListings});
         

 }));





 

//New Route

router.get("/new", (req, res) => {
  console.log(req.user);

  if(!req.isAuthenticated()){
    req.flash("error","you must be logged in to create a listing");
    return res.redirect("/login");

  }


     res.render("listings/new.ejs");
   });

 
   
   //Show Route
router.get("/:id", wrapAsync(async (req, res) => {
     let { id } = req.params;
     const listing = await Listing.findById(id).populate("reviews");
     if(!listing){
      req.flash("error","Listing you requested for does not exist. ");
      res.redirect("/listings");

     }
     res.render("listings/show.ejs", { listing });
   }));



   
   //Create Route
router.post("/",validateListing, wrapAsync(async (req, res,next) => {

  
    let result= listingSchema.validate(req.body);
 
     if(result.error){
 
       throw new ExpressError(400,result.error);
     }
       const newListing = new Listing(req.body.listing);
      await newListing.save();
      req.flash("success","Listing created successfully");
      res.redirect("/listings");
     })
     
 
    );
 
    
    
    //Edit Route
router.get("/:id/edit",wrapAsync( async (req, res) => {
      let { id } = req.params;
      const listing = await Listing.findById(id);

      if(!listing){
        req.flash("error","Listing you requested for does not exist. ");
        res.redirect("/listings");
        
       }
      res.render("listings/edit.ejs", { listing });
    }));
    
    //Update Route
router.put("/:id",validateListing, wrapAsync(async (req, res) => {
      let { id } = req.params;
      await Listing.findByIdAndUpdate(id, { ...req.body.listing });
      req.flash("success","Listing Updated successfully");
      res.redirect(`/listings/${id}`);
    }));
 
    
    
    //Delete Route
router.delete("/:id",wrapAsync( async (req, res) => {
      let { id } = req.params;
      let deletedListing = await Listing.findByIdAndDelete(id);
      console.log(deletedListing);

      req.flash("success","Listing deleted successfully");
      res.redirect("/listings");
    }));


    module.exports=router;

