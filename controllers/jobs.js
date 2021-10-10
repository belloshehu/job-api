const {NotFoundError, BadRequestError} = require('../errors')
const {StatusCodes} = require('http-status-codes')
const JobModel = require('../models/jobs')

const createJob = async(req, res)=>{
    req.body.createdBy = req.user.id
    const {company, position} = req.body
    if(company === "" || position === ""){
        throw new BadRequestError("Company or position is not provided")
    }
    const job = await JobModel.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const deleteJob = async(req, res) =>{
    const {id} = req.params
    const job = await JobModel.findOneAndDelete({_id:id, createdBy: req.user.id})
    if(!job){
        throw new BadRequestError(`No job with id ${id}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const updateJob = async(req, res) =>{
    const {id} = req.params
    const {company, position} = req.body
    if(company ==="" || position === ""){
        throw new BadRequestError("Company or position is not provided")
    }
    const job = await JobModel.findOneAndUpdate({
        _id: id,
        createdBy: req.user.id
    },
    req.body,
    { new: true, runValidation: true }
    )
    if(!job){
        throw new BadRequestError(`No job with id ${id}`)
    }
    res.status(StatusCodes.OK).json({job})
}


const getAllJobs = async(req, res) =>{
    const jobs = await JobModel.find({createdBy:req.user.id}).sort('createdAt') 
    res.status(StatusCodes.OK).json({jobs, nHits: jobs.length})
}

const getJob = async(req, res) =>{
    const {id} = req.params
    const job = await JobModel.findOne({
        _id:id,
        createdBy: req.user.id
    })
    if(!job){
        throw new NotFoundError(`No job with id ${id}`)
    }
    res.status(StatusCodes.OK).json({job})
}

module.exports = {
    getAllJobs,
    getJob,
    deleteJob,
    updateJob,
    createJob
}