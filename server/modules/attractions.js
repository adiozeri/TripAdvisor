var express = require('express');
var router = express.Router();
var DButilsAzure = require('../DButils');

router.post('/increaseNumberOfViewers/:attraction_ID', function(req, res, next) {
    increaseViewersCount(req.params.attraction_ID).then(
        function () {
            res.send({success: true, message: 'update Number Of Viewers success.'});
        }).catch(function (error) {
        console.log(error);
        res.send({success: false, message: 'update Number Of Viewers failed.'});
    });
});

router.post('/updateRankAndReview/:attraction_ID', function(req, res, next) {
    updateReview(req.params.attraction_ID,req.body.rank,req.body.rankersCount,req.body.reviews).then(
        function () {
            res.send({success: true, message: 'update Reviews success.'});
        }).catch(function (error) {
        console.log(error);
        res.send({success: false, message: 'update Reviews failed.'});
    });
});

router.post('/updateRank/:attraction_ID', function(req, res, next) {
    updateRank(req.params.attraction_ID,req.body.rank,req.body.rankersCount).then(
        function () {
            res.send({success: true, message: 'update Rank success.'});
        }).catch(function (error) {
        console.log(error);
        res.send({success: false, message: 'update Rank failed.'});
    });
});

function updateRank(attraction_ID,rank,rankersCount) {
    return DButilsAzure.execQuery(
        'UPDATE [dbo].[Attractions]\n' +
        'SET [Attraction_Rank] = '+rank+', [RankersCount] = '+ rankersCount +
        ' WHERE [ID] = ' + attraction_ID
    );
}

function updateReview(attraction_ID,rank,rankersCount,reviews) {
    return DButilsAzure.execQuery(
        'UPDATE [dbo].[Attractions]\n' +
        'SET [Attraction_Rank] = '+rank+', [Reviews] = \''+JSON.stringify(reviews)+'\', [RankersCount] = '+ rankersCount +
        ' WHERE [ID] = ' + attraction_ID
        );
}

function increaseViewersCount(attraction_ID){
    return DButilsAzure.execQuery(
        'DECLARE @IncrementValue int\n' +
        'SET @IncrementValue = 1\n' +
        'UPDATE [dbo].[Attractions] SET [ViewersCount] = [ViewersCount] + @IncrementValue\n' +
        'WHERE [ID] = '+attraction_ID);
}

module.exports = router;
