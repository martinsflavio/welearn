'use strict';

const express     = require('express'),
    router      = express.Router(),
    db          = require('../models');


/////////////////// proposal forms ///////////////////////////////
router.post('/comment/new/:userid/:projid', (req,res) => {
  let errors;
  let newComment = {};

  // Validate
  req.checkBody('body', 'Description is required').notEmpty();

  errors = req.validationErrors();


  if(errors){
    res.render('project',{msg:errors});
  } else {
    newComment.UserId      = req.params.userid;
    newComment.ProjectId   = req.params.projid;
    newComment.doby        = req.body.body;
  }


  db.Proposals.create(newComment).then(regProposal => {
    let projId = regProposal.dataValues.ProjectId;

    res.redirect(`/user/project/open/${projId}`);
  }).catch(err => {
    let errorsList = [];
    err.errors.forEach(dbErrors =>{
      errorsList.push({msg : dbErrors.message});
    });
    res.render('project',{errors:errors});
  });

});

module.exports = router;