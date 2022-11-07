
exports.index = function(req, res){
    message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.first_name;
      var dob= post.dob;
      var country= post.country;
   
 
	  if (!req.files)
				return res.status(400).send('No files were uploaded.');
 
		var file = req.files.uploaded_image;
		var file_name=file.name;
      
	  	 if(file.mimetype == "application/pdf"){
                                 
              file.mv('server/uploadedfiles'+ file.name, function(err) {
                             
	              if (err)
 
	                return res.status(500).send(err);
      					var sql = "INSERT INTO `details`(`name`,`dob`,`country`,`resume`) VALUES ('" + name + "','" + dob + "','" + country + "','" + file_name + "')";
 
    						var query = db.query(sql, function(err, result) {
    							 res.redirect('/profile');
    						});
					   });
          } else {
            message = "This format is not allowed , please upload file with .pdf'";
            res.render('index.ejs',{message: message});
          }
   } else {
      res.render('index');
   }
 
};
exports.profile = function(req, res){
	var message = '';
    var sql="SELECT * FROM `details`"; 
    db.query(sql, function(err, result){
	  if(result.length <= 0)
	  message = "Profile not found!";
	  
      res.render('profile.ejs',{data:result, message: message});
   });
};
exports.sort = function(req,res){
   var message="";
   var sql = "select * from `details` ORDER BY `name`;"
   db.query(sql,function(err,result){
      if(result.length<=0)
      message = "No record found!";
      res.render('success.ejs',{data:result, message: message});
   })
}