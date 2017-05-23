'use strict';

const express     = require('express'),
      router      = express.Router(),
      db          = require('../models');


/////////////////// proposal forms ///////////////////////////////
router.post('/proposal/new/:userid/:projid', (req,res) => {
  let errors;
  let newProposal = {};

  // Validate
  req.checkBody('subject', 'Title is required').notEmpty();
  req.checkBody('body', 'Description is required').notEmpty();

  errors = req.validationErrors();


  if(errors){
    

  } else {
    newProposal.UserId      = req.params.userid;
    newProposal.ProjectId   = req.params.projid;
    newProposal.subject     = req.body.subject;
    newProposal.body        = req.body.body;
  }


  db.Proposals.create(newProposal).then(regProposal => {
    let projId = regProposal.dataValues.ProjectId;

    res.redirect(`/user/project/open/${projId}`);

  }).catch(err => {
    res.render('error',err);
  });

});

module.exports = router;