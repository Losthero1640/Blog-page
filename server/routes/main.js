const express = require('express');
const router = express.Router();
const Post= require('../models/Post.js');


//GET/Home

router.get('', async (req, res) => {

      
      try{
        const locals = {
          title: "NodeJs Blog",
          description: "Simple Blog created with NodeJs, Express & MongoDb."
        }
        let perPage=5;
        let page=req.query.page||1;//page=2 agar likhenge toh woh query uthake display karega 
        //warna default 1st page show karega with the first 10 elements
        const data= await Post.aggregate([{$sort:{createdAt:-1}}])
        .skip(perPage*page - perPage)
        .limit(perPage)
        .exec();//-1 will keep the latest blog up

        const count= await Post.countDocuments();//if error use this const count = await Post.countDocuments();use this insted of Post.count()
        const nextPage=parseInt(page)+1;
        const hasNextPage= nextPage<= Math.ceil(count/perPage)
        




        res.render('index', { 
          locals,
          data,
          current: page,
          nextPage: hasNextPage ? nextPage : null,
          currentRoute: '/'
      });
      } catch(error){
        console.log(error);
      }
    });



    
    //get/post :id
    

    router.get('/post/:id', async (req, res) => {
      try {
        let slug = req.params.id;
    
        const data = await Post.findById({ _id: slug });
    
        const locals = {
          title: data.title,
          description: "Simple Blog created with NodeJs, Express & MongoDb.",
        }
    
        res.render('post', { 
          locals,
          data,
          currentRoute: `/post/${slug}`
        });
      } catch (error) {
        console.log(error);
      }
    
    });


//POST /Post - searchTerm

router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
      ]
    });
    // $or ek MongoDB operator hai. Iska matlab hota hai:
    // Agar title match kare, ya
    // Agar body match kare,
    // Dono me se koi ek condition match ho to result aayega.
    // 'i' ka matlab hai case-insensitive (uppercase/lowercase ka farak nahi padega).
 
 
    res.render("search", {
      data,
      locals,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }
});


router.get('/about',(req,res)=>{
  res.render('about',{currentRoute: '/about'}
              
  );
});

router.get('/contact',(req,res)=>{
  res.render('contact',{currentRoute: '/contact'}
              
  );
});

router.get('/admin',(req,res)=>{
  try {
    const locals = {
      title: "Index",
      description: "For sigin and registration."
    };
    res.render('admin',{
      locals,
      currentRoute: '/signin'
    });
  }
  catch(error){
    console.log(error);
  };
});

       

router.get('admin/dashboard',(req,res)=>{
  try {
    const locals = {
      title: "Dashboard",
      description: "Your personalized dashboard."
    };
    res.render('dashboard',{
      locals,
      currentRoute: '/dashboard'
    });
  }
  catch(error){
    console.log(error);
  }
            
;
});

module.exports = router;