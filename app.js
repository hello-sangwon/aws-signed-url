const AWS = require('aws-sdk')
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})
const s3 = new AWS.S3()

let uploadBucket = 'test-bucket'
let actionId = Date.now()

let s3Params = {
    Bucket: uploadBucket,
    Key: `${actionId}.jpg`,
    ContentType: 'image/jpeg',
    CacheControl: 'max-age=31104000',
    //    ACL: 'public-read',   // Optional if you want the object to be publicly readable
}
console.log(s3Params)

let uploadURL = s3.getSignedUrl('putObject', s3Params)
console.log(uploadURL)

let downloadS3Params = {
    Bucket: uploadBucket,
    Key: `${actionId}.jpg`
}
let downloadURL = s3.getSignedUrl('getObject', downloadS3Params)
console.log(downloadURL)
